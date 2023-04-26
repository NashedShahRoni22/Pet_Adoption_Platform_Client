import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../shared/header/Header";

const Main = () => {
  return (
    <main>
      <Header/>
      <Outlet />
    </main>
  );
};

export default Main;
