import Logo from "@/components/navbar/Logo";
import { Dancing_Script } from "next/font/google";

const font = Dancing_Script({ subsets: ["latin"], weight: "400" });

export default function Home() {
  return (
    <div className="text-light-green flex items-center gap-2">
      <Logo />
      <div className={`text-2xl ${font.className}`}>Fluffy Life</div>
    </div>
  );
}
