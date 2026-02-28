import * as THREE from 'three';
import { CSG } from 'three-csg-ts';
import { singletonMesh, scene } from './dem-mesh.js';

// Cut the DEM mesh with a vertical plane at x = cutX
export function cutMeshWithPlane(cutX = 0) {
  if (!singletonMesh) {
    console.error('No DEM mesh to cut.');
    return;
  }

  // Get bounding box to determine size for the cutting boxes
  const bbox = new THREE.Box3().setFromObject(singletonMesh);
  const size = bbox.getSize(new THREE.Vector3());
  const center = bbox.getCenter(new THREE.Vector3());

  // Make two large boxes to represent the two half-spaces
  // Box for left side (x < cutX)
  const leftBoxGeom = new THREE.BoxGeometry(
    size.x, size.y * 2, size.z
  );
  const leftBox = new THREE.Mesh(leftBoxGeom, new THREE.MeshBasicMaterial({ color: 0x00ff00, opacity: 0.5, transparent: true }));
  leftBox.position.set(
    bbox.min.x + (cutX - bbox.min.x) / 2,
    center.y,
    center.z
  );
  leftBox.scale.x = (cutX - bbox.min.x) / size.x;
  leftBox.updateMatrixWorld();

  // Box for right side (x > cutX)
  const rightBoxGeom = new THREE.BoxGeometry(
    size.x, size.y * 2, size.z
  );
  const rightBox = new THREE.Mesh(rightBoxGeom, new THREE.MeshBasicMaterial({ color: 0x00ffff, wireframe: false, opacity: 0.5, transparent: true }));
  rightBox.position.set(
    cutX + (bbox.max.x - cutX) / 2,
    center.y,
    center.z
  );
  rightBox.scale.x = (bbox.max.x - cutX) / size.x;
  rightBox.updateMatrixWorld();

  scene.add(leftBox);
  scene.add(rightBox);

  
  // CSG intersection to get each half
  const leftMesh = CSG.intersect(singletonMesh, leftBox);
  const rightMesh = CSG.intersect(singletonMesh, rightBox);

  // Assign materials and add to scene
  if (leftMesh) {
    leftMesh.material = new THREE.MeshStandardMaterial({ color: 0x00ff00, side: THREE.DoubleSide });
    leftMesh.position.copy(singletonMesh.position);
    scene.add(leftMesh);
  }
  if (rightMesh) {
    rightMesh.material = new THREE.MeshStandardMaterial({ color: 0xff0000, side: THREE.DoubleSide });
    rightMesh.position.copy(singletonMesh.position);
    scene.add(rightMesh);
  }

  // Remove the original mesh
  scene.remove(singletonMesh);
  

  return { leftMesh, rightMesh };
}

export function testCSGWithBoxes() {
  // Create two overlapping boxes
  const boxA = new THREE.Mesh(
    new THREE.BoxGeometry(20, 20, 20),
    new THREE.MeshStandardMaterial({ color: 0x0000ff, opacity: 0.5, transparent: true })
  );
  boxA.position.set(0, 0, 0);

  const boxB = new THREE.Mesh(
    new THREE.BoxGeometry(20, 20, 20),
    new THREE.MeshStandardMaterial({ color: 0xff0000, opacity: 0.5, transparent: true })
  );
  boxB.position.set(10, 0, 0); // Overlaps with boxA
  boxB.updateMatrixWorld();


  scene.add(boxA);
  scene.add(boxB);

  // Perform CSG intersection
  const result = CSG.intersect(boxA, boxB);

  if (result) {
    result.material = new THREE.MeshStandardMaterial({ color: 0xffff00, opacity: 0.9, transparent: true });
    scene.add(result);
    console.log('CSG intersection succeeded:', result);
  } else {
    console.error('CSG intersection failed.');
  }
}