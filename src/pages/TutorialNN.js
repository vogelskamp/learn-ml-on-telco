import TutorialLayout from "../components/TutorialLayout";
const sections = [
  {
    title: "EINFÜHRUNG NEURONALE NETZE",
    pages: [
      {
        text: (
          <>
            In der Algorithmik werden basierend auf <b>Eingabewerten</b> und
            Funktionen <b>Ausgabewerte</b> erfasst. Wenn wir also eine Funktion
            haben, dann können wir Werte für x eingeben und das Ergebnis
            berechnen. Diese Vorgehensweise ist essenziell für die moderne Welt,
            da wir nun für jeden Eingabewert x einen passenden Ausgabewert
            vorhersagen können.
          </>
        ),
      },
      {
        text: (
          <>
            Aber was hat das mit Machine Learning zu tun? Stell dir das gleiche
            Szenario vor wie gerade, nur dass wir jetzt so tun als würden wir
            die <b>Funktion</b> nicht kennen. Alles was wir haben sind unsere
            <b>Eingabewerte x</b> und <b>Ausgabewerte</b>, die irgendwie mit den
            Eingaben zusammenhängen.
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
      },
      {
        text: (
          <>
            Kurz gesagt: wir raten. Wir kriegen Eingabewerte, machen etwas damit
            und schauen dann, wie gut wir geraten haben. Dann versuchen wir,
            etwas besser zu raten.
            <br />
            <br />
            Wenn wir das oft genug machen und aus unseren Fehlern lernen,
            sollten wir irgendwann einen Weg gefunden haben, wie wir{" "}
            <u>annähernd</u>
            die gleichen Ergebnisse erhalten. Das ist die Grundlage von
            neuronalen Netzen und dem “Lernen” in Machine Learning. Konkret
            sieht das Ganze so aus: Auf der linken Seite haben wir unseren
            <b>Eingabewert</b>, der wird über den Pfeil auf irgendeine Art
            abgewandelt und wird damit zum <b>Ausgabewert</b>. Den vergleichen
            wir dann mit dem uns bekannten richtigen Ausgabewert und schauen,
            wie falsch wir lagen.
          </>
        ),
      },
      {
        text: (
          <>
            Lass uns das mal beispielsweise durchlaufen:
            <br />
            <br />
            Wir wissen, dass wir für einen Eingabewert x = 8 einen Ausgabewert
            von 4 erhalten sollten. Weil wir blöd sind, raten wir jetzt einfach
            mal, dass die Zahl auf dem Pfeil mal 3 gerechnet wird. Wir probieren
            es aus und merken, dass unser Ergebnis viel zu groß ist.
          </>
        ),
      },
      {
        text: (
          <>
            Also versuchen wir besser zu raten. Vielleicht sollte die Zahl
            geviertelt werden? Wir probieren es erneut. Diesmal ist das Ergebnis
            wesentlich näher an unserem Zielwert, jedoch sind wir über das Ziel
            hinausgeschossen.
          </>
        ),
      },
      {
        text: (
          <>
            Wir versuchen es ein drittes Mal und raten, dass die Zahl halbiert
            wird. Und das Ergebnis ist richtig! Wir kennen noch ein paar weitere
            Werte und überprüfen unseren Ansatz.
            <br />
            <br />
            Wir haben es geschafft! Was wir hier gemacht haben, ist das
            Verhalten von <b>Eingabe-</b> und <b>Ausgabewerten</b> zu
            modellieren. Dieses Modell können wir jetzt - genau so wie zuvor die
            Funktion - verwenden, um das Verhalten beliebiger Eingabewerte
            vorherzusagen.
          </>
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
      },
    ],
  },
  {
    title: "FEHLERRATE",
    pages: [
      {
        text: (
          <>
            An dieser Stelle sollten wir uns damit beschäftigen, was “Fehler”
            überhaupt heißt. In unserem Beispiel konnten wir erkennen, dass 2
            kleiner ist als 4 und wir deswegen höher raten sollten. In komplexen
            Beispielen ist das jedoch nicht so einfach zu erkennen. Zum Glück
            gibt tolle mathematische Vorgänge wie Back Propagation und Gradient
            Descent, die genau das ermöglichen. Die Verfahren sind hohe
            Mathematik, visuell lässt sich das Ganze jedoch leicht
            nachvollziehen.
          </>
        ),
      },
      {
        text: (
          <>
            In unserem Beispiel haben wir den Eingabewert x mit einer Zahl
            multipliziert, um den Ausgabewert zu erhalten. Diesen Multiplikator
            nennen wir jetzt allgemein <b>α</b>. Den Ausgabewert haben wir mit
            dem uns bekannten Wert verglichen, um unseren Fehler zu erkennen.
            Wenn wir jetzt wissen wollen, wie falsch wir lagen, müssen wir den
            Fehler berechnen. Lass uns hierfür die folgende Formel verwenden:
            <div>formel</div>
            Bei unserem vorherigen Beispiel bedeutet das: Fehler(2, 4) = (4 -
            2)² = 4. Das alleine sagt uns noch nicht sehr viel. Da das Ergebnis
            jedoch komplett davon abhängt, welchen Wert unser Multiplikator{" "}
            <b>α</b>
            hat, können wir einen Graphen bilden, der uns für einen Wert{" "}
            <b>α</b> einen Fehler gibt.
            <div>slider</div>
          </>
        ),
      },
      {
        text: (
          <>
            Wie du sehen kannst, bildet sich um den Wert <b>α = 0.5</b> ein Tal.
            An dieser Stelle ist der Fehler am kleinsten und damit unser Raten
            am besten. Stell dir jetzt vor, wir raten mit einem Multiplikator
            von <b>α = 0.25</b> und platzieren auf dem Graphen einen Ball.
          </>
        ),
      },
      {
        text: (
          <>
            Wie du sehen kannst, bildet sich um den Wert <b>α = 0.5</b> ein Tal.
            An dieser Stelle ist der Fehler am kleinsten und damit unser Raten
            am besten. Stell dir jetzt vor, wir raten mit einem Multiplikator
            von <b>α = 0.25</b> und platzieren auf dem Graphen einen Ball.
            <br />
            <br />
            Wie du siehst rollt der Ball ins Tal. Das ist die Idee hinter
            “Gradient Descent”: wir wissen nicht nur dass wir einen Fehler
            gemacht haben, sondern auch in welche Richtung wir <b>α</b> abändern
            müssen, um besser zu raten. Wenn wir das ganze oft genug machen,
            landen wir in den meisten Fällen irgendwann an einem Punkt, an dem{" "}
            <b>α</b>
            ziemlich gut gewählt ist und wir das Verhalten gut modelliert haben.
            Das ist der Prozess, den man unter dem Training von künstlichen
            Intelligenzen versteht.
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
            keine andere Konfiguration von Parametern gibt, die eine niedrigere
            Fehlerrate produziert.
          </>
        ),
      },
      {
        text: (
          <>
            Gradient Descent ist ein Teil des Backpropagation Algorithmus. Wir
            werden in diesem Einstieg nicht weiter auf den Algorithmus eingehen,
            da er sehr komplex ist, alles was du wissen musst ist Folgendes:
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
  },
  {
    title: "AKTIVIERUNGSFUNKTIONEN",
    pages: [
      {
        text: (
          <>
            In realen Beispielen gehört noch eine Menge zu einem neuronalen Netz
            dazu. Zum Einen hat jede Neurone - also jeder Knotenpunkt - eine
            sogenannte <b>Aktivierungsfunktion</b>. Diese Funktion entscheidet,
            ob und wie eine Neurone einen Wert weiterreicht. Ein Beispiel
            hierfür ist die <b>ReLU</b> Funktion. Die Funktion gibt positive
            Werte weiter, bei negativen Werten gibt sie jedoch 0 zurück.
          </>
        ),
      },
      {
        text: (
          <>
            Ein weiteres Beispiel ist die <b>Sigmoid</b> Funktion. Sie skaliert
            alle eingehenden Werte in einen Bereich zwischen 0 und 1.
          </>
        ),
      },
      {
        text: (
          <>
            Diese Funktionen werden genutzt, um komplexes und nicht lineares
            Verhalten zu modellieren. Die Idee dahinter stammt daher, wie unsere
            eigenen Gehirne funktionieren:
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
            <b>α</b>
            und <b>β</b> dargestellt; generell nennt man sie <b>Gewichtung</b>{" "}
            oder
            <b>Bias</b>.{" "}
          </>
        ),
      },
    ],
  },
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
            <b>Hidden Layers</b>
            genannt. Ein Layer kann mehrere Neuronen beinhalten, wobei{" "}
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
      },
      {
        text: (
          <>
            Wie du sehen kannst, sieht das Ganze schon wesentlich verwirrender
            aus. Du solltest dir jedoch immer vor Augen halten, dass das
            Grundkonzept das gleiche bleibt:
          </>
        ),
      },
    ],
  },
  {
    title: "KLASSIFIZIERUNG UND REGRESSION",
    pages: [
      {
        text: (
          <>
            Es gibt <b>zwei verschiedene Arten von Ausgabewerten</b> - und damit
            Modellarten - in neuronalen Netzen: In unserem Mathe-Beispiel wurde
            als Ausgabe ein einzelner, beliebig großer numerischer Wert
            berechnet. Diese Form der Ausgabe wird <b>Regression</b> genannt. Es
            handelt sich bei unserem Modell also um ein <b>Regressionsmodell</b>
            .
          </>
        ),
      },
      {
        text: (
          <>
            Im Gegensatz dazu gibt es neuronale Netze zur <b>Klassifizierung</b>{" "}
            von Daten. Ein klassisches Beispiel dafür ist ein Netz, das
            entscheidet, ob auf einem Bild ein Hund oder eine Katze dargestellt
            ist. Als Output Layer hat das Netz zwei Neuronen - für jede
            Kategorie eine - die jeweils einen Wert von 0 bis 1 ausgeben. Ein
            Wert von 0.73 bedeutet dabei so viel wie “Ich bin mir zu 73% sicher,
            dass auf dem Bild eine Katze zu sehen ist.”
            <div>Upload Buttons</div>
          </>
        ),
      },
    ],
  },
  {
    title: "HYPERPARAMETER",
    pages: [
      {
        text: (
          <>
            Als letzter Aspekt dieses Einstiegs in die Welt von Machine Learning
            werden wir uns mit den <b>Hyperparametern</b> beschäftigen.
            Hyperparameter sind Parameter zur{" "}
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
            wir mit Gradient Descent “den Berg herab” die Fehlerrate verbessern
            können. Nach jeder Raterunde versucht sich das Modell also zu
            verbessern, indem es einen Schritt weiter Richtung Tal geht. Die{" "}
            <b>Learning Rate</b> sagt dabei aus, <b>wie groß</b> dieser Schritt
            sein soll. Hierbei sollten zwei Szenarien vermieden werden:
            <ol>
              <li>
                Bei <b>zu kleiner</b> Learning Rate kann das Modell nicht
                ausreichend aus seinen Fehlern lernen. Besonders in komplexen
                Trainingsprozessen kann dies viel zusätzliche Zeit und
                Rechenkraft bedeuten.
              </li>
              <li>
                Bei <b>zu großer</b> Learning Rate passiert es schnell, dass das
                Modell <b>über das Ziel hinausschießt</b>. Stell dir einen
                Fahrer vor, der versucht gerade zu fahren, aber jedes Mal zu
                weit dagegenlenkt.
              </li>
            </ol>
          </>
        ),
      },
      {
        text: (
          <>
            Ein weiterer Hyperparameter beschreibt die Anzahl der <b>Epochen</b>
            . Jedes Mal, wenn das Modell alle Trainingsdaten einmal durchlaufen
            hat, ist eine Epoche abgeschlossen. Auch hier gibt es zwei
            Szenarien, die vermieden werden sollen:
            <ol>
              <li>
                Bei <b>zu wenig</b> Epochen kann das Modell den Kontext der
                Trainingsdaten nicht ausreichend erlernen.
              </li>
              <li>
                Bei <b>zu vielen</b> Epochen entsteht ein sogenanntes
                “Overfitting”. Das Modell lernt, bei genau diesen Daten eine
                kleine Fehlerrate zu produzieren, ist jedoch nicht mehr auf neue
                Daten außerhalb der Trainingsdaten anwendbar.
              </li>
            </ol>
          </>
        ),
      },
    ],
  },
];

function TutorialNN({ onClose }) {
  return <TutorialLayout sections={sections} onClose={onClose} />;
}

export default TutorialNN;
