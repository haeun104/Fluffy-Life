"use client";

import AverageRating from "@/components/AverageRating";
import Container from "@/components/Container";
import RoomDetails from "@/components/hotel/RoomDetails";
import RoomReservation from "@/components/hotel/RoomReservation";
import RoomReviewList from "@/components/hotel/RoomReviewList";
import ReservationModal from "@/components/modals/ReservationModal";
import useReservationModal from "@/hooks/useReservationModal";
import { RoomData, UserData } from "@/types";
import { HotelReservation } from "@prisma/client";
import {
  addDays,
  differenceInCalendarDays,
  eachDayOfInterval,
  isAfter,
  isBefore,
  isEqual,
} from "date-fns";
import { useEffect, useMemo, useState } from "react";
import { Range } from "react-date-range";
import toast from "react-hot-toast";

interface HotelRoomClientProps {
  selectedRoom: RoomData;
  currentUser: UserData | null;
  reservations: HotelReservation[] | undefined;
  rating: number | undefined;
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
  rating,
}) => {
  const [dataRange, setDataRange] = useState<Range>(initialDateRange);
  const [earliestDate, setEarliestDate] = useState<Date>(new Date());
  const [totalPrice, setTotalPrice] = useState(selectedRoom.roomPrice);
  const [totalDays, setTotalDays] = useState(0);

  const reservationModal = useReservationModal();

  // Create an array with range of existing reservation dates
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

  // Find the earliest date available to reserve
  const findEarliestAvailableDate = (reservedDates: Date[]) => {
    if (reservedDates.length === 0) {
      return new Date();
    }

    const sortedReservedDates = reservedDates.sort(
      (a, b) => a.getTime() - b.getTime()
    );
    const today = new Date();

    for (let i = 0; i < sortedReservedDates.length; i++) {
      const currentDate = sortedReservedDates[i];
      const nextDate = sortedReservedDates[i + 1];

      if (isBefore(currentDate, today)) {
        continue;
      }

      const nextDay = addDays(currentDate, 1);

      if (isAfter(nextDay, nextDate) || isEqual(nextDay, nextDate)) {
        continue;
      }
      return nextDay;
    }
  };

  useEffect(() => {
    if (disabledDates) {
      setEarliestDate(findEarliestAvailableDate(disabledDates) as Date);
    }
  }, [disabledDates]);

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
        setTotalPrice(0);
      }
    }
  }, [dataRange, selectedRoom]);

  const openReservationModal = () => {
    if (currentUser === null) {
      toast.error("Log in first!");
      return;
    }
    if (totalDays === 0) {
      toast.error("Select date first!");
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
            earliestDate={earliestDate}
          />
          <div>
            <h2 className="font-bold text-lg">Reviews</h2>
            <AverageRating rating={rating || 0} />
          </div>
          <RoomReviewList roomId={selectedRoom.id} />
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
