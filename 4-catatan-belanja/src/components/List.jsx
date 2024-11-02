/* eslint-disable react/prop-types */
import { useState } from "react";
import Item from "./Item";

export default function List({
  list,
  onDeleteItem,
  onClearitem,
  onToogle,
  onCountCheck,
}) {
  const [sortBy, setSortBy] = useState("input");

  function handleCLick() {
    confirm("Yakin hapus semua item?") ? onClearitem() : "";
  }

  let sortedItems;

  switch (sortBy) {
    case "name":
      sortedItems = list.slice().sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "checked":
      sortedItems = list.slice().sort((a, b) => a.checked - b.checked);
      break;
    default:
      sortedItems = list;
      break;
  }

  return (
    <>
      <div className="list">
        <ul>
          {sortedItems.map((item) => {
            return (
              <Item
                item={item}
                key={item.id}
                onDeleteItem={onDeleteItem}
                onToogle={onToogle}
                onCountCheck={onCountCheck}
              />
            );
          })}
        </ul>
      </div>
      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Urutkan berdasarkan urutan input</option>
          <option value="name">Urutkan berdasarkan nama barang</option>
          <option value="checked">Urutkan berdasarkan ceklis</option>
        </select>
        <button onClick={handleCLick}>Bersihkan Daftar</button>
      </div>
    </>
  );
}
