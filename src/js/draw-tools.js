/* 
* This file provides functionality for drawing rectangles, polygons, and circles. 
*/

import { map, shapesLayerGroup } from "./map.js";
import { promptDEMGeneration } from "./popup.js";
import { addShapeToHistory } from "./history.js";

export function initDrawingTools() {
  let activeTool = null;
  let activeShape = null;
  let firstMarker = null;  // Store the first marker for polygon
  let initialLatLng = null; // Store the initial position when the rectangle drawing starts

  // Sidebar button onclick handlers
  document.getElementById("rectangleTool").addEventListener("click", function () {
    toggleTool("rectangleTool");
  });
  document.getElementById("polygonTool").addEventListener("click", function () {
    toggleTool("polygonTool")
  });
  document.getElementById("circleTool").addEventListener("click", function () {
    toggleTool("circleTool");
  });

  // Toggle tool selection
  function toggleTool(tool) {
    if (activeTool == tool) {
      // If the same tool is clicked again, deselect it
      deactivateTool();
    } else {
      activateTool(tool);
    }
  }

  // Activate a tool
  function activateTool(tool) {
    deactivateTool(); // Ensure no other tool is active

    activeTool = tool;
    document.getElementById(tool).classList.add("selected");
    document.getElementById("map").classList.add("crosshair-cursor"); // Apply crosshair cursor to map

    if (tool === "rectangleTool") {
      map.once("click", drawRectangle);
    } else if (tool === "polygonTool") {
      map.on("click", drawPolygon);
    } else if (tool === "circleTool") {
      map.once("click", drawCircle);
    }
  }

  // Deactivate any active tool
  function deactivateTool() {
    if (!activeTool) return;

    document.getElementById(activeTool).classList.remove("selected");
    document.getElementById("map").classList.remove("crosshair-cursor"); // Remove crosshair mode
    map.off("click"); // Remove click event
    activeTool = null;
  }

  // Drawing a rectangle
  function drawRectangle(e) {
    e.originalEvent.stopPropagation(); // Prevent the click from triggering popup

    initialLatLng = e.latlng;

    const bounds = [initialLatLng, initialLatLng]; // Initialize bounds with the click position
    activeShape = L.rectangle(bounds, { color: "green", weight: 2 }).addTo(map);

    map.on("mousemove", updateRectangleBounds);
    map.once("click", finishDrawingRectangle); // Finish drawing on the next click
  }

  // Updating rectangle bounds as mouse moves
  function updateRectangleBounds(e) {
    // Get the new corner latlng by comparing with the initial position
    const swLatLng = L.latLng(
      Math.min(initialLatLng.lat, e.latlng.lat), // Southwest latitude (lower value)
      Math.min(initialLatLng.lng, e.latlng.lng)  // Southwest longitude (lower value)
    );

    const neLatLng = L.latLng(
      Math.max(initialLatLng.lat, e.latlng.lat), // Northeast latitude (higher value)
      Math.max(initialLatLng.lng, e.latlng.lng)  // Northeast longitude (higher value)
    );
    
    // Update the bounds of the rectangle to the new corners
    activeShape.setBounds([swLatLng, neLatLng]);
  }

  // Finish drawing the rectangle
  function finishDrawingRectangle() {
    map.off("mousemove", updateRectangleBounds); // Remove the mousemove listener
    map.off("click", finishDrawingRectangle); // Remove the click listener for finishing the rectangle
    
    shapesLayerGroup.addLayer(activeShape);
    promptDEMGeneration(activeShape);
    activeShape.setStyle({ color: "blue" });
    addShapeToHistory(activeShape, "Rectangle", "drawHistory");
    activeShape = null;
    
    document.getElementById("rectangleTool").classList.remove("selected");
    deactivateTool();
  }

  // Drawing a polygon
  function drawPolygon(e) {
    // e.originalEvent.stopPropagation(); // Prevent the click from triggering popup

    if (!activeShape) {
      // Initialize the polygon with the first point
      activeShape = L.polygon([e.latlng], { color: "green" }).addTo(map);

      // Add a marker at the first point
      firstMarker = L.circleMarker(e.latlng, {
        color: "red",   // Red color for visibility
        radius: 8       // Size of the circle
      }).addTo(map);

      firstMarker.bindTooltip("Click this point to close the shape", {
        permanent: false, // The tooltip will only show on hover
        opacity: 0.8      // Adjust the tooltip opacity
      }).openTooltip();

      // Attach the click event to finish drawing when the marker is clicked
      firstMarker.on("click", finishDrawingPolygon);
    } else {
      activeShape.addLatLng(e.latlng); // Add additional points as clicked
    }
  }

  // Finish drawing the polygon
  function finishDrawingPolygon() {    
    map.off("click", drawPolygon);
    firstMarker.off("click", finishDrawingPolygon);
    firstMarker.remove();

    shapesLayerGroup.addLayer(activeShape);
    promptDEMGeneration(activeShape);
    activeShape.setStyle({ color: "blue" });
    addShapeToHistory(activeShape, "Polygon", "drawHistory");
    activeShape = null;
    firstMarker = null;

    document.getElementById("polygonTool").classList.remove("selected");
    deactivateTool();
  }

  // Drawing a circle
  function drawCircle(e) {
    e.originalEvent.stopPropagation(); // Prevent the click from triggering popup

    initialLatLng = e.latlng;

    // Create a circle with an initial radius of 0
    activeShape = L.circle(initialLatLng, {
      radius: 0, // Initial radius
      color: "green",
      weight: 2,
    }).addTo(map);

    map.on("mousemove", updateCircleRadius);
    map.once("click", finishDrawingCircle); // Finish drawing on the next click
  }

  // Update the circle's radius as the mouse moves
  function updateCircleRadius(e) {
    const distance = map.distance(initialLatLng, e.latlng); // Calculate distance between initial point and current mouse position
    activeShape.setRadius(distance); // Update the circle's radius
  }

  // Finish drawing the circle
  function finishDrawingCircle() {
    map.off("mousemove", updateCircleRadius); // Remove the mousemove listener
    map.off("click", finishDrawingCircle); // Remove the click listener for finishing the circle

    shapesLayerGroup.addLayer(activeShape);
    promptDEMGeneration(activeShape);
    activeShape.setStyle({ color: "blue" });
    addShapeToHistory(activeShape, "Circle", "drawHistory");
    activeShape = null;

    document.getElementById("circleTool").classList.remove("selected");
    deactivateTool();
  }
}
