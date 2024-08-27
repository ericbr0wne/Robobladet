import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="robo-nav">
      <ul className="nav-list">
        <li className="nav-item">
          <Link className="nav-link" to="/">
            Artiklar
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/privacy">
            Policy
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/categories">
            Kategorier
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/about">
            Designers
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/contact-us">
            Kontakt
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            Inlogg
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
