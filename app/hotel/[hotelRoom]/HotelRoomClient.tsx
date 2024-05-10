"use client";

import Container from "@/components/Container";
import RoomDetails from "@/components/hotel/RoomDetails";
import RoomReservation from "@/components/hotel/RoomReservation";
import ReservationModal from "@/components/modals/ReservationModal";
import useReservationModal from "@/hooks/useReservationModal";
import { RoomData, UserData } from "@/types";
import { HotelReservation } from "@prisma/client";
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns";
import { useEffect, useMemo, useState } from "react";
import { Range } from "react-date-range";
import toast from "react-hot-toast";

interface HotelRoomClientProps {
  selectedRoom: RoomData;
  currentUser: UserData | null;
  reservations: HotelReservation[] | undefined;
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

  const reservationModal = useReservationModal();

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

  const openReservationModal = () => {
    if (currentUser === null) {
      toast.error("Log in first!");
      return;
    }

    reservationModal.onOpen();
  };

  return (
    <>
      <Container>
        <div className="flex flex-col gap-6 max-w-[900px] mx-auto py-10">
          <RoomDetails selectedRoom={selectedRoom} />
          <RoomReservation
            selectedRoom={selectedRoom}
            dataRange={dataRange}
            onChangeDate={(value) => setDataRange(value)}
            onSubmit={openReservationModal}
            totalPrice={totalPrice}
            totalDays={totalDays}
            disableDates={disabledDates}
          />
        </div>
      </Container>
      <ReservationModal
        dataRange={dataRange}
        totalPrice={totalPrice}
        totalDays={totalDays}
        selectedRoom={selectedRoom}
        currentUser={currentUser}
      />
    </>
  );
};

export default HotelRoomClient;
