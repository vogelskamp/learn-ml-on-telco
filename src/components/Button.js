import "./Button.scss";

function Button({ text, icon, onClick }) {
  return (
    <button onClick={onClick}>
      {icon && <div>{icon}</div>}
      <div>{text}</div>
    </button>
  );
}

export default Button;
