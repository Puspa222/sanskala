import React from "react";
import "../css/CulturalRecipes.css";
const recipes = [
  {
    src: "./src/home-image/newarikhaja.jpeg",
    name: "Newari Khaja Set",
    description: "A traditional Newari meal consisting of various dishes.",
  },
  {
    src: "./src/home-image/selroti.jpeg",
    name: "Sel Roti",
    description: "A traditional Nepali sweet bread made during  dashain festivals.",
  },
  {
    src: "./src/home-image/Yomari.jpeg",
    name: "yo-mari",
    description: "A sweet dumpling made of rice flour dough filled with chaku.",
  },
  {
    src: "./src/home-image/Dhido-Nepali-Food.jpg",
    name: "Dhido",
    description: "A traditional Nepali food made from buckwheat.",
  },
];
function CulturalRecipes() {
  return (
    <section className="cultural-recipes">
      <h2>Cultural Recipes</h2>
      <div className="recipe-grid">
        {recipes.map((recipe, index) => (
          <div className="recipe-card" key={index}>
            <img src={recipe.src} alt={recipe.name} />
            <h3>{recipe.name}</h3>
            <p>{recipe.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
export default CulturalRecipes;
