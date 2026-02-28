import numpy as np
from skimage.measure import regionprops

class Individual(object):
    def __init__(self, label_map: np.ndarray, context):
        self.label_map = label_map # 2D segmentation array
        self.context = context # universal context values related to the DEM
        self.fitness = self.cal_fitness() # final scalar fitness
        # self.fitness = None               # final scalar fitness

    def cal_fitness(self):
        # global context
        elevation = self.context.elevation
        physical_width = self.context.physical_width
        physical_height = self.context.physical_height
        bed_width = self.context.bed_width
        bed_height = self.context.bed_height

        # useful variables
        H, W = self.label_map.shape
        props = regionprops(self.label_map + 1) # identifies regions where each region = all pixels with the same label number
        num_parts = len(props)
        naive_max_parts = np.ceil(physical_width / bed_width) * np.ceil(physical_height / bed_height)
        # pixel --> mm conversion
        width_per_pixel_mm = physical_width / W
        height_per_pixel_mm = physical_height / H

        # Criteria 1: fits in printer volume
        fits = []
        # Criteria 2: how much of the bed is utilized
        utilizations = []
        for prop in props:
            min_row = prop.bbox[0] # top pixel (y start)
            min_col = prop.bbox[1] # left pixel (x start)
            max_row = prop.bbox[2] # bottom pixel (y end)
            max_col = prop.bbox[3] # right pixel (x end)

            # find bounding rectangle dimensions
            part_width_mm = (max_col - min_col) * width_per_pixel_mm
            part_height_mm = (max_row - min_row) * height_per_pixel_mm

            if part_width_mm <= bed_width and part_height_mm <= bed_height:
                fits.append(1)  # part fits
            elif part_width_mm <= bed_height and part_height_mm <= bed_width: # check if fits when rotated
                fits.append(1)  # part fits when rotated
            else:
                fits.append(0)  # part doesn't fit

            # Percent of printer bed utilized
            util_w = part_width_mm / bed_width
            util_h = part_height_mm / bed_height
            utilizations.append(min(1.0, util_w, util_h)) # max score of 1.0
        score_fit = float(np.mean(fits))
        score_util = float(np.mean(utilizations))

        # Criteria 3: Minimize number of parts
        score_parts = 1 - (num_parts / naive_max_parts)
        # score_parts = max(0, 1 - ( (num_parts - 1) / naive_max_parts ))


        # Criteria 4: Compactness (structural integrity of parts)
        # Polsby–Popper style score per region: PP = 4*pi*Area / Perimeter^2 (higher -> more compact)
        pp_scores = []
        for prop in props:
            area = float(prop.area)
            # prefer perimeter_crofton if available for a better estimate
            perimeter = None
            if hasattr(prop, 'perimeter_crofton'):
                try:
                    perimeter = float(prop.perimeter_crofton)
                except Exception:
                    perimeter = None
            if perimeter is None:
                perimeter = float(getattr(prop, 'perimeter', 0.0))
            if perimeter <= 0.0 or area <= 0.0:
                pp = 0.0
            else:
                pp = 4.0 * np.pi * area / (perimeter * perimeter)
                # clamp small numerical issues
                pp = max(0.0, min(1.0, pp))
            pp_scores.append(pp)
        score_compactness = float(np.mean(pp_scores))

        fitness = (
            score_fit * 0.5 +
            score_util * 0.01 +
            score_parts * 0.3 +
            score_compactness * 0.19
        )
        return fitness
