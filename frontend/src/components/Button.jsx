import React from "react";

function Button({
  children,
  className = "",
  bgColor = "bg-blue-600",
  textColor = "text-white",
  type = "button",
  ...props
}) {
  return (
    <button
      className={`${className} ${bgColor} ${textColor} py-2 px-4 rounded-lg`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
