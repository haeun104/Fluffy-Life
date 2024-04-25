import Container from "../Container";
import Menubar from "./Menubar";
import Logo from "./Logo";

const Navbar = () => {
  return (
    <div className="my-4">
      <Container>
        <div className="flex justify-between items-center">
          <Logo />
          <Menubar />
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
