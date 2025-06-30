import { generateDEM } from "./dem-mesh.js";

// Attach popup that opens DEM generation dialog when a shape is clicked
export function promptDEMGeneration(shape) {
  // Create the popup content
  const popupContent = document.createElement("div");
  popupContent.style.textAlign = "center";

  // const message = document.createElement("p");
  // message.textContent = "Generate DEM?";

  const demButton = document.createElement("button");
  demButton.classList.add("generateDEMButton");
  demButton.onclick = () => { generateDEM(shape) };
  demButton.style.marginRight = "5px";
  demButton.textContent = "Generate DEM";

  // Delete button
  const deleteButton = document.createElement("button");
  deleteButton.onclick = () => { shape.remove(); }; // Remove the shape when clicked
  deleteButton.textContent = "Delete";

  // popupContent.appendChild(message);
  popupContent.appendChild(demButton);
  popupContent.appendChild(deleteButton);

  // Bind the popup to the shape
  shape.bindPopup(popupContent);
}
