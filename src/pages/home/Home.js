import React from "react";
import PetCards from "./PetCards";
import LandingBanner from "./LandingBanner";
import Contact from "./Contact";

const Home = () => {
  
  return (
    <>
      <LandingBanner/>
      <PetCards />
      <Contact/>
    </>
  );
};

export default Home;
