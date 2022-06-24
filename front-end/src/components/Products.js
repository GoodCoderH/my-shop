import { useEffect, useState } from "react";
import axios from "../api/axios";
import "../App.css";

function Products() {
  const [products, setProducts] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const products = async () => {
      await axios.get("/products", { withCredentials: "true" }).then((res) => {
        setProducts(res.data);
      });

      setLoading(true);
    };

    products();
  }, []);

  return <div></div>;
}
export default Products;
