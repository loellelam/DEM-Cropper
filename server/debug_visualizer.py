# debug_visualizer.py
import numpy as np
import matplotlib.pyplot as plt

class LabelMapVisualizer:
    def __init__(self, pause=0.01, cmap="tab20"):
        """
        pause: time in seconds between frames
        cmap: matplotlib colormap for regions
        """
        self.pause = pause
        self.cmap = cmap
        self.fig = None # matplotlib window
        self.im = None # matplotlib image

    def show(self, label_map, fitness=None, title=None):
        """
        Display or update the label map visualization.
        """
        if self.fig is None: # if window hasn't been created yet
            plt.ion()  # interactive mode
            self.fig, self.ax = plt.subplots() # fig is window, ax is drawing area
            self.im = self.ax.imshow( # treats label_map as an image and draws it
                label_map,
                cmap=self.cmap,
                interpolation="nearest"
            )
            # self.ax.set_axis_off() # hide axes ticks
        else:
            self.im.set_data(label_map) # update image data

        if fitness is not None:
            if title:
                self.ax.set_title(f"{title} | fitness = {fitness:.4f}")
            else:
                self.ax.set_title(f"fitness = {fitness:.4f}")
        elif title:
            self.ax.set_title(title)

        self.im.autoscale() # adjust color if labels change
        plt.pause(self.pause)

    def wait(self, message="Press Enter to continue..."):
        input(message)
