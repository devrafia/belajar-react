/* eslint-disable react/prop-types */
import { useState } from "react";
import cartshop from "./assets/img/cart.png";

const barang = [
  {
    id: 1,
    name: "Minyak Goreng",
    price: 12000,
  },
  {
    id: 2,
    name: "Mie Instant",
    price: 5000,
  },
  {
    id: 3,
    name: "Air Mineral",
    price: 3000,
  },
  {
    id: 4,
    name: "Tissue",
    price: 2000,
  },
  {
    id: 5,
    name: "Shampoo",
    price: 9000,
  },
  {
    id: 6,
    name: "Sabun",
    price: 3000,
  },
  {
    id: 7,
    name: "Odol",
    price: 3500,
  },
  {
    id: 8,
    name: "Beras",
    price: 20000,
  },
];
export default function App() {
  const [cart, setCart] = useState([]);
  const [item, setItem] = useState(cart.length);
  const [total, setTotal] = useState(0);

  function handleAddToCart(id, name, price) {
    if (cart.find((item) => item.id == id)) {
      const newCart = cart.map((item) => {
        if (item.id === id) {
          // Update qty jika item dengan id sama ditemukan
          return {
            ...item,
            qty: item.qty + 1,
            price: price * (item.qty + 1),
          };
        }
        return item;
      });
      console.log(newCart);

      setCart(newCart);
    } else {
      const newItem = {
        id,
        name,
        price,
        qty: 1,
      };
      console.log(cart);
      setCart([...cart, newItem]);
      setItem(item + 1);
    }
    setTotal(total + price);
  }

  function handleDeleteCart(id) {
    const newItem = cart.filter((item) => item.id !== id);
    const newPrice = cart.filter((item) => item.id == id);
    console.log(newPrice);

    setTotal(total - newPrice[0].price);
    setCart(newItem);
    setItem(item - 1);
  }

  return (
    <>
      <nav className="py-6 px-3 font-sans bg-slate-500 sticky top-0">
        <ul className="flex flex-wrap p-3">
          <li className="mr-auto text-4xl">Toko Sembako</li>
          <li className="w-10 h-10 relative">
            <span
              className={`absolute -right-1 -top-1 bg-pink-400 rounded-full h-5 w-5 text-sm flex items-center justify-center ${
                item == 0 ? `invisible` : ``
              }`}
            >
              {item}
            </span>
            <img src={cartshop} alt="cart" className="h-full w-full" />
          </li>
        </ul>
      </nav>
      <section className="hero  py-6 px-3 h-[max] flex flex-wrap bg-slate-400">
        <div className="container w-[53rem] h-[32rem] mr-auto gap-2 flex flex-wrap bg-slate-600 rounded-xl p-10 justify-center">
          {barang.map((item) => {
            return (
              <Product
                key={item.id}
                item={item}
                handleAddToCart={handleAddToCart}
              />
            );
          })}
        </div>
        <div className="container h-max max-h-[32rem] w-60 p-1 flex flex-col gap-2 overflow-y-scroll bg-slate-600 rounded-xl p-5 text-white shadow-xl mr-6">
          <span>Total: Rp. {total}</span>
          {cart.map((item) => {
            return (
              <Cart
                key={item.id}
                cart={item}
                handleDeleteCart={handleDeleteCart}
              />
            );
          })}
        </div>
      </section>
    </>
  );
}

function Product({ item, handleAddToCart }) {
  return (
    <div className="h-52 w-40 flex items-center justify-center flex-col gap-1 p-1 rounded-md shadow-lg bg-yellow-200">
      <img src={cartshop} alt="gambar" className="min-h-24" />
      <span className="text-sm font-semibold text-slate-900">{item.name}</span>
      <span className="text-sm">Rp. {item.price}</span>
      <button
        onClick={() => handleAddToCart(item.id, item.name, item.price)}
        className="bg-green-500 rounded-xl p-1 px-2 text-sm text-white text-center hover:bg-green-700 active:bg-green-800"
      >
        Add to cart
      </button>
    </div>
  );
}

function Cart({ cart, handleDeleteCart }) {
  return (
    <div className="h-20 flex border-t-2 p-2 bg-slate-700 rounded-lg shadow-xl">
      <img src={cartshop} alt="" className="object-contain" />
      <div className="flex flex-col w-full justify-center">
        <span className="text-sm">{cart.name}</span>
        <span className="text-sm">Rp. {cart.price}</span>
        <span className="text-sm">qty : {cart.qty}</span>
      </div>
      <a
        onClick={() => handleDeleteCart(cart.id)}
        className="ml-auto flex items-center cursor-pointer"
      >
        ❌
      </a>
    </div>
  );
}
