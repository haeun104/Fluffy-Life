import { RoomData } from "@/types";
import Calendar from "../calendar/Calendar";

interface RoomReservationProps {
  selectedRoom: RoomData | undefined;
}

const RoomReservation: React.FC<RoomReservationProps> = ({ selectedRoom }) => {
  return (
    <div>
      <h2>Select stay period</h2>
      <Calendar />
    </div>
  );
};

export default RoomReservation;
