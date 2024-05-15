"use client";

import { HotelReview, Room } from "@prisma/client";
import ReservationItem from "./ReservationItem";
import HotelReviewModal from "../modals/ReviewRegistrationModal";
import { useCallback, useState } from "react";
import { RoomData, UserData } from "@/types";
import useHotelReviewModal from "@/hooks/useReviewRegistrationModal";

interface HotelReservation {
  id: string;
  userId: string;
  roomId: string;
  petChipNumber: string;
  startDate: Date;
  endDate: Date;
  totalPrice: number;
  createdAt: Date;
  room: Room;
}

interface HotelReservationsProps {
  hotelReservations: HotelReservation[] | undefined;
  hotelReviews: HotelReview[] | undefined;
  currentUser: UserData;
}

const HotelReservations: React.FC<HotelReservationsProps> = ({
  hotelReservations,
  hotelReviews,
  currentUser,
}) => {
  const [bookingForReview, setBookingForReview] = useState<HotelReservation>();
  const [reservationRoom, setReservationRoom] = useState<RoomData>();
  const [reviewToUpdate, setReviewToUpdate] = useState<HotelReview | null>(
    null
  );

  const hotelReviewModal = useHotelReviewModal();

  const checkExistingReview = (reservationId: string) => {
    if (!hotelReviews) {
      return null;
    }
    const review = hotelReviews.find(
      (review) => review.reservationId === reservationId
    );

    if (!review) {
      return null;
    }

    return review;
  };

  const openHotelReviewModal = async (id: string) => {

    if (hotelReservations) {
      const reservation = hotelReservations.find(
        (reservation) => reservation.id === id
      );
      if (reservation) {
        setBookingForReview(reservation);
        setReservationRoom(reservation.room);
      }
    }
    setReviewToUpdate(checkExistingReview(id));
    hotelReviewModal.onOpen();
  };

  return (
    <>
      <div className="">
        <h3 className="text-accent-light-green font-bold text-lg mt-8">
          Hotel
        </h3>
        {hotelReservations?.length === 0 || !hotelReservations ? (
          <div>There is no reservations</div>
        ) : (
          <div className="flex flex-col gap-4 mt-4">
            {hotelReservations.map((reservation) => {
              const { imageUrl, roomType, id } = reservation.room;
              return (
                <ReservationItem
                  key={reservation.id}
                  id={reservation.id}
                  startDate={reservation.startDate}
                  endDate={reservation.endDate}
                  totalPrice={reservation.totalPrice}
                  imageUrl={imageUrl}
                  roomType={roomType}
                  roomId={id}
                  existingReview={
                    checkExistingReview(reservation.id) === null ? false : true
                  }
                  openHotelReviewModal={openHotelReviewModal}
                />
              );
            })}
          </div>
        )}
      </div>
      <HotelReviewModal
        reservation={bookingForReview}
        review={reviewToUpdate}
        currentUser={currentUser.id}
        room={reservationRoom}
      />
    </>
  );
};

export default HotelReservations;
