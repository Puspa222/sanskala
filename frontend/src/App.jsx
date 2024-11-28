import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="flex">
      <Navbar />
      <div className="flex-1 p-4 bg-gray-100 dark:bg-gray-900">
        <Outlet />
      </div>
    </div>
  );
}
export default App;
