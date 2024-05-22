"use client";

import { MdOutlineMailOutline, MdOutlinePhone } from "react-icons/md";
import Logo from "../navbar/Logo";
import { useRouter } from "next/navigation";

const Footer = () => {
  const router = useRouter();
  return (
    <div className="p-4 max-w-[1024px] mx-auto">
      <div className="mb-4">
        <Logo logoSize={25} fontSize="text-lg" />
      </div>

      <div className="text-main-teal text-sm flex flex-col gap-4 md:flex-row md:gap-0 md:justify-between">
        <div className="flex md:w-1/2">
          <div className="w-1/2">
            <h4 className="font-bold uppercase">menu</h4>
            <ul>
              <li
                className="cursor-pointer hover:underline"
                onClick={() => router.push("/about")}
              >
                About us
              </li>
              <li
                className="cursor-pointer hover:underline"
                onClick={() => router.push("/hotel")}
              >
                Hotel
              </li>
              <li
                className="cursor-pointer hover:underline"
                onClick={() => router.push("/grooming")}
              >
                Grooming
              </li>
              <li
                className="cursor-pointer hover:underline"
                onClick={() => router.push("/events")}
              >
                Events
              </li>
            </ul>
          </div>
          <div className="w-1/2">
            <h4 className="font-bold uppercase">location</h4>
            <span>
              Radosna 22 <br />
              12-345 <br />
              Poznan, Poland
            </span>
          </div>
        </div>
        <div className="flex md:w-1/2">
          <div className="flex flex-col w-1/2">
            <h4 className="font-bold uppercase">opening hours</h4>
            <div className="mb-2">
              Hotel Reception
              <div>Mon-Sun 10:00-19:00</div>
            </div>
            <div>
              Grooming
              <div>Mon-Fri 12:00-18:00</div>
            </div>
          </div>
          <div className="w-1/2">
            <h4 className="font-bold uppercase">Contact</h4>
            <div className="flex items-center gap-2">
              <MdOutlineMailOutline className="shrink-0" />
              <span>fluffylife@service.com</span>
            </div>
            <div className="flex items-center gap-2">
              <MdOutlinePhone />
              <span>123-456-789</span>
            </div>
          </div>
        </div>
      </div>
      <div className="text-main-teal text-xs flex justify-center mt-4">
        <span>&copy; 2024 Fluffy Life</span>
      </div>
    </div>
  );
};

export default Footer;
