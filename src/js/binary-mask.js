/*
* This file defines a function that creates a binary mask for a given shape over a Geotiff raster
*/

export function createBinaryMask(geoRaster, shape) {
  // Extract geotiff dimensions and bounds
  const width = geoRaster.width;
  const height = geoRaster.height;
  const bounds = shape.getBounds(); // Get geographic bounds
  const minLng = geoRaster.xmin, maxLat = geoRaster.ymax;
  const maxLng = geoRaster.xmax, minLat = geoRaster.ymin;

  // Initialize mask array with 0s
  let mask = Array.from({ length: height }, () => Array(width).fill(0));

  // Convert geographic coords (lat,lng) to pixel coordinates (x,y)
  function latLngToPixel(lat, lng) {
    if (lat === undefined || lng === undefined) {
      console.error("Invalid lat/lng:", { lat, lng });
      return { x: NaN, y: NaN };
    }
    const x = Math.floor(((lng - minLng) / (maxLng - minLng)) * width);
    const y = Math.floor(((maxLat - lat) / (maxLat - minLat)) * height);
    return {
      x: Math.max(0, Math.min(width - 1, x)),  // Clamp x within [0, width-1] to prevent out of bounds masking
      y: Math.max(0, Math.min(height - 1, y)) // Clamp y within [0, height-1]
    };
  }

  // Convert shape's latlng coordinates to pixel coordinates
  let polygonPixels = []; // an array of arrays
  if (shape instanceof L.Circle) { // Handle circles differently bc L.circle doesn't have getLatLngs()
    const center = shape.getLatLng();
    const radius = shape.getRadius();

    // Approximate the circle as a polygon with 64 points
    const numPoints = 64;
    const latLngs = [];
    for (let i = 0; i < numPoints; i++) {
      const angle = (i / numPoints) * 2 * Math.PI;
      const lat = center.lat + (radius / 111320) * Math.cos(angle); // Approximate latitude
      const lng = center.lng + (radius / (111320 * Math.cos((center.lat * Math.PI) / 180))) * Math.sin(angle); // Approximate longitude
      latLngs.push({ lat, lng });
    }

    polygonPixels.push(latLngs.map(latlng => latLngToPixel(latlng.lat, latlng.lng)));
  }
  else if (shape.getLatLngs) {
    const latLngs = shape.getLatLngs();

    // Handle MultiPolygon
    if (latLngs.length > 1) {
      // Iterates through each polygon and its rings, converting all vertices to pixel coordinates
      latLngs.forEach(polygon => {
        polygon.forEach(ring => {
          const ringPixels = ring.map(latlng => latLngToPixel(latlng.lat, latlng.lng));
          polygonPixels.push(ringPixels);
        });
      });
    }
    else {
      // Handle Polygon and Rectangle
      polygonPixels.push(latLngs[0].map(latlng => latLngToPixel(latlng.lat, latlng.lng)));
    }
  }
  else {
    console.error("Unsupported shape type:", shape);
    return null;
  }

  // console.log("Shape Coordinates:", shape.getLatLngs ? shape.getLatLngs() : shape.getLatLng());
  // console.log("Polygon Pixels:", polygonPixels);

  // Function to check if a point is inside the polygon (Ray-Casting Algorithm)
  function isPointInPolygon(x, y, polygon) {
    let inside = false;
    let j = polygon.length - 1;
    for (let i = 0; i < polygon.length; i++) {
      let xi = polygon[i].x, yi = polygon[i].y;
      let xj = polygon[j].x, yj = polygon[j].y;
      let intersect = ((yi > y) !== (yj > y)) &&
                      (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
      if (intersect) inside = !inside;
      j = i;
    }
    return inside;
  }

  // Get pixel bounds of the shape
  // These bounds define the area of the raster grid that needs to be checked
  const topLeft = latLngToPixel(bounds.getNorth(), bounds.getWest());
  const bottomRight = latLngToPixel(bounds.getSouth(), bounds.getEast());

  // For each polygon, iterate through the bounding box and check if each pixel is inside the polygon
  for (let i = 0; i < polygonPixels.length; i++) {
    // Iterate through bounding box and check if each pixel is inside the polygon
    for (let y = topLeft.y; y <= bottomRight.y; y++) {
      for (let x = topLeft.x; x <= bottomRight.x; x++) {
        if (isPointInPolygon(x, y, polygonPixels[i])) {
          mask[y][x] ^= 1; // Mark as inside/outside the polygon by using bitwise XOR
        }
      }
    }
  }

  // convert to 1d array because createMesh uses 1d
  const flattenedArr = [];
  for (let i = 0; i < mask.length; i++) {
    for (let j = 0; j < mask[i].length; j++) {
      flattenedArr.push(mask[i][j]);
    }
  }

  // let countM = 0;
  // for (let i = 0; i < flattenedArr.length; i++) {
  //   if (flattenedArr[i] == 1) {
  //     countM++;
  //   }
  // }
  // console.log("num of 1s in binary mask:", countM);
  // console.log("num of 0s in binary mask:", flattenedArr.length - countM);

  return flattenedArr;

  // return mask; //2d array
}
