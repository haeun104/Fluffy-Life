import { RoomData } from "@/types";
import Image from "next/image";

interface RoomDetailProps {
  selectedRoom: RoomData;
}

const RoomDetails: React.FC<RoomDetailProps> = ({ selectedRoom }) => {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="font-bold text-lg">{selectedRoom.roomType}</h2>
      <p className="text-sm text-main-gray">{selectedRoom.title}</p>
      <div className="rounded-md overflow-hidden max-w-[900px] h-auto">
        <Image
          src={selectedRoom.imageUrl}
          alt={selectedRoom.roomType}
          width={900}
          height={500}
          objectFit="cover"
        />
      </div>
    </div>
  );
};

export default RoomDetails;
