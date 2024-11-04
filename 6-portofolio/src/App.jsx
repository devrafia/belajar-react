import { useEffect } from "react";
import { useState } from "react";
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
      <h1>{letter}</h1>
    </div>
  );
}
