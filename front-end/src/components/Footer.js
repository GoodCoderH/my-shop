import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full bg-main text-white">
      <div className="xl:px-40 pb-12 lg:px-20 md:px-10 sm:px-5 px-10">
        <div className="w-full pt-12 flex flex-col sm:flex-row space-y-2 justify-start">
          <div className="w-full sm:w-2/5 mr-80 flex flex-col space-y-4">
            <Link to="/">
              <img src="/images/SHOV_white.png" alt="logo" />
            </Link>
            <p className="py-5">
              This is not real webstore just my side project
            </p>
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
