"use client";

import Button from "../Button";
import { useRouter } from "next/navigation";
import Image from "next/image";
import grooming from "@/public/images/grooming.png";

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
    <div className="border-solid border-[1px] border-[#EEEEEE] rounded-lg overflow-hidden flex flex-col sm:flex-row ">
      <div className="sm:max-h-[200px] sm:w-[350px] shrink-0 relative">
        <Image
          src={imageUrl}
          alt={roomType}
          height={200}
          width={350}
          priority
        />
        {groomingInclude && (
          <div className="h-[70px] w-[70px] sm:h-[100px] sm:w-[100px] absolute right-2 bottom-2 rounded-full overflow-hidden border-main-gray border-[1px]">
            <Image src={grooming} alt="grooming" />
          </div>
        )}
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
          onClick={() => router.push(`/room/${id}`)}
        />
      </div>
    </div>
  );
};

export default RoomItem;
