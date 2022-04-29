import { useEffect, useState } from "react";
import customAxios from "../api/customAxios";
import HeroSection from "../components/HeroSection";
import Navbar from "../components/Navbar";

function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
    </>
  );
}

export default Home;
