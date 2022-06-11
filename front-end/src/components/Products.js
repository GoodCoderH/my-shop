import { useEffect, useState } from "react";
import axios from "../api/axios";

function Products() {
  const [products, setProducts] = useState();

  useEffect(() => {
    const request = async () => {
      await axios
        .get("/auth/refreshToken", { withCredentials: "true" })
        .then((res) => {
          requestSuccess(res.data);
          console.log(`accessToken token ${res.data}`);
        });
    };

    request();
  }, []);

  const requestSuccess = (token) => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const products = async () => {
      await axios.get("/products", { withCredentials: "true" }).then((res) => {
        setProducts(res.data);
      });
    };

    products();
  };

  return (
    <article>
      <h2>Product List</h2>
      {products?.length ? (
        <ul>
          {products.map((product, i) => (
            <li key={i}>{product?.name}</li>
          ))}
        </ul>
      ) : (
        <p>No products to display</p>
      )}
    </article>
  );
}
export default Products;
