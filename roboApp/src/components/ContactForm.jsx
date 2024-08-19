import React from "react";
import "../components/ContactForm.css";

const ContactForm = () => {
  const handleSubmit = async (event) => {
    event.preventDefault();

    const submitButton = event.target.querySelector("#submitButton");
    const rect = submitButton.getBoundingClientRect();
    const originX = (rect.left + rect.right) / 2 / window.innerWidth;
    const originY = (rect.top + rect.bottom) / 2 / window.innerHeight;

    // Trigger the confetti effect
    window.confetti({
      particleCount: 100,
      spread: 70,
      origin: { x: originX, y: originY },
      colors: ["#0056b3", "#e6e04b", "#2a2a2a", "#fcf9a1"],
    });
  };

  return (
    <div id="contactContainer">
      <h1>Contact us</h1>
      <div id="contactText">
        <h2>Got any questions?</h2>
        <p>Do not hesitate to contact us!</p>
        <p>
          Fill in the contact form or just send us an email to{" "}
          <a href="mailto:info@robobladet.com">info@robobladet.com</a>
        </p>
        <div>
          <img
            id="contactImg"
            src={"../assets/email-robot.png"}
            alt="Robot holding an email logo"
          />
        </div>
      </div>
      <form id="contactForm" onSubmit={handleSubmit}>
        <h2 id="contactFormH2">Contact form</h2>
        <label htmlFor="fName">First name:</label>
        <input
          type="text"
          className="contactInput"
          name="fName"
          placeholder="First name"
          required
        />
        <label htmlFor="lName">Last name:</label>
        <input
          type="text"
          className="contactInput"
          name="lName"
          placeholder="Last name"
        />
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          className="contactInput"
          name="email"
          placeholder="Email"
          required
        />
        <label htmlFor="subject">Subject:</label>
        <select id="subject" name="subject" required>
          <option value="">Select a subject</option>
          <option value="Article">Article</option>
          <option value="Privacy policy">Privacy policy</option>
          <option value="Other">Other</option>
        </select>
        <label htmlFor="message">Message:</label>
        <textarea
          className="contactInput"
          name="message"
          rows="4"
          placeholder="Write your message.."
          required
        ></textarea>
        <input id="submitButton" type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default ContactForm;
