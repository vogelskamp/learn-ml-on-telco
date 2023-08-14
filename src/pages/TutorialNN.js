import { Slider } from "@mui/material";
import { useState } from "react";
import TutorialLayout from "../components/TutorialLayout";

import ActivationGraph from "../components/ActivationGraph";
import Button from "../components/Button";
import ErrorCurve from "../components/ErrorCurve";
import PhysicsSim from "../components/PhysicsSim";
import "./TutorialNN.scss";

import AnimatedNetwork from "../components/AnimatedNetwork";
import FileInput from "../components/FileInput";
import { BRAIN_LOGO, CAT_ICON, DOG_ICON } from "../graphics";

function TutorialNN({ onClose }) {
  const [chartValues, setChartValues] = useState([{ xValue: 0, yValue: 16 }]);
  const [buttonClicked, setButtonClicked] = useState(false);

  // file upload
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [imageSrc, setImageSrc] = useState(false);

  const [predictions, setPredictions] = useState({ cat: 0, dog: 0 });

  const getFullValues = () => {
    const values = [];

    for (let i = 0; i <= 1; i += 0.01) {
      values.push({
        xValue: i,
        yValue: Math.pow(4 - 8 * i, 2),
      });
    }

    return values;
  };

  const sections = [
    {
      title: "EINFÜHRUNG NEURONALE NETZE",
      pages: [
        {
          text: (
            <>
              In der Algorithmik werden basierend auf <b>Eingabewerten</b> und
              Funktionen <b>Ausgabewerte</b> erfasst. Wenn wir also eine
              Funktion haben, dann können wir Werte für x eingeben und das
              Ergebnis berechnen. Diese Vorgehensweise ist essenziell für die
              moderne Welt, da wir nun für jeden Eingabewert x einen passenden
              Ausgabewert vorhersagen können.
            </>
          ),
          visual: (
            <img
              className="funktionen"
              src={require("../assets/Funktionen.png")}
              alt="Eingabewerte werden durch Funktionen in Ausgabewerte verwandelt"
            />
          ),
        },
        {
          text: (
            <>
              Aber was hat das mit Machine Learning zu tun? Stell dir das
              gleiche Szenario vor wie gerade, nur dass wir jetzt so tun als
              würden wir die <b>Funktion</b> nicht kennen. Alles was wir haben
              sind unsere
              <b>Eingabewerte x</b> und <b>Ausgabewerte</b>, die irgendwie mit
              den Eingaben zusammenhängen.
              <br />
              <br />
              Wir müssen also irgendwie an die Funktion kommen. Das Beispiel ist
              natürlich sehr einfach gehalten und es gibt mathematische Wege, um
              die Funktion zu errechnen, die Anwendungsfälle in der echten Welt
              sind aber natürlich auch wesentlich komplexer. In solchen Fällen
              können wir die Funktion <u>nicht</u> direkt errechnen, also was
              machen wir stattdessen?
            </>
          ),
          visual: (
            <img
              className="funktionen"
              src={require("../assets/Funktionen2.png")}
              alt="Aber was, wenn die Funktion nicht bekannt ist?"
            />
          ),
        },
        {
          text: (
            <>
              Kurz gesagt: wir raten. Wir kriegen Eingabewerte, machen etwas
              damit und schauen dann, wie gut wir geraten haben. Dann versuchen
              wir, etwas besser zu raten.
              <br />
              <br />
              Wenn wir das oft genug machen und aus unseren Fehlern lernen,
              sollten wir irgendwann einen Weg gefunden haben, wie wir{" "}
              <u>annähernd</u> die gleichen Ergebnisse erhalten. Das ist die
              Grundlage von neuronalen Netzen und dem “Lernen” in Machine
              Learning. Konkret sieht das Ganze so aus: Auf der linken Seite
              haben wir unseren <b>Eingabewert</b>, der wird über den Pfeil auf
              irgendeine Art abgewandelt und wird damit zum <b>Ausgabewert</b>.
              Den vergleichen wir dann mit dem uns bekannten richtigen
              Ausgabewert und schauen, wie falsch wir lagen.
            </>
          ),
          visual: (
            <img
              className="funktionen"
              src={require("../assets/Funktionen2.png")}
              alt="Aber was, wenn die Funktion nicht bekannt ist?"
            />
          ),
        },
        {
          text: (
            <>
              Lass uns das mal beispielsweise durchlaufen:
              <br />
              <br />
              Wir wissen, dass wir für einen Eingabewert x = 8 einen Ausgabewert
              von 4 erhalten sollten. Weil wir blöd sind, raten wir jetzt
              einfach mal, dass die Zahl auf dem Pfeil mal 3 gerechnet wird. Wir
              probieren es aus und merken, dass unser Ergebnis viel zu groß ist.
            </>
          ),
          visual: (
            <img
              className="funktionen"
              src={require("../assets/Funktionen3.png")}
              alt="Beispiel für Eingabewert 8 und Ausgabewert 4 mit Funktion f(x) = x * 3"
            />
          ),
        },
        {
          text: (
            <>
              Also versuchen wir besser zu raten. Vielleicht sollte die Zahl
              geviertelt werden? Wir probieren es erneut. Diesmal ist das
              Ergebnis wesentlich näher an unserem Zielwert, jedoch sind wir
              über das Ziel hinausgeschossen.
            </>
          ),
          visual: (
            <img
              className="funktionen"
              src={require("../assets/Funktionen4.png")}
              alt="Beispiel für Eingabewert 8 und Ausgabewert 4 mit Funktion f(x) = x * 0.25"
            />
          ),
        },
        {
          text: (
            <>
              Wir versuchen es ein drittes Mal und raten, dass die Zahl halbiert
              wird. Und das Ergebnis ist richtig! Wir kennen noch ein paar
              weitere Werte und überprüfen unseren Ansatz.
              <br />
              <br />
              Wir haben es geschafft! Was wir hier gemacht haben, ist das
              Verhalten von <b>Eingabe-</b> und <b>Ausgabewerten</b> zu
              modellieren. Dieses Modell können wir jetzt - genau so wie zuvor
              die Funktion - verwenden, um das Verhalten beliebiger Eingabewerte
              vorherzusagen.
            </>
          ),
          visual: (
            <img
              className="funktionen"
              src={require("../assets/Funktionen5.png")}
              alt="Beispiel für Eingabewert 8 und Ausgabewert 4 mit Funktion f(x) = x * 0.5"
            />
          ),
        },
        {
          text: (
            <>
              In der Realität wird dieser Prozess natürlich nicht manuell
              erarbeitet. Die Mathematik dahinter ist kompliziert, aber im
              Endeffekt ist der Ablauf der gleiche:
            </>
          ),
          visual: (
            <h1 className="raten">
              raten -&gt; mit bekannten Werten prüfen -&gt; Fehler erkennen
              -&gt; besser raten
            </h1>
          ),
        },
      ],
    }, // DONE
    {
      title: "FEHLERRATE",
      pages: [
        {
          text: (
            <>
              An dieser Stelle sollten wir uns damit beschäftigen, was “Fehler”
              überhaupt heißt. In unserem Beispiel konnten wir erkennen, dass 2
              kleiner ist als 4 und wir deswegen höher raten sollten. In
              komplexen Beispielen ist das jedoch nicht so einfach zu erkennen.
              Zum Glück gibt tolle mathematische Vorgänge wie Back Propagation
              und Gradient Descent, die genau das ermöglichen. Die Verfahren
              sind hohe Mathematik, visuell lässt sich das Ganze jedoch leicht
              nachvollziehen.
            </>
          ),
        },
        {
          text: (
            <>
              In unserem Beispiel haben wir den Eingabewert x mit einer Zahl
              multipliziert, um den Ausgabewert zu erhalten. Diesen
              Multiplikator nennen wir jetzt allgemein <b>α</b>. Den Ausgabewert
              haben wir mit dem uns bekannten Wert verglichen, um unseren Fehler
              zu erkennen. Wenn wir jetzt wissen wollen, wie falsch wir lagen,
              müssen wir den Fehler berechnen.
              <br />
              <br />
              Lass uns hierfür die folgende Formel verwenden:
            </>
          ),
          visual: (
            <img
              className="formel"
              src={require("../assets/formel.png")}
              alt="Formel zur Berechnung der Fehlerrate: Fehler(xgeraten, xrichtig) = (xrichtig - xgeraten)²"
            />
          ),
        },
        {
          text: (
            <>
              Bei unserem vorherigen Beispiel bedeutet das:{" "}
              <b>Fehler(2, 4) = (4 - 2)² = 4.</b>
              <br />
              <br />
              Das alleine sagt uns noch nicht sehr viel. Da das Ergebnis jedoch
              komplett davon abhängt, welchen Wert unser Multiplikator <b>α</b>
              hat, können wir einen Graphen bilden, der uns für einen Wert{" "}
              <b>α</b> einen Fehler gibt.
              <div className="flex-wrapper" style={{ marginTop: "65px" }}>
                <div className="slider-wrapper">
                  <div className="strong">α =</div>
                  <Slider
                    valueLabelDisplay="on"
                    defaultValue={0}
                    min={0}
                    max={1}
                    step={0.01}
                    color="secondary"
                    onChange={(event) => {
                      const { value } = event.target;

                      const newValues = [...chartValues];

                      for (let i = 0; i <= value; i += 0.01) {
                        if (!chartValues.find((x) => x.xValue === value))
                          newValues.push({
                            xValue: i,
                            yValue: Math.pow(4 - 8 * i, 2),
                          });
                        setChartValues(
                          newValues.sort((a, b) => a.xValue - b.xValue)
                        );
                      }
                    }}
                  />
                </div>
              </div>
            </>
          ),
          visual: (
            <ErrorCurve
              id="error-curve"
              width={800}
              height={400}
              values={chartValues}
            />
          ),
        },
        {
          text: (
            <>
              Wie du sehen kannst, bildet sich um den Wert <b>α = 0.5</b> ein
              Tal. An dieser Stelle ist der Fehler am kleinsten und damit unser
              Raten am besten. Stell dir jetzt vor, wir raten mit einem
              Multiplikator von <b>α = 0.25</b> und platzieren auf dem Graphen
              einen Ball.
              <div className="flex-wrapper" style={{ marginTop: 175 }}>
                <Button
                  text="Ball platzieren"
                  onClick={() => {
                    setButtonClicked(true);

                    setTimeout(() => setButtonClicked(false), 100);
                  }}
                ></Button>
              </div>
            </>
          ),
          visual: (
            <PhysicsSim width={800} height={400} spawnObject={buttonClicked}>
              <ErrorCurve
                width={800}
                height={400}
                values={getFullValues()}
                isAnimationActive={false}
              />
            </PhysicsSim>
          ),
        },
        {
          text: (
            <>
              Wie du sehen konntest, rollt der Ball ins Tal. Das ist die Idee
              hinter <b>“Gradient Descent”</b>:
              <br />
              <br />
              Wir wissen nicht nur dass wir einen Fehler gemacht haben, sondern
              auch in welche Richtung wir <b>α</b> abändern müssen, um besser zu
              raten.
              <br />
              <br />
              Wenn wir uns nun schrittweise vortasten und das ganze oft genug
              machen, landen wir in den meisten Fällen irgendwann an einem
              Punkt, an dem <b>α</b> ziemlich gut gewählt ist und wir das
              Verhalten gut modelliert haben. Das ist der Prozess, den man unter
              dem Training von künstlichen Intelligenzen versteht.
            </>
          ),
        },
        {
          text: (
            <>
              Unser Beispiel war natürlich sehr minimalistisch. Komplexeres
              Verhaltenbenötigt komplexere Modelle, also mehr Parameter. Wir
              können in unserem Beispiel einen zweiten Parameter <b>β</b>{" "}
              einführen, indem wir einen Zwischenschritt einbauen.
            </>
          ),
          visual: (
            <img
              className="funktionen-wide"
              src={require("../assets/Funktionen6.png")}
              alt="Eine Funktion mit Zwischenschritt"
            />
          ),
        },
        {
          text: (
            <>
              Wenn wir nun wie zuvor die Fehlerrate visualisieren möchten,
              brauchen wir eine weitere Dimension. Der erstehende Graph ist eine
              Hügellandschaft mit Tälern bei den niedrigen Fehlerraten.
              <br />
              <br />
              An dieser Stelle lässt sich etwas wichtiges erkennen: es kann
              mehrere Lösungen für das gleiche Verhalten geben. Bei ML fängt das
              Training an einer <b>zufälligen</b> Stelle an und arbeitet sich zu
              einem
              <b>lokalen Tief</b> hervor. Das garantiert jedoch nicht, dass es
              keine andere Konfiguration von Parametern gibt, die eine
              niedrigere Fehlerrate produziert.
            </>
          ),
        },
        {
          text: (
            <>
              Gradient Descent ist ein Teil des Backpropagation Algorithmus. Wir
              werden in diesem Einstieg nicht weiter auf den Algorithmus
              eingehen, da er sehr komplex ist, alles was du wissen musst ist
              Folgendes:
              <br />
              <br />
              Ein neuronales Netz lernt, indem es
              <ol>
                <li>Basierend auf Eingabewerten eine Vorhersage macht</li>
                <li>Die Vorhersage mit dem bekannten Ausgabewert vergleicht</li>
                <li>
                  Die Parameter anpasst, sodass die Fehlerrate sich verringert
                </li>
              </ol>
            </>
          ),
        },
        {
          text: (
            <>
              An dieser Stelle können wir ganz bewusst die Frage “Was ist ein
              neuronales Netz” beantworten:
              <br />
              <br />
              Ein neuronales Netz ist ein mathematisches Konstrukt aus Neuronen
              und Verbindungen, das durch das Training auf bekannte Daten
              versucht, einen möglichst kleinen Fehler zu produzieren.
              <br />
              <br />
              Auch wenn moderne Ansätze viel Komplexität hinzufügen, ist das der
              Kern der Idee von neuronalen Netzen.
            </>
          ),
        },
      ],
    }, // ALMOST DONE (3D error curve)
    {
      title: "AKTIVIERUNGSFUNKTIONEN",
      pages: [
        {
          text: (
            <>
              In realen Beispielen gehört noch eine Menge zu einem neuronalen
              Netz dazu. Zum Einen hat jede Neurone - also jeder Knotenpunkt -
              eine sogenannte <b>Aktivierungsfunktion</b>. Diese Funktion
              entscheidet, ob und wie eine Neurone einen Wert weiterreicht. Ein
              Beispiel hierfür ist die <b>ReLU</b> Funktion. Die Funktion gibt
              positive Werte weiter, bei negativen Werten gibt sie jedoch 0
              zurück.
            </>
          ),
          visual: <ActivationGraph type="ReLU" width={800} height={400} />,
        },
        {
          text: (
            <>
              Ein weiteres Beispiel ist die <b>Sigmoid</b> Funktion. Sie
              skaliert alle eingehenden Werte in einen Bereich zwischen 0 und 1.
            </>
          ),
          visual: <ActivationGraph type="Sigmoid" width={800} height={400} />,
        },
        {
          text: (
            <>
              Diese Funktionen werden genutzt, um komplexes und nicht lineares
              Verhalten zu modellieren. Die Idee dahinter stammt daher, wie
              unsere eigenen Gehirne funktionieren:
              <br />
              <br />
              die Neuronen gehen Verbindungen miteinander ein und senden
              elektrische Impulse. Bei einem ausreichend starken Impuls wird die
              Neurone aktiviert und sendet das Signal weiter. Die Stärke der
              Verbindung zwischen den Neuronen entscheidet dabei, wie stark das
              Signal weitergeleitet wird.
              <br />
              <br />
              In unserem Beispiel wurde diese Stärke durch die Multiplikatoren{" "}
              <b>α</b> und <b>β</b> dargestellt; generell nennt man sie{" "}
              <b>Gewichtung</b> oder <b>Bias</b>.{" "}
            </>
          ),
          visual: BRAIN_LOGO,
        },
      ],
    }, // DONE
    {
      title: "LAYERS",
      pages: [
        {
          text: (
            <>
              Zusätzlich sind neuronale Netze in realen Beispielen wesentlich
              komplexer. Es gibt selten nur einen Eingabe- oder Ausgabewert.
              Stattdessen sind neuronale Netze in sogenannte <b>Layers</b>{" "}
              aufgeteilt, die jeweils einen Zwischenschritt darstellen.
              <br />
              <br />
              Layers zwischen dem Input- und Output Layer werden{" "}
              <b>Hidden Layers</b> genannt. Ein Layer kann mehrere Neuronen
              beinhalten, wobei{" "}
              <b>
                jede Neurone aus einem Layer mit den Neuronen aus dem vorherigen
                und nachfolgenden Layer verbunden ist
              </b>
              .
              <br />
              <br />
              Konkret sieht das Ganze so aus:
            </>
          ),
          visual: (
            <AnimatedNetwork
              layers={[
                {
                  nodes: 2,
                },
                {
                  nodes: 3,
                },
                {
                  nodes: 3,
                },
                {
                  nodes: 1,
                },
              ]}
            />
          ),
        },
        {
          text: (
            <>
              Wie du sehen kannst, sieht das Ganze schon wesentlich verwirrender
              aus. Du solltest dir jedoch immer vor Augen halten, dass das
              Grundkonzept das gleiche bleibt:
            </>
          ),
          visual: (
            <h1 className="raten">
              raten -&gt; mit bekannten Werten prüfen -&gt; Fehler erkennen
              -&gt; besser raten
            </h1>
          ),
        },
      ],
    }, // INPUT/OUTPUT NN
    {
      title: "KLASSIFIZIERUNG UND REGRESSION",
      pages: [
        {
          text: (
            <>
              Es gibt <b>zwei verschiedene Arten von Ausgabewerten</b> - und
              damit Modellarten - in neuronalen Netzen: In unserem
              Mathe-Beispiel wurde als Ausgabe ein einzelner, beliebig großer
              numerischer Wert berechnet. Diese Form der Ausgabe wird{" "}
              <b>Regression</b> genannt. Es handelt sich bei unserem Modell also
              um ein <b>Regressionsmodell</b>.
            </>
          ),
          visual: (
            <AnimatedNetwork
              animate={false}
              layers={[
                {
                  nodes: 2,
                },
                {
                  nodes: 3,
                },
                {
                  nodes: 3,
                },
                {
                  nodes: 1,
                },
              ]}
            />
          ),
        },
        {
          text: (
            <>
              Im Gegensatz dazu gibt es neuronale Netze zur{" "}
              <b>Klassifizierung</b> von Daten. Ein klassisches Beispiel dafür
              ist ein Netz, das entscheidet, ob auf einem Bild ein Hund oder
              eine Katze dargestellt ist. Als Output Layer hat das Netz zwei
              Neuronen - für jede Kategorie eine - die jeweils einen Wert von 0
              bis 1 ausgeben. Ein Wert von 0.73 bedeutet dabei so viel wie “Ich
              bin mir zu 73% sicher, dass auf dem Bild eine Katze zu sehen ist.”
              <div className="flex-wrapper" style={{ marginTop: 175 }}>
                <FileInput
                  text="Bild hochladen"
                  onChange={(event) => {
                    const file = event.target.files[0];

                    if (!file) return;

                    setSelectedFile(file);
                    setIsFilePicked(true);

                    // Convert selected file to data URL
                    const reader = new FileReader();
                    reader.onload = () => {
                      setImageSrc(reader.result);
                    };
                    reader.readAsDataURL(file);
                  }}
                />
                <Button
                  text="Vorhersage"
                  onClick={async () => {
                    const formData = new FormData();

                    formData.append("File", selectedFile);

                    const _predictions = await fetch(
                      "http://localhost:5000/classify",
                      {
                        method: "POST",
                        body: formData,
                      }
                    ).then((response) => response.json());

                    setPredictions(_predictions);
                  }}
                ></Button>
              </div>
            </>
          ),
          visual: (
            <div className="flex-wrapper" style={{ height: "100%" }}>
              {isFilePicked && imageSrc && (
                // eslint-disable-next-line jsx-a11y/alt-text
                <img src={imageSrc} />
              )}
              <div className="prediction-wrapper">
                <div className="prediction-item">
                  {DOG_ICON}
                  <div>{predictions["dog"].toFixed(2)}</div>
                </div>
                <div className="prediction-item">
                  {CAT_ICON}
                  <div>{predictions["cat"].toFixed(2)}</div>
                </div>
              </div>
            </div>
          ),
        },
      ],
    }, // INPUT/OUTPUT NN
    {
      title: "HYPERPARAMETER",
      pages: [
        {
          text: (
            <>
              Als letzter Aspekt dieses Einstiegs in die Welt von Machine
              Learning werden wir uns mit den <b>Hyperparametern</b>{" "}
              beschäftigen. Hyperparameter sind Parameter zur{" "}
              <b>Spezifizierung des Trainingsprozesses</b>, die von dem/der
              Entwickler:in gewählt werden.
            </>
          ),
        },
        {
          text: (
            <>
              Schauen wir uns als Erstes einmal die{" "}
              <b>Learning Rate (Lernrate)</b> an. Wir wissen mittlerweile, dass
              wir mit Gradient Descent “den Berg herab” die Fehlerrate
              verbessern können. Nach jeder Raterunde versucht sich das Modell
              also zu verbessern, indem es einen Schritt weiter Richtung Tal
              geht. Die <b>Learning Rate</b> sagt dabei aus, <b>wie groß</b>{" "}
              dieser Schritt sein soll. Hierbei sollten zwei Szenarien vermieden
              werden:
              <ol>
                <li>
                  Bei <b>zu kleiner</b> Learning Rate kann das Modell nicht
                  ausreichend aus seinen Fehlern lernen. Besonders in komplexen
                  Trainingsprozessen kann dies viel zusätzliche Zeit und
                  Rechenkraft bedeuten.
                </li>
                <li>
                  Bei <b>zu großer</b> Learning Rate passiert es schnell, dass
                  das Modell <b>über das Ziel hinausschießt</b>. Stell dir einen
                  Fahrer vor, der versucht gerade zu fahren, aber jedes Mal zu
                  weit dagegenlenkt.
                </li>
              </ol>
            </>
          ),
          visual: (
            <PhysicsSim width={800} height={400} spawnAutomatically={true}>
              <ErrorCurve
                width={800}
                height={400}
                values={getFullValues()}
                isAnimationActive={false}
              />
            </PhysicsSim>
          ),
        },
        {
          text: (
            <>
              Ein weiterer Hyperparameter beschreibt die Anzahl der{" "}
              <b>Epochen</b>. Jedes Mal, wenn das Modell alle Trainingsdaten
              einmal durchlaufen hat, ist eine Epoche abgeschlossen. Auch hier
              gibt es zwei Szenarien, die vermieden werden sollen:
              <ol>
                <li>
                  Bei <b>zu wenig</b> Epochen kann das Modell den Kontext der
                  Trainingsdaten nicht ausreichend erlernen.
                </li>
                <li>
                  Bei <b>zu vielen</b> Epochen entsteht ein sogenanntes
                  “Overfitting”. Das Modell lernt, bei genau diesen Daten eine
                  kleine Fehlerrate zu produzieren, ist jedoch nicht mehr auf
                  neue Daten außerhalb der Trainingsdaten anwendbar.
                </li>
              </ol>
            </>
          ),
          visual: (
            <img
              src={require("../assets/model accuracy.png")}
              alt="Beispiel-Graph für abnehmende Modellgenauigkeit durch Overfitting"
            />
          ),
        },
      ],
    }, // DONE
  ];

  return <TutorialLayout sections={sections} onClose={onClose} />;
}

export default TutorialNN;
