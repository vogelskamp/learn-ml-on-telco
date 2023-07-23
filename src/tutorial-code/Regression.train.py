import joblib
import matplotlib.pyplot as plt
import pandas as pd
from keras.layers import Dense
from keras.models import Sequential
from sklearn.preprocessing import MinMaxScaler

def aggregate_by_day_hour(df: pd.DataFrame):

    # Create a new column for the date and 15-minute intervals
    df['date_hour'] = df['date_create'].dt.floor('H')

    # Group the rows by the date_quarter_hour column and count the rows
    aggregated_df = df.groupby('date_hour').count()

    return aggregated_df

df = pd.read_csv('./call_history.csv')

# date_create zu datetime casten
df['date_create'] = pd.to_datetime(df['date_create'])

aggregated_df = aggregate_by_day_hour(df)

x = aggregated_df.index.hour.to_numpy().reshape(-1, 1)
y = aggregated_df['date_create'].to_numpy().reshape(-1, 1)

scale_y = MinMaxScaler()
y = scale_y.fit_transform(y)

model = Sequential()
model.add(Dense(10, activation='relu'))
model.add(Dense(10, activation='relu'))
model.add(Dense(1))

model.compile(loss='mse', optimizer='adam')
model.fit(x, y, epochs=100, batch_size=10, verbose=1)

yhat = model.predict(x)

y_plot = scale_y.inverse_transform(y)
yhat_plot = scale_y.inverse_transform(yhat)

plt.scatter(x, y_plot, label='Actual')
plt.scatter(x, yhat_plot, label='Predicted')
plt.xlabel('Uhrzeit')
plt.ylabel('Anrufe')
plt.legend()
plt.xticks(range(0, 25, 4))
plt.show()

model.save('./call_prediction.keras')

joblib.dump(scale_y, './call_prediction_scaler.gz')