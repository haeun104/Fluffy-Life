"use client";

import Container from "@/components/Container";
import RoomDetails from "@/components/hotel/RoomDetails";
import RoomReservation from "@/components/hotel/RoomReservation";
import { RoomData } from "@/types";
import { useState } from "react";
import { Range } from "react-date-range";

interface HotelRoomClientProps {
  selectedRoom: RoomData;
}

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

const HotelRoomClient: React.FC<HotelRoomClientProps> = ({ selectedRoom }) => {
  const [dataRange, setDataRange] = useState<Range>(initialDateRange);

  return (
    <Container>
      <div>
        <RoomDetails selectedRoom={selectedRoom} />
        <RoomReservation
          selectedRoom={selectedRoom}
          dataRange={dataRange}
          onChangeDate={(value) => setDataRange(value)}
        />
      </div>
    </Container>
  );
};

export default HotelRoomClient;
