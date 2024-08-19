import React from "react";
import Header from "../components/Header";
import ContactForm from "../components/ContactForm";
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
      <div>
        <ContactForm />
      </div>
    </ul>
  );
};

export default Privacy;
