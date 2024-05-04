import { RoomData } from "@/types";
import Calendar from "../calendar/Calendar";
import Button from "../Button";
import { Range } from "react-date-range";

interface RoomReservationProps {
  selectedRoom: RoomData;
  dataRange: Range;
  onChangeDate: (value: Range) => void;
  onSubmit: () => void;
  totalPrice: number;
  totalDays: number;
  disableDates: Date[];
}

const RoomReservation: React.FC<RoomReservationProps> = ({
  selectedRoom,
  dataRange,
  onChangeDate,
  onSubmit,
  totalPrice,
  totalDays,
  disableDates,
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 sm:justify-between w-full">
      <div className="">
        <p>{selectedRoom.description}</p>
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
