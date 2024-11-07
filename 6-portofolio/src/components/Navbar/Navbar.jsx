/* eslint-disable react/prop-types */

import moon from "../../assets/logo/moon.png";
import sun from "../../assets/logo/sun.png";
import { useState } from "react";

export default function Navbar({ theme, setTheme, scroll }) {
  const [sidebar, setSidebar] = useState(false);
  function handleToggle() {
    setTheme(theme == "light" ? "dark" : "light");
  }

  function showSidebar() {
    setSidebar(!sidebar);
  }

  return (
    <nav className={`navBar ${scroll}`}>
      <div className="logo">
        <h1>LOGO</h1>
      </div>
      <ul className={`sidebar ${sidebar}`}>
        <li className="link">
          <a onClick={showSidebar}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#black"
            >
              <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
            </svg>
          </a>
        </li>
        <li className="link">
          <a href="#top">Home</a>
        </li>
        <li className="link">
          <a href="#about">About</a>
        </li>
        <li className="link">
          <a href="#skills">SKILLS</a>
        </li>
        <li className="link">
          <a href="#projects">Projects</a>
        </li>
      </ul>
      <ul className="navLinks">
        <li className="link hideOnMobile">
          <a href="#top">Home</a>
        </li>
        <li className="link hideOnMobile">
          <a href="#about">About</a>
        </li>
        <li className="link hideOnMobile">
          <a href="#skills">SKILLS</a>
        </li>
        <li className="link hideOnMobile">
          <a href="#projects">Projects</a>
        </li>
        <li className="link hideOnDesktop">
          <a onClick={showSidebar}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill={theme == "dark" ? "white" : "#001670"}
            >
              <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
            </svg>
          </a>
        </li>
      </ul>
      <div className="themes">
        <img
          src={theme == "light" ? moon : sun}
          alt="moon"
          onClick={handleToggle}
        />
      </div>
    </nav>
  );
}
