import "./TabularListItem.scss";

function TabularListItem({ items }) {
  return (
    <div
      className="tabular-list-item"
      style={{
        gridTemplateColumns: items.reduce(
          (prev, cur) => (prev += ` ${cur.percentage}%`),
          ""
        ),
      }}
    >
      {items.map((item) => (
        <div style={{ fontSize: "28px", textAlign: item.textAlign }}>
          {item.header}
        </div>
      ))}
      {items.map((item) => (
        <div style={{ textAlign: item.textAlign }}>{item.value}</div>
      ))}
    </div>
  );
}

export default TabularListItem;
