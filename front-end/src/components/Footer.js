import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-700 text-white">
      <div className="xl:px-40 pb-12 lg:px-20 md:px-10 sm:px-5 px-10">
        <div className="w-full pt-12 flex flex-col sm:flex-row space-y-2 justify-start">
          <div className="w-full sm:w-2/5 mr-80 flex flex-col space-y-4">
            <Link to="/">
              <h1 className="my-shop pl-4 py-4 text-3xl">MY-SHOP</h1>
            </Link>
          </div>
          <div className="w-full sm:w-1/5 py-5 flex flex-col space-y-4">
            <p>Home</p>
            <p>Products</p>
            <p>Cart</p>
          </div>
          <div className="w-full sm:w-1/5 py-5 flex flex-col space-y-4">
            <p>About Us</p>
            <p>Responsibilities</p>
            <p>Out Services</p>
            <p>Contact</p>
          </div>
          <div className="w-full sm:w-1/5 py-5 flex flex-col space-y-4">
            <p>Disclaimer</p>
            <p>Testimonials</p>
            <p>Privacy Policy</p>
            <p>Terms of Service</p>
          </div>
        </div>
        <div className="pt-2">
          <p>© 2022 Executive Trade International.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
