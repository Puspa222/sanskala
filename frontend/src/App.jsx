import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Profile from "./components/profile";


function App() {
  return (
    <>
      <Navbar />
    
      <Outlet />
    </>
  );
}

export default App;
