import MLApplication from "../components/MLApplication";
import TutorialSection from "../components/TutorialSection";
// eslint-disable-next-line import/no-webpack-loader-syntax
import LoadCode from "!!raw-loader!../tutorial-code/Regression.load.py";
// eslint-disable-next-line import/no-webpack-loader-syntax
import LoopCode from "!!raw-loader!../tutorial-code/Regression.loop.py";
// eslint-disable-next-line import/no-webpack-loader-syntax
import TrainCode from "!!raw-loader!../tutorial-code/Regression.train.py";
import CodePhrase from "../components/CodePhrase";
import PythonHighlighter from "../components/PythonHighlighter";
import "./RegressionModel.scss";

function RegressionModel({ onClose }) {
  return (
    <MLApplication
      title={"TRANSKRIBIERUNG VON ANRUFEN"}
      example={getExample()}
      tutorial={getTutorial()}
      onClose={onClose}
    />
  );
}

function getExample() {
  return (
    <div className="content-area">
      <div>TBD</div>
    </div>
  );
}

function getTutorial() {
  const trainLines = TrainCode.split("\n");
  const loopLines = LoopCode.split("\n");

  const prepDataCode = [trainLines[2], ...trainLines.slice(6, 23)].join("\n");
  const inputOutputCode = trainLines.slice(24, 26).join("\n");
  const scaleInputCode = [trainLines[5], "", ...trainLines.slice(27, 29)].join(
    "\n"
  );
  const defineModelCode = trainLines.slice(30, 34).join("\n");
  const trainModelCode = trainLines.slice(35, 37).join("\n");
  const predictCode = [trainLines[1], "", ...trainLines.slice(38, 50)].join(
    "\n"
  );

  const saveCode = trainLines.slice(51, 54).join("\n");

  const loopCode = [...loopLines.slice(0, 12), "", ...loopLines.slice(36)].join(
    "\n"
  );
  return (
    <div className="tutorial">
      <TutorialSection
        text={
          <>
            Für diesen Anwendungsfall gibt es kein Modell auf Huggingface, also
            müssen wir ein eigenes Netz trainieren. Hierzu stellt die sipgate
            GmbH einen Datensatz der Call History einem/einer großen Kund:in
            bereit. Für uns ist an dieser Stelle lediglich relevant, wann der
            Anruf stattgefunden hat. Im Datensatz heißt dieser Wert{" "}
            <CodePhrase>date_create</CodePhrase>.
          </>
        }
      ></TutorialSection>
      <TutorialSection
        title="DATEN AUFBEREITEN"
        text={
          <>
            Um die Daten für unseren Anwendungsfall nutzen zu können, müssen wir
            sie zunächst aufbereiten. Aktuell steht in{" "}
            <CodePhrase>date_create</CodePhrase> der Timestamp, an dem der Call
            stattgefunden hat. Wir wollen stattdessen wissen, wie viele Anrufe
            in einer Stunde stattgefunden haben. Zur Aufbereitung der Daten
            nutzen wir das Python-Modul{" "}
            <a href="https://pandas.pydata.org/">pandas</a>. Das Modul stellt
            eine Funktion bereit, die Daten aus einer CSV-Datei einzulesen und
            über die <CodePhrase>groupBy()</CodePhrase> Methode nach einem
            bestimmten Kriterium zu gruppieren.
          </>
        }
      >
        <PythonHighlighter>{prepDataCode}</PythonHighlighter>
      </TutorialSection>
      <TutorialSection
        title="EINGABE UND AUSGABEWERTE DEFINIEREN"
        text={
          <>
            Als nächstes müssen wir definieren, welche Daten wir als Eingabe-
            und Ausgabewerte für das Training des Modells nutzen. In unserem
            Fall wollen wir als Eingabe die Stunde des Tages verwenden, also
            Werte von 0 bis 23. Als Ausgabe nutzen wir die Summe der in dieser
            Stunde getätigten Anrufe. Durch die vorherige Gruppierung wird das
            Datum aus <CodePhrase>date_create</CodePhrase> als Index verwendet,
            in der <CodePhrase>date_create</CodePhrase> Spalte selbst steht die
            Summe der Anrufe.
            <br />
            <br />
            Zuletzt müssen wir die Werte reshapen, da das von uns verwendete
            Modell ein 2D-Array erwartet, und nicht unser 1D-Array von Werten.
          </>
        }
      >
        <PythonHighlighter startLine={19}>{inputOutputCode}</PythonHighlighter>
      </TutorialSection>
      <TutorialSection
        title="WERTE SKALIEREN"
        text={
          <>
            Die Ausgabewerte des Modells können beliebig groß sein. Die
            Vorhersage dieser beliebig großen Werte macht ML Modelle jedoch
            instabil, weswegen wir sie stattdessen auf einen Wertebereich von 0
            bis 1 mappen. Die Library{" "}
            <a href="https://scikit-learn.org/stable/">SciKit Learn</a> stellt
            uns dafür einen <CodePhrase>MinMaxScaler</CodePhrase> zur Verfügung,
            der auf die Daten trainiert wird und für die Skalierung genutzt
            werden kann.
          </>
        }
      >
        <PythonHighlighter startLine={21}>{scaleInputCode}</PythonHighlighter>
      </TutorialSection>
      <TutorialSection
        title="MODELL DEFINIEREN"
        text={
          <>
            Jetzt können wir endlich unser Modell definieren. Wir nutzen hierfür
            die <a href="https://keras.io/">keras</a> Bibliothek von Tensorflow,
            um ein <CodePhrase>Sequential</CodePhrase> Modell zu erstellen. Dies
            bedeutet lediglich, dass die Schichten des Modells normal in
            Reihenfolge abgearbeitet werden. Nach dem Erstellen des Modells
            können wir die Layers des Modells definieren. Um das Input-Layer
            müssen wir uns nicht kümmern, das regelt Keras von alleine. Als
            Output-Layer wollen wir einen einzelnen Wert erhalten. Für unseren
            Anwendungsfall sollte ein kleines Modell mit wenig Parametern
            vollkommen ausreichen, weshalb wir uns für zwei Layer mit je 10
            Neuronen entscheiden (mehr dazu später).
          </>
        }
      >
        <PythonHighlighter startLine={25}>{defineModelCode}</PythonHighlighter>
      </TutorialSection>
      <TutorialSection
        title="MODELL TRAINIEREN"
        text={
          <>
            Es ist soweit! Das Modell kann trainiert werden. Zunächst
            kompilieren wir das Modell mit der Funktion zur Bestimmung der
            Fehlerrate (standardmäßig mse = Mean Squared Error), und einem
            Optimizer. Anschließend können wir das Modell über{" "}
            <CodePhrase>fit()</CodePhrase> auf die Daten loslassen!
          </>
        }
      >
        <PythonHighlighter startLine={29}>{trainModelCode}</PythonHighlighter>
        <div className="log-section">
          Epoch 1/100 169/169 [==============================] - 0s 868us/step -
          loss: 0.9937
          <br />
          Epoch 2/100 169/169 [==============================] - 0s 857us/step -
          loss: 0.0991
          <br />
          Epoch 3/100 169/169 [==============================] - 0s 822us/step -
          loss: 0.0772
          <br />
          ...
          <br />
          Epoch 98/100 169/169 [==============================] - 0s 823us/step
          - loss: 0.0087
          <br />
          Epoch 99/100 169/169 [==============================] - 0s 852us/step
          - loss: 0.0088
          <br />
          Epoch 100/100 169/169 [==============================] - 0s 852us/step
          - loss: 0.0089
        </div>
      </TutorialSection>
      <TutorialSection
        title="VORHERSAGEN MACHEN"
        text={
          <>
            Allem Anschein nach haben wir das Verhalten der Daten erfolgreich
            modelliert. Zur Überprüfung können wir das Ganze mit den
            ursprünglichen Eingabewerten vergleichen. Hierfür geben wir die
            Daten in das Modell ein und lassen es Vorhersagen machen. Da wir die
            y-Werte vor der Eingabe in das Modell skaliert haben, müssen wir
            diese auf dem Rückweg nun wieder zurückskalieren. Hierfür bietet der
            MinMaxScaler von SciKit Learn eine{" "}
            <CodePhrase>inverse_transform()</CodePhrase> Funktion zur Verfügung.
            <br />
            <br />
            Um unsere Ergebnisse zu visualisieren nutzen wir die Bibliothek
            Matplotlib, um einen Scatter-Plot zu erstellen. Damit können wir die
            Trainingsdaten mit den vorhergesagten Werten vergleichen.
          </>
        }
      >
        <div className="horizontal-flex">
          <div className="item">
            <PythonHighlighter startLine={31}>{predictCode}</PythonHighlighter>
          </div>
          <div className="item">
            <img
              src={require("../assets/regression_model.png")}
              alt="Visualization of the predicted values from the regression model"
            />
          </div>
        </div>
      </TutorialSection>
      <TutorialSection
        title="MODELL SPEICHERN UND LADEN"
        text={
          <>
            Um das Modell weiter verwenden zu können, wollen wir das Modell
            speichern und bei Bedarf laden. Wir kriegen hierfür wieder
            Funktionen von Keras bereitgestellt. Zusätzlich zum Modell müssen
            wir auch den <CodePhrase>MinMaxScaler</CodePhrase> speichern und
            laden, da wir diesen nutzen, um unsere Ausgabewerte wieder
            zurückzumappen.
          </>
        }
      >
        <PythonHighlighter startLine={45}>{saveCode}</PythonHighlighter>
        <PythonHighlighter>{LoadCode}</PythonHighlighter>
      </TutorialSection>
      <TutorialSection
        title="WARUM DIESE LAYER?"
        text={
          <>
            Wenn du ein eigenes neuronales Netz erstellst, willst du die
            Aufgabenstellung bzw. das Problem mit einem möglichst kleinen Modell
            lösen. Es gibt dabei keine festen Richtlinien, bei wie viel Daten
            und bei welcher Komplexität du wie viele Parameter wählen solltest.
            Stattdessen ist es vollkommen valide, sich zu einer angemessen
            Lösung vorzuarbeiten. Wenn wir bei Keras eine{" "}
            <CodePhrase>Callback</CodePhrase>-Klasse hineinreichen, welche die
            Fehlerrate jeder Epoche speichert, können wir im Folgenen darauf
            zugreifen. Damit können wir in einem for-Loop das Modell definieren,
            und die Layer und Neuronen solange hochschrauben, bis wir unsere
            erwünschte Fehlerrate erreicht haben.
          </>
        }
      >
        <div className="horizontal-flex">
          <div className="item">
            <PythonHighlighter>{loopCode}</PythonHighlighter>
          </div>
          <div className="item">
            <div className="log-section">
              OUTPUT:
              <br />
              Training 1 layer, 1 neurons
              <br />
              Loss was 0.04264690354466438
              <br />
              <br />
              Training 1 layer, 2 neurons
              <br />
              Loss was 0.04286980256438255
              <br />
              <br />
              Training 1 layer, 3 neurons
              <br />
              Loss was 0.04281430318951607
              <br />
              <br />
              Training 1 layer, 4 neurons
              <br />
              Loss was 0.0427541546523571
              <br />
              <br />
              Training 1 layer, 5 neurons
              <br />
              Loss was 0.0429307259619236
              <br />
              <br />
              Training 1 layer, 6 neurons
              <br />
              Loss was 0.043477412313222885
              <br />
              <br />
              Training 1 layer, 7 neurons
              <br />
              Loss was 0.011461379006505013
              <br />
              <br />
              Training 1 layer, 8 neurons
              <br />
              Loss was 0.01121053472161293
              <br />
              <br />
              Training 1 layer, 9 neurons
              <br />
              Loss was 0.01139762718230486
              <br />
              <br />
              Training 1 layer, 10 neurons
              <br />
              Loss was 0.04292525351047516
              <br />
              <br />
              Training 2 layer, 1 neurons
              <br />
              Loss was 0.04794663190841675
              <br />
              <br />
              Training 2 layer, 2 neurons
              <br />
              Loss was 0.04267842322587967
              <br />
              <br />
              Training 2 layer, 3 neurons
              <br />
              Loss was 0.04171263426542282
              <br />
              <br />
              Training 2 layer, 4 neurons
              <br />
              Loss was 0.011408627033233643
              <br />
              <br />
              Training 2 layer, 5 neurons
              <br />
              Loss below 0.01, done training
              <br />
            </div>
          </div>
        </div>
      </TutorialSection>
    </div>
  );
}

export default RegressionModel;
