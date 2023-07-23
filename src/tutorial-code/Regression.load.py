import joblib
from keras.models import load_model

model = load_model('./call_prediction.keras')
scale_y = joblib.load('./call_prediction_scaler.gz')

scaled_prediction = model.predict([5])
prediction = scale_y.inverse_transform(scaled_prediction) # [[64.86503]]