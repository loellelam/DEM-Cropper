// Call sendMeshToBackend(meshData) when data is ready to be sent to backend for AI processing
export async function sendMeshToBackend(maskedElevation2D, physicalWidth, physicalHeight, bedWidth, bedHeight) {
  const result = await fetch('http://localhost:5000/api/process', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ maskedElevation2D, physicalWidth, physicalHeight, bedWidth, bedHeight })
  });
  const data = await result.json();
  return data;
}