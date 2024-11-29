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
import Arts from "./components/Home-mini-page/Arts.jsx";
import Musics from "./components/Home-mini-page/Music.jsx";
import Celebrations from "./components/Home-mini-page/Celebrations.jsx";
import ApproveFeed from "./pages/ApproveFeed.jsx";
import CultureForm from "./components/add-culture-form/CultureForm.jsx";
import Feed from "./pages/Feed.jsx";
import Dance from "./components/Home-mini-page/Dance.jsx";
import Recipes from "./components/Home-mini-page/Recipes.jsx";

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
      {
        path: "/dances",
        element: <Dance />,
      },
      {
        path: "/arts",
        element: <Arts />,
      },
      {
        path: "/musics",
        element: <Musics />,
      },
      {
        path: "/celebrations",
        element: <Celebrations />,
      },
      {
        path: "/recipes",
        element: <Recipes />,
      },
      {
        path: "/approve-feed",
        element: <ApproveFeed />,
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
