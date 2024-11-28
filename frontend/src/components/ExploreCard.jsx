import React from "react";

function ExploreCard({item}) {
  console.log("ExploreCard item:", item.featured_images);
  return (
    <div
     
      className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
    >
      <div className="relative w-full h-40 bg-gray-200">
      {
  JSON.parse(item.featured_images).map((image, index) => (
    <img
      key={index}
      src={`http://localhost/sanskala/backend/${image.substring(3)}`}
      alt={item.title}
      className={`absolute inset-0 w-full h-full object-cover ${
        index === 0 ? "z-10" : "z-0"
      }`}
    />
  ))
}

   
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent opacity-70"></div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold text-orange-600 truncate">
          {item.title}
        </h3>
        <p className="text-sm text-gray-600 mt-2 line-clamp-2">
          {item.content}
        </p>
      </div>
    </div>
  );
}

export default ExploreCard;
