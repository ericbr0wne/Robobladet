import React from "react";
import "../components/ContactForm.css";
import emailRobot from "../assets/email-robot.png";

const ContactForm = () => {
  const handleSubmit = async (event) => {
    event.preventDefault();

    const submitButton = event.target.querySelector("#submitButton");
    const rect = submitButton.getBoundingClientRect();
    const originX = (rect.left + rect.right) / 2 / window.innerWidth;
    const originY = (rect.top + rect.bottom) / 2 / window.innerHeight;

    window.confetti({
      particleCount: 100,
      spread: 70,
      origin: { x: originX, y: originY },
      colors: ["#4169e1", "#d9ffff", "#001423", "#005d89"],
    });
  };

  return (
    <div id="contactContainer">
      <div id="contactText">
        <h2>Har du några frågor?</h2>
        <p>Tveka inte att kontakta oss!</p>
        <p>
        Fyll i kontaktformuläret eller skicka ett mail till{" "}
          <a id="email" href="mailto:info@robobladet.se">
            info@robobladet.se
          </a>
        </p>
        <div>
          <img
            id="contactImg"
            src={emailRobot}
            alt="Robot holding an email logo"
          />
        </div>
      </div>
      <form id="contactForm" onSubmit={handleSubmit}>
        <h2 id="contactFormH2">Kontaktformulär</h2>
        <label htmlFor="fName">Förnamn:</label>
        <input
          type="text"
          className="contactInput"
          name="fName"
          required
        />
        <label htmlFor="lName">Efternamn:</label>
        <input
          type="text"
          className="contactInput"
          name="lName"
        />
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          className="contactInput"
          name="email"
          required
        />
        <label htmlFor="subject">Ämne:</label>
        <select id="subject" name="subject" required>
          <option value="">Välj ett ämne</option>
          <option value="Article">Artiklar</option>
          <option value="Privacy policy">Integritetspolicy</option>
          <option value="Other">Annat</option>
        </select>
        <label htmlFor="message">Meddelande:</label>
        <textarea
          className="contactInput"
          name="message"
          rows="4"
          required
        ></textarea>
        <input id="submitButton" type="submit" value="Skicka" />
      </form>
    </div>
  );
};

export default ContactForm;
