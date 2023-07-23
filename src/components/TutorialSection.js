import "./TutorialSection.scss";

function TutorialSection({ title, text, children }) {
  return (
    <div className="tutorial-section">
      {title && <div id="title">{title}</div>}
      <div id="text">{text}</div>
      {children}
    </div>
  );
}

export default TutorialSection;
