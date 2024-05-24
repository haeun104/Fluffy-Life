import { RoomData } from "@/types";
import Image from "next/image";
import grooming from "@/public/images/grooming.png";

interface RoomDetailProps {
  selectedRoom: RoomData;
}

const RoomDetails: React.FC<RoomDetailProps> = ({ selectedRoom }) => {
  return (
    <div className="">
      <div className="flex justify-between">
        <h2 className="font-bold text-lg">{selectedRoom.roomType}</h2>
        <p className="text-sm flex flex-col items-end mb-2">
          <span className="font-bold text-lg">
            {selectedRoom.roomPrice} PLN
          </span>
          per night
        </p>
      </div>
      <p className="text-sm text-main-gray mb-4">{selectedRoom.title}</p>
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
