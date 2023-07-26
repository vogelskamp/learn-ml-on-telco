import { useState } from "react";
import { CLOSE_BUTTON } from "../graphics";
import "./TutorialLayout.scss";

function TutorialLayout({ sections, onClose }) {
  const [sectionIdx, setSectionIdx] = useState(0);

  const { title, pages } = sections[sectionIdx];

  const [pageIdx, setPageIdx] = useState(0);

  const hasNext =
    pageIdx < pages.length - 1 || sectionIdx < sections.length - 1;
  const hasPrev = pageIdx > 0 || sectionIdx > 0;

  return (
    <div className="basic-tutorial">
      <div id="close-button" onClick={onClose}>
        {CLOSE_BUTTON}
      </div>
      <div className="side-bar">
        {sections.map((_, idx) => (
          <div
            className={`section-button ${sectionIdx === idx ? "active" : ""}`}
            onClick={() => {
              setSectionIdx(idx);
              setPageIdx(0);
            }}
          >
            {idx + 1}.
          </div>
        ))}
      </div>
      <div className="side-bar-filler" />
      <div className="text-area">
        <div className="title">{title}</div>
        <div className="text-block">{pages[pageIdx].text}</div>
      </div>
      <div className="visual-area tutorial-area"></div>
      <div className="foot-bar">
        {pages.map((_, idx) => (
          <div
            className={`page-button ${pageIdx === idx ? "active" : ""}`}
            onClick={() => setPageIdx(idx)}
          >
            {idx + 1}.
          </div>
        ))}
        <div className="filler-section" />
        <div
          className={`prev-button ${hasPrev ? "active" : ""}`}
          onClick={() => {
            if (hasPrev) {
              if (pageIdx === 0) {
                setSectionIdx(sectionIdx - 1);
                setPageIdx(sections[sectionIdx - 1].pages.length - 1);
              } else setPageIdx(pageIdx - 1);
            }
          }}
        >
          Zurück
        </div>
        <div
          className={`next-button ${hasNext ? "active" : ""}`}
          onClick={() => {
            if (hasNext) {
              if (pageIdx === pages.length - 1) {
                setSectionIdx(sectionIdx + 1);
                setPageIdx(0);
              } else setPageIdx(pageIdx + 1);
            }
          }}
        >
          Weiter
        </div>
      </div>
    </div>
  );
}

export default TutorialLayout;
