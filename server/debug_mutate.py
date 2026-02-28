# To run: python debug_mutate.py
import numpy as np
import matplotlib.pyplot as plt

from debug_visualizer import LabelMapVisualizer
from ai_partitioning import initialize_population, mutate
from individual import Individual

def run_debug():
    # Fake DEM for testing
    H, W = 200, 300
    elevation = np.random.rand(H, W)

    physical_width = 300
    physical_height = 200
    bed_width = 100
    bed_height = 100

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
    plt.pause(5) # pause to show initial state and wait for window to load
    for i in range(100):
        # mutate the label map
        new_map = mutate(individual.label_map)

        # create a NEW individual so fitness is recalculated
        individual = Individual(new_map, individual.context)

        # draw updated image
        viz.show(
            individual.label_map,
            fitness=individual.fitness,
            title=f"Mutation {i}"
        )

    print("Done. Close the window to exit.")

    plt.ioff() # turn off interactive mode
    plt.show() # display the final plot until user closes window

if __name__ == "__main__":
    run_debug()
