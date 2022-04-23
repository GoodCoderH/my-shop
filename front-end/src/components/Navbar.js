function Navbar() {
  return (
    <nav className="fixed top-0 left-0 bg-white w-full shadow">
      <div className="container m-auto flex justify-between items-center text-black">
        <h1 className="lg:pl-24 my-shop pl-8 py-4 text-3xl">MY-SHOP</h1>
        <ul className="hidden md:flex items-center text-base font-extralight cursor-pointer">
          <li className="hidden:bg-gray-200 py-4 px-6">Home</li>
          <li className="hidden:bg-gray-200 py-4 px-6">Items</li>
          <li className="hidden:bg-gray-200 py-4 px-6">Cart</li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
