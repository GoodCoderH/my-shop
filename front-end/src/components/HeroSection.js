import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <main className="w-screen h-screen pt-40 pb-40 flex justify-center items-center">
      <div className="lg:flex hidden">
        <img
          className="h-96 w-60 m-5 rounded-3xl shadow-md"
          alt="headset"
          src="/images/headset.jpg"
        />
        <img
          className="h-96 w-60 m-5 rounded-3xl shadow-md"
          alt="sunglasses"
          src="/images/sunglasses.jpg"
        />
      </div>

      <div className="flex flex-col p-11">
        <h1 className="font-extralight text-main text-6xl hero">
          Get the
          <br /> new products!
        </h1>
        <Link
          className="w-48 mt-10 bg-transparent border hero border-black text-black hover:bg-black hover:text-white text-center py-2 px-4 rounded"
          to="/login"
        >
          Start
        </Link>
      </div>
    </main>
  );
};
export default HeroSection;
