/*
* This file visualizes DEMs as 3D meshes.
*
* Organized into 6 sections:
*   1. SCENE          - Three.js scene/camera/renderer lifecycle
*   2. GEO MATH       - pure geospatial math
*   3. PRISM GEOMETRY - truncated triangular prism geometry creation
*   4. MESH BUILDER   - turns elevation + mask + geoContext into THREE meshes
*   5. ORCHESTRATION  - generateDEM() entry point, reads DOM, wires it together
*   6. SIMPLE PARTITIONING - basic grid-based partitioning for DEMs
*/

import { map } from "./map.js"; // for testing, for clamped shape
let clampedShape = null; // for testing, Clamped shape for visual feedback

import { switchToTab } from './tab-switching.js';
import { showOverlay, hideOverlay } from './overlay.js';
import { getSelectedGeotiff, getSelectedShape } from './selection.js';
import { getCurrentVerticalExaggeration } from './toggle-vertical-exaggeration.js';
import { createBinaryMask } from './binary-mask.js';
import { sendMeshToBackend } from './main.js';

import * as THREE from 'three';
import * as BufferGeometryUtils from 'three/addons/utils/BufferGeometryUtils.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { ConvexGeometry } from 'three/addons/geometries/ConvexGeometry.js';

// Debug logging: flip to true to enable console output
const DEBUG = false;
function dlog(...args) { if (DEBUG) console.log(...args); }

// NoData sentinel threshold for elevation values
const NODATA_THRESHOLD = -2e30;

/* ============================================================
 * SECTION 1: SCENE
 * Three.js scene/camera/renderer setup and lifecycle management.
 * Owns scene-level mutable state (singletonMesh, partitionMeshes).
 * No geospatial math, no DOM form-reading beyond the #dem container.
 * ============================================================ */

function setupScene() {
  const scene = new THREE.Scene();

  const gridSize = 1000;
  const gridDivisions = 100;
  const gridHelper = new THREE.GridHelper(gridSize, gridDivisions, 0x444444, 0x444444);
  gridHelper.position.y = -2;
  scene.add(gridHelper);

  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.y = 70;
  camera.position.z = 70;

  const renderer = new THREE.WebGLRenderer();

  // Wait for the container to exist before sizing and appending
  function initRenderer() {
    const container = document.getElementById("dem");
    if (!container || container.clientWidth === 0 || container.clientHeight === 0) {
      setTimeout(initRenderer, 50);
      return;
    }
    renderer.setSize(container.clientWidth, container.clientHeight);
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    container.appendChild(renderer.domElement);
    renderer.setAnimationLoop(() => animate(scene, camera, renderer));
  }
  initRenderer();

  function animate(scene, camera, renderer) {
    renderer.render(scene, camera);
  }

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(10, 10, 10);
  scene.add(directionalLight);

  const orbitControls = new OrbitControls(camera, renderer.domElement);
  orbitControls.listenToKeyEvents(window);

  // Responsive resize
  window.addEventListener('resize', () => {
    const container = document.getElementById("dem");
    renderer.setSize(container.clientWidth, container.clientHeight);
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
  });

  return { scene, camera, renderer };
}

export const { scene, camera, renderer } = setupScene();

// Three.js meshes
// Exported so other modules can inspect mesh state, but all writes happen only within this section's functions 
export let singletonMesh = null;
export let partitionMeshes = [];

function clearMeshes() {
  if (singletonMesh) scene.remove(singletonMesh);

  // Remove any previously created partition meshes from the scene and free resources
  if (partitionMeshes && partitionMeshes.length) {
    for (const m of partitionMeshes) {
      try {
        if (m) {
          scene.remove(m);
          if (m.geometry && typeof m.geometry.dispose === 'function') m.geometry.dispose();
          if (m.material) {
            if (Array.isArray(m.material)) {
              m.material.forEach(mat => { if (mat && typeof mat.dispose === 'function') mat.dispose(); });
            } else if (typeof m.material.dispose === 'function') {
              m.material.dispose();
            }
          }
        }
      } catch (err) {
        console.warn("Error disposing previous partition mesh:", err);
      }
    }
  }
  // reset storage
  partitionMeshes = [];
  singletonMesh = null;
}

function centerSingletonMesh() {
  const boundingBox = new THREE.Box3().setFromObject(singletonMesh);
  const size = new THREE.Vector3();
  boundingBox.getSize(size);

  singletonMesh.position.x -= boundingBox.min.x + size.x / 2;
  singletonMesh.position.y -= boundingBox.min.y + size.y / 2;
  singletonMesh.position.z -= boundingBox.min.z + size.z / 2;
  singletonMesh.updateMatrix();
}

function centerPartitionedMeshes() {
  const overallBox = new THREE.Box3();

  partitionMeshes.forEach((mesh) => {
    const meshBox = new THREE.Box3().setFromObject(mesh);
    overallBox.union(meshBox);
  });

  const size = new THREE.Vector3();
  overallBox.getSize(size);
  const centerOffset = new THREE.Vector3(
    overallBox.min.x + size.x / 2,
    overallBox.min.y + size.y / 2,
    overallBox.min.z + size.z / 2
  );

  partitionMeshes.forEach((mesh) => {
    mesh.position.sub(centerOffset);
    mesh.updateMatrix();
  });
}


/* ============================================================
 * SECTION 2: GEO MATH
 * Pure geospatial math.
 * Every function takes its inputs as parameters and returns a value.
 * ============================================================ */

const EARTH_CIRCUMFERENCE_M = 40075017; // meters, at the equator
const METERS_PER_DEGREE_LAT = 111320;   // approx, constant across latitudes

// Meters per degrees longitude varies with latitude
function metersPerDegreeLonAt(latitudeDeg) {
  return Math.abs(EARTH_CIRCUMFERENCE_M * Math.cos(latitudeDeg * Math.PI / 180) / 360);
}

// Build a mask that is the intersection of selected shape and valid elevations
function buildLandMask(georaster, shapeMask) {
  const elevation = georaster.values[0];
  const landMask = [];
  for (let i = 0; i < elevation.length; i++) {
    for (let j = 0; j < elevation[i].length; j++) {
      const elev = elevation[i][j];
      const idx = i * elevation[i].length + j;
      const validElev = Number.isFinite(elev) && elev > NODATA_THRESHOLD;
      if (shapeMask[idx] === 1 && validElev) {
        landMask.push(1);
      }
      else {
        landMask.push(0);
      }
    }
  }
  return landMask;
}

// Unflatten a 1D mask array into a 2D array based on the georaster dimensions
function unflatten(mask, georaster){
  const mask2D = [];
  const width  = georaster.width;
  const height = georaster.height;
  for (let i = 0; i < height; i++) {
    const row = [];
    for (let j = 0; j < width; j++) {
      const index = i * width + j;
      row.push(mask[index]);
    }
    mask2D.push(row);
  }
  return mask2D;
}
// Convert pixel coordinates to lat/lng
function pixelToLatLng(georaster, x, y) {
  const minLng = georaster.xmin, maxLat = georaster.ymax;
  const maxLng = georaster.xmax, minLat = georaster.ymin;

  const width  = georaster.width;
  const height = georaster.height;
  const lng = ((x + 0.5) / width)  * (maxLng - minLng) + minLng;
  const lat = maxLat - ((y + 0.5) / height) * (maxLat - minLat);
  return { lat, lng };
}
// Get the bounding box of the mask
function getMaskBounds(mask,georaster) {
  let minRow = Infinity, maxRow = -Infinity;
  let minCol = Infinity, maxCol = -Infinity;

  const mask2D = unflatten(mask, georaster);

  for (let i=0; i < mask2D.length; i++){
    for (let j=0; j < mask2D[0].length; j++){
      if (mask2D[i][j] === 1){
        if (i < minRow) minRow = i;
        if (i > maxRow) maxRow = i;
        if (j < minCol) minCol = j;
        if (j > maxCol) maxCol = j;
      }
    }
  }
  
  if (minRow === Infinity) return null; // no valid pixels found

  return {
    topLeft:     { row: minRow, col: minCol },
    bottomRight: { row: maxRow, col: maxCol }
  };
}

/**
 * Compute the extent (in meters) of the selected shape, clamped to the
 * geotiff's own bounding box.
 *
 * Returns { shapeWidthInMeters, shapeHeightInMeters, metersPerDegreeLon }
 */
function getShapeExtentInMeters(georaster, mask) {
  const centerLat = (georaster.ymin + georaster.ymax) / 2;
  const metersPerDegreeLon = metersPerDegreeLonAt(centerLat);

  const bounds = getMaskBounds(mask, georaster);
  const { lat: minLng, lng: minLat } = pixelToLatLng(georaster, bounds.topLeft.col, bounds.topLeft.row);
  const { lat: maxLng, lng: maxLat } = pixelToLatLng(georaster, bounds.bottomRight.col, bounds.bottomRight.row);

  // the max and min actually depend on the location in the world...
  const shapeWidthDeg = Math.max(maxLat,minLat) - Math.min(maxLat,minLat);
  const shapeHeightDeg = Math.max(maxLng,minLng) - Math.min(maxLng,minLng);

  // For testing: Visually display constrained area
  if (DEBUG) {
    const clampedBounds = L.latLngBounds(
      [minLng, minLat],
      [maxLng, maxLat]
    );
    if (clampedShape) {
        map.removeLayer(clampedShape);
    }
    clampedShape = L.rectangle(clampedBounds, {
        color: "red",
        weight: 2,
        fill: false
    }).addTo(map);
  }

  const shapeWidthInMeters = shapeWidthDeg * metersPerDegreeLon;
  const shapeHeightInMeters = shapeHeightDeg * METERS_PER_DEGREE_LAT;

  return { shapeWidthInMeters, shapeHeightInMeters, metersPerDegreeLon };
}

/**
 * Build the full geospatial scaling context needed to turn pixel-space
 * elevation data into a physically-dimensioned mesh.
 *
 * Returns a single geoContext object which can be passed to any function
 * that needs scale/physical-dimension info.
 * geospatialCorrection - scale factor used to correct geospatial distortion
 * metersPerWidthPixel - physical width of each pixel in meters
 * metersPerHeightPixel - physical height of each pixel in meters
 * shapeWidthInMeters - width of the selected shape in meters
 * shapeHeightInMeters - height of the selected shape in meters
 * physicalWidth - user-specified physical width (mm), or calculated based on aspect ratio
 * physicalHeight - user-specified physical height (mm), or calculated based on aspect ratio
 */
function buildGeoContext(georaster, physicalWidth, physicalHeight, mask) {
  const { shapeWidthInMeters, shapeHeightInMeters, metersPerDegreeLon } = getShapeExtentInMeters(georaster, mask);

  const aspectRatio = shapeHeightInMeters / shapeWidthInMeters;
  let geospatialCorrection;
  if (aspectRatio > 1) {
    // If the aspect ratio is greater than 1, the shape is taller than it is wide
    physicalWidth = parseFloat((physicalHeight / aspectRatio).toFixed(2));
    geospatialCorrection = physicalHeight / shapeHeightInMeters;
  }
  else {
    physicalHeight = parseFloat((physicalWidth * aspectRatio).toFixed(2));
    geospatialCorrection = physicalWidth / shapeWidthInMeters;
  }

  const metersPerWidthPixel = georaster.pixelWidth * metersPerDegreeLon;
  const metersPerHeightPixel = georaster.pixelHeight * METERS_PER_DEGREE_LAT;

  return {
    geospatialCorrection,
    metersPerWidthPixel,
    metersPerHeightPixel,
    shapeWidthInMeters,
    shapeHeightInMeters,
    physicalWidth,
    physicalHeight,
  };
}

// Helper to get DEM aspect ratio for model dimension sync
// model-dimension-sync.js updates desired physical width when user enters height and vice versa
export function getAspectRatio() {
  const selectedGeotiff = getSelectedGeotiff();
  if (!selectedGeotiff) return 1;
  const georaster = selectedGeotiff.georasters[0];
  const selectedShape = getSelectedShape();
  if (!selectedShape) return 1;
  const shapeMask = createBinaryMask(georaster, selectedShape);
  const landMask = buildLandMask(georaster, shapeMask);

  const { shapeWidthInMeters, shapeHeightInMeters } = getShapeExtentInMeters(georaster, landMask);
  const aspectRatio = shapeHeightInMeters / shapeWidthInMeters;
  return aspectRatio;
}


/* ============================================================
 * SECTION 3: PRISM GEOMETRY
 * Pure truncated triangular prism (mesh cell) generation.
 * Takes raw elevation/mask arrays + pixel coordinates, returns THREE
 * geometry objects (or null).
 * ============================================================ */

// The 4 corners of a single DEM grid cell, in (dx, dy) offsets from (x, y).
const CELL_CORNERS = [
  { dx: 0, dy: 0 }, // v1
  { dx: 1, dy: 0 }, // v2
  { dx: 0, dy: 1 }, // v3
  { dx: 1, dy: 1 }, // v4
];

/**
 * Get the value at (x, y) from a flattened row-major array, with the
 * Y axis flipped (DEM row 0 = top, mesh Y=0 = bottom).
 * Returns NaN (not null) when out of bounds, so all downstream validity
 * checks can safely use Number.isFinite() instead of `>= 0`, which in
 * JS treats null as 0 and can silently pass invalid data through.
 */
function getXY(arr, x, y, xCount, yCount) {
  if (x >= xCount || y >= yCount || x < 0 || y < 0) return NaN;
  const flippedY = yCount - 1 - y; // flip y-axis
  const v = arr[flippedY * xCount + x];

  if (v === null || v === undefined) {
    return NaN;
  }
  return v;
}

/**
 * Build one prism "column" geometry for a single DEM grid cell, using only
 * the corners that are valid (mask === 1 AND elevation is a finite,
 * non-negative number).
 *
 * Returns a ConvexGeometry, or null if fewer than 3 corners are valid
 * (not enough points to form a solid).
 */
function buildPrismGeometry(x, y, xCount, yCount, elevationArr, maskArr, xStep, yStep, zBase) {
  const points = [];

  for (const corner of CELL_CORNERS) {
    const cx = x + corner.dx;
    const cy = y + corner.dy;
    const maskVal = getXY(maskArr, cx, cy, xCount, yCount);
    const elev = getXY(elevationArr, cx, cy, xCount, yCount);

    const isValid = maskVal === 1 && Number.isFinite(elev) && elev >= 0;
    if (!isValid) continue;

    const px = cx * xStep;
    const py = cy * yStep;
    points.push(new THREE.Vector3(px, py, zBase)); // base point
    points.push(new THREE.Vector3(px, py, elev)); // elevation point
  }

  // Need at least 3 corners (6 points) to form a meaningful solid.
  if (points.length < 6) return null;

  return new ConvexGeometry(points);
}


/* ============================================================
 * SECTION 4: MESH BUILDER
 * Turns elevation + mask data (+ a geoContext from Section 2) into
 * THREE.Mesh objects and adds them to the scene (Section 1's `scene`).
 * ============================================================ */

/**
 * Build a single mesh from elevation + binary mask data.
 * If normalizeToPhysical is true, scales/translates the merged geometry
 * to match geoContext.physicalWidth/physicalHeight (used for the
 * non-partitioned, single-piece case).
 *
 * Sets the module-level `singletonMesh` (Section 1 state) and adds it
 * to the scene. Returns the mesh (or null if no valid geometry).
 */
function createMesh(base, demWidth, demHeight, elevationArr, maskArr, geoContext, normalizeToPhysical) {
  if (singletonMesh) scene.remove(singletonMesh);

  const zBase = -Math.abs(parseFloat(base));
  // Number of pixels
  const xCount = parseInt(demWidth);
  const yCount = parseInt(demHeight);

  // Physical size (in meters) of each pixel in the mesh
  const xStep = geoContext.metersPerWidthPixel;
  const yStep = geoContext.metersPerHeightPixel;

  const geometriesArray = [];

  for (let x = 0; x < xCount; x++) {
    for (let y = 0; y < yCount; y++) {
      const geom = buildPrismGeometry(x, y, xCount, yCount, elevationArr, maskArr, xStep, yStep, zBase);
      if (geom) geometriesArray.push(geom);
    }
  }

  if (geometriesArray.length === 0) {
    singletonMesh = null;
    return null;
  }

  const mergedGeometry = BufferGeometryUtils.mergeGeometries(geometriesArray);
  const color = new THREE.Color().setHSL((0 * 0.618033988749895) % 1, 0.5, 0.5);
  const mergedMaterial = new THREE.MeshStandardMaterial({ color, side: THREE.DoubleSide });
  mergedMaterial.needsUpdate = true;

  // Only run this when creating singleton, not partitioned meshes
  // Scale to desired physical dimensions
  if (normalizeToPhysical) {
    mergedGeometry.computeBoundingBox();
    const bb = mergedGeometry.boundingBox;
    mergedGeometry.translate(-bb.min.x, -bb.min.y, 0); // Shift to origin

    // const scaleToPhysicalX = geoContext.physicalWidth / geoContext.shapeWidthInMeters;
    // const scaleToPhysicalY = geoContext.physicalHeight / geoContext.shapeHeightInMeters;
    // mergedGeometry.scale(scaleToPhysicalX, scaleToPhysicalY, 1);

    mergedGeometry.scale(geoContext.geospatialCorrection, geoContext.geospatialCorrection, 1);
  }

  const mergedMesh = new THREE.Mesh(mergedGeometry, mergedMaterial);
  mergedMesh.rotateX(3 * Math.PI / 2);
  singletonMesh = mergedMesh;

  scene.add(singletonMesh);
  dlog("Created singleton mesh:", singletonMesh);
  return singletonMesh;
}

/**
 * Build one binary mask per label in a label map, call createMesh() for
 * each, and collect the results into partitionMeshes (Section 1 state).
 *
 * label_map: 2D array [rows][cols]
 * elevationArr: flattened 1D elevation array (same ordering createMesh expects)
 */
function createMeshesFromLabelMap(label_map, elevationArr, demWidth, demHeight, geoContext, base) {
  dlog("Partitioning...");

  if (!label_map) {
    console.warn("No label map provided");
    return [];
  }

  // Flatten label map to row-major array (same ordering as elevationArr)
  const labelFlat = [];
  for (let i = 0; i < label_map.length; i++) {
    for (let j = 0; j < label_map[i].length; j++) {
      labelFlat.push(label_map[i][j]);
    }
  }

  const total = parseInt(demWidth) * parseInt(demHeight);
  if (labelFlat.length !== total) {
    console.warn("Label map size doesn't match demWidth*demHeight:", labelFlat.length, "vs", total);
  }

  // Collect unique non-negative labels
  const labelSet = new Set();
  for (let i = 0; i < Math.min(labelFlat.length, total); i++) {
    const v = labelFlat[i];
    if (typeof v === 'number' && v >= 0) labelSet.add(Math.trunc(v));
  }
  const labels = Array.from(labelSet).sort((a, b) => a - b);

  // For each label, build binary mask and call createMesh.
  // We rely on createMesh to produce singletonMesh; after each call we clone and keep a copy
  for (const labelId of labels) {
    const mask = new Array(total).fill(0);
    for (let i = 0; i < total && i < labelFlat.length; i++) {
      if (labelFlat[i] === labelId) mask[i] = 1;
    }

    // createMesh removes any existing singletonMesh and sets a new one
    createMesh(base, demWidth, demHeight, elevationArr, mask, geoContext, false);

    // if createMesh produced a singletonMesh, clone it and keep it under this label
    if (singletonMesh) {
      const copy = singletonMesh.clone(true);
      copy.material = singletonMesh.material.clone();
      copy.material.color = new THREE.Color().setHSL((labelId * 0.618033988749895) % 1, 0.5, 0.5);
      copy.name = `partition_${labelId}`;
      scene.add(copy);
      partitionMeshes.push(copy);
    }
  }

  // Normalize to desired physical dimensions
  // Compute collective bounding box across all partition meshes
  const collectiveBB = new THREE.Box3();
  for (const mesh of partitionMeshes) {
    mesh.geometry.computeBoundingBox();
    collectiveBB.union(mesh.geometry.boundingBox);
  }
  const offsetX = collectiveBB.min.x;
  const offsetY = collectiveBB.min.y;

  // Use geographic extent directly
  // const scaleToPhysicalX = geoContext.physicalWidth / geoContext.shapeWidthInMeters;
  // const scaleToPhysicalY = geoContext.physicalHeight / geoContext.shapeHeightInMeters;

  for (const mesh of partitionMeshes) {
    mesh.geometry.translate(-offsetX, -offsetY, 0);
    // mesh.geometry.scale(scaleToPhysicalX, scaleToPhysicalY, 1);
    mesh.geometry.scale(geoContext.geospatialCorrection, geoContext.geospatialCorrection, 1);
  }

  // The last singletonMesh produced by the loop is a leftover working copy
  // (we saved clones into partitionMeshes already) so remove it.
  if (singletonMesh) {
    scene.remove(singletonMesh);
    singletonMesh = null;
  }

  return partitionMeshes;
}


/* ============================================================
 * SECTION 5: ORCHESTRATION
 * generateDEM() — the entry point called by the UI. Reads DOM inputs,
 * builds the geoContext (Section 2), prepares elevation/mask data
 * (Section 3 helpers), and delegates mesh creation (Section 4) and
 * scene management (Section 1).
 * ============================================================ */

// Helper: Prepare elevation for partitioned mesh creation by applying
// binary mask and converting NoData values to NaN.
function applyMaskToElevation(elevation, mask) {
  const maskedElevation = [];
  for (let i = 0; i < elevation.length; i++) {
    if (mask[i] === 0 || elevation[i] < NODATA_THRESHOLD) {
      maskedElevation.push(NaN);
    } else if (mask[i] === 1) {
      maskedElevation.push(elevation[i]);
    } else {
      console.warn("Unexpected mask value at index", i, "mask:", mask[i], "elevation:", elevation[i]);
    }
  }
  return maskedElevation;
}

// Helper: Convert 1D elevation array into 2D array (for partitioning).
function convertElevationInto2DArray(myElevation, demWidth, demHeight) {
  const elevation2D = [];
  for (let i = 0; i < demHeight; i++) {
    const row = [];
    for (let j = 0; j < demWidth; j++) {
      const index = i * demWidth + j;
      row.push(myElevation[index]);
    }
    elevation2D.push(row);
  }
  return elevation2D;
}

// Main entry point
export async function generateDEM() {
  // Get selected geotiff and shape
  const selectedGeotiff = getSelectedGeotiff();
  const selectedShape = getSelectedShape();
  if (!selectedGeotiff) {
    window.alert("Please upload a geotiff in Step 1 first.");
    return;
  }
  else if (!selectedShape) {
    window.alert("Please select a shape in Step 2 first.");
    return;
  }

  // Read user input values
  const base = parseFloat(document.getElementById("baseThicknessInput").value); // mm
  const verticalExaggeration = parseFloat(getCurrentVerticalExaggeration());     // scale factor
  const bedWidth = parseFloat(document.getElementById("bedWidthInput").value);   // mm
  const bedHeight = parseFloat(document.getElementById("bedHeightInput").value); // mm
  const physicalWidth = parseFloat(document.getElementById("physicalWidthInput").value); // mm
  const physicalWidthInput = document.getElementById("physicalWidthInput"); // html input element
  const physicalHeight = parseFloat(document.getElementById("physicalHeightInput").value); // mm
  const physicalHeightInput = document.getElementById("physicalHeightInput"); // html input element
  const partitioningMode = document.querySelector('input[name="partitioning"]:checked').value; // "simple" or "complex"

  // Extract geotiff data
  const georaster = selectedGeotiff.georasters[0];
  const demWidth = georaster.width;
  const demHeight = georaster.height;

  // Mask must exist before and be used in geoContext calculations
  const shapeMask = createBinaryMask(georaster, selectedShape); // Mask the georaster with the selected shape
  const landMask = buildLandMask(georaster, shapeMask); // Build a mask that is the intersection of selected shape and valid elevations

  if (!landMask.includes(1)) {
    window.alert("Selected shape does not intersect with any valid elevation data.");
    return;
  }

  // Build geospatial scaling context (Section 2)
  const geoContext = buildGeoContext(georaster, physicalWidth, physicalHeight, landMask);
  physicalWidthInput.value = geoContext.physicalWidth;
  physicalHeightInput.value = geoContext.physicalHeight;

  // Flatten + scale elevation. Only Z (elevation) is scaled here;
  // X/Y scaling is handled inside mesh creation via geoContext.
  let myElevation = georaster.values[0];
  const flattenedElevation = [];
  for (let i = 0; i < myElevation.length; i++) {
    for (let j = 0; j < myElevation[i].length; j++) {
      flattenedElevation.push(myElevation[i][j] * geoContext.geospatialCorrection * verticalExaggeration);
    }
  }
  myElevation = flattenedElevation;

  clearMeshes();

  showOverlay("Generating...");
  switchToTab("demView"); // Switch to the 3D Model tab

  if (geoContext.physicalWidth <= bedWidth && geoContext.physicalHeight <= bedHeight) {
    // No partitioning needed, single piece fits the print bed
    createMesh(base, demWidth, demHeight, myElevation, landMask, geoContext, true);
    if (!singletonMesh) {
      window.alert("Unable to create 3D model.");
      showOverlay("Generate a mesh first");
      switchToTab("mapView");
      return;
    }
    centerSingletonMesh();
  }
  else {
    // Partitioning needed
    const maskedElevation = applyMaskToElevation(myElevation, landMask);
    const maskedElevation2D = convertElevationInto2DArray(maskedElevation, demWidth, demHeight);
    let best_cut;
    if (partitioningMode === "simple") {
      best_cut = partitionIntoRectangles(maskedElevation2D, physicalWidth, physicalHeight, bedWidth, bedHeight).best_cut;
    }
    else if (partitioningMode === "complex") {
      // Send to backend
      let result = await sendMeshToBackend(maskedElevation2D, geoContext.physicalWidth, geoContext.physicalHeight, bedWidth, bedHeight);
      best_cut = result.best_cut;
    }
    
    createMeshesFromLabelMap(best_cut, maskedElevation, demWidth, demHeight, geoContext, base);
    if (!partitionMeshes.length) {
      window.alert("Unable to create 3D model.");
      showOverlay("Generate a mesh first");
      switchToTab("mapView");
      return;
    }
    centerPartitionedMeshes();
  }

  if (DEBUG) printMeshDimensions();

  hideOverlay(); // hides "Generating..." message
}

// Print the dimensions (in scene units = mm) of all generated meshes
function printMeshDimensions() {
  // ---------- Singleton ----------
  if (singletonMesh) {
    singletonMesh.updateMatrixWorld(true);

    const box = new THREE.Box3().setFromObject(singletonMesh);
    const size = new THREE.Vector3();
    box.getSize(size);

    console.log("===== Singleton Mesh =====");
    console.log({
      width_mm: size.x,
      height_mm: size.z,
      depth_mm: size.y
    });
  } else {
    console.log("No singleton mesh.");
  }

  // ---------- Partition Meshes ----------
  if (!partitionMeshes || partitionMeshes.length === 0) {
    console.log("No partition meshes.");
    return;
  }

  console.log("===== Partition Meshes =====");

  const overallBox = new THREE.Box3();

  partitionMeshes.forEach((mesh, index) => {
    mesh.updateMatrixWorld(true);

    const box = new THREE.Box3().setFromObject(mesh);
    const size = new THREE.Vector3();
    box.getSize(size);

    console.log(`Partition ${index}:`, {
      width_mm: size.x,
      height_mm: size.z,
      depth_mm: size.y
    });

    overallBox.union(box);
  });

  const overallSize = new THREE.Vector3();
  overallBox.getSize(overallSize);

  console.log("===== Overall Partition Extents =====");
  console.log({
    width_mm: overallSize.x,
    height_mm: overallSize.z,
    depth_mm: overallSize.y
  });
}

/* ============================================================
 * SECTION 6: SIMPLE PARTITIONING
 * partitionIntoRectangles(): partitions into a simple rectangular grid
 * sized to fit the print bed. Returns { best_cut: label_map } where
 * label_map is a 2D array: label_map[row][col], same shape as maskedElevation2D.
 * ============================================================ */

function partitionIntoRectangles(maskedElevation2D, physicalWidth, physicalHeight, bedWidth, bedHeight) {
  var demHeight = maskedElevation2D.length;       // number of rows
  var demWidth = maskedElevation2D[0].length;     // number of cols

  var cols = Math.max(1, Math.ceil(physicalWidth / bedWidth));
  var rows = Math.max(1, Math.ceil(physicalHeight / bedHeight));
  var cellWidthMM = physicalWidth / cols;
  var cellHeightMM = physicalHeight / rows;
  var pixelWidthMM = physicalWidth / demWidth;
  var pixelHeightMM = physicalHeight / demHeight;

  var label_map = [];                              // will be a 2D array: label_map[row][col]
  var i, j, rowIdx, colIdx, row, isNoData;

  for (i = 0; i < demHeight; i++) {
    row = [];                                       // one row of the 2D array
    rowIdx = Math.min(rows - 1, Math.floor((i * pixelHeightMM) / cellHeightMM));

    for (j = 0; j < demWidth; j++) {
      colIdx = Math.min(cols - 1, Math.floor((j * pixelWidthMM) / cellWidthMM));
      isNoData = isNaN(maskedElevation2D[i][j]);
      row.push(isNoData ? -1 : rowIdx * cols + colIdx);
    }

    label_map.push(row);                            // append row -> label_map is now 2D
  }

  return { best_cut: label_map };
}