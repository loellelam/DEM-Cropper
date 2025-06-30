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
    window.alert("Please select a geotiff in Step 1 first.");
    return;
  }

  switchToTab("demView"); // Switch to the 3D Model tab

  const base = 0.2;

  const georaster = selectedGeotiff.georasters[0];
  const grid_x = georaster.width;
  const grid_y = georaster.height;
  let myElevation = georaster.values[0];
  const flattenedArr = [];
  for (let i = 0; i < myElevation.length; i++) {
    for (let j = 0; j < myElevation[i].length; j++) {
      // if (myElevation[i][j] < 0) myElevation[i][j] = 0;
      flattenedArr.push(myElevation[i][j] * 0.0005); // adjust for more manageable elevations
    }
  }
  myElevation = flattenedArr;

  const myMask = createBinaryMask(georaster, getSelectedShape());

  createMesh(base, grid_x, grid_y, myElevation, myMask);
}

// Start of Three.js scene setup
const scene = new THREE.Scene();
scene.add(new THREE.AxesHelper(200));

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

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 5;

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
function createMesh(base, grid_x, grid_y, elevation_m, mask_m) {
    if (singletonMesh) scene.remove(singletonMesh);
    const z_base = -Math.abs(parseInt(base));
    
    grid_y = grid_x; // aspect ratio must be 1:1, otherwise it looks skewed

    const x_count = parseInt(grid_x);
    const x_step = 10/x_count; // 10 is arbitrarily chosen
    
    const y_count = parseInt(grid_y); 
    const y_step = 10/y_count; 

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

    const max_dim = Math.max(size.x, size.y, size.z);
    const scale = 3/max_dim; // for resizing it to a size of 3 units

    singletonMesh.scale.set(scale, scale, scale);
    singletonMesh.updateMatrix();
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

// Helper for createMesh: Get the 1d coord based on the 2d x,y coord
function get_x_y(arr, x, y, x_count, y_count) {
  if (x>=x_count || y >= y_count) return null; //if dimensions are out of bounds, return null
  const flippedY = y_count - 1 - y; // flip the y-axis
  return arr[flippedY * x_count + x]; // returns the value (0 or 1) at specified location
  // return arr[y * (x_count + 1) + x];
}
