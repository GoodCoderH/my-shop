import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  const [isClicked, setIsClicked] = useState(false);

  const click = () => {
    let ul = document.querySelector("ul");
    let search = document.getElementById("search");

    if (!isClicked) {
      ul.classList.remove("hidden");
      search.classList.remove("hidden");
      setIsClicked(true);
    } else {
      ul.classList.add("hidden");
      search.classList.add("hidden");
      setIsClicked(false);
    }
  };

  return (
    <nav className="p-3.5 bg-white shadow h-1/6 md:flex md:items-center md:justify-between">
      <div className="flex justify-between items-center">
        <Link to="/">
          <img className="h-20" alt="logo" src="/images/SHOV.png" />
        </Link>
        <span
          className="text-main md:hidden block cursor-pointer"
          onClick={click}
        >
          <svg
            className="h-12 w-12"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {" "}
            <path stroke="none" d="M0 0h24v24H0z" />{" "}
            <line x1="4" y1="6" x2="20" y2="6" />{" "}
            <line x1="4" y1="12" x2="20" y2="12" />{" "}
            <line x1="4" y1="18" x2="20" y2="18" />
          </svg>
        </span>
      </div>
      <div
        id="search"
        className="max-w-sm w-full h-12 outline-0 md:block md:mt-0 hidden mt-6"
      >
        <div className="md:flex outline-0 h-12 relative rounded-3xl shadow-lg">
          <input
            className="absolute h-full w-full rounded-3xl pl-5 outline-0 bg-white"
            type="text"
            placeholder="Type here..."
          />
          <div className="flex cursor-pointer items-center justify-center absolute right-0 top-0 bg-main w-12 h-full rounded-r-3xl">
            <svg
              className="leading-10 text-white"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {" "}
              <path stroke="none" d="M0 0h24v24H0z" />{" "}
              <circle cx="10" cy="10" r="7" />{" "}
              <line x1="21" y1="21" x2="15" y2="15" />
            </svg>
          </div>
        </div>
      </div>
      <ul className="md:flex items-center hidden md:pb-0 pb-5">
        <li className="mx-4 md:my-0 mt-5">
          <NavLink
            to="/"
            className={(data) =>
              data.isActive
                ? "border-b-2 border-main text-main font-bold md:pb-11"
                : "text-main font-bold"
            }
          >
            HOME
          </NavLink>
        </li>
        <li className="mx-4 md:my-0 mt-5">
          <NavLink
            to="/products"
            className={(data) =>
              data.isActive
                ? "border-b-2 border-main text-main font-bold md:pb-11"
                : "text-main font-bold"
            }
          >
            PRODUCT
          </NavLink>
        </li>
        <li className="mx-4 md:my-0 mt-5">
          <NavLink
            to="/cart"
            className={(data) =>
              data.isActive
                ? "border-b-2 border-main text-main font-bold md:pb-11"
                : "text-main font-bold"
            }
          >
            CART
          </NavLink>
        </li>
        <li className="mx-4 md:my-0 mt-5">
          <NavLink
            to="/delivery"
            className={(data) =>
              data.isActive
                ? "border-b-2 border-main text-main font-bold md:pb-11"
                : "text-main font-bold"
            }
          >
            DELIVERY
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
