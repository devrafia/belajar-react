/* eslint-disable react/prop-types */
import { useState } from "react";

export default function App() {
  const [list, setList] = useState([]);
  const c = list.filter((item) => item.checked == true).length;
  const [countCheck, setCountCheck] = useState(c);

  function handleAddItem(newItem) {
    const newList = [...list, newItem];
    setList(newList);
  }

  function handleDeleteItem(id, checked) {
    const newList = list.filter((item) => item.id != id);
    setCountCheck(checked ? countCheck - 1 : countCheck);
    setList(newList);
  }

  function handleClearItem() {
    const newList = list.slice(0, 0);
    setList(newList);
    setCountCheck(0);
  }

  function handleToogle(id, checked) {
    const newList = list.map((item) =>
      item.id == id ? { ...item, checked: !item.checked } : item
    );
    setList(newList);
    handleCountCheck(checked);
  }

  function handleCountCheck(checked) {
    setCountCheck(checked ? countCheck + 1 : countCheck - 1);
  }

  return (
    <div className="app">
      <Header />
      <Form onAddItem={handleAddItem} />
      <List
        list={list}
        onDeleteItem={handleDeleteItem}
        onClearitem={handleClearItem}
        onToogle={handleToogle}
        onCountCheck={handleCountCheck}
      />
      <Footer list={list} countCheck={countCheck} />
    </div>
  );
}

function Header() {
  return <h1>Catatan Belanjaku 📝</h1>;
}

function Form({ onAddItem }) {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();
    if (!name) return;
    const newItem = {
      id: Date.now(),
      name,
      quantity,
      checked: false,
    };
    onAddItem(newItem);
    setName("");
    setQuantity(1);
  }

  const quantityNum = [...Array(20)].map((_, i) => {
    return (
      <option value={i + 1} key={i + 1}>
        {i + 1}
      </option>
    );
  });
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>Hari ini belanja apa kita?</h3>
      <select value={quantity} onChange={(e) => setQuantity(e.target.value)}>
        {quantityNum}
      </select>
      <input
        type="text"
        placeholder="nama barang..."
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button>Tambah</button>
    </form>
  );
}

function List({ list, onDeleteItem, onClearitem, onToogle, onCountCheck }) {
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

function Item({ item, onDeleteItem, onToogle }) {
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

function Footer({ list, countCheck }) {
  if (list.length == 0)
    return <footer className="stats">Daftar belanjaan masih kosong!</footer>;
  const itemTotal = list.length;
  const itemPercentage = Math.round((countCheck / itemTotal) * 100);
  return (
    <footer className="stats">
      Ada {itemTotal} barang di daftar belanjaan, {countCheck} barang sudah
      dibeli ({itemPercentage} %)
    </footer>
  );
}
