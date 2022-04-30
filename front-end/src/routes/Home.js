import { useEffect, useState } from "react";
import customAxios from "../api/customAxios";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import Navbar from "../components/Navbar";

function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <Footer />
    </>
  );
}

export default Home;
