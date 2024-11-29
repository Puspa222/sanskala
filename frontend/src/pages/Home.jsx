import React, { useState } from "react";
import HeroSection from "../components/HeroSection";
import PhotoGrid from "../components/PhotoGrid";
import CulturalRecipes from "../components/CulturalRecipes";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adminLogin } from "../store/AdminAuthSlice";
function Home() {
  const dispatch = useDispatch()
  const [res,setRes] = useState({});

  useEffect(() => {
    const sessionId = localStorage.getItem("session_id");

    if (sessionId) {
      axios.post("http://localhost/sanskala/backend/api/role_check.php", { session_id: sessionId })
        .then(response => {
          console.log(response.data);
          setRes(response.data);
        })
        .catch(error => {
          console.error("There was an error!", error);
        });
    }
  }, []);
  if(useSelector(state => state.auth.status)){
    if(res.role==="admin"){
      dispatch(adminLogin(res.data));
      console.log("Admin Logged In");
    }
  }

  return (
    <>
      <HeroSection />
      <PhotoGrid />
      <CulturalRecipes />
    </>
  );
}

export default Home;
