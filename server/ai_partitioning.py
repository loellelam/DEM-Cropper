import numpy as np
import random

from individual import Individual
from problem_context import ProblemContext

def find_best_cut(elevation, physical_width, physical_height, bed_width, bed_height):
  """
  AI evolution algorithm to find optimal partitioning of elevation map into printable segments
  https://www.geeksforgeeks.org/dsa/genetic-algorithms/
  """

  # Convert elevation list to 2D numpy array
  elevation = np.array(elevation, dtype=float)

  # Initialize population
  population = initialize_population(
    elevation,
    physical_width, physical_height,
    bed_width, bed_height,
    population_size=40,
    jitter_amount=20    # tweak for more randomness
  )

  best = evolve(
    population,
    # elevation,
    # (physical_width, physical_height),
    # (bed_width, bed_height),
    generations=30
  )

  # test mutation
  # child_map = mutate(population[0].label_map)
  # return child_map.tolist()

#   # test mutate triangle cut
  mutated_map = mutate(population[0].label_map)
  for i in range(20):
    mutated_map = mutate(mutated_map)
  return mutated_map.tolist()
  
  return population[0].label_map.tolist()  # placeholder: return first genome as best cut

def initialize_population(elevation, physical_width, physical_height,
                          bed_width, bed_height, population_size=30,
                          jitter_amount=3):
  """
  Initialize a population of label maps with

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

  # Helper: flood-fill connected components on boolean mask
  # Returns a list of components, where each component is a list of (row, col) coordinates.
  def extract_components(mask):
    visited = np.zeros(mask.shape, dtype=bool)
    components = []

    for y in range(mask.shape[0]):
      row = mask[y]
      for x in range(mask.shape[1]):
        if not row[x] or visited[y, x]:
          continue
        # BFS/stack flood-fill
        stack = [(y, x)]
        visited[y, x] = True
        comp = []
        while stack:
          cy, cx = stack.pop()
          comp.append((cy, cx))
          # 4-neighborhood
          if cy > 0 and mask[cy - 1, cx] and not visited[cy - 1, cx]:
            visited[cy - 1, cx] = True
            stack.append((cy - 1, cx))
          if cy + 1 < mask.shape[0] and mask[cy + 1, cx] and not visited[cy + 1, cx]:
            visited[cy + 1, cx] = True
            stack.append((cy + 1, cx))
          if cx > 0 and mask[cy, cx - 1] and not visited[cy, cx - 1]:
            visited[cy, cx - 1] = True
            stack.append((cy, cx - 1))
          if cx + 1 < mask.shape[1] and mask[cy, cx + 1] and not visited[cy, cx + 1]:
            visited[cy, cx + 1] = True
            stack.append((cy, cx + 1))
        components.append(comp)
    return components

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
      comps = extract_components(mask) # Find groups of connected True pixels
      # Assign a unique label to each component
      for comp in comps:
        for (y, x) in comp:
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

    # Renumber labels to be contiguous 0..N-1
    unique = np.unique(label_map)
    remap = {old: new for new, old in enumerate(unique)} # Create a mapping from old labels to new contiguous labels
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

def mutate(label_map, p_shift=0.5, p_jitter=0.2, p_merge=0.15, p_split=0.10):
  r = np.random.rand()

  if r < p_split:
    return mutate_split_region(label_map)
  elif r < p_merge:
    return mutate_merge_regions(label_map)
  elif r < p_jitter:
    return mutate_triangle_cut(label_map)
  else:
    return mutate_boundary_shift(label_map)

#   return mutate_boundary_shift(label_map)
#   return mutate_triangle_cut(label_map)
#   return mutate_merge_regions(label_map)
  # return mutate_split_region(label_map)

def region_bounding_boxes(label_map):
    """
    Computes the bounding boxes of all labeled regions in the label map.
    """
    bboxes = {}
    labels = np.unique(label_map)

    for label in labels:
        ys, xs = np.where(label_map == label)
        bboxes[label] = (xs.min(), xs.max() + 1,
                         ys.min(), ys.max() + 1)
    return bboxes

def mutate_boundary_shift(label_map, max_shift=50):
    """
    Shifts a random horizontal or vertical boundary by up to max_shift pixels.
    """
    H, W = label_map.shape
    mutated = label_map.copy()

    if np.random.rand() < 0.5:
        # vertical boundary
        col = np.random.randint(1, W - 1)

        max_right = W - col - 1
        max_left = col - 1

        shift = np.random.randint(-max_shift, max_shift + 1)
        shift = np.clip(shift, -max_left, max_right)

        if shift > 0:
            for i in range(shift):
                mutated[:, col + i] = mutated[:, col - 1]
        elif shift < 0:
            for i in range(-shift):
                mutated[:, col - i - 1] = mutated[:, col]

    else:
        # horizontal boundary
        row = np.random.randint(1, H - 1)

        max_down = H - row - 1
        max_up = row - 1

        shift = np.random.randint(-max_shift, max_shift + 1)
        shift = np.clip(shift, -max_up, max_down)

        if shift > 0:
            for i in range(shift):
                mutated[row + i, :] = mutated[row - 1, :]
        elif shift < 0:
            for i in range(-shift):
                mutated[row - i - 1, :] = mutated[row, :]

    return mutated

# Helpers for mutate_triangle_cut()
def region_mask(label_map, label):
    """
    Create a boolean mask for a given partition label.

    Parameters:
        label_map (H x W int array): partition labels
        label (int): label of the region we want

    Returns:
        mask (H x W bool array): True where label_map == label
    """
    return label_map == label
def bounding_box(mask):
    """
    Compute the bounding box of a region mask.

    Parameters:
        mask (H x W bool array)

    Returns:
        x0, x1, y0, y1 (ints):
            inclusive bounding box coordinates
    """
    ys, xs = np.where(mask)
    # min/max pixel coordinates that belong to the region
    return xs.min(), xs.max(), ys.min(), ys.max()
def find_adjacent_edges(label_map, label):
    """
    Find edges of the given region that have exactly ONE adjacent region.

    We only allow edges where:
    - The entire edge touches a single neighboring partition
    - This avoids ambiguous or broken mutations

    Parameters:
        label_map (H x W int array)
        label (int): source partition

    Returns:
        edges (list of tuples):
            Each tuple is (edge_name, neighbor_label)
            edge_name epsilon {"top", "bottom", "left", "right"}
    """
    mask = region_mask(label_map, label)
    x0, x1, y0, y1 = bounding_box(mask)

    edges = []

    # top edge
    if y0 > 0:
        neighbor = np.unique(label_map[y0 - 1, x0:x1 + 1])
        neighbor = neighbor[neighbor != label]
        if len(neighbor) == 1:
            edges.append(("top", neighbor[0]))

    # bottom edge
    if y1 < label_map.shape[0] - 1:
        neighbor = np.unique(label_map[y1 + 1, x0:x1 + 1])
        neighbor = neighbor[neighbor != label]
        if len(neighbor) == 1:
            edges.append(("bottom", neighbor[0]))

    # left edge
    if x0 > 0:
        neighbor = np.unique(label_map[y0:y1 + 1, x0 - 1])
        neighbor = neighbor[neighbor != label]
        if len(neighbor) == 1:
            edges.append(("left", neighbor[0]))

    # right edge
    if x1 < label_map.shape[1] - 1:
        neighbor = np.unique(label_map[y0:y1 + 1, x1 + 1])
        neighbor = neighbor[neighbor != label]
        if len(neighbor) == 1:
            edges.append(("right", neighbor[0]))

    return edges
def random_point_inside(mask):
    """
    Pick a random pixel that lies inside the region.

    Parameters:
        mask (H x W bool array)

    Returns:
        (x, y) tuple of a pixel inside the region
    """
    ys, xs = np.where(mask)
    idx = np.random.randint(len(xs))
    return xs[idx], ys[idx]
def triangle_mask(shape, p1, p2, p3):
    """
    Rasterize a triangle defined by 3 pixel coordinates.

    Uses barycentric coordinates to determine whether
    a pixel center lies inside the triangle.

    IMPORTANT:
    - Includes boundary pixels (epsilon-safe)
    - Expands bounding box slightly to avoid 1-pixel gaps

    Parameters:
        shape (H, W): shape of the label_map
        p1, p2, p3 (x, y tuples): triangle vertices

    Returns:
        mask (H x W bool array): True inside the triangle
    """
    H, W = shape
    mask = np.zeros((H, W), dtype=bool)

    x1, y1 = p1
    x2, y2 = p2
    x3, y3 = p3

    # Compute bounding box of triangle (expanded by 1 pixel)
    xmin = max(0, min(x1, x2, x3) - 1)
    xmax = min(W - 1, max(x1, x2, x3) + 1)
    ymin = max(0, min(y1, y2, y3) - 1)
    ymax = min(H - 1, max(y1, y2, y3) + 1)

    # Barycentric denominator (twice triangle area)
    denom = ((y2 - y3)*(x1 - x3) + (x3 - x2)*(y1 - y3))
    if denom == 0:
        return mask

    for y in range(ymin, ymax + 1):
        for x in range(xmin, xmax + 1):
            # Compute barycentric coordinates
            a = ((y2 - y3)*(x - x3) + (x3 - x2)*(y - y3)) / denom
            b = ((y3 - y1)*(x - x3) + (x1 - x3)*(y - y3)) / denom
            c = 1 - a - b

            # Pixel is inside triangle (including edges)
            eps = 1e-6 # tolerance for floating-point errors
            if a >= -eps and b >= -eps and c >= -eps:
                mask[y, x] = True

    return mask

def mutate_triangle_cut(label_map):
    """
    Triangle mutation

    Steps:
    1. Choose a source partition
    2. Choose one of its valid boundary edges
    3. Find the adjacent partition on that edge
    4. Choose a random interior point inside the source
    5. Form a triangle from the edge endpoints to the point
    6. Remove that triangle from the source
    7. Add it to the adjacent partition
    """
    mutated = label_map.copy()
    labels = np.unique(mutated)

    src = np.random.choice(labels)
    src_mask = region_mask(mutated, src)

    edges = find_adjacent_edges(mutated, src)
    if not edges:
        return mutated  # no valid mutation

    edge, dst = edges[np.random.randint(len(edges))]
    x0, x1, y0, y1 = bounding_box(src_mask)

    # define edge endpoints
    if edge == "top":
        p1 = (x0, y0)
        p2 = (x1, y0)
    elif edge == "bottom":
        p1 = (x0, y1)
        p2 = (x1, y1)
    elif edge == "left":
        p1 = (x0, y0)
        p2 = (x0, y1)
    else:  # right
        p1 = (x1, y0)
        p2 = (x1, y1)

    p3 = random_point_inside(src_mask)

    tri = triangle_mask(mutated.shape, p1, p2, p3)

    # restrict triangle to source region
    tri &= src_mask

    if tri.sum() < 10:
        return mutated  # too small → skip

    mutated[tri] = dst
    return mutated

def mutate_merge_regions(label_map):
    """
    Merges two adjacent regions in the label map.
    """
    mutated = label_map.copy()
    labels = np.unique(mutated)

    if len(labels) < 2:
        return mutated

    a = np.random.choice(labels)

    ys, xs = np.where(mutated == a)
    neighbors = set()

    for y, x in zip(ys, xs):
        for dy, dx in [(-1,0),(1,0),(0,-1),(0,1)]:
            ny, nx = y + dy, x + dx
            if 0 <= ny < mutated.shape[0] and 0 <= nx < mutated.shape[1]:
                b = mutated[ny, nx]
                if b != a:
                    neighbors.add(b)

    if not neighbors:
        return mutated

    b = np.random.choice(list(neighbors))
    mutated[mutated == b] = a

    return mutated

def mutate_split_region(label_map):
    """
    Split a single region into two regions by a straight cut.

    The split is either:
    - vertical (left/right)
    - horizontal (top/bottom)
    """
    mutated = label_map.copy()
    bboxes = region_bounding_boxes(mutated)

    # Randomly choose a region to split
    label = np.random.choice(list(bboxes.keys()))
    x0, x1, y0, y1 = bboxes[label]

    # Compute region width and height
    width = x1 - x0
    height = y1 - y0

    # Determine which split directions are possible
    can_split_vertically = width >= 4
    can_split_horizontally = height >= 4

    # If neither split is possible, abort mutation
    if not can_split_vertically and not can_split_horizontally:
        return mutated

    # Assign a new label for the split-off region
    new_label = mutated.max() + 1

    # Choose a valid split direction
    if can_split_vertically and can_split_horizontally:
        split_vertically = np.random.rand() < 0.5
    else:
        split_vertically = can_split_vertically

    if split_vertically:
        # Vertical split: cut along x direction
        # Ensure at least 2 pixels on both sides
        split_x = np.random.randint(x0 + 2, x1 - 1)

        # Right side becomes new region
        mutated[y0:y1, split_x:x1] = new_label

    else:
        # Horizontal split: cut along y direction
        split_y = np.random.randint(y0 + 2, y1 - 1)

        # Bottom side becomes new region
        mutated[split_y:y1, x0:x1] = new_label

    return mutated


# Evolution loop
def evolve(population, generations=200, on_generation=None):
    """
    Temporary mutation only evolution loop

    on_generation(gen, individual) is an optional callback for debugging.
    """
    pop_size = len(population)
    num_children = 10

    for gen in range(generations):
        # Sort by fitness (descending)
        population.sort(key=lambda i: i.fitness, reverse=True)
        best = population[0]
        # Debug hook
        if on_generation:
            on_generation(gen, best) # send best individual
            # on_generation(gen, population) # send entire pop
        
        # generate children
        children = []
        for _ in range(num_children):
            parent = select_parent(population)
            mutated_map = mutate(parent.label_map)
            child = Individual(mutated_map, parent.context)
            children.append(child)

        # combine parents + children
        population = population + children

        # sort by fitness (descending)
        population.sort(key=lambda i: i.fitness, reverse=True)

        # keep top contenders
        population = population[:pop_size]

    return population[0] # best individual

# Helper for evolution loop
def select_parent(population, elite_fraction=0.3):
    """
    Parent selection.
    Top 30% of individuals are considered elites.
    80% chance to select from elites, 20% from the rest.
    """
    # sort by fitness (descending)
    population.sort(key=lambda i: i.fitness, reverse=True)
    
    elite_count = max(1, int(len(population) * elite_fraction))
    elites = population[:elite_count]

    if random.random() < 0.8:
        return random.choice(elites)
    else:
        return random.choice(population)
# def evolve(pop, elevation, physical_dims, bed_dims,
#            generations=20, elite_ratio=0.3):

#     pop_size = len(pop)

#     for gen in range(generations):
#         # compute fitness for all
#         # for ind in pop:
#         #     compute_fitness(ind, elevation, physical_dims, bed_dims)

#         # sort high → low fitness
#         pop.sort(key=lambda i: i.fitness, reverse=True)

#         elites = pop[: int(pop_size * elite_ratio)]

#         # parents = elites.copy()
#         # # create children
#         # children = []
#         # while len(children) < pop_size - len(elites):
#         #     p1, p2 = random.sample(parents, 2)
#         #     child = crossover(p1, p2)
#         #     mutate(child)
#         #     children.append(child)

#         # pop = elites + children

#         print(f"Generation {gen+1}, Best fitness: {pop[0].fitness:.4f}")

#     return pop[0]   # return best individual


# genetic operators

# def crossover(parent1: Individual, parent2: Individual):
#     """Simple crossover."""
#     h, w = parent1.label_map.shape
#     cut = np.random.randint(1, h - 1)

#     child_map = np.zeros_like(parent1.label_map)
#     child_map[:cut] = parent1.label_map[:cut]
#     child_map[cut:] = parent2.label_map[cut:]

#     return Individual(child_map)
