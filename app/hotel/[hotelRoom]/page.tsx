"use client";

import Container from "@/components/Container";
import RoomDetails from "@/components/hotel/RoomDetails";
import RoomReservation from "@/components/hotel/RoomReservation";
import { RoomData } from "@/types";
import { rooms } from "@/util/rooms";
import { useEffect, useState } from "react";

interface HotelRoomParams {
  hotelRoom: string;
}

const HotelRoomPage = ({ params }: { params: HotelRoomParams }) => {
  const [selectedRoom, setSelectedRoom] = useState<RoomData | undefined>();

  useEffect(() => {
    const getRoomData = (id: string) => {
      const room = rooms.find((room) => room.roomId === id);
      if (room) {
        setSelectedRoom(room);
      }
    };
    if (params) {
      getRoomData(params.hotelRoom);
    }
  }, [params]);

  return (
    <Container>
      <RoomDetails selectedRoom={selectedRoom} />
      <RoomReservation selectedRoom={selectedRoom} />
    </Container>
  );
};

export default HotelRoomPage;
