/* Synchronize model width and height input fields to maintain aspect ratio
 * Updates desired physical width when user enters height and vice versa.
 * This script should be loaded after the DOM is ready
*/

import { getAspectRatio } from './dem-mesh.js';

export function setupModelDimensionSync() {
  const widthInput = document.getElementById('physicalWidthInput');
  const heightInput = document.getElementById('physicalHeightInput');

  let lastChanged = null;

  function updateHeight() {
    if (lastChanged === 'height') return;
    if (!Number.isFinite(parseFloat(widthInput.value))) return; // Check if width is a valid number

    lastChanged = 'width';
    const aspect = getAspectRatio();
    if (aspect > 0) {
      heightInput.value = (parseFloat(widthInput.value) * aspect).toFixed(2);
    }
    lastChanged = null;
  }

  function updateWidth() {
    if (lastChanged === 'width') return;
    if (!Number.isFinite(parseFloat(heightInput.value))) return; // Check if height is a valid number

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
