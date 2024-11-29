import React from "react";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Navbar />
      {/* Main Content */}
      <div className="flex-1 p-0 bg-gray-100  ml-64">
        <Outlet />
      </div>
    </div>
  );
}
export default App;
