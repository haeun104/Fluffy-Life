import RoomItem from "./RoomItem";
import suiteImage from "../../public/images/room-suite.jpg";
import standardImage from "../../public/images/room-standard.jpg";
import Container from "../Container";

const rooms = [
  {
    roomType: "Suite",
    roomPrice: 150,
    groomingInclude: false,
    description: "Suite room including pool and play yard",
    image: suiteImage,
  },
  {
    roomType: "Standard",
    roomPrice: 100,
    groomingInclude: false,
    description: "Standard room including play yard",
    image: standardImage,
  },
  {
    roomType: "Suite Package",
    roomPrice: 150,
    groomingInclude: true,
    groomingPrice: 150,
    description: "Suite room including onetime grooming service",
    image: suiteImage,
  },
  {
    roomType: "Standard Package",
    roomPrice: 100,
    groomingInclude: true,
    groomingPrice: 180,
    description: "Suite room including onetime grooming service",
    image: standardImage,
  },
];

const RoomList = () => {
  return (
    <Container>
      <div className="flex flex-col gap-4 items-center">
        {rooms.map((room, index) => (
          <RoomItem
            key={index}
            roomType={room.roomType}
            roomPrice={room.roomPrice}
            groomingInclude={room.groomingInclude}
            groomingPrice={room.groomingPrice}
            description={room.description}
            image={room.image}
          />
        ))}
      </div>
    </Container>
  );
};

export default RoomList;
