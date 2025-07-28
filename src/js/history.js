/* 
*  This file displays a history of uploaded geotiffs, shapes drawn on the map, and uploaded geojsons.
*/

import { map } from "./map.js";
import { setSelectedGeotiff, setSelectedShape, getPrevTiffEntry, setPrevTiffEntry, getPrevShapeEntry, setPrevShapeEntry } from "./selection.js";
import { switchToTab } from "./tab-switching.js";
import { generateDEM } from "./dem-mesh.js";

export function addTiffToHistory(layer, name, divContainer) {
  const tiffEntry = document.createElement("div");
  tiffEntry.classList.add("historyDivItem");
  tiffEntry.title = "Click to select this TIFF layer";

  const tiffText = document.createElement("span");
  tiffText.textContent = name;

  tiffEntry.onclick = () => {
    selectTiff(layer, tiffEntry, tiffText.textContent); // Select the layer that was clicked
  }
  selectTiff(layer, tiffEntry, tiffText.textContent); // Select the most recently uploaded tiff layer

  // Visibility toggle button
  const eyeButton = document.createElement("button");
  eyeButton.classList.add("historyButton");
  eyeButton.classList.add("floatRight");
  eyeButton.innerHTML = '<i class="fas fa-eye"></i>';
  eyeButton.title = "Toggle visibility";
  let tiffVisible = true;
  eyeButton.onclick = (e) => {
    e.stopPropagation();
    if (tiffVisible) {
      map.removeLayer(layer);
      eyeButton.innerHTML = '<i class="fas fa-eye-slash"></i>';
      tiffVisible = false;
    } else {
      map.addLayer(layer);
      eyeButton.innerHTML = '<i class="fas fa-eye"></i>';
      tiffVisible = true;
    }
  };

  // Add Rename button for TIFF
  const renameButton = document.createElement("button");
  renameButton.classList.add("historyButton");
  renameButton.innerHTML = '<i class="fa-solid fa-keyboard"></i>';
  renameButton.title = "Rename";
  renameButton.onclick = (e) => {
    e.stopPropagation();
    const newName = prompt("Enter new name for the TIFF:", tiffText.textContent);
    if (newName && newName.trim() !== "") {
      tiffText.textContent = newName.trim();
    }
  };

  tiffEntry.appendChild(tiffText);
  tiffEntry.appendChild(eyeButton);
  tiffEntry.appendChild(renameButton);
  document.getElementById(divContainer).appendChild(tiffEntry);
}

let rectangleCount = 1; // Counter for the number of rectangles drawn
let polygonCount = 1; // Counter for the number of polygons drawn
let circleCount = 1; // Counter for the number of circles drawn
let customCount = 1; // Counter for the number of uploaded shapes
export function addShapeToHistory(layer, name, divContainer) {
  const shapeEntry = document.createElement("div");
  shapeEntry.classList.add("historyDivItem");
  shapeEntry.title = "Click to select this shape";

  const shapeName = document.createElement("span");
  if (name == "Rectangle") {
    shapeName.textContent = name + rectangleCount++;
  }
  else if (name == "Polygon") {
    shapeName.textContent = name + polygonCount++;
  }
  else if (name == "Circle") {
    shapeName.textContent = name + circleCount++;
  }
  else {
    shapeName.textContent = name + customCount++;
  }

  shapeEntry.onclick = () => { // Function must appear after shapeName
    selectShape(layer, shapeEntry, shapeName.textContent); // Select the shape that was clicked
  };
  selectShape(layer, shapeEntry, shapeName.textContent); // Select the most recently drawn shape

  // Visibility toggle button
  const eyeButton = document.createElement("button");
  eyeButton.classList.add("historyButton");
  eyeButton.classList.add("floatRight");
  eyeButton.innerHTML = '<i class="fas fa-eye"></i>';
  eyeButton.title = "Toggle visibility";
  let shapeVisible = true;
  eyeButton.onclick = (e) => {
    e.stopPropagation();
    if (shapeVisible) {
      map.removeLayer(layer);
      eyeButton.innerHTML = '<i class="fas fa-eye-slash"></i>';
      shapeVisible = false;
    } else {
      map.addLayer(layer);
      eyeButton.innerHTML = '<i class="fas fa-eye"></i>';
      shapeVisible = true;
    }
  };

  const demButton = document.createElement("button");
  demButton.classList.add("historyButton");
  demButton.innerHTML = '<i class="fas fa-hammer"></i>';
  demButton.title = "Build 3D Model";
  demButton.onclick = (e) => {
    e.stopPropagation();
    selectShape(layer, shapeEntry); // Select the shape that was clicked
    generateDEM();
  };

  // Rename button
  const renameButton = document.createElement("button");
  renameButton.classList.add("historyButton");
  renameButton.innerHTML = '<i class="fa-solid fa-keyboard"></i>';
  renameButton.title = "Rename";
  renameButton.onclick = (e) => {
    e.stopPropagation();
    const newName = prompt("Enter new name for the shape:", shapeName.textContent);
    if (newName && newName.trim() !== "") {
      shapeName.textContent = newName.trim();
    }
  };

  const removeButton = document.createElement("button");
  removeButton.classList.add("historyButton");
  removeButton.innerHTML = '<i class="fas fa-trash-can"></i>';
  removeButton.title = "Delete";
  removeButton.onclick = () => {
    layer.remove(); // Remove the shape from the map
    shapeEntry.remove(); // Remove the entry from the history
  };

  shapeEntry.appendChild(shapeName);
  shapeEntry.appendChild(eyeButton); // Add the eye button to the shape entry
  shapeEntry.appendChild(demButton);
  shapeEntry.appendChild(renameButton);
  shapeEntry.appendChild(removeButton);
  document.getElementById(divContainer).appendChild(shapeEntry);
}

function selectTiff(layer, tiffEntry, tiffName) {
  switchToTab("mapView");
  map.fitBounds(layer.getBounds());

  setSelectedGeotiff(layer); // Keep track of the selected geotiff
  let prevTiffEntry = getPrevTiffEntry();
  if (prevTiffEntry) {
    prevTiffEntry.classList.remove('historyDivItemClicked');
  }
  setPrevTiffEntry(tiffEntry);
  tiffEntry.classList.toggle("historyDivItemClicked");

  // Update accordion header with the TIFF's name
  if (tiffName) {
    document.getElementById('step1').innerHTML = `Step 1: GeoTIFF - ${tiffName}`;
  }
}

function selectShape(layer, shapeEntry, shapeName) {
  switchToTab("mapView");
  map.fitBounds(layer.getBounds());

  setSelectedShape(layer); // Keep track of the selected shape
  let prevShapeEntry = getPrevShapeEntry();
  if (prevShapeEntry) {
    prevShapeEntry.classList.remove('historyDivItemClicked');
  }
  setPrevShapeEntry(shapeEntry);
  shapeEntry.classList.toggle("historyDivItemClicked");

  // Update accordion header with the shape's name
  if (shapeName) {
    document.getElementById('step2').innerHTML = `Step 2: Crop - ${shapeName}`;
  }
}
