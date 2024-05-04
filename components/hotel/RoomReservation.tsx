import { RoomData } from "@/types";
import Calendar from "../calendar/Calendar";
import Button from "../Button";
import { Range } from "react-date-range";

interface RoomReservationProps {
  selectedRoom: RoomData;
  dataRange: Range;
  onChangeDate: (value: Range) => void;
}

const RoomReservation: React.FC<RoomReservationProps> = ({
  selectedRoom,
  dataRange,
  onChangeDate,
}) => {
  return (
    <div className="flex flex-col border-solid border-[1px] rounded-lg p-4">
      <h2>Select stay period</h2>
      <Calendar
        value={dataRange}
        onChange={(value) => onChangeDate(value.selection)}
      />
      <div className="flex">
        <Button title="Reserve" style="bg-accent-light-green flex-1" />
      </div>
    </div>
  );
};

export default RoomReservation;
