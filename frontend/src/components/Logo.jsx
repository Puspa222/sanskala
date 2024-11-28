import React from "react";
import logoPhoto from "../images/hamro.jpg";

function Logo() {
  return (
    <div className="  rounded-xl font-bold text-white flex justify-center items-center">
      <img src={logoPhoto} alt="" className="h-10 w-10 rounded-md" />
    </div>
  );
}

export default Logo;
