/*
* This file sets up a Leaflet map with a base layer for displaying geographic data.
*/

// Map initialization
export const map = L.map("map").setView([21, 202], 7);

// Add OpenStreetMap (osm) base layer
const osm = L.tileLayer(
  "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }
);
osm.addTo(map);

export const tiffsLayerGroup = new L.LayerGroup();
export const shapesLayerGroup = new L.LayerGroup();

// Allow user to toggle certain layer groups
// let userLayers = {
//   "GeoTIFFs": tiffsLayerGroup,
//   "Shapes": shapesLayerGroup
// };
// L.control.layers({}, userLayers).addTo(map);
