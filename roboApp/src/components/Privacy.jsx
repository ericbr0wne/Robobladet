import React from "react";
import Header from "../components/Header";
import ContactForm from "../components/ContactForm";
import "../components/Privacy.css";
import { Link } from "react-router-dom";

const Privacy = () => {
  return (
    <ul>
      <div>
        <Header />
      </div>
      <li>
        <Link to="/">Homepage</Link>
      </li>
      <h1>Contact us</h1>
      <div>
        <ContactForm />
      </div>
    </ul>
  );
};

export default Privacy;
