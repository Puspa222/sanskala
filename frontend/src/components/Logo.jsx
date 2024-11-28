import React from "react";
import logoPhoto from "./images/hamro.jpg";

function Logo() {
  return (
    <div className="flex justify-center items-center rounded-xl">
      <img
        src={logoPhoto}
        alt="Hamrosanskala Logo"
        className="h-10 w-10 rounded-md object-cover"  // Added object-cover for consistent aspect ratio
      />
    </div>
  );
}

export default Logo;
