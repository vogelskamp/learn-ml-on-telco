import Button from "../components/Button";
import MLApplication from "../components/MLApplication";
import TutorialSection from "../components/TutorialSection";
// eslint-disable-next-line import/no-webpack-loader-syntax
import AudioTranscriptionCode from "!!raw-loader!../tutorial-code/AudioTranscription.py";
import PythonHighlighter from "../components/PythonHighlighter";
import "./AudioTranscription.scss";

const mic_icon = (
  <svg
    width="26"
    height="38"
    viewBox="0 0 26 38"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12.9789 29.8101C6.29975 29.8101 0.865234 24.376 0.865234 17.6964C0.865234 16.9823 1.44418 16.4038 2.15786 16.4038C2.87195 16.4038 3.45048 16.9828 3.45048 17.6964C3.4509 22.9503 7.72502 27.2249 12.9789 27.2249C18.2324 27.2249 22.507 22.9503 22.507 17.6968C22.507 16.9828 23.0855 16.4042 23.7996 16.4042C24.5137 16.4042 25.0922 16.9832 25.0922 17.6968C25.0926 24.376 19.6581 29.8101 12.9789 29.8101Z"
      fill="#AAAAAA"
    />
    <path
      d="M12.9791 25.5431C8.68917 25.5431 5.1792 22.0332 5.1792 17.7432V8.00869C5.1792 3.71872 8.68917 0.20874 12.9791 0.20874C17.2691 0.20874 20.7791 3.71872 20.7791 8.00869V17.7428C20.7791 22.0327 17.2691 25.5431 12.9791 25.5431Z"
      fill="#AAAAAA"
    />
    <path
      d="M12.9791 37.4203C12.2651 37.4203 11.6865 36.8418 11.6865 36.1277V28.8454C11.6865 28.1313 12.2655 27.5527 12.9791 27.5527C13.6932 27.5527 14.2718 28.1313 14.2718 28.8454V36.1277C14.2718 36.8418 13.6932 37.4203 12.9791 37.4203Z"
      fill="#AAAAAA"
    />
    <path
      d="M17.3382 37.7486H8.61977C7.90568 37.7486 7.32715 37.17 7.32715 36.456C7.32715 35.7419 7.9061 35.1633 8.61977 35.1633H17.3378C18.0519 35.1633 18.6304 35.7419 18.6304 36.456C18.6304 37.17 18.0523 37.7486 17.3382 37.7486Z"
      fill="#AAAAAA"
    />
  </svg>
);

function AudioTranscription({ onClose }) {
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
    <>
      <div className="AT_try-it-out">
        <Button text="Audio hochladen" />
        oder
        <Button text="aufnehmen" icon={mic_icon} />
      </div>
      <div className="content-area">
        <div className="strong">TRANSKRIPT</div>
        <div className="content">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed placerat
          ex at metus fermentum, at semper enim scelerisque. Nullam non elit
          laoreet, tincidunt nisi nec, ultrices dui. Integer condimentum augue
          ligula, congue dignissim mi convallis lacinia. Mauris vel aliquam
          magna, ut tempus lacus. Pellentesque habitant morbi tristique senectus
          et netus et malesuada fames ac turpis egestas. Proin mattis
          consectetur tincidunt. Pellentesque metus ante, interdum non nisi nec,
          placerat tincidunt velit.
        </div>
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
    codeLines[11].trim(),
    `${codeLines[12].trim()} ${codeLines[13].trim()}`,
  ].join("\n");

  const fourthCodeBlock = [
    codeLines[15].trim() + codeLines[16].trim(),
    "",
    codeLines[18].trim(),
    "",
    codeLines[20].split("return")[1].trim(),
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
        <PythonHighlighter>{fourthCodeBlock}</PythonHighlighter>
      </TutorialSection>
    </div>
  );
}

export default AudioTranscription;
