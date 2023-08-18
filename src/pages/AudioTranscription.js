import MLApplication from "../components/MLApplication";
import TutorialSection from "../components/TutorialSection";
// eslint-disable-next-line import/no-webpack-loader-syntax
import AudioTranscriptionCode from "!!raw-loader!../tutorial-code/AudioTranscription.py";
import { useState } from "react";
import AudioRecorder from "../components/AudioRecorder";
import FileInput from "../components/FileInput";
import PythonHighlighter from "../components/PythonHighlighter";
import "./AudioTranscription.scss";

function AudioTranscription({ onClose }) {
  return (
    <MLApplication
      title={"TRANSKRIBIERUNG VON ANRUFEN"}
      example={GetExample()}
      tutorial={getTutorial()}
      onClose={onClose}
    />
  );
}

function GetExample() {
  const [text, setText] = useState("");

  const uploadAudio = async (file) => {
    const formData = new FormData();

    formData.append("File", file);

    const transcription = await fetch(
      `https://learn-ml.sipgate.cloud:443/flask/transcribe`,
      {
        method: "POST",
        body: formData,
      }
    ).then((response) => response.json());

    setText(transcription);
  };

  return (
    <>
      <div className="AT_try-it-out">
        <FileInput
          text="Audio hochladen"
          onChange={async (event) => {
            const file = event.target.files[0];

            if (!file) return;
            await uploadAudio(file);
          }}
        />
        oder
        <AudioRecorder onFinishRecording={uploadAudio} />
        {/* <Button text="aufnehmen" icon={mic_icon} /> */}
      </div>
      <div className="transcript-area">
        {text !== "" && (
          <>
            <div className="strong">TRANSKRIPT</div>
            <div className="content">{text}</div>
          </>
        )}
      </div>
    </>
  );
}

function getTutorial() {
  const codeLines = AudioTranscriptionCode.split("\n");

  const firstCodeBlock = [codeLines[1], "", codeLines[5], codeLines[6]].join(
    "\n"
  );
  const secondCodeBlock = codeLines[7];
  const thirdCodeBlock = [
    codeLines[0],
    codeLines[3],
    "",
    codeLines[10].trim(),
    `${codeLines[11].trim()} ${codeLines[12].trim()}`,
  ].join("\n");

  const fourthCodeBlock = [
    codeLines[14].trim() + codeLines[15].trim(),
    "",
    codeLines[17].trim(),
    "",
    codeLines[19].split("return")[1].trim(),
  ].join("\n");

  return (
    <div className="tutorial">
      <TutorialSection
        title="MODELL LADEN"
        text={
          <>
            Als Modell nutzen wir{" "}
            <a href="https://huggingface.co/openai/whisper-tiny">
              Whisper von OpenAI
            </a>
            . Das Modell steht in mehreren Größen mit unterschiedlicher
            Parameteranzahl zur Verfügung, wobei tiny für unseren Anwendungsfall
            genügt.
          </>
        }
      >
        <PythonHighlighter>{firstCodeBlock}</PythonHighlighter>
      </TutorialSection>
      <TutorialSection
        title="MODELL KONFIGURIEREN"
        text="Das Modell unterstützt mehrere Sprachen, sowie einen transcribe und einen translate Task. Für unseren Anwendungsfall nutzen wir den transcribe Task für die deutsche Sprache."
      >
        <PythonHighlighter startLine={5}>{secondCodeBlock}</PythonHighlighter>
      </TutorialSection>
      <TutorialSection
        title="AUDIO LADEN"
        text={
          <>
            Wir nutzen{" "}
            <a href="https://librosa.org/doc/latest/index.html">librosa</a> zum
            Laden der Audio-Datei. Gegebenenfalls müssen wir die Daten
            zusätzlich noch resamplen, da das Whisper-Modell auf eine Abtastrate
            von 16 kHz trainiert wurde.
          </>
        }
      >
        <PythonHighlighter startLine={6}>{thirdCodeBlock}</PythonHighlighter>
      </TutorialSection>
      <TutorialSection
        title="INPUT VERARBEITEN"
        text={
          <>
            Nun, da wir die Daten erfolgreich aufbereitet haben, können wir sie
            auf das Modell anwenden. Wir konvertieren die Audio-Daten in Input
            Features und lassen das Modell Tokens für die Transkribierung
            vorhersagen. Anschließend dekodieren wir die Tokens, um den
            transkribierten deutschen Text zu erhalten.
          </>
        }
      >
        <PythonHighlighter startLine={11}>{fourthCodeBlock}</PythonHighlighter>
      </TutorialSection>
    </div>
  );
}

export default AudioTranscription;
