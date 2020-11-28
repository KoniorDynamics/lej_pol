import os

import joblib
from flask import Flask, request, jsonify
import pandas as pd


app = Flask(__name__)
base_dir = os.path.abspath(os.path.dirname(__file__))


model = joblib.load(open(os.path.join(base_dir, 'models', 'model_whole_test.joblib'), 'rb'))

SANITARY_EQUIPMENT = {
    0: "tap",
    1: "shower",
    2: "dishwasher",
    3: "washing machine",
    4: "shower + washing machine",
    5: "shower + dishwasher",
    6: "shower + tap",
    7: "dishwasher + tap",
    8: "tap + washing machine",
    9: "dishwasher + washing machine",
}


@app.route('/model_ml', methods=['POST'])
def predict():
    data = request.get_json(force=True)
    df = pd.DataFrame(data['data'])
    prediction = model.predict(df)
    output = f"Class: {SANITARY_EQUIPMENT[prediction[0]]}"
    return jsonify(output)

