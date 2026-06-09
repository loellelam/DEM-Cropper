/*
* This file visualizes DEMs as 3D meshes.
*/

import { switchToTab } from './tab-switching.js';
import { getSelectedGeotiff, getSelectedShape } from './selection.js';
import { getCurrentVerticalExaggeration } from './toggle-vertical-exaggeration.js';
import { createBinaryMask } from './binary-mask.js';
import { sendMeshToBackend } from './main.js';

import * as THREE from 'three';
import * as BufferGeometryUtils from 'three/addons/utils/BufferGeometryUtils.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { ConvexGeometry } from 'three/addons/geometries/ConvexGeometry.js';

// Global variables ============================================

// Three.js scene singleton
export const { scene, camera, renderer } = setupScene();

// Geospatial skew accomodation
let scaleX, scaleY;

// Three.js meshes
export let singletonMesh = null;
export let partitionMeshes = [];

//==============================================================

// Three.js scene setup
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

  switchToTab("demView"); // Switch to the 3D Model tab

  // Get user input values
  let base = parseFloat(document.getElementById("baseThicknessInput").value); // mm
  let verticalExaggeration = parseFloat(getCurrentVerticalExaggeration()); // scale factor
  let bedWidth = parseFloat(document.getElementById("bedWidthInput").value); // mm
  let bedHeight = parseFloat(document.getElementById("bedHeightInput").value); // mm
  let physicalWidth = parseFloat(document.getElementById("physicalWidthInput").value); // mm
  let physicalHeight = 0;
  let physicalHeightInput = document.getElementById("physicalHeightInput");

  // Extract geotiff data
  const georaster = selectedGeotiff.georasters[0];
  let demWidth = georaster.width;
  let demHeight = georaster.height;
  let myElevation = georaster.values[0];

  console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")

  // Calculate scaling factors to accomodate geospatial skew. Also set physicalHeight
  function calculateScaleFactor() {
    // Calculate meters per pixel 
    // Need to check projection type. If pixelWidth is in degrees per pixel, convert to meters per pixel 
    // Use center latitude bc degrees longitude vary with latitude
    const centerLat = (georaster.ymin + georaster.ymax) / 2;
    const circumference = 40075017; // meters
    const metersPerDegreeLat = 111320;
    const metersPerDegreeLon = Math.abs(circumference * Math.cos(centerLat * Math.PI / 180) / 360);
    const metersPerWidthPixel = georaster.pixelWidth * metersPerDegreeLon; // meters per pixel
    const metersPerHeightPixel = georaster.pixelHeight * metersPerDegreeLat; // meters per pixel
    // Calculate the total DEM size in meters
    const demWidthInMeters = metersPerWidthPixel * georaster.width;
    const demHeightInMeters = metersPerHeightPixel * georaster.height;

    // On the first run, set model height based on aspect ratio
    const aspectRatio = demHeightInMeters / demWidthInMeters;
    physicalHeight = parseFloat((physicalWidth * aspectRatio).toFixed(2));
    physicalHeightInput.value = physicalHeight;

    // Use physicalWidth/physicalHeight for scaling
    const scaleX = physicalWidth / demWidthInMeters; // mm/mm
    const scaleY = physicalHeight / demHeightInMeters; // should be same as scaleX if my model scales uniformly (if aspect ratio is preserved)

    return { scaleX, scaleY };
  }
  ({ scaleX, scaleY } = calculateScaleFactor()); // set global variables

  const flattenedElevation = [];
  for (let i = 0; i < myElevation.length; i++) {
    for (let j = 0; j < myElevation[i].length; j++) {
      // Only scale Z (elevation) here, X/Y scaling is handled in mesh creation
      // scaleX is used to to proportionally scale elevation when model size changes
      flattenedElevation.push(myElevation[i][j] * scaleX * verticalExaggeration);
    }
  }
  myElevation = flattenedElevation;

  const myMask = createBinaryMask(georaster, selectedShape);

  clearMeshes();
  if (physicalWidth <= bedWidth && physicalHeight <= bedHeight) { // no partitioning needed
    createMesh(base, demWidth, demHeight, myElevation, myMask, physicalWidth, physicalHeight, true);
    centerSingletonMesh();
  }
  else { // partitioning needed
    // Send mesh data to backend for processing
    const maskedElevation = applyMaskToElevation(myElevation, myMask);
    const maskedElevation2D = convertElevationInto2DArray(maskedElevation, demWidth, demHeight);
    let result = await sendMeshToBackend(maskedElevation2D, physicalWidth, physicalHeight, bedWidth, bedHeight);
    const best_cut = result.best_cut;

    createMeshesFromLabelMap(best_cut, maskedElevation, demWidth, demHeight, physicalWidth, physicalHeight, base);
    centerPartitionedMeshes();
  }
  
}

/* input:
    singletonMesh - will hold the output mesh
    base - base thickness
    demWidth - geotiff width
    demHeight - geotiff height
    elevation_m - 1d array of elevations
    mask_m - 1d binary mask array
*/
function createMesh(base, demWidth, demHeight, elevation_m, mask_m, physicalWidth, physicalHeight, normalizeToPhysical) {
    if (singletonMesh) scene.remove(singletonMesh);

    const z_base = -Math.abs(parseFloat(base));
    
    // should be the number of pixels in the shape
    const x_count = parseInt(demWidth);
    const y_count = parseInt(demHeight);

    // should represent the physical size (in mm) of each pixel in the mesh
    let x_step = physicalWidth / x_count;   // 1 unit = 1 mm
    let y_step = physicalHeight / y_count;  // 1 unit = 1 mm

    let geometries_array = [];

    for (let x = 0; x<x_count; x++) {
        for (let y=0; y<y_count; y++) {
            // need to check the content of this vertex as well
            // as vertex at x+1, y+1, and x+1 y+1
            const v1 = get_x_y(mask_m, x, y, x_count, y_count);
            const v2 = get_x_y(mask_m, x+1, y, x_count, y_count);
            const v3 = get_x_y(mask_m, x, y+1, x_count, y_count);
            const v4 = get_x_y(mask_m, x+1, y+1, x_count, y_count);
            
            const e1 = get_x_y(elevation_m, x, y, x_count, y_count);
            const e2 = get_x_y(elevation_m, x+1, y, x_count, y_count);
            const e3 = get_x_y(elevation_m, x, y+1, x_count, y_count);
            const e4 = get_x_y(elevation_m, x+1, y+1, x_count, y_count);

            //check if any of the points are null

            if (v1==1 && v2==1 && v3==1 && v4==1 && e1 >=0 && e2 >=0 && e3>=0 && e4>=0) { // all 4 points are not null and elevation above 0
                let points = [
                    // polytope
                    new THREE.Vector3(x*x_step, y*y_step, z_base), // create point v1 at base
                    new THREE.Vector3(x*x_step, y*y_step, get_x_y(elevation_m, x, y, x_count, y_count)), //create point v1 at elevation

                    new THREE.Vector3((x+1)*x_step, y*y_step, z_base), // v2
                    new THREE.Vector3((x+1)*x_step, y*y_step, get_x_y(elevation_m, (x+1), y, x_count, y_count)),

                    new THREE.Vector3(x*x_step, (y+1)*y_step, z_base), // v3
                    new THREE.Vector3(x*x_step, (y+1)*y_step, get_x_y(elevation_m, x, (y+1), x_count, y_count)),
                    new THREE.Vector3((x+1)*x_step, (y+1)*y_step, z_base), // v4
                    new THREE.Vector3((x+1)*x_step, (y+1)*y_step, get_x_y(elevation_m, (x+1), (y+1), x_count, y_count)),
                ];

                let vox_geometry = new ConvexGeometry(points); //create a closed geometry of these 8 points
                geometries_array.push(vox_geometry);
            } else if (v1==1 && v2==1 && v3==1 && e1 >=0 && e2 >=0 && e3>=0) { // point #4 is null
                let points =[
                    new THREE.Vector3(x*x_step, y*y_step, z_base), // v1
                    new THREE.Vector3(x*x_step, y*y_step, get_x_y(elevation_m, x, y, x_count, y_count)),
                    new THREE.Vector3((x+1)*x_step, y*y_step, z_base), // v2
                    new THREE.Vector3((x+1)*x_step, y*y_step, get_x_y(elevation_m, (x+1), y, x_count, y_count)),
                    new THREE.Vector3(x*x_step, (y+1)*y_step, z_base), // v3
                    new THREE.Vector3(x*x_step, (y+1)*y_step, get_x_y(elevation_m, x, (y+1), x_count, y_count)),
                    
                ];

                let  vox_geometry = new ConvexGeometry(points);
              geometries_array.push(vox_geometry);
            } else if (v1==1 && v2==1 && v4==1 && e1>=0 && e2>=0 && e4>=0) {
                let points =[
                    new THREE.Vector3(x*x_step, y*y_step, z_base), // v1
                    new THREE.Vector3(x*x_step, y*y_step, get_x_y(elevation_m, x, y, x_count, y_count)),
                    new THREE.Vector3((x+1)*x_step, y*y_step, z_base), // v2
                    new THREE.Vector3((x+1)*x_step, y*y_step, get_x_y(elevation_m, (x+1), y, x_count, y_count)),
                    new THREE.Vector3((x+1)*x_step, (y+1)*y_step, z_base), // v4
                    new THREE.Vector3((x+1)*x_step, (y+1)*y_step, get_x_y(elevation_m, (x+1), (y+1), x_count, y_count)),
                ];

                let vox_geometry = new ConvexGeometry(points);
              geometries_array.push(vox_geometry);
            } else if (v2==1 && v3==1 && v4==1 && e2>=0 && e3 >=0 && e4>=0) {
                let points =[
                    new THREE.Vector3((x+1)*x_step, y*y_step, z_base), // v2
                    new THREE.Vector3((x+1)*x_step, y*y_step, get_x_y(elevation_m, (x+1), y, x_count, y_count)),
                    new THREE.Vector3(x*x_step, (y+1)*y_step, z_base), // v3
                    new THREE.Vector3(x*x_step, (y+1)*y_step, get_x_y(elevation_m, x, (y+1), x_count, y_count)),
                    new THREE.Vector3((x+1)*x_step, (y+1)*y_step, z_base), // v4
                    new THREE.Vector3((x+1)*x_step, (y+1)*y_step, get_x_y(elevation_m, (x+1), (y+1), x_count, y_count)),
                ];

                let vox_geometry = new ConvexGeometry(points);
              geometries_array.push(vox_geometry);
            } else if (v1==1 && v3==1 && v4==1 && e1 >=0 && e3>=0 && e4>=0) {
                let points =[
                    new THREE.Vector3(x*x_step, y*y_step, z_base), // v1
                    new THREE.Vector3(x*x_step, y*y_step, get_x_y(elevation_m, x, y, x_count, y_count)),
                    new THREE.Vector3(x*x_step, (y+1)*y_step, z_base), // v3
                    new THREE.Vector3(x*x_step, (y+1)*y_step, get_x_y(elevation_m, x, (y+1), x_count, y_count)),
                    new THREE.Vector3((x+1)*x_step, (y+1)*y_step, z_base), // v4
                    new THREE.Vector3((x+1)*x_step, (y+1)*y_step, get_x_y(elevation_m, (x+1), (y+1), x_count, y_count)),
                ];

                let vox_geometry = new ConvexGeometry(points);
              geometries_array.push(vox_geometry);
            }
        }
    }

    if (geometries_array.length == 0) { //if no geometries were created
      singletonMesh = null;
      return;
    }

    // merging the geometries
    let mergedGeometry = BufferGeometryUtils.mergeGeometries(geometries_array);
    const color = new THREE.Color().setHSL((0 * 0.618033988749895) % 1, 0.5, 0.5);
    let mergedMaterial = new THREE.MeshStandardMaterial( { color: color, side: THREE.DoubleSide } );
    mergedMaterial.needsUpdate = true;

    if (normalizeToPhysical) {
      // Scale to desired physical dimensions
      mergedGeometry.computeBoundingBox();
      const bb = mergedGeometry.boundingBox;
      // Shift to origin
      mergedGeometry.translate(-bb.min.x, -bb.min.y, 0);
      // Rescale X and Y to match exact physical dimensions
      mergedGeometry.computeBoundingBox(); // recompute after translate
      const currentWidth  = mergedGeometry.boundingBox.max.x - mergedGeometry.boundingBox.min.x;
      const currentHeight = mergedGeometry.boundingBox.max.y - mergedGeometry.boundingBox.min.y;
      const scaleToPhysicalX = physicalWidth  / currentWidth;
      const scaleToPhysicalY = physicalHeight / currentHeight;
      const uniformScale = Math.min(scaleToPhysicalX, scaleToPhysicalY); // use the smaller to avoid overfitting
      mergedGeometry.scale(uniformScale, uniformScale, 1);
    }

    let mergedMesh = new THREE.Mesh(mergedGeometry, mergedMaterial);
    mergedMesh.rotateX(3*Math.PI / 2)
    singletonMesh = mergedMesh;

    scene.add(singletonMesh);
    console.log(singletonMesh);
}

// Helper for createMesh: Get the 1d coord based on the 2d x,y coord
function get_x_y(arr, x, y, x_count, y_count) {
  if (x>=x_count || y >= y_count) return null; //if dimensions are out of bounds, return null
  const flippedY = y_count - 1 - y; // flip the y-axis
  return arr[flippedY * x_count + x]; // returns the value (0 or 1) at specified location
}

/**
 * Build one binary mask per label in a label map and call createMesh() for each.
 * Returns an object mapping labelId -> mesh (added to scene).
 *
 * label_map: either 2D array [rows][cols] or flattened 1D array length demWidth*demHeight
 * elevation_m: flattened 1D elevation array (same ordering as createMesh expects)
 * demWidth, demHeight, physicalWidth, physicalHeight, base: passed to createMesh
 */
function createMeshesFromLabelMap(label_map, elevation_m, demWidth, demHeight, physicalWidth, physicalHeight, base, opts = {}) {
  console.log("Partitioning...");

  // flatten label map to row-major array (same ordering as flattenedElevation earlier)
  let label_flat = [];
  if (!label_map) console.warn("No label map provided");
  for (let i = 0; i < label_map.length; i++) {
    for (let j = 0; j < label_map[i].length; j++) {
      label_flat.push(label_map[i][j]);
    }
  }

  const total = parseInt(demWidth) * parseInt(demHeight);
  if (label_flat.length !== total) {
    console.warn("Label map size doesn't match demWidth*demHeight:", label_flat.length, "vs", total);
  }

  // collect unique non-negative labels
  const labelSet = new Set();
  for (let i = 0; i < Math.min(label_flat.length, total); i++) {
    const v = label_flat[i];
    if (typeof v === 'number' && v >= 0) labelSet.add(Math.trunc(v));
  }
  const labels = Array.from(labelSet).sort((a,b) => a-b);

  // For each label, build binary mask and call createMesh.
  // We rely on createMesh to produce singletonMesh; after each call we clone and keep a copy
  for (const labelId of labels) {
    const mask = new Array(total).fill(0);
    for (let i = 0; i < total && i < label_flat.length; i++) {
      if (label_flat[i] === labelId) mask[i] = 1;
    }

    // createMesh will add singletonMesh to scene; it will remove any existing singletonMesh at start
    createMesh(base, demWidth, demHeight, elevation_m, mask, physicalWidth, physicalHeight, false);

    // if createMesh created something, clone and keep it under this label
    if (singletonMesh) {
      // clone geometry + material so later removals/changes don't affect saved partition
      const copy = singletonMesh.clone(true);
      copy.material = singletonMesh.material.clone();
      // give each partition a distinguishable color
      copy.material.color = new THREE.Color().setHSL((labelId * 0.618033988749895) % 1, 0.5, 0.5);
      copy.name = `partition_${labelId}`;
      scene.add(copy);
      partitionMeshes.push(copy);

      // leave original singletonMesh in place so next createMesh call will remove it
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
  const currentWidth  = collectiveBB.max.x - collectiveBB.min.x;
  const currentHeight = collectiveBB.max.y - collectiveBB.min.y;
  const scaleToPhysicalX = physicalWidth  / currentWidth;
  const scaleToPhysicalY = physicalHeight / currentHeight;
  const uniformScale = Math.min(scaleToPhysicalX, scaleToPhysicalY); // use the smaller to avoid overfitting
  // Apply same normalization to every partition
  for (const mesh of partitionMeshes) {
    mesh.geometry.translate(-offsetX, -offsetY, 0);
    mesh.geometry.scale(uniformScale, uniformScale, 1);
  }

  // cleanup: remove the last singletonMesh produced by createMesh (we saved clones)
  if (singletonMesh) {
    scene.remove(singletonMesh);
    singletonMesh = null;
  }

  return partitionMeshes;
}

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
}

function centerSingletonMesh() {
  const boundingBox = new THREE.Box3().setFromObject(singletonMesh);
  const size = new THREE.Vector3();
  boundingBox.getSize(size);
  
  singletonMesh.position.x -= boundingBox.min.x + size.x/2;
  singletonMesh.position.y -= boundingBox.min.y + size.y/2;
  singletonMesh.position.z -= boundingBox.min.z + size.z/2;
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

// Helper: Prepare elevation for partitioned mesh creation by applying binary mask and converting no-data values to NaN
function applyMaskToElevation(elevation, mask) {
  const maskedElevation = [];
  for (let i = 0; i < elevation.length; i++) {
    if (mask[i] === 0 || elevation[i] < -2e+30) { // no data values
      maskedElevation.push(NaN);
    }
    else if (mask[i] === 1) {
      maskedElevation.push(elevation[i]);
    }
    else {
      console.log("Unexpected mask value at index", i, "mask:", mask[i], "elevation:", elevation[i]);
    }
  }
  return maskedElevation;
}

// Helper: Convert 1D elevation array into 2D array (for partitioning)
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

// Helper to get DEM aspect ratio for model dimension sync
export function getAspectRatio() {
  const selectedGeotiff = getSelectedGeotiff();
  if (!selectedGeotiff) return 1;
  const georaster = selectedGeotiff.georasters[0];
  const centerLat = (georaster.ymin + georaster.ymax) / 2;
  const circumference = 40075017;
  const metersPerDegreeLat = 111320;
  const metersPerDegreeLon = Math.abs(circumference * Math.cos(centerLat * Math.PI / 180) / 360);
  const metersPerWidthPixel = georaster.pixelWidth * metersPerDegreeLon;
  const metersPerHeightPixel = georaster.pixelHeight * metersPerDegreeLat;
  const demWidthInMeters = metersPerWidthPixel * georaster.width;
  const demHeightInMeters = metersPerHeightPixel * georaster.height;
  return demHeightInMeters / demWidthInMeters;
}
