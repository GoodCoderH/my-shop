import { useEffect, useState } from "react";
import axios from "../api/axios";
import useRefreshToken from "../hooks/useRefreshToken";

function Products() {
  const [products, setProducts] = useState();
  const refresh = useRefreshToken();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getProducts = async () => {
      try {
        const response = await axios.get("/products", {
          signal: controller.signal,
        });
        console.log(response.data);
        isMounted && setProducts(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    getProducts();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

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
      <button onClick={() => refresh()}>refresh</button>
    </article>
  );
}
export default Products;
