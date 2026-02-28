import numpy as np

# Fitness function depends on global parameters, store here for easy access
class ProblemContext:
    def __init__(self, elevation, physical_width, physical_height, bed_width, bed_height):
        self.elevation = np.array(elevation, dtype=float)
        self.physical_width = physical_width
        self.physical_height = physical_height
        self.bed_width = bed_width
        self.bed_height = bed_height