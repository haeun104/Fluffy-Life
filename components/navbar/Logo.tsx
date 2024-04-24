"use client";

import Image from "next/image";
import logo from "../../app/icon.png";

import { Dancing_Script } from "next/font/google";
import { useRouter } from "next/navigation";
const font = Dancing_Script({ subsets: ["latin"], weight: ["400", "700"] });

const Logo = () => {
  const router = useRouter();
  return (
    <div
      className="text-light-green flex items-center gap-2 cursor-pointer"
      onClick={() => router.push("/")}
    >
      <Image alt="logo" src={logo} height={30} width={30} />
      <div className={`text-2xl ${font.className} font-bold`}>Fluffy Life</div>
    </div>
  );
};

export default Logo;
