/*
* This file visualizes DEMs as 3D meshes.
*/

import { switchToTab } from './tab-switching.js';
import { getSelectedGeotiff, getSelectedShape } from './selection.js';
import { getCurrentVerticalExaggeration } from './toggle-vertical-exaggeration.js';
import { createBinaryMask } from './binary-mask.js';
import { cutMeshWithPlane } from './model-partitioning.js';
import { sendMeshToBackend } from './main.js';

import * as THREE from 'three';
import * as BufferGeometryUtils from 'three/addons/utils/BufferGeometryUtils.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { ConvexGeometry } from 'three/addons/geometries/ConvexGeometry.js';
import { CSG } from 'three-csg-ts';

// Three.js scene singleton
export const { scene, camera, renderer } = setupScene();

// Three.js scene setup
function setupScene() {
  const scene = new THREE.Scene();
  scene.add(new THREE.AxesHelper(1000));

  const gridSize = 1000;
  const gridDivisions = 100;
  const gridHelper = new THREE.GridHelper(gridSize, gridDivisions, 0x444444, 0x444444);
  gridHelper.position.y = -2;
  scene.add(gridHelper);

  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 100;

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

function animate(scene, camera, renderer) {
  renderer.render(scene, camera);
}


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
  let physicalHeightInput = document.getElementById("physicalHeightInput");

  // Extract useful information
  const georaster = selectedGeotiff.georasters[0];
  let grid_x = georaster.width;
  let grid_y = georaster.height;
  // grid_x = selectedShape.width;
  // grid_y = selectedShape.height;
  let myElevation = georaster.values[0];

  // const shapeBounds = selectedShape._bounds;
  // const widthDegrees = Math.abs(shapeBounds._northEast.lng - shapeBounds._southWest.lng); // circles dont have northeast
  // const heightDegrees = Math.abs(shapeBounds._northEast.lat - shapeBounds._southWest.lat);
  // const shapeWidthPixels = Math.round(widthDegrees / Math.abs(georaster.pixelWidth)); //shape's width in pixels
  // const shapeHeightPixels = Math.round(heightDegrees / Math.abs(georaster.pixelHeight));

  // console.log("shape's width in pix:", shapeWidthPixels);
  // console.log("shape's height in pix:", shapeHeightPixels);

  console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
  
  // Calculate meters per pixel 
  // Need to check projection type. If pixelWidth is in degrees per pixel, convert to meters per pixel 
  // Use center latitude bc degrees longitude vary with latitude
  const centerLat = (georaster.ymin + georaster.ymax) / 2;
  const circumference = 40075017; // meters
  const metersPerDegreeLat = 111320;
  const metersPerDegreeLon = Math.abs(circumference * Math.cos(centerLat * Math.PI / 180) / 360);
  const metersPerWidthPixel = georaster.pixelWidth * metersPerDegreeLat; // meters per pixel
  const metersPerHeightPixel = georaster.pixelHeight * metersPerDegreeLon; // meters per pixel
  // console.log("metersPerWidthPixel:", metersPerWidthPixel);
  // console.log("metersPerHeightPixel:", metersPerHeightPixel);
  // Calculate the total DEM size in meters
  const demWidth = metersPerWidthPixel * georaster.width;
  const demHeight = metersPerHeightPixel * georaster.height;

  // On the first run, set model height based on aspect ratio
  const aspectRatio = demHeight / demWidth;
  const physicalHeight = physicalWidth; //(physicalWidth * aspectRatio).toFixed(2);
  physicalHeightInput.value = physicalHeight;

  // Use physicalWidth/physicalHeight for scaling
  const scaleX = physicalWidth / demWidth; // mm/mm
  const scaleY = physicalHeight / demHeight; // should be same as scaleX if my model scales uniformly (if aspect ratio is preserved)

  // console.log("model height:", physicalHeight);
  // console.log("aspect ratio:", aspectRatio);
  // console.log("scaleX and scaleY:", scaleX, " ", scaleY);

  // console.log("DEM size in m:", demWidth, "x", demHeight);


  const myMask = createBinaryMask(georaster, selectedShape);


  // console.log("shape bounds:", shapeBounds);
  // console.log("georaster", georaster);
  // console.log("sw lng:", shapeBounds._southWest.lng);
  // console.log("georaster xmin", georaster.xmin);
  // console.log('georaster pixelwidth', georaster.pixelWidth);

  // Calculate pixel indices for selected shape bounds
  // const rasterXMin = Math.floor((shapeBounds._southWest.lng - georaster.xmin) / georaster.pixelWidth);
  // const rasterXMax = Math.ceil((shapeBounds._northEast.lng - georaster.xmin) / georaster.pixelWidth);
  // const rasterYMin = Math.floor(-(shapeBounds._northEast.lat - georaster.ymax) / georaster.pixelHeight);
  // const rasterYMax = Math.ceil(-(shapeBounds._southWest.lat - georaster.ymax) / georaster.pixelHeight);

  // Ensure raster bounds are within georaster dimensions
  // let yStart = Math.min(rasterYMin, rasterYMax);
  // yStart = Math.max(0, yStart); // If neg, set to 0
  // let yEnd = Math.max(rasterYMin, rasterYMax);
  // yEnd = Math.min(georaster.height, yEnd);  // if > height of georaster, set to height
  // let xStart = Math.min(rasterXMin, rasterXMax);
  // xStart = Math.max(0, xStart);
  // let xEnd = Math.max(rasterXMin, rasterXMax);
  // xEnd = Math.min(georaster.width, xEnd);

  // console.log("Raster bounds:", xStart, xEnd, yStart, yEnd);

  // console.log("my elevation:", myElevation);
  // console.log("my mask:", myMask);

  // Extract elevation and mask for selected region
  // const selectedElevation = [];
  // const selectedMask = [];
  // for (let y = yStart; y < yEnd; y++) {
  //   for (let x = xStart; x < xEnd; x++) {
  //     selectedElevation.push(myElevation[y][x]);
  //     selectedMask.push(myMask[y][x]);
  //   }
  // }

  // console.log("selected elevation:", selectedElevation);
  // console.log("selected mask:", selectedMask);

  // myElevation = selectedElevation;
  const flattenedElevation = [];
  for (let i = 0; i < myElevation.length; i++) {
    for (let j = 0; j < myElevation[i].length; j++) {
      // Only scale Z (elevation) here, X/Y scaling is handled in mesh creation
      // scaleX is used to to proportionally scale elevation when model size changes
      flattenedElevation.push(myElevation[i][j] * scaleX * verticalExaggeration);
    }
  }
  myElevation = flattenedElevation;

  // const flattenedMask = [];
  // for (let i = 0; i < myMask.length; i++) {
  //   for (let j = 0; j < myMask[i].length; j++) {
  //     flattenedMask.push(myMask[i][j]);
  //   }
  // }

  // Calculate tiling based on scaled model size
  const tilesX = Math.ceil(physicalWidth / bedWidth);
  const tilesY = Math.ceil(physicalHeight / bedHeight);

  // console.log("Tiles X:", tilesX, "Tiles Y:", tilesY);

  console.log("physicalWidth:", physicalWidth, "physicalHeight:", physicalHeight);


  // createMesh(base, shapeWidthPixels, shapeHeightPixels, myElevation, myMask, physicalWidth, physicalHeight);
  
  // Use selectedElevation and selectedMask in createMesh
  createMesh(base, grid_x, grid_y, myElevation, myMask, physicalWidth, physicalHeight);
  
  // const mesh = createMeshTiles(base, grid_x, grid_y, myElevation, myMask, physicalWidth, physicalHeight, tilesX, tilesY, bedWidth, bedHeight);

  centerMesh();
  scaleByDemDimensions();
  centerMesh();
  const ratio = calculateRatio();
  scaleByTargetDimensions(ratio);
  centerMesh();
  singletonMesh.updateMatrixWorld();

  // Send mesh data to backend for processing
  const maskedElevation = applyMaskToElevation(myElevation, myMask);
  const maskedElevation2D = convertElevationInto2DArray(maskedElevation, grid_x, grid_y);
  // const naiveCutsX = Math.max(1, Math.ceil(physicalWidth / bedWidth));
  // const naiveCutsY = Math.max(1, Math.ceil(physicalHeight / bedHeight));
  let result = await sendMeshToBackend(maskedElevation2D, physicalWidth, physicalHeight, bedWidth, bedHeight);
  const best_cut = result.best_cut;

  createMeshesFromLabelMap(best_cut, maskedElevation, grid_x, grid_y, physicalWidth, physicalHeight, base);

  // let x_coord = 10;
  // const { leftMesh, rightMesh } = cutMeshWithPlane(x_coord);

  // tileMeshes = splitMeshIntoTiles(bedWidth, bedHeight);
  // createTileBoxes(physicalWidth, physicalHeight, bedWidth, bedHeight)
}

/* input:
    singletonMesh - will hold the output mesh
    base - base thickness
    grid_x - geotiff width
    grid_y - geotiff height
    elevation_m - 1d array of elevations
    mask_m - 1d binary mask array
*/
export let singletonMesh = null;
function createMesh(base, grid_x, grid_y, elevation_m, mask_m, physicalWidth, physicalHeight) {
    if (singletonMesh) scene.remove(singletonMesh);

    const z_base = -Math.abs(parseFloat(base));
    
    // grid_y = grid_x; // ratio must be 1:1, otherwise it looks skewed

    // should be the number of pixels in the shape
    const x_count = parseInt(grid_x); 
    const y_count = parseInt(grid_y);

    // should represent the physical size (in mm) of each pixel in the mesh
    const x_step = physicalWidth / x_count;   // 1 unit = 1 mm
    const y_step = physicalHeight / y_count;  // 1 unit = 1 mm

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
    // const boundingBox = new THREE.Box3().setFromObject(singletonMesh);
    // const size = new THREE.Vector3();
    // boundingBox.getSize(size);

    // const max_dim = Math.max(size.x, size.y, size.z);
    // const scale = 3/max_dim; // for resizing it to a size of 3 units

    // singletonMesh.scale.set(scale, scale, scale);
    // singletonMesh.updateMatrix();
    // const boundingBox2 = new THREE.Box3().setFromObject(singletonMesh);
    // const size2 = new THREE.Vector3();
    // boundingBox2.getSize(size2);
    
    // singletonMesh.position.x -= boundingBox2.min.x + size2.x/2;
    // singletonMesh.position.y -= boundingBox2.min.y + size2.y/2;
    // singletonMesh.position.z -= boundingBox2.min.z + size2.z/2;
    // singletonMesh.updateMatrix();

    scene.add(singletonMesh);
    console.log(singletonMesh);
}

export let tileMeshes = null;
function createMeshTiles(base, grid_x, grid_y, elevation_m, mask_m, physicalWidth, physicalHeight, tilesX, tilesY, bedWidth, bedHeight) {
    // Remove previous meshes
    if (tileMeshes) {
      tileMeshes.forEach(m => scene.remove(m));
    }
    tileMeshes = [];

    const x_count = parseInt(grid_x); // number of pixels/columns
    const y_count = parseInt(grid_y); // number of pixels/rows
    const x_step = physicalWidth / x_count; // physical width in mm for each pixel
    const y_step = physicalHeight / y_count; // physical height in mm per pixel
    const z_base = -Math.abs(parseFloat(base));

    console.log("x_count:", x_count, "y_count:", y_count);
    console.log("x_step:", x_step, "y_step:", y_step);
    console.log("z_base:", z_base);

    // Calculates how many DEM rows/columns (grid cells) go into each tile
    const tileGridX = Math.floor(x_count / tilesX);
    const tileGridY = Math.floor(y_count / tilesY);

    console.log("Tile grid size:", tileGridX, "x", tileGridY);

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

          // Get size of mesh
          const boundingBox = new THREE.Box3().setFromObject(mergedMesh);
          const size = new THREE.Vector3();
          boundingBox.getSize(size);

          // Scale to user's desired physical dimensions
          // const desiredWidth = physicalWidth / tilesX; // Desired width for each tile
          // const currentWidth = size.x; // Current width for each tile
          // const scaleFactorX = desiredWidth / currentWidth;
          // console.log("desiredWidth:", desiredWidth, "currentWidth:", currentWidth, "scaleFactorX:", scaleFactorX);

          // const desiredHeight = physicalHeight / tilesY;
          // const currentHeight = size.z;
          // const scaleFactorZ = desiredHeight / currentHeight;
          // console.log("desiredHeight:", desiredHeight, "currentHeight:", currentHeight, "scaleFactorZ:", scaleFactorZ);

          // const scaleFactorY = (scaleFactorX + scaleFactorZ) / 2; // average for Y to keep proportions
          // mergedMesh.scale.set(scaleFactorX, scaleFactorZ, scaleFactorY);
          
          // Center the mesh for this tile
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

function centerMesh() {
  const boundingBox = new THREE.Box3().setFromObject(singletonMesh);
  const size = new THREE.Vector3();
  boundingBox.getSize(size);
  
  singletonMesh.position.x -= boundingBox.min.x + size.x/2;
  singletonMesh.position.y -= boundingBox.min.y + size.y/2;
  singletonMesh.position.z -= boundingBox.min.z + size.z/2;
  singletonMesh.updateMatrix();

  // const bb = new THREE.Box3().setFromObject(singletonMesh);
  // console.log("bounding box after centering", bb);
}

function scaleByDemDimensions() {
  // for (let i = 0; i < tileMeshes.length; i++) {
  //   const mesh = tileMeshes[i];

    const bb = new THREE.Box3().setFromObject(singletonMesh);
    // console.log("bounding box before", bb)

    // Apply scaling to each mesh based on DEM dimensions
    const selectedGeotiff = getSelectedGeotiff();
    const georaster = selectedGeotiff.georasters[0];
    const metersPerWidthPixel = georaster.pixelWidth;
    const metersPerHeightPixel = georaster.pixelHeight;
    // singletonMesh.scale.set(metersPerWidthPixel, metersPerHeightPixel, 1);
    singletonMesh.scale.multiply(new THREE.Vector3(metersPerWidthPixel, metersPerHeightPixel, 1));

    const boundingBox = new THREE.Box3().setFromObject(singletonMesh);
    // console.log("bounding box after", boundingBox)
  // }
}

function calculateRatio() {
  // Get the merged mesh's bounding box
  const boundingBox = new THREE.Box3().setFromObject(singletonMesh);
  const size = new THREE.Vector3();
  boundingBox.getSize(size);

  let physicalWidth = parseFloat(document.getElementById("physicalWidthInput").value); // mm
  let physicalHeight = parseFloat(document.getElementById("physicalHeightInput").value); // mm

  const ratio = Math.min(physicalWidth / size.x, physicalHeight / size.z);
  return ratio;
}

function scaleByTargetDimensions(ratio) {
  // for (let i = 0; i < tileMeshes.length; i++) {
  //   const mesh = tileMeshes[i];
    // singletonMesh.scale.set(ratio, ratio, 1);
    singletonMesh.scale.multiply(new THREE.Vector3(ratio, ratio, 1));
    // singletonMesh.scale.set(10,10,10);
    
    const bb = new THREE.Box3().setFromObject(singletonMesh);
    // console.log("bounding box after target scale", bb);
  // }
}

// function splitMeshIntoTiles(bedWidth, bedHeight, maxHeight = 2000) {
//   if (!singletonMesh) {
//     console.error("singletonMesh not found.");
//     return [];
//   }

//   const boundingBox = new THREE.Box3().setFromObject(singletonMesh);
//   const min = boundingBox.min;
//   const size = boundingBox.getSize(new THREE.Vector3());

//   const tilesX = Math.ceil(size.x / bedWidth);
//   const tilesY = Math.ceil(size.z / bedHeight);

//   const tileMeshes = [];

//   for (let tx = 0; tx < tilesX; tx++) {
//     for (let ty = 0; ty < tilesY; ty++) {
//       // Make a clipping box for this tile
//       const boxGeom = new THREE.BoxGeometry(bedWidth, maxHeight, bedHeight);
//       const boxMesh = new THREE.Mesh(boxGeom, new THREE.MeshStandardMaterial());

//       // Position the clipping box correctly
//       boxMesh.position.set(
//         min.x + tx * bedWidth + bedWidth / 2,
//         min.y + maxHeight / 2, // lift it up so it covers vertically
//         min.z + ty * bedHeight + bedHeight / 2
//       );

//       // Intersect with terrain
//       const tileCSG = CSG.intersect(singletonMesh, boxMesh);

//       if (tileCSG) {
//         tileCSG.material = singletonMesh.material.clone();
//         scene.add(tileCSG);
//         tileMeshes.push(tileCSG);
//       }
//     }
//   }

//   console.log("Created", tileMeshes.length, "CSG tile meshes");
//   return tileMeshes;
// }

function createTileBoxes(physicalWidth, physicalHeight, bedWidth, bedHeight) {
  if (!singletonMesh) {
    console.error("singletonMesh not found.");
    return [];
  }

  // Get bounding box of DEM after all transforms
  const boundingBox = new THREE.Box3().setFromObject(singletonMesh);
  const min = boundingBox.min;
  const size = boundingBox.getSize(new THREE.Vector3());
  console.log("DEM bounding box:", boundingBox);

  const bounding_w = size.x;
  const bounding_h = size.z;

  // Number of tiles horizontally and vertically
  const numTilesX = Math.ceil(physicalWidth / bedWidth);
  const numTilesY = Math.ceil(physicalHeight / bedHeight);

  console.log(`Chessboard: ${numTilesX} x ${numTilesY} tiles`);

  const tileBoxes = [];

  for (let i = 0; i < numTilesY; i++) {
    for (let j = 0; j < numTilesX; j++) {
      // Create a thin box (just a wireframe outline for now)
      const tileWidth = bounding_w / numTilesX;
      const tileHeight = bounding_h / numTilesY;
      
      const boxGeom = new THREE.BoxGeometry(tileWidth, 2, tileHeight);
      // const wireMat = new THREE.MeshBasicMaterial({ color: 0x0000ff, wireframe: true });
      // Alternate colors like a checkerboard
      const isEven = (i + j) % 2 === 0;
      const color = isEven ? 0x00ff00 : 0x0000ff; // green / blue
      const mat = new THREE.MeshBasicMaterial({
        color: color,
        transparent: true,
        opacity: 0.25, // semi-transparent
      });
      const tileBox = new THREE.Mesh(boxGeom, mat);

      // Position box on the chessboard
      const xPos = min.x + j * tileWidth + tileWidth / 2; // do tileWidth/2 to shift to center of this tile (because Three.js positions meshes at their center, not corner)
      const zPos = min.z + i * tileHeight + tileHeight / 2;
      const yPos = min.y; // keep it aligned with base of DEM
      tileBox.position.set(xPos, yPos, zPos);

      scene.add(tileBox);
      tileBoxes.push(tileBox);
    }
  }

  return tileBoxes;
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
  const metersPerDegreeLon = Math.abs(circumference * Math.cos(centerLat * Math.PI / 180) / 360);
  const metersPerWidthPixel = georaster.pixelWidth * metersPerDegreeLat;
  const metersPerHeightPixel = georaster.pixelHeight * metersPerDegreeLon;
  const demWidth = metersPerWidthPixel * georaster.width;
  const demHeight = metersPerHeightPixel * georaster.height;
  return demHeight / demWidth;
}

function getShapeAspectRatio() {
  const shape = getSelectedShape();
  if (!shape) return 1;

  const pxBounds = shape._pxBounds;
  const width  = pxBounds.max.x - pxBounds.min.x;
  const height = pxBounds.max.y - pxBounds.min.y;
  
  return height / width;
}

function convertElevationInto2DArray(myElevation, grid_x, grid_y) {
  const elevation2D = [];
  for (let i = 0; i < grid_y; i++) {
    const row = [];
    for (let j = 0; j < grid_x; j++) {
      const index = i * grid_x + j;
      row.push(myElevation[index]);
    }
    elevation2D.push(row);
  }
  return elevation2D;
}

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

export let partitionMeshes = [];
/**
 * Build one binary mask per label in a label map and call createMesh() for each.
 * Returns an object mapping labelId -> mesh (added to scene).
 *
 * label_map: either 2D array [rows][cols] or flattened 1D array length grid_x*grid_y
 * elevation_m: flattened 1D elevation array (same ordering as createMesh expects)
 * grid_x, grid_y, physicalWidth, physicalHeight, base: passed to createMesh
 */
function createMeshesFromLabelMap(label_map, elevation_m, grid_x, grid_y, physicalWidth, physicalHeight, base, opts = {}) {
  console.log("Partitioning...");

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

  // normalize label map to flattened row-major array (same ordering as flattenedElevation earlier)
  let label_flat = [];
  if (!label_map) console.warn("No label map provided");
  for (let i = 0; i < label_map.length; i++) {
    for (let j = 0; j < label_map[i].length; j++) {
      label_flat.push(label_map[i][j]);
    }
  }

  const total = parseInt(grid_x) * parseInt(grid_y);
  if (label_flat.length !== total) {
    console.warn("Label map size doesn't match grid_x*grid_y:", label_flat.length, "vs", total);
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
    createMesh(base, grid_x, grid_y, elevation_m, mask, physicalWidth, physicalHeight);

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

  // cleanup: remove the last singletonMesh produced by createMesh (we saved clones)
  if (singletonMesh) {
    scene.remove(singletonMesh);
    singletonMesh = null;
  }

  return partitionMeshes;
}