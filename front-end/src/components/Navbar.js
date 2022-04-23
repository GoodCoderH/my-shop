import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 bg-white w-full shadow">
      <div className="container m-auto flex justify-between items-center text-black">
        <Link to="/">
          <h1 className="lg:pl-24 my-shop pl-8 py-4 text-3xl">MY-SHOP</h1>
        </Link>
        <ul className="hidden pr-24 md:flex items-center text-base font-extralight cursor-pointer">
          <Link to="/">
            <li className="hidden:bg-gray-200 py-4 px-6">Home</li>
          </Link>
          <Link to="/product">
            <li className="hidden:bg-gray-200 py-4 px-6">Product</li>
          </Link>
          <Link to="/cart">
            <li className="hidden:bg-gray-200 py-4 px-6">Cart</li>
          </Link>
        </ul>
        <button className="block md:hidden mr-8 rounded hover:bg-gray-200 group">
          <svg
            class="h-8 w-8 text-gray-500"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            {" "}
            <path stroke="none" d="M0 0h24v24H0z" />{" "}
            <line x1="4" y1="6" x2="20" y2="6" />{" "}
            <line x1="4" y1="12" x2="20" y2="12" />{" "}
            <line x1="4" y1="18" x2="20" y2="18" />
          </svg>
          <div
            className="absolute top-0 -right-full h-screen w-8/12 bg-white border opacity-0 
            transform group-focus:right-0 group-focus:opacity-100 transition-all duration-300"
          >
            <ul className="flex flex-col items-center w-full text-base cursor-pointer pt-10">
              <li className="hover:bg-gray-200 py-4 px-6 w-full font-extralight">
                Home
              </li>
              <li className="hover:bg-gray-200 py-4 px-6 w-full font-extralight">
                Product
              </li>
              <li className="hover:bg-gray-200 py-4 px-6 w-full font-extralight">
                Cart
              </li>
            </ul>
          </div>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
