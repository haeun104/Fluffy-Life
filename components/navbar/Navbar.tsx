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
    <div className="my-4 relative">
      <Container>
        <div className="flex justify-between items-center gap-6">
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
