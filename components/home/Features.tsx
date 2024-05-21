import dogToy from "@/public/images/dog-toy.png";
import petCare from "@/public/images/pet-care.png";
import dogHouse from "@/public/images/dog-house.png";
import Image from "next/image";

const Features = () => {
  return (
    <div className="bg-main-teal py-10 px-6 text-white">
      <h2 className="text-xl text-center mb-10">We Can Promise</h2>
      <div className="flex flex-col gap-4 lg:flex-row lg:justify-around max-w-[1536px] mx-auto">
        <div className="flex flex-col text-center gap-4">
          <div className="w-[60px] mx-auto">
            <Image src={dogHouse} alt="dog house" />
          </div>
          <span className="font-bold text-lg">Comfort</span>
          <p className="">
            Our priority is to ensure
            <br />
            your dog stays
            <br />
            in the most comfortable
            <br />
            atmosphere
          </p>
        </div>
        <div className="flex flex-col text-center gap-4">
          <div className="w-[60px] mx-auto">
            <Image src={dogToy} alt="dog toy" />
          </div>
          <span className="font-bold text-lg">Fun</span>
          <p className="">
            Multiple exciting activities
            <br />
            that never leave your dog bored!
          </p>
        </div>
        <div className="flex flex-col text-center gap-4">
          <div className="w-[65px] mx-auto">
            <Image src={petCare} alt="pet care" />
          </div>
          <span className="font-bold text-lg">Safety</span>
          <p className="">
            We partner with experts
            <br />
            who offer professional
            <br />
            and immediate care
            <br />
            in any circumstance
          </p>
        </div>
      </div>
    </div>
  );
};

export default Features;
