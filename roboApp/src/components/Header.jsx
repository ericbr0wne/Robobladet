import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logonew.png";

const Header = () => {
  return (
    <header>
      <div id="header-logo">
        <img src={logo} alt="Robobladets Logotyp" />
      </div>
    </header>
  );
};

export default Header;
