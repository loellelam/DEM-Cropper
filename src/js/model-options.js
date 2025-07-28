
import { generateDEM } from './dem-mesh.js';

export function initRegenerateModel() {
  document.getElementById("regenerateButton").addEventListener("click", () => {
    generateDEM();
  });
}
