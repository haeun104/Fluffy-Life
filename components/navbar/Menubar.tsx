import Link from "next/link";

const Menubar = () => {
  return (
    <>
    <ul className="uppercase font-bold text-main-teal flex gap-6">
      <Link href={"/about"}>
        <li className="border-b-solid border-b-[2px] border-b-white hover:border-b-main-teal">about us</li>
      </Link>
      <Link href={"/hotel"}>
        <li className="border-b-solid border-b-[2px] border-b-white hover:border-b-main-teal">hotel</li>
      </Link>
      <Link href={"/grooming"}>
        <li className="border-b-solid border-b-[2px] border-b-white hover:border-b-main-teal">grooming</li>
      </Link>
      <Link href={"/events"}>
        <li className="border-b-solid border-b-[2px] border-b-white hover:border-b-main-teal">events</li>
      </Link>
    </ul>
    </>
  );
};

export default Menubar;
