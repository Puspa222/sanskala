import React from "react";
import { useForm } from "react-hook-form";
import { login } from "../store/AuthSlice";
import Input from "./Input";

function ExploreCard({ item }) {
  const images = item.featured_images ? JSON.parse(item.featured_images) : [];
  const { register, handleSubmit } = useForm();

  const comment = async (data) => {
    data.pid = item.id;

    const session_id = localStorage.getItem("session_id");
    data.session_id = session_id;

    console.log(data);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg border overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl max-w-sm mx-auto">
      {/* Image Section with Scroll */}
      <div className="relative w-full">
        {images.length > 0 ? (
          <div className="flex overflow-x-auto space-x-2">
            {images.map((image, index) => (
              <img
                key={index}
                src={`http://localhost/sanskala/backend/${image.substring(3)}`}
                alt={`Featured ${index + 1}`}
                className="w-48 h-48 object-cover rounded-lg p-2 border"
              />
            ))}
          </div>
        ) : (
          <div className="w-full h-48 flex items-center justify-center bg-gray-200">
            <span className="text-gray-500">No Images Available</span>
          </div>
        )}
        <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
          {/* { Featured} */}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 flex flex-col space-y-2">
        <h3 className="text-lg font-semibold text-gray-800 truncate font-sans">
          Title: {item.title || "Untitled"}
        </h3>
        <h4 className="  text-gray-800 truncate font-sans">
          Author: {item.username || "Untitled"}
        </h4>
        <h4 className=" text-gray-800 truncate font-sans">
          Category: {item.category || "Untitled"}
        </h4>
        <p className="text-sm text-gray-600 line-clamp-2 font-sans">
          Description: {item.content || "No description available."}
        </p>

        {/* Writer Category */}
        {item.writer && (
          <p className="text-xs text-gray-500">Written by: {item.writer}</p>
        )}
        <form onSubmit={handleSubmit(comment)}>
          <Input
            type="text"
            placeholder=" Write comment"
            className="rounded-lg  text-xs"
            {...register("comment", {
              required: "Comment is required",
            })}
          />
          <Button type="submit" className="w-full ">
            Comment
          </Button>
        </form>
      </div>
    </div>
  );
}

export default ExploreCard;
