import React, { useEffect, useState } from "react";
import slider1 from "../home-image/slider1.jpg";
import slider2 from "../home-image/muslimre.jpg";
import slider3 from "../home-image/slider3.jpg";
import slider4 from "../home-image/slider4.jpg";
import { useNavigate } from "react-router-dom";

function HeroSection() {
  const navigate = useNavigate();
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
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-yellow-100">
      <div className="fixed top-0 w-full h-16 bg-gray-800 z-3"></div>
      <div className="mt-14 p-6">
        <section
          className="relative flex flex-col justify-center items-center text-center h-[70vh] bg-cover bg-center rounded-xl"
          style={{
            backgroundImage: `url(${slides[currentIndex].image})`,
          }}
        >
          <div className="absolute inset-0 bg-black/50 rounded-xl"></div>
          <div className="relative z-10 text-white">
            <h1 className="text-4xl font-bold mb-4 text-shadow-lg">
              Welcome to Culture Unveiled
            </h1>
            <p className="text-lg max-w-lg mx-auto mb-6 leading-relaxed text-shadow-md">
              {slides[currentIndex].description}
            </p>
            <button
              className="bg-amber-400 hover:bg-amber-500 text-white py-2 px-6 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition duration-300"
              onClick={() => navigate("/explore")}
            >
              Explore More
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

export default HeroSection;
