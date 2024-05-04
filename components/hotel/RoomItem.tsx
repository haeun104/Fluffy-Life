"use client";

import Button from "../Button";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface RoomItemProps {
  id: string;
  roomType: string;
  roomPrice: number;
  groomingInclude: boolean;
  groomingPrice: number | null;
  title: string;
  imageUrl: string;
}

const RoomItem: React.FC<RoomItemProps> = ({
  id,
  roomType,
  roomPrice,
  groomingInclude,
  groomingPrice,
  title,
  imageUrl,
}) => {
  const router = useRouter();
  return (
    <div className="border-solid border-[1px] border-[#EEEEEE] rounded-lg overflow-hidden flex flex-col max-w-[350px] sm:max-w-[800px] sm:min-w-full sm:flex-row md:min-w-[800px]">
      <div className="sm:max-w-[350px] sm:max-h-[200px]">
        <Image src={imageUrl} alt={roomType} height={200} width={350} priority/>
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
          onClick={() => router.push(`/hotel/${id}`)}
        />
      </div>
    </div>
  );
};

export default RoomItem;