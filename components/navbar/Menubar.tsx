"use client";

import Link from "next/link";
import Button from "../Button";
import { IoMdClose, IoMdMenu } from "react-icons/io";
import { useState } from "react";
import Modal from "../modals/Modal";
import MenuItem from "./MenuItem";

const menuItems = [
  {
    title: "about us",
    url: "/about",
  },
  {
    title: "hotel",
    url: "/hotel",
  },
  {
    title: "grooming",
    url: "/grooming",
  },
  {
    title: "events",
    url: "/events",
  },
];

const Menubar = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <>
      <div className="hidden lg:flex items-center gap-10">
        <ul className="uppercase font-bold text-main-teal flex gap-6">
          {menuItems.map((item, index) => (
            <MenuItem
              key={index}
              title={item.title}
              url={item.url}
              style={
                "border-b-solid border-b-[2px] border-b-white hover:border-b-main-teal"
              }
            />
          ))}
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
          {menuItems.map((item, index) => (
            <MenuItem key={index} title={item.title} url={item.url} />
          ))}
          <li className="text-main-gray cursor-pointer">login</li>
          <li className="text-accent-light-pink cursor-pointer">sign up</li>
        </ul>
      </div>
      <Modal />
    </>
  );
};

export default Menubar;
