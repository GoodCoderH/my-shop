import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "../api/axios";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const Products = () => {
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
    <>
      <Navbar />
      <div className="min-h-screen pt-12 p-6">
        <h2>Product List</h2>
        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products &&
            products.map((product) => (
              <div key={product.id} className="group relative cursor-pointer">
                <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                  <img
                    src={product.url}
                    alt={product.url}
                    className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.name}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">{product.type}</p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">
                    {product.price} $
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Products;
