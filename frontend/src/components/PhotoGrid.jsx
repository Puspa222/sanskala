import React from "react";
import "./PhotoGrid.css"; // Optional CSS file for styling    

const photos = [
  { src: "holi-festival-of-colors-in-nepal.webp", title: "Holi Festival" },
  { src: "images (1).jpeg", title: "Local Crafts" },
  { src: "Santa-Clause.width-800.jpg", title: "Christmas" },
  { src: "dress_20180702130652.jpg", title: "Traditional Wear" },
  { src: "images.jpeg", title: "Cultural Dance" },
  { src: "holi-festival-of-colors-in-nepal.webp", title: "Holi Festival" },
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
