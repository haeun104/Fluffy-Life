"use client";

import Container from "@/components/Container";
import RoomDetails from "@/components/hotel/RoomDetails";
import RoomReservation from "@/components/hotel/RoomReservation";
import { RoomData, UserData } from "@/types";
import { HotelReservation } from "@prisma/client";
import axios from "axios";
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Range } from "react-date-range";
import toast from "react-hot-toast";

interface HotelRoomClientProps {
  selectedRoom: RoomData;
  currentUser: UserData | null;
  reservations: HotelReservation[] | null;
}

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

const HotelRoomClient: React.FC<HotelRoomClientProps> = ({
  selectedRoom,
  currentUser,
  reservations,
}) => {
  const [dataRange, setDataRange] = useState<Range>(initialDateRange);
  const [totalPrice, setTotalPrice] = useState(selectedRoom.roomPrice);
  const [totalDays, setTotalDays] = useState(0);

  const router = useRouter();

  const disabledDates = useMemo(() => {
    let dates: Date[] = [];
    reservations?.forEach((reservation) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      });
      dates = [...dates, ...range];
    });
    return dates;
  }, [reservations]);

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
          disableDates={disabledDates}
        />
      </div>
    </Container>
  );
};

export default HotelRoomClient;
