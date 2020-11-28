import os

from flask import Flask, request, jsonify
import xgboost as xgb
import numpy as np

app = Flask(__name__)
base_dir = os.path.abspath(os.path.dirname(__file__))
bst = xgb.Booster({'nthread': 4})  # init model
bst.load_model(os.path.join(base_dir, 'models', 'test.txt'))  # load data


@app.route('/model_ml', methods=['POST'])
def predict():
    print('tutaj2')
    data = request.get_json(force=True)

    data_to_classify = xgb.DMatrix(np.ndarray(list(data['data'].values()), dtype=float))
    print('tutaj3')
    prediction = bst.predict(data_to_classify)
    # output_text = f"Text: {data['da']}"
    output = f"Class: {prediction}"
    return jsonify(output)
