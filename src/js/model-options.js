
import { generateDEM } from './dem-mesh.js';

export function initRegenerateModel() {
  const btn = document.getElementById("regenerateButton");
  const exportBtn = document.getElementById("exportButton");
  btn.addEventListener("click", async () => {
    const origHTML = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating...';
    btn.classList.add("loading");

    exportBtn.disabled = true;
    exportBtn.title = "Mesh generation in progress. Please wait..."
    exportBtn.classList.add("loading");

    try {
      await generateDEM();
    } catch (err) {
      console.error("generateDEM failed:", err);
    } finally {
      btn.disabled = false;
      btn.innerHTML = origHTML;
      btn.classList.remove("loading");

      exportBtn.disabled = false;
      exportBtn.title = "";
      exportBtn.classList.remove("loading");
    }
  });
}