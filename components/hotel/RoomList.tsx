import RoomItem from "./RoomItem";
import Container from "../Container";
import { RoomData } from "@/types";

interface RoomListProps {
  rooms: RoomData[];
}

const RoomList: React.FC<RoomListProps> = ({ rooms }) => {
  return (
    <Container>
      <div className="flex flex-col gap-4 items-center">
        {rooms.map((room) => (
          <RoomItem
            key={room.id}
            id={room.id}
            roomType={room.roomType}
            roomPrice={room.roomPrice}
            groomingInclude={room.groomingInclude}
            groomingPrice={room.groomingPrice}
            title={room.title}
            imageUrl={room.imageUrl}
          />
        ))}
      </div>
    </Container>
  );
};

export default RoomList;
