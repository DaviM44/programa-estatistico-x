from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np

app = Flask(__name__)
CORS(app)

@app.route('/calculate_std', methods=['POST'])
def calculate_std():
    data = request.json['data']
    mean = np.mean(data)
    std_deviation = np.std(data)
    return jsonify({
        'mean': mean,
        'std_deviation': std_deviation
    })

if __name__ == '__main__':
    app.run(debug=True)
