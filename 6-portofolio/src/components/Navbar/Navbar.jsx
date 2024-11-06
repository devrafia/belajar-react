/* eslint-disable react/prop-types */

import moon from "../../assets/logo/moon.png";
import sun from "../../assets/logo/sun.png";

export default function Navbar({ theme, setTheme, scroll }) {
  function handleToggle() {
    setTheme(theme == "light" ? "dark" : "light");
  }
  return (
    <nav className={`navBar ${scroll}`}>
      <div className="logo">
        <h1>LOGO</h1>
      </div>
      <ul className="navLinks">
        <li className="link">
          <a href="#top">Home</a>
        </li>
        <li className="link">
          <a href="#about">About</a>
        </li>
        <li>
          <a href="#skills">SKILLS</a>
        </li>
        <li className="link">Projects</li>
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
