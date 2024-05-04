"use client";

import Container from "@/components/Container";
import RoomDetails from "@/components/hotel/RoomDetails";
import RoomReservation from "@/components/hotel/RoomReservation";
import { RoomData } from "@/types";
import { useState } from "react";

interface HotelRoomClientProps {
  selectedRoom: RoomData;
}

const HotelRoomClient: React.FC<HotelRoomClientProps> = ({ selectedRoom }) => {
  const [dataRange, setDataRange] = useState()
  return (
    <Container>
      <div>
      <RoomDetails selectedRoom={selectedRoom} />
      <RoomReservation selectedRoom={selectedRoom} />
      </div>
    </Container>
  );
};

export default HotelRoomClient;
