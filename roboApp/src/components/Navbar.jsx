import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="robo-nav">
      <ul className="nav-list">
        <li className="nav-item">
          <Link className="nav-link" to="/">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/privacy">
            Privacy
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/categories">
            Categories
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/about">
            About
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/contact-us">
            Contact Us
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
