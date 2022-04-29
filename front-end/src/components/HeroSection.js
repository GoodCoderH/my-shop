function HeroSection() {
  return (
    <main className="w-screen pt-20 flex justify-center items-center">
      <img
        className="h-96 w-60 m-5 rounded-3xl shadow-md"
        src="/images/headset.jpg"
      />
      <img
        className="h-96 w-60 m-5 rounded-3xl shadow-md"
        src="/images/sunglasses.jpg"
      />
      <div className="flex flex-col p-11">
        <h1 className="font-extralight text-6xl hero">
          Get the
          <br /> new products!
        </h1>
        <a
          href="#"
          class="w-48 mt-10 bg-transparent border hero border-black text-black hover:bg-black hover:text-white text-center py-2 px-4 rounded"
        >
          Start
        </a>
      </div>
    </main>
  );
}
export default HeroSection;
