import React, { useState } from "react";
import "./Home.css";
import HomePage from "./HomePage";
import SideBar from "./SideBar";
import Request from "./Request";
const Home = () => {
  const [desktop, setDesktop] = useState(window.innerWidth > 576);
  const [currentPage,setCurrentPage] = useState("Home")
  window.addEventListener("resize", () => {
    setDesktop(window.innerWidth > 576 ? true : false)
  });
  return (
    <div className="home row">
      <SideBar desktop={desktop} />
      <HomePage />
      {desktop&& <Request />}
    </div>
  );
};

export default Home;
