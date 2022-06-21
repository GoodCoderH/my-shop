import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "../api/axios";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Products from "../components/Products";

const Product = () => {
  return (
    <>
      <Navbar />
      <Products />
      <Footer />
    </>
  );
};

export default Product;
