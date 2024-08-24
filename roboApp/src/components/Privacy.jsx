import React from "react";
import Header from "../components/Header";
import ContactForm from "../components/ContactForm";
import PrivacySlideshow from "../components/PrivacySlideshow";
import { Link } from "react-router-dom";

const Privacy = () => {
  return (
    <ul>
      <div>
        <PrivacySlideshow />
      </div>
    </ul>
  );
};

export default Privacy;
