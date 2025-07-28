/*
* This file contains the function to export the DEM mesh as a .stl file
*/
import { getSelectedGeotiff } from './selection.js';
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

      // Get GeoTIFF filename (without extension)
      let geotiffName = 'DEM';
      const selectedGeotiff = getSelectedGeotiff();
      if (selectedGeotiff?.georasters?.[0]?.filename) {
        geotiffName = selectedGeotiff.georasters[0].filename.replace(/\.[^/.]+$/, "");
      }
      // Timestamp for uniqueness
      const now = new Date();
      const pad = n => n.toString().padStart(2, '0');
      // YYYYMMDD-HHmm
      const timestamp = `${now.getFullYear()}${pad(now.getMonth()+1)}${pad(now.getDate())}-${pad(now.getHours())}${pad(now.getMinutes())}`;

      // Calculate tile grid (col/row) for naming
      let tilesX = 1, tilesY = tileMeshes.length;
      if (selectedGeotiff && selectedGeotiff.tilesX && selectedGeotiff.tilesY) {
        tilesX = selectedGeotiff.tilesX;
        tilesY = selectedGeotiff.tilesY;
      } else if (window.lastTilesX && window.lastTilesY) {
        tilesX = window.lastTilesX;
        tilesY = window.lastTilesY;
      }

      for (let i = 0; i < tileMeshes.length; i++) {
        const mesh = tileMeshes[i];
        // Calculate col/row (1-based)
        let col = (i % tilesX) + 1;
        let row = Math.floor(i / tilesX) + 1;
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
        zip.file(`${geotiffName}_${timestamp}_tile${col}x${row}.stl`, stlBlob);
      }
      // Generate zip and trigger download
      zip.generateAsync({ type: 'blob' }).then(function(content) {
        var link = document.createElement('a');
        link.style.display = 'none';
        document.body.appendChild(link);
        link.href = URL.createObjectURL(content);
        link.download = `${geotiffName}_${timestamp}.zip`;
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

    // Use geotiff name and timestamp for filename if possible
    let geotiffName = 'DEM';
    const selectedGeotiff = getSelectedGeotiff();
    if (selectedGeotiff?.georasters?.[0]?.filename) {
      geotiffName = selectedGeotiff.georasters[0].filename.replace(/\.[^/.]+$/, "");
    }
    const now = new Date();
    const pad = n => n.toString().padStart(2, '0');
    // YYYYMMDD-HHmm
    const timestamp = `${now.getFullYear()}${pad(now.getMonth()+1)}${pad(now.getDate())}-${pad(now.getHours())}${pad(now.getMinutes())}`;
    // For single mesh, no tile info
    const finalName = filename === 'DEM.stl' ? `${geotiffName}_${timestamp}.stl` : filename;

    // Save blob as a file
    var link = document.createElement('a');
    link.style.display = 'none';
    document.body.appendChild(link);
    link.href = URL.createObjectURL(blob);
    link.download = finalName;
    link.click();
  }
}
