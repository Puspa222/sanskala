import React from "react";
import "../css/PhotoGrid.css";

const photos = [
  { src: "./src/home-image/danceho.jpg", title: "Dance" },
  { src: "./src/home-image/art.png", title: "Art" },
  { src: "./src/home-image/music.jpg", title: "Music" },
  { src: "./src/home-image/products.jpg", title: "Products" },
  { src: "./src/home-image/UNITY.jpeg", title: "Celebration" },
  { src: "./src/home-image/r2.jpeg", title: "Recipes" },
];

function PhotoGrid() {
  return (
    <div className="photo-grid">
      {photos.map((photo, index) => (
        <div className="photo-card" key={index}>
          <img src={photo.src} alt={photo.title} />
          <div className="photo-overlay">
            <h3>{photo.title}</h3>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PhotoGrid;
