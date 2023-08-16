import MLApplication from "../components/MLApplication";
import TutorialSection from "../components/TutorialSection";
// eslint-disable-next-line import/no-webpack-loader-syntax
import SentimentAnalysisCode from "!!raw-loader!../tutorial-code/SentimentAnalysis.py";
import PythonHighlighter from "../components/PythonHighlighter";
import "./SentimentAnalysis.scss";
import SentimentAnalysisList from "./SentimentAnalysisList";

function SentimentAnalysis({ onClose }) {
  return (
    <MLApplication
      title={"SENTIMENT ANALYSIS AUF SMS"}
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
      <div className="SA_try-it-out">
        Schreib eine SMS an:
        <br />
        <div className="strong">{SMS_PHONENUMBER}</div>
      </div>
      <SentimentAnalysisList />
    </div>
  );
}

function getTutorial() {
  const codeLines = SentimentAnalysisCode.split("\n");

  const firstCodeBlock = codeLines.slice(0, 3).join("\n");
  const secondCodeBlock = [codeLines[14].trim(), "", codeLines[16].trim()].join(
    "\n"
  );

  return (
    <div className="tutorial">
      <TutorialSection
        title="WAS IST SENTIMENT ANALYSIS?"
        text="Sentiment Analysis (Stimmungsanalyse) ist eine Vorgehensweise zur Erfassung der Stimmung (oder dem emotionalen Ton) eines Eingabewertes, normalerweise einem Stück Text. Die Vorgehensweise gehört zu den Klassifizierungsmodellen, da sie die Eingabe in eine von mehreren Stimmungskategorien (hier negativ, neutral und positiv) einordnet."
      ></TutorialSection>
      <TutorialSection
        title="MODELL LADEN"
        text={
          <>
            Sentiment Analysis ist eine der Kernanwendungen von NLP. Huggingface
            stellt uns dafür eine Vielzahl von Transformer-Modellen zur
            Verfügung, die wir über die pipeline API in unser Programm laden
            können. Falls du mehr darüber wissen möchtest, welches Modell die
            pipeline API für diesen Task nutzt, kannst du dies{" "}
            <a href="https://huggingface.co/transformers/v3.0.2/main_classes/pipelines.html#textclassificationpipeline">
              hier
            </a>{" "}
            tun.
          </>
        }
      >
        <PythonHighlighter>{firstCodeBlock}</PythonHighlighter>
      </TutorialSection>
      <TutorialSection
        title="TEXT KLASSIFIZIEREN"
        text={
          <>
            Jetzt, wo wir ein Modell haben, können wir es problemlos auf unsere
            SMS Texte anwenden. Die Umwandlung der Texte in Tokens über den
            passenden Tokenizer übernimmt die pipeline API dabei von alleine,
            wir brauchen uns nicht darum zu kümmern.
          </>
        }
      >
        <PythonHighlighter startLine={4}>{secondCodeBlock}</PythonHighlighter>
      </TutorialSection>
      <TutorialSection
        title="ERGEBNISSE FORMATIEREN"
        text={
          <>
            Und das wars auch schon! Wir können das Ergebnis jetzt so
            formatieren, wie wir es in unserer Anwendung haben wollen. Hierzu
            wurde die Funktionalität in Helfer-Funktionen verpackt. Am Ende
            sieht das Ganze so aus:
          </>
        }
      >
        <PythonHighlighter>{SentimentAnalysisCode}</PythonHighlighter>
      </TutorialSection>
    </div>
  );
}

export default SentimentAnalysis;
