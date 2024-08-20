import React from "react";
import Header from "../components/Header";
import ContactForm from "../components/ContactForm";
import PrivacySlideshow from "../components/PrivacySlideshow";
import "../components/Privacy.css";
import { Link } from "react-router-dom";

const Privacy = () => {
  return (
    <ul>
      <div>
        <PrivacySlideshow />
      </div>
      <h1>Contact us</h1>
      <div>
        <ContactForm />
      </div>
    </ul>
  );
};

export default Privacy;
