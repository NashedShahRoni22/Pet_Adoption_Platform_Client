import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../shared/header/Header";

const Main = () => {
  return (
    <main>
      <Header/>
      <Outlet />
      <p className="py-5 text-center font-semibold shadow-xl bg-[#2D1B69] text-white">Copyright Reserved by Pet Adoption Platform 2023</p>
    </main>
  );
};

export default Main;
