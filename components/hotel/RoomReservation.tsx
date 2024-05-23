import { RoomData } from "@/types";
import Calendar from "../calendar/Calendar";
import Button from "../Button";
import { Range } from "react-date-range";
import bed from "@/public/images/pet-bed-room.png";
import toy from "@/public/images/dog-toy-room.png";
import playing from "@/public/images/playing-room.png";
import health from "@/public/images/health-dog-room.png";
import care from "@/public/images/care-room.png";
import grooming from "@/public/images/grooming-room.png";
import swimming from "@/public/images/swimming-pool-room.png";
import Image from "next/image";

interface RoomReservationProps {
  selectedRoom: RoomData;
  dataRange: Range;
  onChangeDate: (value: Range) => void;
  onSubmit: () => void;
  totalPrice: number;
  totalDays: number;
  disableDates: Date[];
}

const roomDescription = [
  {
    description: "Ultra-comfortable bed",
    icon: bed,
    rooms: ["Suite", "Standard", "Suite Package", "Standard Package"],
  },
  {
    description: "High-quality toys",
    icon: toy,
    rooms: ["Suite", "Standard", "Suite Package", "Standard Package"],
  },
  {
    description: "Outdoor play area",
    icon: playing,
    rooms: ["Suite", "Standard", "Suite Package", "Standard Package"],
  },
  {
    description: "Health checks",
    icon: health,
    rooms: ["Suite", "Standard", "Suite Package", "Standard Package"],
  },
  {
    description: "24/7 personalized care",
    icon: care,
    rooms: ["Suite", "Standard", "Suite Package", "Standard Package"],
  },
  {
    description: "Grooming service",
    icon: grooming,
    rooms: ["Suite Package", "Standard Package"],
  },
  {
    description: "Swimming pool",
    icon: swimming,
    rooms: ["Suite", "Suite Package"],
  },
];

const RoomReservation: React.FC<RoomReservationProps> = ({
  selectedRoom,
  dataRange,
  onChangeDate,
  onSubmit,
  totalPrice,
  totalDays,
  disableDates,
}) => {
  const descriptions = roomDescription.filter((item) =>
    item.rooms.includes(selectedRoom.roomType)
  );

  return (
    <div className="flex flex-col sm:flex-row gap-4 sm:justify-between w-full">
      <div className="">
        <h2 className="text-main-teal font-bold mb-4">
          What this room provides
        </h2>
        <div className="flex flex-col gap-4">
          {descriptions.map((description, index) => (
            <div key={index} className="flex items-center gap-2">
              <Image
                src={description.icon}
                alt={description.description}
                height={30}
                width={30}
              />
              <p>{description.description}</p>
            </div>
          ))}
        </div>
        <p className="text-sm">
          <span className="font-bold">{selectedRoom.roomPrice} PLN</span> per
          night
        </p>
      </div>
      <div className="flex flex-col gap-4">
        <h2 className="font-bold">Select stay period</h2>
        <div className="flex flex-col border-solid border-[1px] rounded-lg px-4 pb-2 max-w-[350px]">
          <Calendar
            value={dataRange}
            onChange={(value) => onChangeDate(value.selection)}
            disableDates={disableDates}
          />
          <div className="flex">
            <Button
              title="Reserve"
              style="bg-accent-light-green flex-1"
              onClick={onSubmit}
            />
          </div>
          <div className="flex justify-between py-2">
            <p className=""> Total Stay</p>
            <span className="font-bold">
              {totalDays < 2 ? `${totalDays} night` : `${totalDays} nights`}
            </span>
          </div>
          <div className="flex justify-between">
            <p className=""> Total Price</p>
            <span className="font-bold">{totalPrice} PLN</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomReservation;
