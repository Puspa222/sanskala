import React from "react";

function PostCard({ item }) {
  const images = item.featured_images ? JSON.parse(item.featured_images) : [];

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg border overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl max-w-lg mx-auto mb-6">
      {/* Image Carousel */}
      <div className="relative w-full">
        {images.length > 0 ? (
          <div className="flex overflow-x-auto space-x-2">
            {images.map((image, index) => (
              <img
                key={index}
                src={`http://localhost/sanskala/backend/${image.substring(3)}`}
                alt={`Featured ${index + 1}`}
                className="w-96 h-60 object-cover rounded-lg p-2 border"
              />
            ))}
          </div>
        ) : (
          <div className="w-full h-60 flex items-center justify-center bg-gray-200">
            <span className="text-gray-500">No Images Available</span>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4 flex flex-col space-y-2">
        <h3 className="text-2xl font-semibold text-gray-800 truncate">{item.title || "Untitled"}</h3>
        <h4 className="text-lg text-gray-700">{item.username || "Unknown Author"}</h4>
        <h4 className="text-sm text-gray-600">{item.category || "Uncategorized"}</h4>
        <p className="text-sm text-gray-600 line-clamp-3">{item.content || "No content available."}</p>

        {/* Button */}
        <button className="mt-4 bg-yellow-400 text-gray-800 text-sm py-2 px-4 rounded-lg hover:bg-yellow-500 transition">
          Learn More
        </button>
      </div>
    </div>
  );
}

export default PostCard;
