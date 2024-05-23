import { RoomData } from "@/types";
import Image from "next/image";
import grooming from "@/public/images/grooming.png";

interface RoomDetailProps {
  selectedRoom: RoomData;
}

const RoomDetails: React.FC<RoomDetailProps> = ({ selectedRoom }) => {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="font-bold text-lg">{selectedRoom.roomType}</h2>
      <p className="text-sm text-main-gray">{selectedRoom.title}</p>
      <div className="rounded-md overflow-hidden max-w-[900px] h-auto relative">
        <Image
          src={selectedRoom.imageUrl}
          alt={selectedRoom.roomType}
          width={900}
          height={500}
          objectFit="cover"
        />
        {selectedRoom.groomingInclude && (
          <div className="h-[70px] w-[70px] sm:h-[150px] sm:w-[150px] absolute right-2 bottom-2 rounded-full overflow-hidden border-main-gray border-[1px]">
            <Image src={grooming} alt="grooming" />
          </div>
        )}
      </div>
    </div>
  );
};

export default RoomDetails;
