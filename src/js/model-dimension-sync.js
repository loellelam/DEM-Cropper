/* Synchronize model width and height input fields to maintain aspect ratio
/* This script should be loaded after the DOM is ready
*/

import { getAspectRatio } from './dem-mesh.js';

export function setupModelDimensionSync() {
  const widthInput = document.getElementById('modelWidthInput');
  const heightInput = document.getElementById('modelHeightInput');

  let lastChanged = null;

  function updateHeight() {
    if (lastChanged === 'height') return;
    lastChanged = 'width';
    const aspect = getAspectRatio();
    if (aspect > 0) {
      heightInput.value = (parseFloat(widthInput.value) * aspect).toFixed(2);
    }
    lastChanged = null;
  }

  function updateWidth() {
    if (lastChanged === 'width') return;
    lastChanged = 'height';
    const aspect = getAspectRatio();
    if (aspect > 0) {
      widthInput.value = (parseFloat(heightInput.value) / aspect).toFixed(2);
    }
    lastChanged = null;
  }

  widthInput.addEventListener('input', updateHeight);
  heightInput.addEventListener('input', updateWidth);
}
