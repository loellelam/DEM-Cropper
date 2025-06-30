/*
* This file handles the uploading and display of TIFF and GeoJSON files on the map. 
*/

import { map, tiffsLayerGroup } from './map.js';
import { promptDEMGeneration } from './popup.js';
import { addTiffToHistory, addShapeToHistory } from './history.js';

export function fileHandler() {
  const geojsonHistoryContainer = document.getElementById("geojsonHistory");

  document.getElementById("tiffUpload").addEventListener("change", function (event) {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = function (e) {
        const arrayBuffer = e.target.result;

        parseGeoraster(arrayBuffer).then((georaster) => {
          // Get statistical data of geotiff
          const stats = geoblaze.stats(georaster);
          const minElevation = 0;
          const maxElevation = stats[0].max;

          // Create a new GeoRasterLayer
          const tiffLayer = new GeoRasterLayer({
            georaster: georaster,
            opacity: 0.7,
            pixelValuesToColorFn: function (value) {
              if (value < 0) {
                return "transparent";
              } else {
                // Map the elevation value to grayscale
                let grayscaleValue = (value - minElevation) / (maxElevation - minElevation) * 255;
                return `rgb(${grayscaleValue}, ${grayscaleValue}, ${grayscaleValue})`;
              }
            },
            resolution: 128, // Adjust for performance
          });

          tiffLayer.addTo(map);
          tiffsLayerGroup.addLayer(tiffLayer);
          map.fitBounds(tiffLayer.getBounds()); // Fit map to the new TIFF layer

          addTiffToHistory(tiffLayer, file.name, "geotiffHistory"); // Add to upload history
        });
      };

      reader.readAsArrayBuffer(file);
    }
  });

  // Reference to the input element
  document.getElementById("geojsonUpload").addEventListener("change", function (event) {
    const file = event.target.files[0]; // Get the file
    
    if (file) {
      const reader = new FileReader();

      // Runs when the file is read
      reader.onload = function (e) {
        try {
          const geojsonData = JSON.parse(e.target.result); // Contains the text content of the file
          
          // Add the GeoJSON to the map
          const geojsonLayer = L.geoJSON(geojsonData, {
            onEachFeature: function (feature, layer) {
              promptDEMGeneration(layer); // Attach popup to the layer
            }
          }).addTo(map);

          // Fit the map to the new layer
          map.fitBounds(geojsonLayer.getBounds());

          // Add to upload history
          const geojsonEntry = document.createElement("div");
          geojsonEntry.classList.add("geojsonHistoryDiv");

          const fileNameHeader = document.createElement("div");
          fileNameHeader.textContent = file.name + " ▼";
          fileNameHeader.title = "Click to expand";
          fileNameHeader.cursor = "pointer";
          fileNameHeader.onclick = () => {
            subMenu.style.display = subMenu.style.display === "none" ? "block" : "none";
          };

          const subMenu = document.createElement("div");
          subMenu.id = file.name + "Submenu";
          subMenu.classList.add("geojsonSubmenu");
          subMenu.style.display = "none";

          geojsonEntry.appendChild(fileNameHeader);
          geojsonEntry.appendChild(subMenu);
          geojsonHistoryContainer.appendChild(geojsonEntry);

          // Loop through each feature in the GeoJSON
          geojsonLayer.eachLayer(function (layer) {
            addShapeToHistory(layer, file.name, subMenu.id);
          });
        } catch (error) {
          alert("Invalid GeoJSON file");
          console.error("GeoJSON Error:", error);
        }
      };

      reader.readAsText(file); // Reads the file and triggers onload event
    }
  });

  // doesnt work
  // Reference to the KML input element
  // document.getElementById("kmlUpload").addEventListener("change", function (event) {
  //   const file = event.target.files[0]; // Get the file

  //   if (file) {
  //     const reader = new FileReader();

  //     // Runs when the file is read
  //     reader.onload = function (e) {
  //       try {
  //         const kmlData = e.target.result; // Contains the text content of the file
  //         console.log("KML Data Loaded:", kmlData);

  //         // Add the KML to the map using leaflet-kml
  //         const kmlLayer = new L.KML(new DOMParser().parseFromString(kmlData, "text/xml"));
  //         map.addLayer(kmlLayer);
  //         console.log("KML Layer Created:", kmlLayer);

  //         // Adjust map to show the kml
  //         const bounds = kmlLayer.getBounds();
  //         map.fitBounds(bounds);

  //         // Fit the map to the new layer once it's loaded
  //         kmlLayer.on("add", function () {
  //           console.log("KML Layer Loaded:", kmlLayer);

  //           map.fitBounds(kmlLayer.getBounds());
  //         });

  //       } catch (error) {
  //         alert("Invalid KML file");
  //         console.error("KML Error:", error);
  //       }
  //     };

  //     reader.readAsText(file); // Reads the file and triggers onload event
  //   }
  // });
}
