import MLApplication from "../../components/MLApplication";
import TutorialSection from "../../components/TutorialSection";
// eslint-disable-next-line import/no-webpack-loader-syntax
import SpamSMSCode from "!!raw-loader!../../tutorial-code/SpamSMS.py";
import PythonHighlighter from "../../components/PythonHighlighter";
import SpamSMSList from "../../components/SpamSMSList";
import "./SpamSMS.scss";

function SpamSMS({ onClose }) {
  return (
    <MLApplication
      title={"KLASSIFIZIERUNG VON SPAM SMS"}
      example={getExample()}
      tutorial={getTutorial()}
      onClose={onClose}
    />
  );
}

function getExample() {
  const { REACT_APP_SMS_PHONENUMBER: SMS_PHONENUMBER = "" } = process.env;
  return (
    <div>
      <div className="SPAM_try-it-out">
        Schreib eine SMS an:
        <br />
        <div className="strong">{SMS_PHONENUMBER}</div>
      </div>
      <SpamSMSList />
    </div>
  );
}

function getTutorial() {
  const codeLines = SpamSMSCode.split("\n");

  const firstCodeBlock = [
    ...codeLines.slice(0, 3),
    "",
    ...codeLines.slice(3, 5),
  ].join("\n");
  const secondCodeBlock = codeLines[6];

  const thirdCodeBlock = codeLines.slice(8).join("\n");

  return (
    <div className="tutorial">
      <TutorialSection
        title="MODELL LADEN"
        text={
          <>
            Als Modell nutzen wir{" "}
            <a href="https://huggingface.co/mrm8488/bert-tiny-finetuned-sms-spam-detection">
              bert-tiny-finetuned-sms-spam-detection von mrm8488
            </a>
            .
          </>
        }
      >
        <PythonHighlighter>{firstCodeBlock}</PythonHighlighter>
      </TutorialSection>
      <TutorialSection title="INPUT AUFBEREITEN" text={<></>}>
        <PythonHighlighter startLine={7}>{secondCodeBlock}</PythonHighlighter>
      </TutorialSection>
      <TutorialSection
        title="OUTPUT INTERPRETIEREN"
        text={
          <>
            Das Modell gibt als Ausgabewerte logits zurück. Um die
            Klassifizierung interpretieren zu können, wenden wir die argmax()
            Funktion an und erhalten somit die Klasse mit der größeren
            Wahrscheinlichkeit.
          </>
        }
      >
        <PythonHighlighter startLine={8}>{thirdCodeBlock}</PythonHighlighter>
      </TutorialSection>
    </div>
  );
}

export default SpamSMS;
