import CodePhrase from "../components/CodePhrase";
import TutorialLayout from "../components/TutorialLayout";
// eslint-disable-next-line import/no-webpack-loader-syntax
import TrainCode from "!!raw-loader!../tutorial-code/FineTuning.train.py";
// eslint-disable-next-line import/no-webpack-loader-syntax
import LoadCode from "!!raw-loader!../tutorial-code/FineTuning.load.py";
import PythonHighlighter from "../components/PythonHighlighter";

const codeLines = TrainCode.split("\n");

const initCode = [
  ...codeLines.slice(3, 5),
  codeLines[13],
  codeLines[15],
  "",
  codeLines[16],
].join("\n");

const datasetCode = [
  codeLines[2],
  ...codeLines.slice(4, 8),
  codeLines[18],
  "",
  codeLines[19],
].join("\n");

const splitCode = codeLines[22];

const argsCode = [
  ...codeLines.slice(0, 2),
  codeLines[24],
  ...codeLines.slice(7, 13),
  ...codeLines.slice(26, 29),
].join("\n");

const trainCode = codeLines.slice(30).join("\n");

const sections = [
  {
    title: "WAS IST HUGGINGFACE?",
    pages: [
      {
        text: (
          <>
            Huggingface ist eine Online Plattform zur Entwicklung und
            Verbreitung von ML Lösungen mit Fokus auf Natural Language
            Processing. Die Plattform bietet eine Library und eine Vielzahl von
            Tools an, die zur Entwicklung von NLP Modellen genutzt werden
            können.
            <br />
            <br />
            Die Community der Plattform besteht aus Expert:innen, die ihre
            Modelle, Datensätze und Erfahrungen frei zur Verfügung stellen und
            als Open Source-Projekte gemeinsam Lösungen erarbeiten.
          </>
        ),
      },
    ],
  },
  {
    title: "PIPELINE API",
    pages: [
      {
        text: (
          <>
            Huggingface bietet eine Vielzahl von Transformer-Modellen an, die
            über die Pipeline API geladen werden können. Diese Modelle
            vereinfachen die Entwicklung von NLP Lösungen extrem. Durch die
            einfache Angabe eines der unten gezeigten Tasks kann ein Modell
            geladen und für den Anwendungsfall genutzt werden:
            <div>CODING BLOCK</div>
          </>
        ),
      },
    ],
  },
  {
    title: "FINE TUNING",
    pages: [
      {
        text: (
          <>
            Sollten die vorgegebenen Transformer Modelle für deinen
            Anwendungsfall nicht ausreichen, bietet huggingface Datensätze und
            eine Library zum Fine Tuning vorhandener Modelle.
            <br />
            <br />
            Lass uns das Ganze mal an einem Beispiel durchlaufen: Ein
            Anwendungsfall von ML auf Telekommunikationsdaten ist die
            Klassifizierung von Spam SMS. Wir brauchen also ein Modell, was den
            Text einer SMS als Eingabe nimmt und als Ausgabe klassifiziert, ob
            es sich um eine normale SMS oder eine Spam SMS handelt.
            <br />
            <br />
            Wir haben zwar kein konkretes Modell für diese Problemstellung,
            jedoch haben wir Modelle zur Klassifizierung von Texteingaben (wie
            den Sentiment Analysis-Classifier im letzten Beispiel).
          </>
        ),
      },
      {
        text: (
          <>
            Huggingface ermöglicht es uns, sogenannte Auto Modelle als Grundlage
            für unser Fine Tuning zu verwenden. Dabei handelt es sich um
            vortrainierte Transformer Modelle, die wir mit unseren Daten auf
            unseren Anwendungsfall münzen können.
            <br />
            <br />
            Wir laden ein Auto Modell für Multi-Language Sequence Classification
            und geben dabei über num_labels an, dass wir nach dem Fine Tuning
            nur noch 2 Labels (Spam/Nicht Spam) erwarten.
            <br />
            <br />
            Zusätzlich laden wir den Tokenizer, der zum Trainieren des Auto
            Modells verwendet wurde. Hierzu müssen wir lediglich denselben
            Modellnamen einreichen.
          </>
        ),
        visual: <PythonHighlighter>{initCode}</PythonHighlighter>,
      },
      {
        text: (
          <>
            Als nächstes nutzen wir die Datasets API von huggingface, um uns
            einen Datensatz mit SMS Texten und Labels zu Spam und Nicht-Spam
            herunterzuladen.
            <br />
            <br />
            Diese Daten werden anschließend über den Tokenizer zu Tokens
            verarbeitet, mit dem das Modell arbeiten kann.
          </>
        ),
        visual: (
          <PythonHighlighter startLine={7}>{datasetCode}</PythonHighlighter>
        ),
      },
      {
        text: (
          <>
            Normalerweise sind die Datensätze von huggingface automatisch in
            train und test Splits aufgeteilt. In unserem Fall ist dies jedoch
            nicht gegeben, weswegen wir den Datensatz via{" "}
            <CodePhrase>train_test_split()</CodePhrase> per Hand splitten
            müssen. Die <CodePhrase>test_size</CodePhrase> gibt dabei an, wie
            viel Prozent des Datensatzes zum Überprüfen der Genauigkeit genommen
            werden soll.
          </>
        ),
        visual: (
          <PythonHighlighter startLine={15}>{splitCode}</PythonHighlighter>
        ),
      },
      {
        text: (
          <>
            Als nächstes müssen wir die{" "}
            <CodePhrase>TrainingArguments</CodePhrase> (Hyperparameter) und die
            <CodePhrase>compute_metrics</CodePhrase> (Fehlerberechnung)
            definieren. Die verwendeten Angaben sind standardmäßig in der
            Dokumentation von huggingface erhältlich.
          </>
        ),
        visual: (
          <PythonHighlighter startLine={16}>{argsCode}</PythonHighlighter>
        ),
      },
      {
        text: (
          <>
            Nun haben wir alle Vorbereitungen abgeschlossen und können das
            Modell trainieren. Hierfür bietet huggingface eine <b>Trainer</b>{" "}
            Library an.
            <br />
            <br />
            Durch die Ausführung des untenstehenden Codes wird das Modell
            trainiert und in dem in den TrainingArguments definierten{" "}
            <CodePhrase>output_dir</CodePhrase> gespeichert.
            <br />
            <br />
            <b>Achtung:</b> Das Training von Transformer Modellen benötigt eine
            Menge GPU-Power. Solltest du einen “CUDA RAN OUT OF MEMORY” Fehler
            erhalten, kannst du über den Parameter{" "}
            <CodePhrase>per_device_train_batch_size</CodePhrase> die Batch Size
            verringern und somit gegebenenfalls Rechenkraft für Trainingsdauer
            austauschen.
          </>
        ),
        visual: (
          <PythonHighlighter startLine={28}>{trainCode}</PythonHighlighter>
        ),
      },
      {
        text: (
          <>
            Das Fine Tuning ist abgeschlossen! Das gespeicherte Modell kann nun
            genau wie ein Auto Modell von huggingface geladen und verwendet
            werden:
          </>
        ),
        visual: <PythonHighlighter>{LoadCode}</PythonHighlighter>,
      },
    ],
  },
];

function TutorialHug({ onClose }) {
  return <TutorialLayout sections={sections} onClose={onClose} />;
}

export default TutorialHug;
