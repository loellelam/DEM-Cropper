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
  tiffEntry.onclick = () => {
    selectTiff(layer, tiffEntry); // Select the layer that was clicked
  }
  selectTiff(layer, tiffEntry); // Select the most recently uploaded tiff layer

  const tiffText = document.createElement("span");
  tiffText.textContent = name;

  tiffEntry.appendChild(tiffText);
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
  shapeEntry.onclick = () => {
    selectShape(layer, shapeEntry); // Select the shape that was clicked
  };

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

  const demButton = document.createElement("button");
  demButton.classList.add("historyButton");
  demButton.classList.add("floatRight");
  demButton.innerHTML = '<i class="fas fa-hammer"></i>';
  demButton.title = "Build 3D Model";
  demButton.onclick = (e) => {
    e.stopPropagation();
    selectShape(layer, shapeEntry); // Select the shape that was clicked
    generateDEM();
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
  shapeEntry.appendChild(demButton);
  shapeEntry.appendChild(removeButton);
  document.getElementById(divContainer).appendChild(shapeEntry);
}

function selectTiff(layer, tiffEntry) {
  switchToTab("mapView");
  map.fitBounds(layer.getBounds());

  setSelectedGeotiff(layer); // Keep track of the selected geotiff
  let prevTiffEntry = getPrevTiffEntry();
  if (prevTiffEntry) {
    prevTiffEntry.classList.remove('historyDivItemClicked');
  }
  setPrevTiffEntry(tiffEntry);
  tiffEntry.classList.toggle("historyDivItemClicked");
}

function selectShape(layer, shapeEntry) {
  switchToTab("mapView");
  map.fitBounds(layer.getBounds());

  setSelectedShape(layer); // Keep track of the selected shape
  let prevShapeEntry = getPrevShapeEntry();
  if (prevShapeEntry) {
    prevShapeEntry.classList.remove('historyDivItemClicked');
  }
  setPrevShapeEntry(shapeEntry);
  shapeEntry.classList.toggle("historyDivItemClicked");
}
