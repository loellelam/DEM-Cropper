/*
 * This file visualizes the most recently generated mask on an HTML canvas.
 * Used for debugging.
 * Need to call initRenderMaskOnCanvas() in index.js and uncomment canvas in index.html
 */

import { createBinaryMask } from './binary-mask.js';
import { getSelectedGeotiff, getSelectedShape } from './selection.js';

export function initRenderMaskOnCanvas() {
  document.getElementById("renderMaskButton").addEventListener("click", function () {
    renderMaskOnCanvas();
  });
}

function renderMaskOnCanvas() {
  const selectedGeoTIFF = getSelectedGeotiff();
  const selectedShape = getSelectedShape();

  if (!selectedGeoTIFF) {
    alert("No GeoTIFF loaded. Please upload a GeoTIFF first.");
    return;
  }

  if (!selectedShape) {
    alert("No shape selected. Please draw or select a shape.");
    return;
  }

  // Generate the binary mask
  const mask = createBinaryMask(selectedGeoTIFF, selectedShape);

  if (!mask || mask.length === 0) {
    console.error("Failed to generate binary mask.");
    return;
  }

  // Render the mask on the canvas
  const canvas = document.getElementById("maskCanvas");
  const ctx = canvas.getContext("2d");

  const width = selectedGeoTIFF.width;
  const height = selectedGeoTIFF.height;

  canvas.width = width;
  canvas.height = height;

  const imageData = ctx.createImageData(width, height);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const index = (y * width + x) * 4;
      if (mask[y * width + x] === 1) {
        imageData.data[index] = 255;   // Red
        imageData.data[index + 1] = 0; // Green
        imageData.data[index + 2] = 0; // Blue
        imageData.data[index + 3] = 255; // Alpha (opaque)
      } else {
        imageData.data[index + 3] = 50; // Transparent
      }
    }
  }

  ctx.putImageData(imageData, 0, 0);
}
