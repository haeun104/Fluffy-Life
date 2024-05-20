import Container from "../Container";
import Menubar from "./Menubar";
import Logo from "./Logo";
import { UserData } from "@/types";
import UserMenu from "./UserMenu";
import MenuDropdown from "./MenuDropdown";

interface NavbarProps {
  currentUser: UserData | null;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
  return (
    <div className="py-4 relative border-b-[1px] border-b-solid border-[#EEEEEE] z-50">
      <Container>
        <div className="flex lg:justify-between items-center gap-6">
          <MenuDropdown currentUser={currentUser} />
          <Logo />
          <Menubar currentUser={currentUser} />
          <UserMenu currentUser={currentUser} />
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
