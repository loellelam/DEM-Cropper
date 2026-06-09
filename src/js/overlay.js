let overlay;
let overlayText;

export function initOverlay() {
  overlay = document.getElementById("meshOverlay");
  overlayText = document.getElementById("overlayText");
}

export function showOverlay(message) {
  overlayText.textContent = message;
  overlay.classList.remove("hidden");
}

export function hideOverlay() {
  overlay.classList.add("hidden");
}