import React, { useEffect, useState } from "react";
import "../css/HeroSection.css";
import slider1 from "../home-image/slider1.jpg";
import slider2 from "../home-image/slider2.jpeg";
import slider3 from "../home-image/slider3.jpg";
import slider4 from "../home-image/slider4.jpg";
function HeroSection() {
  const slides = [
    {
      image: slider1,
      description: "Explore the rich heritage of traditional festivals.",
    },
    {
      image: slider2,
      description: "Dive into the world of cultural music and dance.",
    },
    {
      image: slider3,
      description: "Experience the beauty of global cuisine and art.",
    },
    {
      image: slider4,
      description:
        "Join the celebration of cultural diversity around the world.",
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
