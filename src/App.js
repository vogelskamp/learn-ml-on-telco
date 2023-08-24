import { useState } from "react";
import {
  HUG_ICON,
  NLP_ICON,
  NN_ICON,
  REGRESSION_ICON,
  SA_ICON,
  SPAM_ICON,
  TRANSCRIPTION_ICON,
} from "./graphics";
import LandingPage from "./pages/LandingPage";
import AudioTranscription from "./pages/applications/AudioTranscription";
import RegressionModel from "./pages/applications/RegressionModel";
import SentimentAnalysis from "./pages/applications/SentimentAnalysis";
import SpamSMS from "./pages/applications/SpamSMS";
import TutorialNN from "./pages/tutorials/TutorialNN";

import "./App.scss";
import TutorialHug from "./pages/tutorials/TutorialHug";
import TutorialNLP from "./pages/tutorials/TutorialNLP";

function App() {
  const [activeElement, setActiveElement] = useState(null);

  const basics = [
    {
      title: "WAS SIND NEURONALE NETZE?",
      icon: NN_ICON,
      element: <TutorialNN onClose={() => setActiveElement(null)} />,
    },
    {
      title: "WIE FUNKTIONIERT NLP?",
      icon: NLP_ICON,
      element: <TutorialNLP onClose={() => setActiveElement(null)} />,
    },
    {
      title: "WAS IST HUGGINGFACE?",
      icon: HUG_ICON,
      element: <TutorialHug onClose={() => setActiveElement(null)} />,
    },
  ];
  const apps = [
    {
      title: "SENTIMENT ANALYSIS AUF SMS",
      icon: SA_ICON,
      element: <SentimentAnalysis onClose={() => setActiveElement(null)} />,
    },
    {
      title: "REGERSSION FÜR ANRUFAKTIVITÄT",
      icon: REGRESSION_ICON,
      element: <RegressionModel onClose={() => setActiveElement(null)} />,
    },
    {
      title: "KLASSIFIZIERUNG VON SPAM SMS",
      icon: SPAM_ICON,
      element: <SpamSMS onClose={() => setActiveElement(null)} />,
    },
    {
      title: "TRANSKRIBIERUNG VON ANRUFEN",
      icon: TRANSCRIPTION_ICON,
      element: <AudioTranscription onClose={() => setActiveElement(null)} />,
    },
  ];

  return (
    <div className="App">
      {activeElement ? (
        activeElement.element
      ) : (
        <LandingPage
          basics={basics}
          apps={apps}
          onClick={(el) => setActiveElement(el)}
        />
      )}
    </div>
  );
}

export default App;
