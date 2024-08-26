import React, { useState, useEffect } from "react";
import "./Creators.css";

// Import the images of creators
import creator1 from "../assets/creators/1.png";
import creator2 from "../assets/creators/2.png";
import creator3 from "../assets/creators/3.png";
import creator4 from "../assets/creators/4.png";

const creators = [
    { img: creator1, name: "Benny Ahlin" },
    { img: creator2, name: "Matilda Olsson" },
    { img: creator3, name: "Eric Browne" },
    { img: creator4, name: "Valdemar Sersam" },
];

const Creators = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % creators.length);
        }, 8000); // Byt bild var 8:e sekund

        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <div className="creators-container">
            {creators.map((creator, index) => (
                <div
                    key={index}
                    className={`creator-slide ${index === currentIndex ? "active" : ""
                        }`}
                >
                    <div className="creator-name">{creator.name}</div>
                    <img src={creator.img} alt={`Creator ${index + 1}`} />
                </div>
            ))}
        </div>
    );
};

export default Creators;
