import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";
import axios from "../api/axios";

const Detail = () => {
  const [count, setCount] = useState(0);
  const [price, setPrice] = useState();
  const [img, setImg] = useState();

  const { name } = useParams();

  const getImg = async () => {
    await axios
      .get(`/products/${name}`, { withCredentials: "true" })
      .then((res) => setImg(res.data.url));
  };

  const getPrice = async () => {
    await axios
      .get(`/products/${name}`, { withCredentials: "true" })
      .then((res) => setPrice(res.data.price));
  };

  useEffect(() => {
    getImg();
    getPrice();
  }, []);

  const addCount = () => {
    setCount((prev) => prev + 1);
    setPrice();
  };

  const minusCount = () => {
    if (count > 0) {
      setCount((prev) => prev - 1);
    }
  };

  return (
    <>
      <Navbar />
      <div className="2xl:container 2xl:mx-auto h-screen lg:py-16 lg:px-20 md:py-12 md:px-6 mt-16 py-9 px-4 ">
        <div className="flex justify-center items-center lg:flex-row flex-col gap-8">
          <div className=" w-full sm:w-96 md:w-8/12 lg:w-6/12 items-center">
            <h2 className="font-semibold lg:text-4xl text-3xl lg:leading-9 leading-7 text-gray-800 mt-4">
              {name.toUpperCase()}
            </h2>
            <p className=" font-semibold lg:text-2xl text-xl lg:leading-6 leading-5 mt-6 ">
              $ {price}
            </p>
            <div className="lg:mt-11 mt-10">
              <div className="flex flex-row justify-between">
                <p className=" font-medium text-base leading-4 text-gray-600">
                  Select quantity
                </p>
                <div className="flex">
                  <span
                    onClick={minusCount}
                    className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 cursor-pointer border border-gray-300 border-r-0 w-7 h-7 flex items-center justify-center pb-1"
                  >
                    -
                  </span>
                  <input
                    id="counter"
                    aria-label="input"
                    className="border border-gray-300 h-full text-center w-14 pb-1"
                    type="text"
                    value={count}
                    onChange={(e) => e.target.value}
                  />
                  <span
                    onClick={addCount}
                    className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 cursor-pointer border border-gray-300 border-l-0 w-7 h-7 flex items-center justify-center pb-1 "
                  >
                    +
                  </span>
                </div>
              </div>
              <button className="focus:outline-none rounded-md hover:text-white hover:bg-main focus:ring-offset-2 font-medium text-base leading-4 text-black bg-skeletenWrapper w-full py-5 lg:mt-12 mt-6">
                Add to cart
              </button>
            </div>
          </div>
          <div className=" w-full lg:w-3/12 bg-gray-100 flex justify-center items-center">
            <img className="w-full rounded-xl" src={img} alt={img} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Detail;
