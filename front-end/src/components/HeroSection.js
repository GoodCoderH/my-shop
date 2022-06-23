import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <main className="w-screen h-screen pt-30 pb-40 flex justify-center items-center">
      <div className="lg:flex hidden">
        <img
          className="h-96 w-100 m-5 rounded-3xl shadow-md"
          alt="harvest"
          src={
            "https://images.unsplash.com/photo-1581578017306-7334b15283df?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
          }
        />
        <img
          className="h-1106 w-80 m-5 rounded-3xl shadow-md"
          alt="carrots"
          src={
            "https://images.unsplash.com/photo-1627798133922-270bb80af5ed?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
          }
        />
      </div>

      <div className="flex flex-col p-11">
        <h1 className="font-extralight text-main text-6xl hero">
          Get the
          <br />
          Fresh vegetables
          <br />
          And fruits
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
