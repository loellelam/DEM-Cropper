# To run: python debug_evolve.py
import numpy as np
from ai_partitioning import initialize_population, evolve
from debug_visualizer import LabelMapVisualizer
from pathlib import Path

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

    viz = LabelMapVisualizer(pause=0.1)

    population = initialize_population(
        elevation,
        physical_width=physical_width,
        physical_height=physical_height,
        bed_width=bed_width,
        bed_height=bed_height,
        population_size=1,
        jitter_amount=10
    )

    def on_generation(gen, individual):
        # Show the best individual
        viz.show(
            individual.label_map,
            fitness=individual.fitness,
            title=f"Generation {gen}"
        )
        viz.wait(f"Generation {gen}. Press Enter to continue.")
        
        # # Show multiple individuals
        # for ind in individual:
        #     viz2 = LabelMapVisualizer(pause=0.1)
        #     viz2.show(
        #         ind.label_map,
        #         fitness=ind.fitness,
        #         title=f"Gen {gen}"
        #     )
        # viz2.wait(f"Generation {gen}. Press Enter to continue.")


    evolve(
        population,
        generations=100,
        on_generation=on_generation
    )

if __name__ == "__main__":
    run_debug()
