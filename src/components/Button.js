import "./Button.scss";

function Button({ text, icon }) {
  return (
    <button>
      {icon && <div>{icon}</div>}
      <div>{text}</div>
    </button>
  );
}

export default Button;
