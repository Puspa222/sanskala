import { nanoid } from "@reduxjs/toolkit";
import React from "react";

function Input(
  { label, placeholder, className = "", type = "text", ...props },
  ref
) {
  const id = nanoid();
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="inline-block mb-1 pl-1 dark:text-white">
          {label}
        </label>
      )}
      <input
        type={type}
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-200 duration-200 border border-gray-200 w-full ${className}`}
        name=""
        id={id}
        placeholder={placeholder}
        {...props}
        ref={ref}
      />
    </div>
  );
}

export default React.forwardRef(Input);
