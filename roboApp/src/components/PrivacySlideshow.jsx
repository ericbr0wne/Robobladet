import React, { useState, useEffect } from "react";
import "../components/PrivacySlideshow.css";

// Images for the slideshow
import img1 from "../assets/slideshow-images/img-1.jpg";
import img2 from "../assets/slideshow-images/img-2.jpg";
import img3 from "../assets/slideshow-images/img-3.jpg";
import img4 from "../assets/slideshow-images/img-4.jpg";
import img5 from "../assets/slideshow-images/img-5.jpg";
import img6 from "../assets/slideshow-images/img-6.jpg";
import img7 from "../assets/slideshow-images/img-7.jpg";

const PrivacySlideshow = () => {
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 3000);

    return () => clearInterval(interval); // Cleanup interval on unmount
  });

  const slides = [img1, img2, img3, img4, img5, img6, img7];

  return (
    <div id="slideshow-container">
      {slides.map((slide, index) => (
        <div
          key={index}
          id="slides"
          style={{ display: index === slideIndex ? "block" : "none" }}
        >
          <img id="slideshow" src={slide} alt={`Slide ${index + 1}`} />
        </div>
      ))}
      <br />
      <div id="bullets">
        {slides.map((_, index) => (
          <span
            key={index}
            className={`bullet ${index === slideIndex ? "active" : ""}`}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default PrivacySlideshow;