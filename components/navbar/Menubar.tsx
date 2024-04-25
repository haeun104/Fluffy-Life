"use client";

import Link from "next/link";
import Button from "../Button";
import { IoMdClose, IoMdMenu } from "react-icons/io";
import { useState } from "react";

const Menubar = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <>
      <div className="hidden lg:flex items-center gap-10">
        <ul className="uppercase font-bold text-main-teal flex gap-6">
          <Link href={"/about"}>
            <li className="border-b-solid border-b-[2px] border-b-white hover:border-b-main-teal">
              about us
            </li>
          </Link>
          <Link href={"/hotel"}>
            <li className="border-b-solid border-b-[2px] border-b-white hover:border-b-main-teal">
              hotel
            </li>
          </Link>
          <Link href={"/grooming"}>
            <li className="border-b-solid border-b-[2px] border-b-white hover:border-b-main-teal">
              grooming
            </li>
          </Link>
          <Link href={"/events"}>
            <li className="border-b-solid border-b-[2px] border-b-white hover:border-b-main-teal">
              events
            </li>
          </Link>
        </ul>
        <div className="flex gap-6">
          <Button title="LOGIN" color="main-gray" />
          <Button title="SIGN UP" />
        </div>
      </div>
      <div className="lg:hidden">
        <div
          className={`text-main-teal cursor-pointer ${toggle && "hidden"}`}
          onClick={() => setToggle(!toggle)}
        >
          <IoMdMenu size={36} />
        </div>
        <div
          className={`text-main-teal cursor-pointer ${!toggle && "hidden"}`}
          onClick={() => setToggle(!toggle)}
        >
          <IoMdClose size={36} />
        </div>
        <ul
          className={`uppercase font-bold text-main-teal flex flex-col gap-6 absolute right-0 -bottom-[340px] bg-white px-[50px] py-[30px] ${
            !toggle && "hidden"
          }`}
        >
          <Link href={"/about"}>
            <li>about us</li>
          </Link>
          <Link href={"/hotel"}>
            <li>hotel</li>
          </Link>
          <Link href={"/grooming"}>
            <li>grooming</li>
          </Link>
          <Link href={"/events"}>
            <li>events</li>
          </Link>
          <li className="text-main-gray cursor-pointer">login</li>
          <li className="text-accent-light-pink cursor-pointer">sign up</li>
        </ul>
      </div>
    </>
  );
};

export default Menubar;
