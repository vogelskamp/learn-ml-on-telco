import MLApplication from "../components/MLApplication";
import SentimentListItem from "../components/TabularListItem";
import TutorialSection from "../components/TutorialSection";
// eslint-disable-next-line import/no-webpack-loader-syntax
import SpamSMSCode from "!!raw-loader!../tutorial-code/SpamSMS.py";
import PythonHighlighter from "../components/PythonHighlighter";
import "./SpamSMS.scss";

function SpamSMS() {
  return (
    <MLApplication
      title={"KLASSIFIZIERUNG VON SPAM SMS"}
      example={getExample()}
      tutorial={getTutorial()}
    />
  );
}

function getExample() {
  const items = [
    {
      from: "+4917632743005",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed placerat ex at metus fermentum, at semper enim scelerisque. Nullam non elit laoreet, tincidunt nisi nec, ultrices dui. Integer condimentum augue ligula, congue dignissim mi convallis lacinia. Mauris vel aliquam magna, ut tempus lacus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin mattis consectetur tincidunt. Pellentesque metus ante, interdum non nisi nec, placerat tincidunt velit.",
      class: "SPAM",
    },
    {
      from: "1234",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed placerat ex at metus fermentum, at semper enim scelerisque. Nullam non elit laoreet, tincidunt nisi nec, ultrices dui. Integer condimentum augue ligula, congue dignissim mi convallis lacinia. Mauris vel aliquam magna, ut tempus lacus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin mattis consectetur tincidunt. Pellentesque metus ante, interdum non nisi nec, placerat tincidunt velit.",
      class: "HAM",
    },
  ];

  const { REACT_APP_SMS_PHONENUMBER: SMS_PHONENUMBER = "" } = process.env;
  return (
    <div>
      <div className="try-it-out">
        Schreib eine SMS an:
        <br />
        <div className="strong">{SMS_PHONENUMBER}</div>
      </div>
      <div className="content-list">
        {items.map((item) => (
          <SentimentListItem
            items={[
              {
                header: "Absender",
                textAlign: "left",
                value: item.from,
                percentage: 20,
              },
              {
                header: "Text",
                textAlign: "left",
                value: item.text,
                percentage: 60,
              },
              {
                header: "Klassifizierung",
                textAlign: "right",
                value: item.class,
                percentage: 20,
              },
            ]}
          />
        ))}
      </div>
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
