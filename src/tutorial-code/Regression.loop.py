import pandas as pd
from keras.layers import Dense
from keras.models import Sequential
from sklearn.preprocessing import MinMaxScaler
from tensorflow.keras.callbacks import Callback

class LossHistory(Callback):
    def on_train_begin(self, logs={}):
        self.losses = []

    def on_batch_end(self, batch, logs={}):
        self.losses.append(logs.get('loss'))

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

layer_count = 1
cur_layer_neurons = 1
max_neurons = 10
target_loss = 0.01

while (True):
    print('Training', layer_count, 'layer,', cur_layer_neurons, 'neurons')
    history = LossHistory()
    model = Sequential()

    for i in range(layer_count - 1):
        model.add(Dense(max_neurons, activation='relu'))

    model.add(Dense(cur_layer_neurons, activation='relu'))
    model.add(Dense(1))

    model.compile(loss='mse', optimizer='adam')

    model.fit(x, y, epochs=100, batch_size=10, verbose=0, callbacks=[history])

    if history.losses[-1] <= target_loss:
        print('Loss below', target_loss, ', done training')
        break
    else:
        print('Loss was', history.losses[-1])

    if cur_layer_neurons == max_neurons:
        layer_count += 1
        cur_layer_neurons = 1
    else:
        cur_layer_neurons += 1