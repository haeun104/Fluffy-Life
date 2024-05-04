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
}

const RoomReservation: React.FC<RoomReservationProps> = ({
  selectedRoom,
  dataRange,
  onChangeDate,
  onSubmit,
  totalPrice,
  totalDays,
}) => {
  return (
    <div className="flex flex-col border-solid border-[1px] rounded-lg p-4">
      <h2>Select stay period</h2>
      <p className="text-sm">
        <span className="font-bold">{selectedRoom.roomPrice} PLN</span> per
        night
      </p>
      <Calendar
        value={dataRange}
        onChange={(value) => onChangeDate(value.selection)}
      />
      <div className="flex">
        <Button
          title="Reserve"
          style="bg-accent-light-green flex-1"
          onClick={onSubmit}
        />
      </div>
      <div className="flex justify-between">
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
  );
};

export default RoomReservation;
