// Call sendMeshToBackend(meshData) when data is ready to be sent to backend for AI processing
export async function sendMeshToBackend(maskedElevation2D, physicalWidth, physicalHeight, bedWidth, bedHeight) {
  let API_BASE;
  if (window.location.hostname === "localhost") {
    API_BASE = "http://localhost:5000";
  }
  else {
    API_BASE = "https://loelle-dem-cropper.cis230038.projects.jetstream-cloud.org";
  }
  
  const result = await fetch(`${API_BASE}/api/process`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ maskedElevation2D, physicalWidth, physicalHeight, bedWidth, bedHeight })
  });
  const data = await result.json();
  return data;
}