import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <main className="w-screen h-screen pt-30 pb-40 flex justify-center items-center">
      <div className="lg:flex hidden">
        <img
          className="h-96 w-100 m-5 rounded-3xl shadow-md"
          alt="harvest"
          src="/images/harvest.jpg"
        />
        <img
          className="w-80 m-5 rounded-3xl shadow-md"
          alt="carrots"
          src="/images/carrots.jpg"
        />
      </div>

      <div className="flex flex-col p-11">
        <h1 className="font-extralight text-main text-6xl hero">
          Get the fresh
          <br />
          vegetables and
          <br />
          fruits
        </h1>
        <Link
          className="w-48 mt-10 bg-transparent border hero border-main text-main hover:bg-main hover:text-white text-center py-2 px-4 rounded"
          to="/login"
        >
          Start
        </Link>
      </div>
    </main>
  );
};
export default HeroSection;
