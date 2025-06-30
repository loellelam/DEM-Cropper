/*
* This file contains the function to export the DEM mesh as a .stl file
*/
import { singletonMesh } from './dem-mesh.js';
import { STLExporter } from 'three/addons/exporters/STLExporter.js';

export function initExporter() {
  document.getElementById("exportButton").addEventListener("click", function () {
    if (singletonMesh) {
      exportMesh(singletonMesh);
    }
    else {
      window.alert("No mesh to export. Generate a mesh first.");
    }
  });
  
  function exportMesh(mesh) {
    const exporter = new STLExporter();
    const options = { binary: true }
    const str = exporter.parse( mesh, options );
    var blob = new Blob( [str], { type : 'text/plain' } ); // Generate Blob from the string
    
    // Save blob as a file
    var link = document.createElement('a');
    link.style.display = 'none';
    document.body.appendChild(link);
    link.href = URL.createObjectURL(blob);
    link.download = 'DEM.stl';
    link.click();
  }  
}
