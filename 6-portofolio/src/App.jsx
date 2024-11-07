/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useState } from "react";

// framer-motion
import { motion } from "framer-motion";
// variants
import { fadeIn } from "./variants";

// images
import L from "./assets/images/L.png";
import github from "./assets/logo/github.png";
import linkedin from "./assets/logo/linkedin.png";
import instagram from "./assets/logo/instagram.png";
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
      // Optional parameters
      direction: "horizontal",
      loop: true,
      spaceBetween: 5,

      // If we need pagination
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },

      // Navigation arrows
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
        },
        620: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        },
      },
      modules: [Navigation, Pagination],
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
          <motion.div
            variants={fadeIn("right", 0.1)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.7 }}
            className="intro-section"
          >
            <h3 className="welcome-heading">Welcome to my Portofolio</h3>
            <h1 className="name-intro">
              Hello i&lsquo;m <span className="name">{letter}</span>
            </h1>
            <h2 className="skill">Software Engineer</h2>
            <p className="profile-description">
              Full Stack Developer wannabe yang siap memberikan solusi kreatif
              untuk kebutuhan digital. Mengutamakan kolaborasi dan selalu
              terbuka untuk tantangan baru dalam membangun aplikasi dengan
              performa tinggi.
            </p>
          </motion.div>

          <motion.div
            variants={fadeIn("up", 0.1)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.5 }}
            className="img-section hideOnMobile"
          >
            <img src={L} alt="" />
          </motion.div>
        </div>
      </section>
      <section className="about" id="about">
        <motion.div
          variants={fadeIn("left", 0.1)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.7 }}
          className="about-header"
        >
          <h1>About Me</h1>
          <h3>
            &quot; Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Suscipit, consectetur? &quot;
          </h3>
        </motion.div>
        <motion.div
          variants={fadeIn("right", 0.1)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.1 }}
          className="about-description"
        >
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
        </motion.div>
      </section>
      <section className="skills" id="skills">
        <motion.div
          variants={fadeIn("left", 0.1)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.7 }}
          className="skills-header"
        >
          <h1>SKILLS</h1>
        </motion.div>
        <motion.div
          variants={fadeIn("left", 0.1)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.2 }}
          className="skills-list"
        >
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
        </motion.div>
      </section>
      <section className="projects" id="projects">
        <motion.div
          variants={fadeIn("down", 0.1)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.7 }}
          className="projects-header"
        >
          <h1>PROJECTS</h1>
        </motion.div>
        <motion.div
          variants={fadeIn("up", 0.1)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.1 }}
          className="swiper"
        >
          <div className="projects-list swiper-wrapper">
            <div className="project swiper-slide">
              <img src={L} alt="" />
              <h3>PROJECT 1</h3>
            </div>
            <div className="project swiper-slide">
              <img src={L} alt="" />
              <h3>PROJECT 2</h3>
            </div>
            <div className="project swiper-slide">
              <img src={L} alt="" />
              <h3>PROJECT 3</h3>
            </div>
            <div className="project swiper-slide">
              <img src={L} alt="" />
              <h3>PROJECT 4</h3>
            </div>
            <div className="project swiper-slide">
              <img src={L} alt="" />
              <h3>PROJECT 5</h3>
            </div>
          </div>
          <div className="swiper-pagination"></div>

          <div className="swiper-button-prev"></div>
          <div className="swiper-button-next"></div>
        </motion.div>
      </section>
      <section className="footer">
        <div className="container">
          <h1>Thanks for scrolling</h1>
          <div className="logo">
            <img src={github} alt="" />
            <img src={linkedin} alt="" />
            <img src={instagram} alt="" />
          </div>
        </div>
      </section>
    </>
  );
}
