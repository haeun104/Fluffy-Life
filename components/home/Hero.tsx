import QuickSearchModal from "../modals/QuickSearchModal";
import QuickSearchBar from "./QuickSearchBar";

const Hero = () => {
  return (
    <>
      <div className="w-full flex flex-col-reverse lg:flex-row">
        <div className="h-[600px] lg:w-[50%] xl:w-[60%] 2xl:w-[70%] bg-cover bg-center animate-heroAnimation"></div>
        <div className="h-[55vh] flex flex-col justify-center px-6 py-10 text-main-teal gap-4 bg-light-beige lg:w-[50%] xl:w-[40%] 2xl:w-[30%] lg:h-[600px] text-center">
          <h2 className="uppercase font-bold text-xl lg:text-2xl xl:text-3xl">
            Giving Your Furry Friends <br /> the Care They Deserve
          </h2>
          <span className="lg:text-xl">Explore Fluffy Life Today!</span>
          <h3 className="text-main-gray">Quick booking availability check</h3>
          <QuickSearchBar />
        </div>
      </div>
      <QuickSearchModal />
    </>
  );
};

export default Hero;
