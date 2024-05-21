const Hero = () => {
  return (
    <div className="w-full flex flex-col lg:flex-row">
      <div className="h-[600px] lg:w-[70%] bg-cover bg-center animate-heroAnimation"></div>
      <div className="flex flex-col justify-center px-6 py-10 text-main-teal gap-4 bg-light-beige lg:w-[30%] lg:h-[600px] text-center">
        <h2 className="uppercase font-bold text-xl lg:text-2xl xl:text-3xl">
          Giving Your Furry Friends <br /> the Care They Deserve
        </h2>
        <span className="lg:text-xl">Explore Fluffy Life Today!</span>
        <div>
        <span className="text-main-gray">Quick booking availability check</span>
        </div>
      </div>
    </div>
  );
};

export default Hero;
