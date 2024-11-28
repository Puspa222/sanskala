import React from "react";
import HeroSection from "../components/HeroSection";
import PhotoGrid from "../components/PhotoGrid";
import CulturalRecipes from "../components/CulturalRecipes";
function Home() {
  return (
    <>
      <HeroSection />;
      <PhotoGrid />
      <CulturalRecipes />
    </>
  );
}

export default Home;
