"use client";

import grooming from "@/public/images/grooming.png";
import suite from "@/public/images/suite.png";
import standard from "@/public/images/standard.png";

import Image from "next/image";
import { useRouter } from "next/navigation";

const AboutServices = () => {
  const router = useRouter();

  return (
    <>
      <div className="bg-light-beige">
        <div className="max-w-[1536px] flex flex-col py-10 px-6 gap-10 lg:flex-row lg:items-center lg:mx-auto lg:justify-around">
          <div className="flex flex-col gap-4 lg:flex-row lg:gap-6 2xl:gap-8">
            <div className="flex flex-col items-center gap-2">
              <div className="max-w-[350px] rounded-[25%] overflow-hidden border-solid border-2 border-main-teal">
                <Image src={suite} alt="suite" />
              </div>
              <span className="text-main-teal font-bold">Suite</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="max-w-[350px] rounded-[25%] overflow-hidden border-solid border-2 border-main-teal">
                <Image src={standard} alt="standard" />
              </div>
              <span className="text-main-teal font-bold">Standard</span>
            </div>
          </div>
          <div className="text-main-teal flex flex-col items-center">
            <h3 className="text-xl font-bold text-center mb-4 lg:text-2xl 2xl:text-3xl">
              Premium Rooms
            </h3>
            <p className="text-center max-w-[370px]">
              A spacious and comfortable area is provided, including access to
              swimming pool and playground facilities
            </p>
            <div
              className="w-[150px] py-2 text-center border-solid border-[1px] border-main-teal rounded-3xl mx-auto mt-10 cursor-pointer"
              onClick={() => router.push("/hotel")}
            >
              Go to book
            </div>
          </div>
        </div>
      </div>
      <div className="bg-main-teal">
        <div className="max-w-[1536px] flex flex-col items-center py-10 px-6 gap-10 lg:flex-row-reverse lg:mx-auto lg:justify-around">
          <div className="flex flex-col gap-4 lg:flex-row lg:gap-6 2xl:gap-8">
            <div className="max-w-[350px] rounded-[50%] overflow-hidden border-solid border-[1px] border-white">
              <Image src={grooming} alt="grooming" />
            </div>
          </div>
          <div className="text-white flex flex-col items-center">
            <h3 className="text-xl font-bold text-center mb-4 lg:text-2xl 2xl:text-3xl">
              Grooming Care
            </h3>
            <p className="text-center max-w-[370px]">
              An experienced groomer provides services with utmost care and
              dedication
            </p>
            <div
              className="w-[150px] py-2 text-center border-solid border-[1px] border-white rounded-3xl mx-auto mt-10 cursor-pointer"
              onClick={() => router.push("/grooming")}
            >
              Go to book
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutServices;
