/*
* This module is used to get the geotiff and shape at the clicked location.
*/
import { map, tiffsLayerGroup, shapesLayerGroup } from "./map.js";

let selectedGeotiff = null;
// const selectedShapes = [];

map.on('popupopen', function (e) {
  selectedGeotiff = null; // Reset selected geotiff
  
  const clickedLatLng = e.popup.getLatLng();

  // Get geotiffs at clicked location
  tiffsLayerGroup.eachLayer(function (layer) {
    const bounds = layer.getBounds();
    if (clickedLatLng.lat >= bounds.getSouth() &&
        clickedLatLng.lat <= bounds.getNorth() &&
        clickedLatLng.lng >= bounds.getWest() &&
        clickedLatLng.lng <= bounds.getEast())
    {
      selectedGeotiff = layer;
    }
  });
  console.log(selectedGeotiff)

  // Get shapes at clicked location
  // Logic is broken: bounds.contains does not work
  // shapesLayerGroup.eachLayer(function (layer) {
  //   const bounds = layer.getBounds();
  //   if (bounds.contains(clickedLatLng)) {
  //     selectedShapes.push(layer)
  //   }
  // });
});

export function getGeotiffAtLocation() {
  if (selectedGeotiff) {
    return selectedGeotiff;
  }
  else {
    console.log("No geotiffs found at clicked location");
    return null;
  }
}

// export function getShapeAtLocation() {
//   if (selectedShapes.length === 0) {
//     console.log("No shapes found at clicked location");
//     return null;
//   }
//   console.log("selectedShapes", selectedShapes)
//   return selectedShapes[0];
// }