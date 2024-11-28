import React from "react";
import "./PhotoGrid.css"; // Optional CSS file for styling    

const photos = [
  { src: "home-image/art.png", title: "Holi Festival" },
  { src: "home-image/danceho.jpg", title: "Local Crafts" },
  { src: "home-image/music.jpg", title: "Christmas" },
  { src: "home-image/UNITY.jpeg", title: "Traditional Wear" },
  { src: "home-image/music.jpg", title: "Cultural Dance" },
  { src: "home-image/UNITY.jpeg", title: "Holi Festival" },
];
function PhotoGrid() {
  return (
    <div className="photo-grid">
      {photos.map((photo, index) => (
        <div className="photo-card" key={index}>
          <img src={photo.src} alt={photo.title} />
          <div className="photo-overlay">
            <h3>{photo.title}</h3>
            <button>Explore</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PhotoGrid;
