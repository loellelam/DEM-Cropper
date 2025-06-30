/*
* Save the user's selected geotiff and shape
*/

let selectedGeotiff = null;
let selectedShape = null;
let prevTiffEntry = null;
let prevShapeEntry = null; // Upload history div item for the selected shape

export function getSelectedGeotiff() {
  return selectedGeotiff;
}

export function setSelectedGeotiff(tiff) {
 selectedGeotiff = tiff;
}

export function getSelectedShape() {
  return selectedShape;
}

export function setSelectedShape(shape) {
  selectedShape = shape;
}

export function getPrevTiffEntry() {
  return prevTiffEntry;
}

export function setPrevTiffEntry(entry) {
  prevTiffEntry = entry;
}

export function getPrevShapeEntry() {
  return prevShapeEntry;
}

export function setPrevShapeEntry(entry) {
  prevShapeEntry = entry;
}
