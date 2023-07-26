import "./ListElement.scss";

function ListElement({ title, icon, onClick }) {
  return (
    <div className="list-element" onClick={onClick}>
      <div className="title">{title}</div>
      <div className="icon">{icon}</div>
    </div>
  );
}

export default ListElement;
