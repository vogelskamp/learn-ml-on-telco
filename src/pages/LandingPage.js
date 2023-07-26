import ListElement from "../components/ListElement";
import "./LandingPage.scss";

function LandingPage({ basics, apps, onClick }) {
  return (
    <div className="flex-vertical">
      <h1>ML ANWENDUNGEN AUF TELCO DATEN</h1>
      <div className="flex">
        <ul>
          <div className="list-title">BASICS</div>
          {basics.map((el) => (
            <ListElement {...el} onClick={() => onClick(el)} />
          ))}
        </ul>
        <ul>
          <div className="list-title">ANWENDUNGEN</div>
          {apps.map((el) => (
            <ListElement {...el} onClick={() => onClick(el)} />
          ))}
        </ul>
      </div>
      <div className="footer">
        <div className="block">
          <div className="strong">Wo bin ich hier?</div>
          Diese Anwendung wurde als Prototyp im Rahmen einer Masterarbeit bei
          sipgate GmbH von Sam Vogelskamp entwickelt und befasst sich damit,
          Machine Learning Anwendungen auf Telekommunikationsdaten an technische
          Endkund:innen der Telefonie-Branche zu vermitteln. Für die Bearbeitung
          des Prototypen sind Vorerfahrungen in der Programmierung vorteilhaft,
          jedoch nicht zwingend notwendig. Unter der Rubrik ‘Basics’ können
          Grundkenntnisse zu neuronalen Netzen, Natural Language Processing und
          der Plattform Huggingface erworben werden. Unter ‘Anwendungen’ findest
          du Beispiele zu ML Verfahren auf Telco Daten inklusive einer Anleitung
          zur Umsetzung dieser.
        </div>
        <div className="logos">
          <img
            src={require("../assets/sipgate_logo.png")}
            alt="sipgate GmbH Logo"
          />
          <img
            src={require("../assets/hsd_medien.png")}
            alt="Hochschule Düsseldorf Bereich Medien Logo"
          />
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
