import { useState } from "react";
import { CLOSE_BUTTON } from "../graphics";
import "./MLApplication.scss";

function MLApplication({ title, example, tutorial, onClose }) {
  const [tab, setTab] = useState(0);

  return (
    <div className="application">
      <div id="close-button" onClick={onClose}>
        {CLOSE_BUTTON}
      </div>

      <div className="title-section">
        <div className="title">{title}</div>
      </div>
      <div className="application-section">
        <div className="application-navigation">
          <div
            className={tab === 0 ? "example active" : "example"}
            onClick={() => setTab(0)}
          >
            PROBIER ES AUS
          </div>
          <div
            className={tab === 1 ? "tutorial active" : "tutorial"}
            onClick={() => setTab(1)}
          >
            SO FUNKTIONIERTS
          </div>
        </div>
        <div className="application-body">{tab === 0 ? example : tutorial}</div>
      </div>
    </div>
  );
}

export default MLApplication;
