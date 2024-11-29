import React from "react";
import "../css/PhotoGrid.css";
import { useNavigate } from "react-router-dom";

const photos = [
  { src: "./src/home-image/danceho.jpg", title: "Dances", path: "/dances" },
  { src: "./src/home-image/art.png", title: "Arts", path: "/Arts" },
  { src: "./src/home-image/music.jpg", title: "Musics", path: "/musics" },
  {
    src: "./src/home-image/UNITY.jpeg",
    title: "Celebrations",
    path: "/celebrations",
  },
  { src: "./src/home-image/r2.jpeg", title: "Recipes", path: "/recipes" },
];
function PhotoGrid() {
  const navigate = useNavigate();
  return (
    <div className="photo-grid z-0">
      {photos.map((photo, index) => (
        <div className="photo-card" key={index}>
          <img src={photo.src} alt={photo.title} />
          <div className="photo-overlay">
            <h3>{photo.title}</h3>
            <button
              className="photo-button"
              onClick={() => {
                navigate(photo.path);
              }}
            >
              {" "}
              Explore More
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PhotoGrid;
