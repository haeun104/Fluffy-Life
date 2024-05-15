import RoomItem from "./RoomItem";
import { RoomData } from "@/types";

interface RoomListProps {
  rooms: RoomData[];
}

const RoomList: React.FC<RoomListProps> = ({ rooms }) => {
  return (
    <div className="flex flex-col gap-4">
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
  );
};

export default RoomList;
