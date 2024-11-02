/* eslint-disable react/prop-types */
import { useState } from "react";
import Header from "./Header";
import Form from "./Form";
import List from "./List";
import Footer from "./Footer";

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
