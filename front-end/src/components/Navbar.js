import { Link, NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-white w-full shadow fixed">
      <div className="container m-auto flex justify-between items-center text-black">
        <Link to="/">
          <h1 className="lg:pl-24 my-shop pl-8 py-4 text-3xl">MY-SHOP</h1>
        </Link>
        <div className="flex justify-between py-3 px-6">
          <form action="" className="w-full max-w-md">
            <div className="relative flex items-center">
              <svg
                className="w-5 y-5 absolute ml-3 pointer-events-none text-gray-500"
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
                <circle cx="10" cy="10" r="7" />{" "}
                <line x1="21" y1="21" x2="15" y2="15" />
              </svg>
              <input
                type="text"
                name="search"
                placeholder="Search"
                autocomplete="off"
                aria-label="Search"
                className="w-full pr-3 pl-10 py-2 placeholder:font-extralight outline-none placeholder-gray-400 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
              ></input>
            </div>
          </form>
        </div>
        <ul className="hidden pr-24 md:flex items-center text-base font-extralight cursor-pointer">
          <NavLink
            to="/"
            className={(data) =>
              data.isActive ? "border-b-2 border-gray-400" : ""
            }
          >
            <li className="hidden:bg-gray-200 py-6 px-6">Home</li>
          </NavLink>
          <NavLink
            to="/product"
            className={(data) =>
              data.isActive ? "border-b-2 border-gray-400" : ""
            }
          >
            <li className="hidden:bg-gray-200 py-6 px-6">Product</li>
          </NavLink>
          <NavLink
            to="/cart"
            className={(data) =>
              data.isActive ? "border-b-2 border-gray-400" : ""
            }
          >
            <li className="hidden:bg-gray-200 py-6 px-6">Cart</li>
          </NavLink>
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
              <Link to="/">
                <li className="hover:bg-gray-200 py-4 px-6 w-full font-extralight">
                  Home
                </li>
              </Link>
              <Link to="/product">
                <li className="hover:bg-gray-200 py-4 px-6 w-full font-extralight">
                  Product
                </li>
              </Link>
              <Link to="/cart">
                <li className="hover:bg-gray-200 py-4 px-6 w-full font-extralight">
                  Cart
                </li>
              </Link>
            </ul>
          </div>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
