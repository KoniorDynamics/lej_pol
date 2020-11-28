import os

import joblib
import pandas as pd


base_dir = os.path.abspath(os.path.dirname(__file__))


model = joblib.load(open(os.path.join(base_dir, 'models_ml', 'model_whole_test.joblib'), 'rb'))

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


def predict(data):
    df = pd.DataFrame(data['data'])
    prediction = model.predict_proba(df)[0].tolist()
    if max(prediction) >= 0.80:
        index = prediction.index(max(prediction))
        output = {'element1': SANITARY_EQUIPMENT[index]}
    else:
        max_values = [0, 0]

        for i, x in enumerate(prediction):
            if x >= min(max_values):
                max_values[max_values.index(min(max_values))] = x
        index1 = prediction.index(max_values[0])
        index2 = prediction.index(max_values[1])
        output = {
            'element1': SANITARY_EQUIPMENT[index1],
            'element2': SANITARY_EQUIPMENT[index2]
        }
    return output
