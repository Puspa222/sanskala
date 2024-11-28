import React, { useState, useEffect } from "react";
import ExploreCard from "./ExploreCard";
import axios from "axios";

const Explore = () => {
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [items, setItems] = useState([]);

  const filters = [
    "ALL",
    "FESTIVAL",
    "DANCE",
    "FOOD",
    "ART AND MUSIC",
    "LANGUAGE",
    
  ];

  useEffect(() => {
    fetchItems();
  }, [activeFilter, searchQuery]);

  const fetchItems = async () => {
    try {
      const response = await axios.post(
        "http://localhost/sanskala/backend/api/fetch_explore.php",
        {
          filter: activeFilter,
          search: searchQuery,
        }
      );
      console.log("Items fetched:", response.data);
      setItems(response.data);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-500 via-pink-400 to-yellow-500 p-6">
      {/* Search Bar */}
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          className="w-full max-w-md p-3 rounded-full shadow-lg text-gray-700 placeholder-gray-500 border border-gray-300 focus:ring-4 focus:ring-orange-400 focus:outline-none"
          placeholder="🔍 Search for festivals, foods, and more..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Filters (Scrollable) */}
      <div className="flex space-x-4 overflow-x-auto scrollbar-hide py-3 px-1 mb-8">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-6 py-2 rounded-full text-sm font-semibold whitespace-nowrap shadow-md ${
              activeFilter === filter
                ? "bg-gradient-to-r from-orange-600 to-yellow-500 text-white"
                : "bg-white text-orange-600 border border-orange-400"
            } hover:bg-gradient-to-r hover:from-orange-500 hover:to-pink-500 hover:text-white transition-transform duration-300 transform hover:scale-105`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.length > 0 ? (
          items.map((item, index) => (
            <span key={index}>
              <ExploreCard item={{ ...item }} />
            </span>
          ))
        ) : (
          <p className="text-white text-center col-span-full">
            No items found. Try a different filter or search term.
          </p>
        )}
      </div>
    </div>
  );
};

export default Explore;
