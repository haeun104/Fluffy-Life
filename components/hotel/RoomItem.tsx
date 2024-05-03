"use client";

import Image, { StaticImageData } from "next/image";
import Button from "../Button";
import { useRouter } from "next/navigation";

interface RoomItemProps {
  roomId: string;
  roomType: string;
  roomPrice: number;
  groomingInclude: boolean;
  groomingPrice?: number;
  title: string;
  image: StaticImageData;
}

const RoomItem: React.FC<RoomItemProps> = ({
  roomId,
  roomType,
  roomPrice,
  groomingInclude,
  groomingPrice,
  title,
  image,
}) => {
  const router = useRouter();
  return (
    <div className="border-solid border-[1px] border-[#EEEEEE] rounded-lg overflow-hidden flex flex-col max-w-[350px] sm:max-w-[800px] sm:min-w-full sm:flex-row md:min-w-[800px]">
      <div className="sm:max-w-[350px] sm:max-h-[200px]">
        <Image src={image} alt={roomType} />
      </div>
      <div className="py-2 px-4 min-h-[100px] flex flex-col gap-2 justify-center">
        <h2 className="font-bold">{roomType}</h2>
        <p className="text-sm text-main-gray font-light">{title}</p>
        {groomingInclude ? (
          <div className="text-sm font-bold">{`from ${roomPrice} PLN per night + ${groomingPrice} PLN one-off fee`}</div>
        ) : (
          <div className="text-sm font-bold">{`from ${roomPrice} PLN per night`}</div>
        )}
        <Button
          title="Go to reserve"
          style="bg-main-gray max-w-[150px] text-sm my-2"
          onClick={() => router.push(`/hotel/${roomId}`)}
        />
      </div>
    </div>
  );
};

export default RoomItem;
