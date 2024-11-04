/* eslint-disable react/prop-types */

import moon from "../../assets/logo/moon.png";
import sun from "../../assets/logo/sun.png";

export default function Navbar({ theme, setTheme }) {
  function handleToggle() {
    setTheme(theme == "light" ? "dark" : "light");
  }
  return (
    <nav className="navBar">
      <div className="logo">
        <h1>LOGO</h1>
      </div>
      <ul className="navLinks">
        <li className="link">Home</li>
        <li className="link">About</li>
        <li className="link">Contact</li>
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
