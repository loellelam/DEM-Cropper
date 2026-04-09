from flask import Flask, request, jsonify
from flask_cors import CORS
import ai_partitioning  # AI mesh-cutting module

app = Flask(__name__)
CORS(app)  # allow frontend access

@app.route('/api/process', methods=['POST'])
def process_mesh():
  data = request.json  # receive JSON data from frontend
  elevation = data.get("maskedElevation2D")
  physical_width = data.get("physicalWidth")
  physical_height = data.get("physicalHeight")
  bed_width = data.get("bedWidth")
  bed_height = data.get("bedHeight")

  result = ai_partitioning.find_best_cut(elevation, physical_width, physical_height, bed_width, bed_height)

  return jsonify({"best_cut": result})

if __name__ == '__main__':
  app.run(port=5000, debug=True)
