import { useEffect } from "react";
import axios from "../api/axios";

function ProductList() {
  useEffect(() => {
    axios
      .get("/products")
      .then(console.log("Success"))
      .catch(console.log("Failed"));
  }, []);
  return "hello";
}
export default ProductList;
