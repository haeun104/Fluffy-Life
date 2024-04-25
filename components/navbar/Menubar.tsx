import Link from "next/link";
import Button from "../Button";

const Menubar = () => {
  return (
    <div className="flex items-center gap-10">
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
        <Button title="LOGIN" color="accent-light-green" />
        <Button title="SIGN UP" />
      </div>
    </div>
  );
};

export default Menubar;
