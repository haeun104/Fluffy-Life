import { RoomData } from "@/types";
import Image from "next/image";

interface RoomDetailProps {
  selectedRoom: RoomData | undefined;
}

const RoomDetails: React.FC<RoomDetailProps> = ({ selectedRoom }) => {
  if (!selectedRoom) {
    return null;
  }

  return (
    <div className="flex flex-col gap-2">
      <h2 className="font-bold">{selectedRoom.roomType}</h2>
      <p className="text-sm text-main-gray">{selectedRoom.title}</p>
      <div className="rounded-md overflow-hidden">
        <Image src={selectedRoom.image} alt={selectedRoom.roomType} />
      </div>
      <p>{selectedRoom.description}</p>
    </div>
  );
};

export default RoomDetails;
