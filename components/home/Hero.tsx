const Hero = () => {
  return (
    <div className="h-[50vh] w-full lg:h-[80vh] lg:flex">
      <div className="h-full lg:w-[70%] bg-cover bg-center animate-heroAnimation"></div>
      <div className="h-full flex flex-col justify-center p-4 text-main-teal gap-4 bg-light-beige lg:w-[30%] text-center">
        <h2 className="uppercase font-bold text-xl lg:text-2xl xl:text-3xl">
          Giving Your Furry Friends <br /> the Care They Deserve
        </h2>
        <span className="lg:text-xl">Explore Fluffy Life Today!</span>
        <span className="text-main-gray">Quick booking availability check</span>
      </div>
    </div>
  );
};

export default Hero;
