import Image from "next/image";

interface RoomItemProps {
  roomType: string;
  roomPrice: number;
  groomingInclude: boolean;
  groomingPrice?: number;
  description: string;
  image: string;
}

const RoomItem: React.FC<RoomItemProps> = ({
  roomType,
  roomPrice,
  groomingInclude,
  groomingPrice,
  description,
  image,
}) => {
  return (
    <div className="cursor-pointer border-solid border-[1px] border-[#EEEEEE] rounded-lg overflow-hidden flex flex-col max-w-[350px] sm:max-w-[800px] sm:min-w-full sm:flex-row md:min-w-[800px]">
      <div className="sm:max-w-[350px] sm:max-h-[200px]">
        <Image src={image} alt={roomType} />
      </div>
      <div className="py-2 px-4 min-h-[100px] flex flex-col gap-2 justify-center">
        <h2 className="font-bold">{roomType}</h2>
        <p className="text-sm text-main-gray font-light">{description}</p>
        {groomingInclude ? (
          <div className="text-sm font-bold">{`from ${roomPrice} PLN per night + ${groomingPrice} PLN one-off fee`}</div>
        ) : (
          <div className="text-sm font-bold">{`from ${roomPrice} PLN per night`}</div>
        )}
      </div>
    </div>
  );
};

export default RoomItem;
