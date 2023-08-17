import "./Button.scss";

function Button({ text, icon, onClick }) {
  return (
    <button onClick={onClick}>
      {icon ? (
        <div className="icon">
          {icon}
          <div className="text-wrapper">
            <div>{text}</div>
          </div>
        </div>
      ) : (
        <div className="text-wrapper">{text}</div>
      )}
    </button>
  );
}

export default Button;
