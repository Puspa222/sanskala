import React from "react";
import newariKhaja from "/src/home-image/newarikhaja.jpeg";
import selRoti from "/src/home-image/selroti.jpeg";
import yomari from "/src/home-image/Yomari.jpeg";
import dhido from "/src/home-image/Dhido-Nepali-Food.jpg";
const recipes = [
  {
    src: newariKhaja,
    name: "Newari Khaja Set",
    description: "A traditional Newari meal consisting of various dishes.",
  },
  {
    src: selRoti,
    name: "Sel Roti",
    description: "A traditional Nepali sweet bread made during Dashain festivals.",
  },
  {
    src: yomari,
    name: "Yomari",
    description: "A sweet dumpling made of rice flour dough filled with chaku.",
  },
  {
    src: dhido,
    name: "Dhido",
    description: "A traditional Nepali food made from buckwheat.",
  },
];

function CulturalRecipes() {
  return (
    <section className="bg-[#F8F8D3] p-12 rounded-lg shadow-md mb-8 text-center">
      <h2 className="text-3xl text-[#4E342E] mb-8 uppercase font-bold tracking-wider">
        Cultural Recipes
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-4">
        {recipes.map((recipe, index) => (
          <div
            className="bg-[#FFFDF5] rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:translate-y-[-10px] hover:shadow-xl relative"
            key={index}
          >
            <img
              src={recipe.src}
              alt={recipe.name}
              className="w-full h-48 object-cover"
            />
            <h3 className="text-2xl text-[#4E342E] my-4 transition-colors duration-300">
              {recipe.name}
            </h3>
            <p className="text-base text-[#6D4C41] px-4 pb-6 leading-relaxed transition-colors duration-300">
              {recipe.description}
            </p>
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-11/12 bg-[#FFB74D] text-[#FFFDF5] text-center text-base font-bold py-2 rounded-b-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              Explore Recipe
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
export default CulturalRecipes;
