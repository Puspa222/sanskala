import React from "react";
import "../css/CulturalRecipes.css";
const recipes = [
  {
    src: "../home-image/r1.jpeg",
    name: "Paella",
    description: "A traditional Spanish rice dish with seafood.",
  },
  {
    src: "home-image/r2.jpeg",
    name: "Kimchi",
    description: "A staple Korean fermented side dish.",
  },
  {
    src: "home-image/r3.jpeg",
    name: "Tacos",
    description: "Mexican corn tortillas filled with meat and vegetables.",
  },
  {
    src: "home-image/r4.jpeg",
    name: "Tacos",
    description: "Mexican corn tortillas filled with meat and vegetables.",
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
