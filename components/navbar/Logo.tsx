"use client";

import Image from "next/image";
import logo from "../../app/icon.png";

import { Dancing_Script } from "next/font/google";
import { useRouter } from "next/navigation";

const font = Dancing_Script({ subsets: ["latin"], weight: ["400", "700"] });

interface LogoProps {
  logoSize: number;
  fontSize: string;
}

const Logo: React.FC<LogoProps> = ({ logoSize, fontSize }) => {
  const router = useRouter();
  return (
    <div
      className="text-main-teal flex items-center gap-2 cursor-pointer mx-auto"
      onClick={() => router.push("/")}
    >
      <Image alt="logo" src={logo} height={logoSize} width={logoSize} />
      <div className={`text-${fontSize} ${font.className} font-bold`}>
        Fluffy Life
      </div>
    </div>
  );
};

export default Logo;
