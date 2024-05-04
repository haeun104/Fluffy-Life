import { RoomData } from "@/types";
import Calendar from "../calendar/Calendar";
import Button from "../Button";

interface RoomReservationProps {
  selectedRoom: RoomData;
}

const RoomReservation: React.FC<RoomReservationProps> = ({ selectedRoom }) => {
  return (
    <div className="flex flex-col border-solid border-[1px] rounded-lg p-4">
      <h2>Select stay period</h2>
      <Calendar />
      <div className="flex">
        <Button title="Reserve" style="bg-accent-light-green flex-1" />
      </div>
    </div>
  );
};

export default RoomReservation;
