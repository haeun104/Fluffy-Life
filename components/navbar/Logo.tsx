import Image from "next/image";
import logo from "../../app/icon.png";

const Logo = () => {
  return <Image alt="logo" src={logo} height={30} width={30} />;
};

export default Logo;
