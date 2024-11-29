import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Policies from "./components/Policies.jsx";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import { Provider } from "react-redux";
import store from "./store/store.js";
import Explore from "./pages/Explore.jsx";
import Profile from "./components/profile.jsx";
import GovermentPolicy from "./pages/Goverment.jsx";

// import profile from "./components/profile.jsx";

import CultureForm from "./components/add-culture-form/CultureForm.jsx";
import Feed from "./pages/Feed.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/policies",
        element: <Policies />,
      },
      {
        path: "/explore",
        element: <Explore />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/add-culture",
        element: <CultureForm />,
      },

      {
        path: "/feed",
        element: <Feed />,
      },
      {
        path: "/goverment-initiatives",
        element: <GovermentPolicy />,
      },
      {
path: "/profile",
element: <Profile />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  </StrictMode>
);
