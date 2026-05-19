/*
* This file contains the function to export the DEM mesh as a .stl file
*/
import { getSelectedGeotiff } from './selection.js';
import { singletonMesh, partitionMeshes } from './dem-mesh.js';
import { STLExporter } from 'three/addons/exporters/STLExporter.js';
import JSZip from 'jszip';

export function initExporter() {
  document.getElementById("exportButton").addEventListener("click", async function () {
    if (singletonMesh) {
      exportSingletonMesh(singletonMesh, 'DEM.stl');
    }
    else if (partitionMeshes && partitionMeshes.length > 0) {
      exportPartitionMeshes(partitionMeshes);
    }
    else {
      window.alert("No mesh to export. Generate a mesh first.");
    }
  });
  
  function exportSingletonMesh(mesh, filename = 'DEM.stl') {
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

  function exportPartitionMeshes(partitions) {
    if (!partitions || Object.keys(partitions).length === 0) {
      window.alert("No partition meshes to export.");
      return;
    }

    // Prepare naming
    let geotiffName = 'DEM';
    const selectedGeotiff = getSelectedGeotiff();
    if (selectedGeotiff?.georasters?.[0]?.filename) {
      geotiffName = selectedGeotiff.georasters[0].filename.replace(/\.[^/.]+$/, "");
    }
    const now = new Date();
    const pad = n => n.toString().padStart(2, '0');
    const timestamp = `${now.getFullYear()}${pad(now.getMonth()+1)}${pad(now.getDate())}-${pad(now.getHours())}${pad(now.getMinutes())}`;

    const entries = Object.entries(partitions);
    const exporter = new STLExporter();
    const zip = new JSZip();

    for (const [label, mesh] of entries) {
      if (!mesh) continue;
      const originalRotation = mesh.rotation.x;
      mesh.rotation.x -= 3 * Math.PI / 2;
      mesh.updateMatrixWorld();

      const options = { binary: true };
      const stlData = exporter.parse(mesh, options);

      mesh.rotation.x = originalRotation;
      mesh.updateMatrixWorld();

      const stlBlob = new Blob([stlData], { type: 'application/octet-stream' });
      zip.file(`${geotiffName}_${timestamp}_part${label}.stl`, stlBlob);
    }

    zip.generateAsync({ type: 'blob' }).then(function(content) {
      var link = document.createElement('a');
      link.style.display = 'none';
      document.body.appendChild(link);
      link.href = URL.createObjectURL(content);
      link.download = `${geotiffName}_${timestamp}_partitions.zip`;
      link.click();
    });
  }
}
