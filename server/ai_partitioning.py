import numpy as np
import random
from skimage.measure import label, regionprops
from scipy.ndimage import distance_transform_edt

from individual import Individual
from problem_context import ProblemContext

def find_best_cut(elevation, physical_width, physical_height, bed_width, bed_height):
    # Convert elevation list to 2D numpy array
    elevation = np.array(elevation, dtype=float)

    # Initialize population
    population = initialize_population(
        elevation,
        physical_width, physical_height,
        bed_width, bed_height,
        population_size=1,
        jitter_amount=20    # tweak for more randomness
    )

    # Ensure that each partition of an individual fits within the printer bed, cutting if necessary
    ensure_partitions_fit(population[0])

    # Create new labels for non-contiguous regions
    ensure_contiguous_partitions(population[0])

    # Merge small partitions
    merge_small_partitions(population[0])
    
    return population[0].label_map.tolist()  # return label map as a list

def initialize_population(elevation, physical_width, physical_height,
                          bed_width, bed_height, population_size=30,
                          jitter_amount=3):
    """
    Initialize a population of label maps by grouping pixels with similar slope values
    into X number of bins. Water label = -1.

    elevation: 2D numpy array (H × W) of DEM heights
    physical_width, physical_height: size of the island in mm
    bed_width, bed_height: printer bed dimensions in mm
    population_size: how many genomes to create
    jitter_amount: how much to randomly perturb boundaries (in pixels)

    Returns: list of label_map arrays (each H × W, integer labels)
    """
    H, W = elevation.shape

    # Compute number of tiles that roughly match printer size (used to set target partitions)
    tiles_x = max(1, int(np.ceil(physical_width / bed_width)))
    tiles_y = max(1, int(np.ceil(physical_height / bed_height)))
    target_partitions = max(1, tiles_x * tiles_y)

    # Detect water: explicit mask for NaN, infinities, or extreme sentinel values
    finite = np.isfinite(elevation)
    # Many DEMs use large negative sentinel for no-data (ex: -3.4e+38)
    sentinel_thresh = -1e30
    water_mask = (~finite) | (elevation <= sentinel_thresh)

    # Land mask (inverse of water mask)
    land_mask = ~water_mask
    land_pixels = int(np.count_nonzero(land_mask))

    # Prepare elevation used for slope computation:
    # replace water/sentinel cells with a median elevation to avoid huge gradients along coastlines
    elevation_for_slope = elevation.astype(float).copy()
    if land_pixels > 0:
        land_median = float(np.nanmedian(elevation[land_mask])) # Compute the median elevation of land pixels only
        elevation_for_slope[water_mask] = land_median # Replace water/sentinel cells with median
    else:
        # fallback: if no land, fill with zeros
        elevation_for_slope[water_mask] = 0.0

    # Compute slope (gradient magnitude) on the cleaned elevation
    gy, gx = np.gradient(elevation_for_slope) # gy = rate of change between rows, gx = rate of change between columns
    slope = np.hypot(gx, gy) # magnitude of change regardless of direction

    # Compute the numeric range of slope values used to build slope bins, using only land pixels
    if land_pixels == 0: # fallback: if no land
        s_min, s_max = 0.0, 1.0
    else:
        s_min = float(np.nanmin(slope[land_mask])) # min slope value of land pixels
        s_max = float(np.nanmax(slope[land_mask])) # max slope value of land pixels
        if s_max == s_min:
            s_max = s_min + 1e-6 # if flat terrain, add epsilon to prevent errors later on

    population = []

    for _ in range(population_size):
        # Add small per-individual noise to slope to create diversity in the population
        noise_scale = max(1e-6, jitter_amount * 0.01 * (slope[land_mask].std() if land_pixels > 0 else 1.0))
        noisy_slope = slope.copy()
        if land_pixels > 0:
            noisy_slope[land_mask] = noisy_slope[land_mask] + np.random.normal(scale=noise_scale, size=noisy_slope[land_mask].shape)

        # Determine number of slope bins, scaled to land area so land is subdivided
        # num_bins is a tunable parameter
        if land_pixels <= 500:
            num_bins = max(4, target_partitions)
        else:
            num_bins = int(min(target_partitions * 6, max(target_partitions, land_pixels // 500)))
            num_bins = max(4, num_bins)
            # num_bins = target_partitions # intuitive, but does not work as well

        # Quantize slope into bins only for land pixels
        bin_boundaries = np.linspace(s_min, s_max, num_bins + 1) # Creates num_bins+1 evenly spaced numbers from s_min to s_max inclusive
        bins = bin_boundaries[1:-1] # Drops the first and last values (keep internal edges)
        quant = np.full((H, W), -1, dtype=int) # Initialize with -1, indicating not land
        if land_pixels > 0:
            digitized = np.digitize(noisy_slope[land_mask], bins) # Assign each land pixel to a bin index based on its slope value
            quant[land_mask] = digitized # Fills the land pixels in the output grid with their bin values

        # Create label_map by extracting connected components in each quantized land bin
        label_map = np.full((H, W), -1, dtype=int)
        next_label = 0

        for b in range(0, num_bins):
            mask = (quant == b) # Select pixels that belong to bin b. True if pixel belongs to bin b and False otherwise
            if not mask.any():
                continue
        
            components_labeled = label(mask, connectivity=1) # Find connected components using skimage.measure.label
            # For each component, assign a unique label to each component
            for prop in regionprops(components_labeled):
                coords = prop.coords
                for (y, x) in coords:
                    label_map[y, x] = next_label
                next_label += 1

        # Assign water pixels their own special label (do not mix with land)
        water_label = None
        if water_mask.any():
            water_label = next_label
            label_map[water_mask] = water_label
            next_label += 1

        # Fallback: if any pixels remain unlabeled, assign them to nearest neighbor labels
        unlabeled = np.where(label_map == -1)
        if unlabeled[0].size > 0:
            for y, x in zip(*unlabeled):
                neigh = []
                # Check 4 neighbors
                for ny, nx in [(y-1,x),(y+1,x),(y,x-1),(y,x+1)]:
                    # If neighbor is within bounds and labeled, add to list
                    if 0 <= ny < H and 0 <= nx < W and label_map[ny, nx] != -1:
                        neigh.append(label_map[ny, nx])
                if neigh: # If we found any labeled neighbors, assign the most common label among them
                    label_map[y, x] = max(set(neigh), key=neigh.count)
                else: # If no neighbors found, assign new label
                    label_map[y, x] = next_label
                    next_label += 1

        # Merge very small land regions into neighbor with majority adjacency to ensure printable partitions
        min_area = max(1, (H * W) // (num_bins * 30)) # (Avg pixels per bin)/30 to remove regions much smaller than a typical partition. min_area is a tunable parameter
        labels, counts = np.unique(label_map, return_counts=True) # Count how many pixels are in each label
        small_labels = labels[counts < min_area] # Find labels whose size is below the threshold
        for sl in small_labels:
            # never merge the dedicated water label into land or vice-versa
            if water_label is not None and sl == water_label:
                continue
            coords = np.where(label_map == sl)
            if coords[0].size == 0:
                continue
            neighbor_counts = {} # Keep track of neighboring labels and the number of touching edges for each neighbor
            # Scan neighbors of every pixel in the small region
            for y, x in zip(coords[0], coords[1]):
                for dy, dx in [(-1,0),(1,0),(0,-1),(0,1)]: # 4 neighbors
                    ny, nx = y + dy, x + dx
                    if 0 <= ny < H and 0 <= nx < W:
                        lbl = label_map[ny, nx]
                        if lbl != sl and not (water_label is not None and lbl == water_label):
                            neighbor_counts[lbl] = neighbor_counts.get(lbl, 0) + 1
            if neighbor_counts:
                target = max(neighbor_counts, key=neighbor_counts.get) # Picks the region that shares the most border pixels
                label_map[coords] = target # Merge the small region into the target neighbor

        # Ensure water pixels are represented by -1 and excluded from renumbering of land labels
        if water_mask.any():
            label_map[water_mask] = -1
            water_label = -1
        else:
            water_label = None

        # Renumber labels to be contiguous 0..N-1 (except water, which is -1)
        unique_land = np.unique(label_map)
        unique_land = unique_land[unique_land != -1] # Exclude water label
        remap = {old: new for new, old in enumerate(unique_land)} # Create a mapping from old labels to new contiguous labels
        for old, new in remap.items():
            label_map[label_map == old] = new

        # Update water_label to new id if present, or None if absent
        if water_label is not None:
            water_label = remap.get(water_label, None)

        # Apply small jitter to boundaries for diversity
        # Randomly sample a small fraction (boundary_frac) and reassign each chosen pixel to a random adjacent label (excluding water).
        if jitter_amount > 0:
            boundary_frac = min(0.02, 0.001 * jitter_amount)
            bmask = np.zeros_like(label_map, dtype=bool)
            for y in range(H):
                for x in range(W):
                    lbl = label_map[y, x]
                    for dy, dx in [(-1,0),(1,0),(0,-1),(0,1)]:
                        ny, nx = y + dy, x + dx
                        if 0 <= ny < H and 0 <= nx < W and label_map[ny, nx] != lbl:
                            bmask[y, x] = True
                            break
            bcoords = np.where(bmask)
            if bcoords[0].size > 0:
                sample_count = int(boundary_frac * bcoords[0].size)
                if sample_count > 0:
                    idxs = np.random.choice(bcoords[0].size, sample_count, replace=False)
                    for i in idxs:
                        y = bcoords[0][i]; x = bcoords[1][i]
                        neigh = []
                        for dy, dx in [(-1,0),(1,0),(0,-1),(0,1)]:
                            ny, nx = y + dy, x + dx
                            if 0 <= ny < H and 0 <= nx < W and label_map[ny, nx] != label_map[y, x]:
                                if water_label is not None and label_map[ny, nx] == water_label:
                                    continue
                                neigh.append(label_map[ny, nx])
                        if neigh:
                            label_map[y, x] = random.choice(neigh)

        # Build ProblemContext and Individual
        context = ProblemContext(
        elevation,
        physical_width,
        physical_height,
        bed_width,
        bed_height
        )
        population.append(Individual(label_map, context))

    return population

def ensure_partitions_fit(individual: Individual, max_iters: int = 100):
    """
    Ensure every partition in 'individual.label_map' can fit within the printer bed.
    If a partition doesn't fit, iteratively split it in half along the longer dimension
    (in pixels) until both halves fit or max_iters is reached.

    The function mutates individual.label_map in-place and also returns the updated map.

    Rules:
    - Water label (-1) is skipped.
    - A part is considered fitting if it fits either in (bed_width, bed_height)
      or when rotated (bed_height, bed_width).
    - Splits are done using simple bbox-midpoint column/row splits with small
      adjustments to avoid empty halves.
    """
    label_map = individual.label_map
    ctx = individual.context
    H, W = label_map.shape

    physical_width = ctx.physical_width
    physical_height = ctx.physical_height
    bed_width = ctx.bed_width
    bed_height = ctx.bed_height

    # pixel --> mm conversion
    width_per_pixel_mm = float(physical_width) / float(W)
    height_per_pixel_mm = float(physical_height) / float(H)

    def part_fits(xmin, xmax, ymin, ymax):
        pw_mm = (xmax - xmin) * width_per_pixel_mm
        ph_mm = (ymax - ymin) * height_per_pixel_mm
        # check normal orientation or rotated
        return (pw_mm <= bed_width and ph_mm <= bed_height) or (pw_mm <= bed_height and ph_mm <= bed_width)

    it = 0
    while it < max_iters:
        it += 1
        made_change = False

        labels = np.unique(label_map)
        # skip water label -1
        labels = labels[labels != -1]

        # for each partition...
        for lbl in labels:
            mask = (label_map == lbl)
            if not mask.any():
                continue

            ys, xs = np.where(mask)
            xmin, xmax = xs.min(), xs.max() + 1  # xmax exclusive
            ymin, ymax = ys.min(), ys.max() + 1  # ymax exclusive

            if part_fits(xmin, xmax, ymin, ymax):
                continue  # this part fits, no changes needed
            # determine split axis by pixel extent (prefer splitting the longer side)
            width_px = xmax - xmin
            height_px = ymax - ymin
            split_axis = 'vertical' if width_px >= height_px else 'horizontal'

            split_success = False

            # try splitting along chosen axis; if fails, try the other axis
            for axis_try in (split_axis, 'horizontal' if split_axis == 'vertical' else 'vertical'):
                if axis_try == 'vertical' and width_px >= 2:
                    # allowed split columns are inside bounding box: xmin+1 .. xmax-1
                    mid = (xmin + xmax) // 2
                    # try center first, then expand outward
                    candidates = [mid] + [mid + d for d in range(1, (width_px // 2) + 1)] + [mid - d for d in range(1, (width_px // 2) + 1)]
                    for split_col in candidates:
                        if split_col <= xmin or split_col >= xmax:
                            continue
                        left_mask = mask & (np.arange(W)[None, :] <= split_col - 1)
                        right_mask = mask & (np.arange(W)[None, :] >= split_col)
                        if left_mask.any() and right_mask.any():
                            # assign right half a new label
                            new_label = int(label_map.max()) + 1
                            label_map[right_mask] = new_label
                            made_change = True
                            split_success = True
                            break
                    if split_success:
                        break

                elif axis_try == 'horizontal' and height_px >= 2:
                    mid = (ymin + ymax) // 2
                    candidates = [mid] + [mid + d for d in range(1, (height_px // 2) + 1)] + [mid - d for d in range(1, (height_px // 2) + 1)]
                    for split_row in candidates:
                        if split_row <= ymin or split_row >= ymax:
                            continue
                        top_mask = mask & (np.arange(H)[:, None] <= split_row - 1)
                        bottom_mask = mask & (np.arange(H)[:, None] >= split_row)
                        if top_mask.any() and bottom_mask.any():
                            new_label = int(label_map.max()) + 1
                            label_map[bottom_mask] = new_label
                            made_change = True
                            split_success = True
                            break
                    if split_success:
                        break

            # If we couldn't split this region (rare), leave it and continue to next label
            # Continue scanning other labels; further iterations may allow different splits
            # If a split was made, break to restart scanning labels from top (because label set changed)
            if made_change:
                break

        if not made_change:
            break

    # update individual's map and return it
    individual.label_map = label_map
    return label_map

def ensure_contiguous_partitions(individual: Individual):
    """
    Ensure that each label corresponds to a single connected region.

    If a label contains multiple disconnected components,
    split them into separate labels.
    """
    # Work on a copy to avoid modifying input directly
    new_map = individual.label_map.copy()

    # Track the next available label
    next_label = new_map.max() + 1

    # Iterate over all labels (excluding water if using -1)
    labels = np.unique(new_map)

    for lbl in labels:
        if lbl == -1:
            continue  # skip water / background if applicable

        # create mask for this label
        mask = (new_map == lbl)

        # find connected components within this label
        # connectivity=1 → 4-connectivity (safer for grid partitions)
        components = label(mask, connectivity=1)

        num_components = components.max()

        # If more than 1 component, then it is not contiguous. split into separate labels
        if num_components > 1:
            # Keep the first component as the original label, assign new labels to the rest
            for comp_id in range(2, num_components + 1):
                new_map[components == comp_id] = next_label
                next_label += 1

    individual.label_map = new_map
    return new_map

def merge_small_partitions(individual: Individual, area_fraction: float = 0.5) -> np.ndarray:
    """
    Merge partitions whose bounding box is smaller than a fraction of the printer bed
    into their most-adjacent neighbor.

    A partition is considered "small" if BOTH of the following hold:
      - its pixel width  < area_fraction * (bed_width  / physical_width  * W)
      - its pixel height < area_fraction * (bed_height / physical_height * H)

    i.e. it could fit inside half the bed in both dimensions simultaneously.
    Water label (-1) is never merged or used as a merge target.

    Merging is repeated until no more small partitions remain (cascade merges are
    handled naturally since the loop restarts after every merge).

    Args:
        individual:     Individual whose label_map is mutated in-place.
        area_fraction:  Fraction of bed dimensions used as the smallness threshold.
                        Default 0.5 = "less than half a bed side".

    Returns:
        The updated label_map (also mutated on individual).
    """
    label_map = individual.label_map
    ctx = individual.context
    H, W = label_map.shape

    # convert physical dimensions to pixel scale
    px_per_mm_x = W / ctx.physical_width
    px_per_mm_y = H / ctx.physical_height

    # thresholds in pixels
    bed_w_px = area_fraction * ctx.bed_width  * px_per_mm_x
    bed_h_px = area_fraction * ctx.bed_height * px_per_mm_y

    full_bed_w_px = ctx.bed_width  * px_per_mm_x
    full_bed_h_px = ctx.bed_height * px_per_mm_y

    # helper: does bbox fit in printer bed?
    def fits_in_bed(bbox):
        minr, minc, maxr, maxc = bbox
        span_x = maxc - minc
        span_y = maxr - minr

        normal  = span_x <= full_bed_w_px and span_y <= full_bed_h_px
        rotated = span_x <= full_bed_h_px and span_y <= full_bed_w_px

        return normal or rotated

    # helper: is region "small"?
    def is_small(bbox):
        minr, minc, maxr, maxc = bbox
        return (maxc - minc) < bed_w_px and (maxr - minr) < bed_h_px

    # helper: find neighbors via border contact
    def neighbors_by_border(lbl):
        """
        Count shared border pixels with neighbors.
        """
        coords = np.where(label_map == lbl)
        neighbor_counts = {}

        for y, x in zip(coords[0], coords[1]):
            for dy, dx in ((-1,0),(1,0),(0,-1),(0,1)):
                ny, nx = y + dy, x + dx
                if 0 <= ny < H and 0 <= nx < W:
                    nb = label_map[ny, nx]
                    if nb != lbl and nb != -1:
                        neighbor_counts[nb] = neighbor_counts.get(nb, 0) + 1

        return sorted(neighbor_counts, key=neighbor_counts.get, reverse=True)

    # main iterative merge loop
    changed = True
    while changed:
        changed = False

        # find all unique labels (excluding water)
        unique_labels = np.unique(label_map)
        unique_labels = unique_labels[unique_labels != -1]
        if len(unique_labels) == 0:
            break

        # remap labels to positive ints for regionprops (original labels --> 1..N)
        label_to_idx = {lbl: i+1 for i, lbl in enumerate(unique_labels)}
        idx_to_label = {i+1: lbl for i, lbl in enumerate(unique_labels)}

        relabeled = np.zeros_like(label_map, dtype=int)

        for lbl, idx in label_to_idx.items():
            relabeled[label_map == lbl] = idx

        # compute region properties
        props = regionprops(relabeled)

        for region in props:
            lbl = idx_to_label[region.label] # map back to original label
            bbox = region.bbox # (min_row, min_col, max_row, max_col)

            if not is_small(bbox):
                continue

            # try merging with neighbors
            merged = False
            for candidate in neighbors_by_border(lbl):
                candidate_mask = (label_map == candidate)
                if not np.any(candidate_mask):
                    continue

                # get candidate bbox
                ys, xs = np.where(candidate_mask)
                cbbox = (ys.min(), xs.min(), ys.max()+1, xs.max()+1)

                # union bbox
                minr = min(bbox[0], cbbox[0])
                minc = min(bbox[1], cbbox[1])
                maxr = max(bbox[2], cbbox[2])
                maxc = max(bbox[3], cbbox[3])
                union = (minr, minc, maxr, maxc)

                # check if union of the two bboxes fits in the bed
                if fits_in_bed(union):
                    # perform merge
                    label_map[label_map == lbl] = candidate
                    changed = True
                    merged = True
                    break

            if merged:
                break  # restart after modification

    individual.label_map = label_map
    return label_map
