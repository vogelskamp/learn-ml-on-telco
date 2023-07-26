import PythonHighlighter from "../components/PythonHighlighter";
import TutorialLayout from "../components/TutorialLayout";

const code = [
  "tokenizer('gut')     # [101, 18986,   102,   0]",
  "",
  "tokenizer('super')   # [101, 12278,   102,   0]",
  "",
  "tokenizer('grausam') # [101, 88612, 11064, 102]",
].join("\n");

const sections = [
  {
    title: "WIE FUNKTIONIERT NLP?",
    pages: [
      {
        text: (
          <>
            NLP (Natural Language Processing) ist ein Bereich von ML, der sich
            mit der Verarbeitung natürlicher Sprache beschäftigt. Die Modelle
            nehmen als Eingabewerte natürliche Sprache in Text- oder Audioform
            an. Die Modelle sind hoch komplex, jedoch lassen sie sich grob in
            zwei Aspekte aufteilen.
          </>
        ),
      },
    ],
  },
  {
    title: "TOKENIZER",
    pages: [
      {
        text: (
          <>
            Was für uns Menschen als Sprache vollkommen verständlich ist, ist
            für Computer nicht nachvollziehbar. Die Worte gut und super haben
            für uns eine ähnliche Bedeutung, sehen und klingen jedoch kaum
            ähnlich. Die Sprache muss also in etwas verwandelt werden, was der
            Computer nachvollziehen kann.
            <br />
            <br />
            Die Lösung hierfür sind Vektoren - genannt Tokens - die einen Ort in
            einem vieldimensionalen Raum darstellen. Je ähnlicher die Bedeutung
            zweier Wörter ist, desto näher sind sie in diesem Raum platziert.
          </>
        ),
        visual: <PythonHighlighter>{code}</PythonHighlighter>,
      },
      {
        text: (
          <>
            Die Tokenizer an sich sind auch ML Modelle. Sie werden trainiert,
            indem Unmengen an Text als Trainingsdaten verwendet werden, welche
            Wörter in welchen Kontexten wie verwendet werden.
            <br />
            <br />
            Es existieren Tokenizer in unterschiedlichen Sprachen und Kontexten
            und du solltest beachten, immer den Tokenizer zu verwenden, der zum
            Trainieren des NLP Modells verwendet wurde.
          </>
        ),
      },
    ],
  },
  {
    title: "TRANSFORMER",
    pages: [
      {
        text: (
          <>
            Transformer-Netze sind Deep Neural Network Modelle und hoch komplex.
            Im Endeffekt ist für uns aber eigentlich nur wichtig, dass sie
            besonders gut für NLP Aufgaben geeignet sind, da sie bei der
            Verarbeitung mehrerer Wörter ein Verständnis für den Kontext
            aufbauen und beibehalten können.
          </>
        ),
        visual: (
          <img
            src={require("../assets/transformer_attention.png")}
            alt="Verbildlichung der Attention von Transformer Modellen"
          />
        ),
      },
      {
        text: (
          <>
            Die aktuellen Fortschritte im Bereich NLP und der dazugehörige Hype
            basieren alle auf dieser Transformer-Architektur. Wenn du schon mal
            etwas von GPT (Generative Pretrained Transformer) oder BERT
            (Bidirectional Encoder Representations Transformer) gehört hast
            weißst du, wie gut diese Modelle sein können, wenn sie auf riesen
            Mengen von Daten trainiert werden.
          </>
        ),
      },
    ],
  },
];

function TutorialNLP({ onClose }) {
  return <TutorialLayout sections={sections} onClose={onClose} />;
}

export default TutorialNLP;
