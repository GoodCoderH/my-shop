import { useEffect, useState } from "react";
import axios from "../api/axios";
import "../App.css";

function Products() {
  const [products, setProducts] = useState();
  const [loading, setLoading] = useState(true);

  const getProducts = async () => {
    await axios.get("/products", { withCredentials: "true" }).then((res) => {
      setProducts(res.data);
    });

    setLoading(false);
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        products.map((product, i) => <img key={i} src={product?.url} />)
      )}
    </div>
  );

  // {products?.length ? (
  //   <ul>
  //     {products.map((product, i) => (
  //       <li key={i}>{product?.name}</li>
  //     ))}
  //   </ul>
  // ) : (
  //   <p>No products to display</p>
  // )}
}
export default Products;
