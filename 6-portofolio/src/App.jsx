/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useState } from "react";
import L from "./assets/images/L.png";
import Navbar from "./components/Navbar/Navbar";

// core version + navigation, pagination modules:
import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";
// import Swiper and modules styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

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

  // Swiper
  useEffect(() => {
    new Swiper(".swiper", {
      modules: [Navigation, Pagination],
      // Optional parameters
      direction: "horizontal",
      loop: true,

      // If we need pagination
      pagination: {
        el: ".swiper-pagination",
        type: "fraction",
      },

      // Navigation arrows
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },

      // And if we need scrollbar
    });
  }, []);

  // navbar scrolled
  const [scroll, setScroll] = useState("");

  useEffect(() => {
    // Fungsi untuk menangani perubahan scroll
    function handleScroll() {
      if (window.scrollY > 50) {
        setScroll("scrolled");
      } else {
        setScroll("");
      }
    }

    // Tambahkan event listener
    window.addEventListener("scroll", handleScroll);

    // Hapus event listener saat komponen tidak digunakan lagi
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`app ${theme}`}>
      <Navbar theme={theme} setTheme={setTheme} scroll={scroll} />
      <Main letter={letter} />
    </div>
  );
}

function Main({ letter }) {
  return (
    <>
      <section className="main">
        <div className="row">
          <div className="intro-section">
            <h3 className="welcome-heading">Welcome to my Portofolio</h3>
            <h1 className="name-intro">
              Hello i&lsquo;m <span className="name">{letter}</span>
            </h1>
            <h2 className="skill">Software Engineer</h2>
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
      <section className="about" id="about">
        <div className="about-header">
          <h1>About Me</h1>
          <h3>
            &quot; Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Suscipit, consectetur? &quot;
          </h3>
        </div>
        <div className="about-description">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam
            iusto ratione quo, rem, eligendi accusantium asperiores harum minima
            porro ducimus maiores voluptatem fugiat nihil nulla. Facere eius
            commodi ad dolore, quae provident quam? Fugiat, aliquam officiis,
            perferendis totam sunt culpa omnis corrupti in impedit porro odio
            sed repellat minima itaque rem ea tenetur voluptate. Vel tempore
            aspernatur dolorum. Sequi, consequatur molestias rerum magni
            corporis iusto facere quaerat! Sunt veritatis doloribus omnis ullam
            tempora inventore dolorem eum iusto aliquid. Perspiciatis quibusdam
            suscipit dicta quo, labore, non harum minima doloribus vel eveniet
            quod at doloremque, amet excepturi fugiat quia temporibus debitis
            repellat.
          </p>
        </div>
      </section>
      <section className="skills" id="skills">
        <div className="skills-header">
          <h1>SKILLS</h1>
        </div>
        <div className="skills-list">
          <div className="skill-box">
            <img src={L} alt="" />
            <span className="skill-text">Javascript</span>
          </div>
          <div className="skill-box">
            <img src={L} alt="" />
            <span className="skill-text">Javascript</span>
          </div>
          <div className="skill-box">
            <img src={L} alt="" />
            <span className="skill-text">Javascript</span>
          </div>
          <div className="skill-box">
            <img src={L} alt="" />
            <span className="skill-text">Javascript</span>
          </div>
          <div className="skill-box">
            <img src={L} alt="" />
            <span className="skill-text">Javascript</span>
          </div>
          <div className="skill-box">
            <img src={L} alt="" />
            <span className="skill-text">Javascript</span>
          </div>
          <div className="skill-box">
            <img src={L} alt="" />
            <span className="skill-text">Javascript</span>
          </div>
          <div className="skill-box">
            <img src={L} alt="" />
            <span className="skill-text">Javascript</span>
          </div>
        </div>
      </section>
    </>
  );
}
