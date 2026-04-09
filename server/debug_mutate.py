# To run: python debug_mutate.py
import numpy as np
import matplotlib.pyplot as plt
from pathlib import Path

from debug_visualizer import LabelMapVisualizer
from ai_partitioning import initialize_population, mutate
from individual import Individual

def run_debug():
    # Import DEM for testing
    elevation = np.random.rand(200, 300)
    assets_dem = Path(__file__).resolve().parents[1] / "assets" / "oa_dem_250m.tif"
    try:
        import rasterio
        if assets_dem.exists():
            with rasterio.open(assets_dem) as src:
                elevation = src.read(1).astype(np.float32)
        else:
            print(f"DEM not found at {assets_dem}, using synthetic DEM")
    except Exception as e:
        print(f"Could not read DEM ({e}), using synthetic DEM")

    physical_width = 100
    physical_height = 100
    bed_width = 30
    bed_height = 30

    population = initialize_population(
        elevation,
        physical_width,
        physical_height,
        bed_width,
        bed_height,
        population_size=1,
        jitter_amount=5
    )

    viz = LabelMapVisualizer(pause=0.1)

    individual = population[0] # get initial individual
    # plt.pause(5) # pause to show initial state and wait for window to load
    for i in range(20):
        # draw image
        viz.show(
            individual.label_map,
            fitness=individual.fitness,
            title=f"Mutation {i}"
        )
        viz.wait(f"Press Enter to continue.")
        
        # mutate the label map
        new_map = mutate(individual.label_map, elevation)

        # create a NEW individual so fitness is recalculated
        individual = Individual(new_map, individual.context)
        
    print("Done. Close the window to exit.")

    plt.ioff() # turn off interactive mode
    plt.show() # display the final plot until user closes window

if __name__ == "__main__":
    run_debug()
