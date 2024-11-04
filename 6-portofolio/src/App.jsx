/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useState } from "react";
import L from "./assets/images/L.png";
import Navbar from "./components/Navbar/Navbar";

export default function App() {
  // Mengubah Tema
  const currentTheme = localStorage.getItem("current_theme");
  const [theme, setTheme] = useState(currentTheme ? currentTheme : "light");
  useEffect(() => {
    localStorage.setItem("current_theme", theme);
  }, [theme]);

  // Animasi teks nama
  const [letter, setLetter] = useState("a");
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

  function randomLetter(name) {
    let b = "";
    for (let i = 0; i < name.length; i++) {
      const a = setInterval(() => {
        setLetter(
          b + letters.charAt(Math.floor(Math.random() * letters.length))
        );
      }, 100);

      setTimeout(() => {
        clearInterval(a);
        b += name.charAt(i);
        setLetter(b);
      }, 700 * (i + 1));
    }
  }

  useEffect(() => {
    randomLetter("Rafi Akmal");
    setInterval(() => {
      randomLetter("Rafi Akmal");
    }, 30000);
  }, []);

  return (
    <div className={`app ${theme}`}>
      <Navbar theme={theme} setTheme={setTheme} />
      <Main letter={letter} />
    </div>
  );
}

function Main({ letter }) {
  return (
    <section className="main">
      <div className="row">
        <div className="intro-section">
          <h3 className="welcome-heading">Welcome to my Portofolio</h3>
          <h1 className="name-intro">
            Hello i&lsquo;m <span className="name">{letter}</span>
          </h1>
          <h2 className="skill">Web Developer</h2>
          <p className="profile-description">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam
            quisquam recusandae animi sapiente! Officia magnam, pariatur quo
            placeat dolorem reprehenderit.
          </p>
        </div>
        <div className="img-section">
          <img src={L} alt="" />
        </div>
      </div>
    </section>
  );
}
