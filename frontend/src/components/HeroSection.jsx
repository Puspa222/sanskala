import React, { useEffect, useState } from "react";
import "./css/HeroSection.css";

function HeroSection() {
  const slides = [
    {
      image: "/a4c3b2bd-ce4d-4a6e-a68f-a3331f64e5ac.jpeg",
      description: "Explore the rich heritage of traditional festivals.",
    },
    {
      image: "back.jpg",
      description: "Dive into the world of cultural music and dance.",
    },
    {
      image: "images(1).jpeg",
      description: "Experience the beauty of global cuisine and art.",
    },
    {
      image: "images.jpeg",
      description: "Join the celebration of cultural diversity around the world.",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Automatically change slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 3000); // 3000 ms = 3 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <section
      className="hero"
      style={{
        backgroundImage: `url(${slides[currentIndex].image})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        transition: "background-image 1s ease-in-out", // Smooth transition effect
      }}
    >
      <div className="hero-content">
        <h1>Welcome to Culture Unveiled</h1>
        <p>{slides[currentIndex].description}</p>
        <button>Explore More</button>
      </div>
    </section>
  );
}

export default HeroSection;