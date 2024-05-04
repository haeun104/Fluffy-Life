"use client";

import Container from "@/components/Container";
import RoomDetails from "@/components/hotel/RoomDetails";
import RoomReservation from "@/components/hotel/RoomReservation";
import { RoomData, UserData } from "@/types";
import axios from "axios";
import { differenceInCalendarDays } from "date-fns";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Range } from "react-date-range";
import toast from "react-hot-toast";

interface HotelRoomClientProps {
  selectedRoom: RoomData;
  currentUser: UserData | null;
}

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

const HotelRoomClient: React.FC<HotelRoomClientProps> = ({
  selectedRoom,
  currentUser,
}) => {
  const [dataRange, setDataRange] = useState<Range>(initialDateRange);
  const [totalPrice, setTotalPrice] = useState(selectedRoom.roomPrice);
  const [totalDays, setTotalDays] = useState(0);

  const router = useRouter();

  useEffect(() => {
    if (dataRange.startDate && dataRange.endDate) {
      const days = differenceInCalendarDays(
        dataRange.endDate,
        dataRange.startDate
      );
      if (days) {
        setTotalDays(days);
        setTotalPrice(days * selectedRoom.roomPrice);
      } else {
        setTotalPrice(selectedRoom.roomPrice);
      }
    }
  }, [dataRange, selectedRoom]);

  const createReservation = () => {
    if (currentUser === null) {
      toast.error("Log in first!");
      return;
    }

    axios
      .post("/api/hotelReservation", {
        userId: currentUser.id,
        roomId: selectedRoom.id,
        startDate: dataRange.startDate,
        endDate: dataRange.endDate,
        totalPrice,
      })
      .then(() => {
        toast.success("Successfully reserved!");
        router.push("/");
      })
      .catch((error) => {
        toast.error("Something went wrong");
        console.error(error);
      });
  };

  return (
    <Container>
      <div>
        <RoomDetails selectedRoom={selectedRoom} />
        <RoomReservation
          selectedRoom={selectedRoom}
          dataRange={dataRange}
          onChangeDate={(value) => setDataRange(value)}
          onSubmit={createReservation}
          totalPrice={totalPrice}
          totalDays={totalDays}
        />
      </div>
    </Container>
  );
};

export default HotelRoomClient;
