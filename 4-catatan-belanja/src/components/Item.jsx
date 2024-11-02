/* eslint-disable react/prop-types */
export default function Item({ item, onDeleteItem, onToogle }) {
  return (
    <li key={item.id}>
      <input
        type="checkbox"
        checked={item.checked}
        onChange={(e) => onToogle(item.id, e.target.checked)}
      />
      <span style={{ textDecoration: item.checked ? "line-through" : "" }}>
        {item.quantity} {item.name}
      </span>
      <button onClick={() => onDeleteItem(item.id, item.checked)}>
        &times;
      </button>
    </li>
  );
}
