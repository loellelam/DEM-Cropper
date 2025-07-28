/*
* This file contains the function to export the DEM mesh as a .stl file
*/
import { singletonMesh, tileMeshes } from './dem-mesh.js';
import { STLExporter } from 'three/addons/exporters/STLExporter.js';
import JSZip from 'jszip';

export function initExporter() {
  document.getElementById("exportButton").addEventListener("click", async function () {
    if (singletonMesh) {
      exportMesh(singletonMesh, 'DEM.stl');
    }
    else if (tileMeshes && tileMeshes.length > 0) {
      // Export all tile meshes as STL and zip them
      const zip = new JSZip();
      const exporter = new STLExporter();
      for (let i = 0; i < tileMeshes.length; i++) {
        const mesh = tileMeshes[i];
        // Revert the rotation for export
        const originalRotation = mesh.rotation.x;
        mesh.rotation.x -= 3 * Math.PI / 2;
        mesh.updateMatrixWorld();

        const options = { binary: true };
        const stlData = exporter.parse(mesh, options);

        // Restore rotation
        mesh.rotation.x = originalRotation;
        mesh.updateMatrixWorld();
        
        // Wrap STL data in a Blob for JSZip compatibility
        const stlBlob = new Blob([stlData], { type: 'application/octet-stream' });
        zip.file(`DEM_tile_${i+1}.stl`, stlBlob);
      }
      // Generate zip and trigger download
      zip.generateAsync({ type: 'blob' }).then(function(content) {
        var link = document.createElement('a');
        link.style.display = 'none';
        document.body.appendChild(link);
        link.href = URL.createObjectURL(content);
        link.download = 'DEM_tiles.zip';
        link.click();
      });      
    }
    else {
      window.alert("No mesh to export. Generate a mesh first.");
    }
  });
  
  function exportMesh(mesh, filename = 'DEM.stl') {
    // Revert the rotation applied in dem-mesh.js (rotateX(3*Math.PI/2))
    const originalRotation = mesh.rotation.x;
    mesh.rotation.x -= 3 * Math.PI / 2;
    mesh.updateMatrixWorld();

    const exporter = new STLExporter();
    const options = { binary: true }
    const str = exporter.parse(mesh, options);
    var blob = new Blob([str], { type: 'text/plain' });

    // Restore the original rotation
    mesh.rotation.x = originalRotation;
    mesh.updateMatrixWorld();

    // Save blob as a file
    var link = document.createElement('a');
    link.style.display = 'none';
    document.body.appendChild(link);
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
  }
}
