
import { generateDEM } from './dem-mesh.js';

export function initRegenerateModel() {
  const btn = document.getElementById("regenerateButton");
  btn.addEventListener("click", async () => {
    const origHTML = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating...';
    try {
      await generateDEM();
    } catch (err) {
      console.error("generateDEM failed:", err);
    } finally {
      btn.disabled = false;
      btn.innerHTML = origHTML;
    }
  });
}