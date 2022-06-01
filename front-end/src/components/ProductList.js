import { useEffect, useState } from "react";
import axios from "../api/axios";

function ProductList() {
  const [products, setProducts] = useState();

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
export default ProductList;
