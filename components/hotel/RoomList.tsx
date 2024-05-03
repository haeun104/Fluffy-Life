import RoomItem from "./RoomItem";
import Container from "../Container";
import { rooms } from "@/util/rooms";

const RoomList = () => {
  return (
    <Container>
      <div className="flex flex-col gap-4 items-center">
        {rooms.map((room) => (
          <RoomItem
            key={room.roomId}
            roomId={room.roomId}
            roomType={room.roomType}
            roomPrice={room.roomPrice}
            groomingInclude={room.groomingInclude}
            groomingPrice={room.groomingPrice}
            title={room.title}
            image={room.image}
          />
        ))}
      </div>
    </Container>
  );
};

export default RoomList;
