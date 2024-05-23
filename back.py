# backend.py
from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import requests

app = Flask(__name__)
CORS(app)
JSON_SERVER_URL = 'http://localhost:3000/calculations'

def save_to_json(data):
    response = requests.post(JSON_SERVER_URL, json=data)
    return response.json()

@app.route('/calculate_std', methods=['POST'])
def calculate_std():
    data = request.json.get('data')
    std_deviation = np.std(data)
    mean = np.mean(data)
    calculation_data = {
        "data": data,
        "mean": mean,
        "std_deviation": std_deviation
    }
    save_to_json(calculation_data)
    return jsonify({'std_deviation': std_deviation})

if __name__ == '__main__':
    app.run(debug=True)
