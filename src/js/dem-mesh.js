/*
* This file visualizes DEMs as 3D meshes.
*/

import { switchToTab } from './tab-switching.js';
import { getSelectedGeotiff, getSelectedShape } from './selection.js';
import { createBinaryMask } from './binary-mask.js';

import * as THREE from 'three';
import * as BufferGeometryUtils from 'three/addons/utils/BufferGeometryUtils.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { ConvexGeometry } from 'three/addons/geometries/ConvexGeometry.js';

export function generateDEM() {
  const selectedGeotiff = getSelectedGeotiff();
  if (!selectedGeotiff) {
    window.alert("Please upload a geotiff in Step 1 first.");
    return;
  }
  else if (!getSelectedShape()) {
    window.alert("Please select a shape in Step 2 first.");
    return;
  }

  switchToTab("demView"); // Switch to the 3D Model tab

  // Get user input values
  let base = parseFloat(document.getElementById("baseThicknessInput").value); // mm
  let verticalExaggeration = parseFloat(document.getElementById("verticalExaggerationInput").value); // scale factor
  let bedWidth = parseFloat(document.getElementById("bedWidthInput").value); // mm
  let bedHeight = parseFloat(document.getElementById("bedHeightInput").value); // mm
  let modelWidth = parseFloat(document.getElementById("modelWidthInput").value); // mm
  let modelHeightInput = document.getElementById("modelHeightInput");

  const georaster = selectedGeotiff.georasters[0];
  const grid_x = georaster.width;
  const grid_y = georaster.height;
  let myElevation = georaster.values[0];
  const flattenedElevation = [];

  console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
  console.log("projection:", georaster);
  
  // Need to check projection type. If pixelWidth is in degrees per pixel, convert to meters per pixel 
  // Use center latitude bc degrees longitude vary with latitude
  const centerLat = (georaster.ymin + georaster.ymax) / 2;
  const circumference = 40075017; // meters
  const metersPerDegreeLat = 111320;
  const metersPerDegreeLon = Math.abs(circumference * Math.cos(centerLat) / 360);
  const metersPerWidthPixel = georaster.pixelWidth * metersPerDegreeLat; // meters per pixel
  const metersPerHeightPixel = georaster.pixelHeight * metersPerDegreeLon; // meters per pixel

  console.log("metersPerWidthPixel:", metersPerWidthPixel);
  console.log("metersPerHeightPixel:", metersPerHeightPixel);

  // Calculate the total DEM size in meters
  const demWidth = metersPerWidthPixel * georaster.width;
  const demHeight = metersPerHeightPixel * georaster.height;

  // On the first run, set model height based on aspect ratio
  const aspectRatio = demHeight / demWidth;
  const modelHeight = (modelWidth * aspectRatio).toFixed(2);
  modelHeightInput.value = modelHeight;

  // Use modelWidth/modelHeight for scaling
  const scaleX = modelWidth / demWidth; // mm/mm
  const scaleY = modelHeight / demHeight; // should be same as scaleX if my model scales uniformly (if aspect ratio is preserved)

  console.log("model height:", modelHeight);
  console.log("aspect ratio:", aspectRatio);
  console.log("scaleX and scaleY:", scaleX, " ", scaleY);

  console.log("DEM size in m:", demWidth, "x", demHeight);

  for (let i = 0; i < myElevation.length; i++) {
    for (let j = 0; j < myElevation[i].length; j++) {
      // Only scale Z (elevation) here, X/Y scaling is handled in mesh creation
      // scaleX is used to to proportionally scale elevation when model size changes
      flattenedElevation.push(myElevation[i][j] * scaleX * verticalExaggeration);
    }
  }
  myElevation = flattenedElevation;

  const myMask = createBinaryMask(georaster, getSelectedShape());



  
  // Calculate tiling based on scaled model size
  const tilesX = Math.ceil(modelWidth / bedWidth);
  const tilesY = Math.ceil(modelHeight / bedHeight);

  console.log("Tiles X:", tilesX, "Tiles Y:", tilesY);


  // createMesh(base, grid_x, grid_y, myElevation, myMask, modelWidth, modelHeight);
  createMeshTiles(base, grid_x, grid_y, myElevation, myMask, modelWidth, modelHeight, tilesX, tilesY, bedWidth, bedHeight);
  // createUnitCube();
}

// Start of Three.js scene setup
const scene = new THREE.Scene();
scene.add(new THREE.AxesHelper(1000));

// Add a grid helper to visualize scale (1 unit = 1 mm)
const gridSize = 1000; // width & height. 1000 mm = 1 meter
const gridDivisions = 100; // 10 mm per division
const gridHelper = new THREE.GridHelper(gridSize, gridDivisions, 0x444444, 0x444444);
gridHelper.position.y = -2; // Slightly below mesh to avoid z-fighting
scene.add(gridHelper);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth * 0.7, window.innerHeight * 0.9); // Set initial size
// Resize the canvas when the window is resized
const container = document.getElementById("dem");
const resizeObserver = new ResizeObserver(() => {
  renderer.setSize(container.clientWidth, container.clientHeight);
});
resizeObserver.observe(container);
renderer.setAnimationLoop(animate);
document.getElementById("dem").appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 100;

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(10, 10, 10);
scene.add(directionalLight);

const orbitControls = new OrbitControls(camera, renderer.domElement);
orbitControls.listenToKeyEvents(window); // listen for arrow keys

// Renders Three.js scene
function animate() {
  renderer.render( scene, camera );
}

// End of Three.js scene setup

/* input:
    singletonMesh - will hold the output mesh
    base - base thickness
    grid_x - geotiff width
    grid_y - geotiff height
    elevation_m - 1d array of elevations
    mask_m - 1d binary mask array
*/
export let singletonMesh = null;
function createMesh(base, grid_x, grid_y, elevation_m, mask_m, modelWidth, modelHeight) {
    if (singletonMesh) scene.remove(singletonMesh);

    const z_base = -Math.abs(parseFloat(base));
    
    // grid_y = grid_x; // ratio must be 1:1, otherwise it looks skewed

    const x_count = parseInt(grid_x);
    const y_count = parseInt(grid_y);

    const x_step = modelWidth / x_count;   // 1 unit = 1 mm
    const y_step = modelHeight / y_count;  // 1 unit = 1 mm

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
    var mergedMaterial = new THREE.MeshStandardMaterial( { color: 0xcccccc, side: THREE.DoubleSide } );
    mergedMaterial.needsUpdate = true;

    var mergedMesh = new THREE.Mesh(mergedGeometry, mergedMaterial);
    mergedMesh.rotateX(3*Math.PI / 2)
    singletonMesh = mergedMesh;

    // Center the mesh
    const boundingBox = new THREE.Box3().setFromObject(singletonMesh);
    const size = new THREE.Vector3();
    boundingBox.getSize(size);

    // const max_dim = Math.max(size.x, size.y, size.z);
    // const scale = 3/max_dim; // for resizing it to a size of 3 units

    // singletonMesh.scale.set(scale, scale, scale);
    // singletonMesh.updateMatrix();
    const boundingBox2 = new THREE.Box3().setFromObject(singletonMesh);
    //console.log(boundingBox2);
    const size2 = new THREE.Vector3();
    boundingBox2.getSize(size2);
    
    singletonMesh.position.x -= boundingBox2.min.x + size2.x/2;
    singletonMesh.position.y -= boundingBox2.min.y + size2.y/2;
    singletonMesh.position.z -= boundingBox2.min.z + size2.z/2;
    singletonMesh.updateMatrix ();

    scene.add(singletonMesh);
    console.log(singletonMesh);
}

export let tileMeshes = null;
function createMeshTiles(base, grid_x, grid_y, elevation_m, mask_m, modelWidth, modelHeight, tilesX, tilesY, bedWidth, bedHeight) {
    // Remove previous meshes
    if (tileMeshes) {
      tileMeshes.forEach(m => scene.remove(m));
    }
    tileMeshes = [];

    const x_count = parseInt(grid_x); // number of pixels/columns
    const y_count = parseInt(grid_y); // number of pixels/rows
    const x_step = modelWidth / x_count; // physical width in mm for each pixel
    const y_step = modelHeight / y_count; // physical height in mm per pixel
    const z_base = -Math.abs(parseFloat(base));

    // Calculates how many DEM rows/columns (grid cells) go into each tile
    const tileGridX = Math.floor(x_count / tilesX);
    const tileGridY = Math.floor(y_count / tilesY);

    // Iterate over each tile
    for (let tx = 0; tx < tilesX; tx++) {
      for (let ty = 0; ty < tilesY; ty++) {
        let geometries_array = [];

        // Calculate start/end indices for this tile
        const startX = tx * tileGridX;
        const endX = (tx === tilesX - 1) ? x_count : (tx + 1) * tileGridX;
        const startY = ty * tileGridY;
        const endY = (ty === tilesY - 1) ? y_count : (ty + 1) * tileGridY;

        // Iterate over each grid cell in this tile
        for (let x = startX; x < endX - 1; x++) {
          for (let y = startY; y < endY - 1; y++) {
            // ...same mesh logic as createMesh, but only for this tile...
            const v1 = get_x_y(mask_m, x, y, x_count, y_count);
            const v2 = get_x_y(mask_m, x+1, y, x_count, y_count);
            const v3 = get_x_y(mask_m, x, y+1, x_count, y_count);
            const v4 = get_x_y(mask_m, x+1, y+1, x_count, y_count);
            const e1 = get_x_y(elevation_m, x, y, x_count, y_count);
            const e2 = get_x_y(elevation_m, x+1, y, x_count, y_count);
            const e3 = get_x_y(elevation_m, x, y+1, x_count, y_count);
            const e4 = get_x_y(elevation_m, x+1, y+1, x_count, y_count);
            if (v1==1 && v2==1 && v3==1 && v4==1 && e1 >=0 && e2 >=0 && e3>=0 && e4>=0) {
                let points = [
                    new THREE.Vector3(x*x_step, y*y_step, z_base),
                    new THREE.Vector3(x*x_step, y*y_step, e1),
                    new THREE.Vector3((x+1)*x_step, y*y_step, z_base),
                    new THREE.Vector3((x+1)*x_step, y*y_step, e2),
                    new THREE.Vector3(x*x_step, (y+1)*y_step, z_base),
                    new THREE.Vector3(x*x_step, (y+1)*y_step, e3),
                    new THREE.Vector3((x+1)*x_step, (y+1)*y_step, z_base),
                    new THREE.Vector3((x+1)*x_step, (y+1)*y_step, e4),
                ];
                let vox_geometry = new ConvexGeometry(points);
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
        if (geometries_array.length > 0) {
          let mergedGeometry = BufferGeometryUtils.mergeGeometries(geometries_array);
          var mergedMaterial = new THREE.MeshStandardMaterial( { color: 0xcccccc, side: THREE.DoubleSide } );
          mergedMaterial.needsUpdate = true;

          var mergedMesh = new THREE.Mesh(mergedGeometry, mergedMaterial);
          mergedMesh.rotateX(3*Math.PI / 2);

          // Center the mesh for this tile
          const boundingBox = new THREE.Box3().setFromObject(mergedMesh);
          const size = new THREE.Vector3();
          boundingBox.getSize(size);
          mergedMesh.position.x -= boundingBox.min.x + size.x/2;
          mergedMesh.position.y -= boundingBox.min.y + size.y/2;
          mergedMesh.position.z -= boundingBox.min.z + size.z/2;

          // Offset mesh so tiles don't overlap
          mergedMesh.position.x += startX * x_step;
          mergedMesh.position.z -= startY * y_step;
          mergedMesh.updateMatrix();
          
          scene.add(mergedMesh);
          tileMeshes.push(mergedMesh);
        }
      }
    }
}

// Helper for createMesh: Get the 1d coord based on the 2d x,y coord
function get_x_y(arr, x, y, x_count, y_count) {
  if (x>=x_count || y >= y_count) return null; //if dimensions are out of bounds, return null
  const flippedY = y_count - 1 - y; // flip the y-axis
  return arr[flippedY * x_count + x]; // returns the value (0 or 1) at specified location
  // return arr[y * (x_count + 1) + x];
}

// Converts degrees to meters at a given latitude
function degreesToMeters(degrees, latitude) {
  // Longitude: meters = degrees * 111320 * cos(latitude)
  // Latitude: meters = degrees * 110574
  const latRad = latitude * Math.PI / 180;
  const metersPerDegreeLon = 111320 * Math.cos(latRad);
  const metersPerDegreeLat = 110574;
  return {
    x: Math.abs(degrees.x) * metersPerDegreeLon,
    y: Math.abs(degrees.y) * metersPerDegreeLat
  };
}

// Helper to get DEM aspect ratio for model dimension sync
export function getAspectRatio() {
  const selectedGeotiff = getSelectedGeotiff();
  if (!selectedGeotiff) return 1;
  const georaster = selectedGeotiff.georasters[0];
  const centerLat = (georaster.ymin + georaster.ymax) / 2;
  const circumference = 40075017;
  const metersPerDegreeLat = 111320;
  const metersPerDegreeLon = Math.abs(circumference * Math.cos(centerLat) / 360);
  const metersPerWidthPixel = georaster.pixelWidth * metersPerDegreeLat;
  const metersPerHeightPixel = georaster.pixelHeight * metersPerDegreeLon;
  const demWidth = metersPerWidthPixel * georaster.width;
  const demHeight = metersPerHeightPixel * georaster.height;
  return demHeight / demWidth;
}

function createUnitCube() {
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });
  const cube = new THREE.Mesh(geometry, material);
  singletonMesh = cube; // Set singletonMesh to the cube for consistency
  cube.position.set(0, -2, 0); // Position it below the grid
  scene.add(cube);
}
