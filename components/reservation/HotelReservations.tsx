"use client";

import { HotelReview, Room } from "@prisma/client";
import ReservationItem from "./ReservationItem";
import ReviewRegistrationModal from "../modals/ReviewRegistrationModal";
import { useRef, useState } from "react";
import { RoomData, UserData } from "@/types";
import useHotelReviewModal from "@/hooks/useReviewRegistrationModal";

interface HotelReservation {
  id: string;
  userId: string;
  roomId: string;
  petName: string;
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
  const [visibleReservations, setVisibleReservations] = useState(3);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

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

  const loadMoreReservations = () => {
    if (hotelReservations) {
      setVisibleReservations((prev) =>
        Math.min(prev + 3, hotelReservations.length)
      );
    }
    if (loadMoreRef.current) {
      loadMoreRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const hidePreviousReservation = () => {
    setVisibleReservations(3);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <div className="">
        <h3 className="text-accent-light-green font-bold text-lg mt-8">
          Hotel
        </h3>
        {hotelReservations?.length === 0 || !hotelReservations ? (
          <div className="mt-8">There is no reservations</div>
        ) : (
          <div className="flex flex-col gap-4 mt-4">
            {hotelReservations
              .slice(0, visibleReservations)
              .map((reservation) => {
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
                      checkExistingReview(reservation.id) === null
                        ? false
                        : true
                    }
                    openHotelReviewModal={openHotelReviewModal}
                  />
                );
              })}
          </div>
        )}
        {hotelReservations && (
          <div className="border-[1px] border-[#EEEEEE] rounded-md p-2 shadow-md flex gap-4 mt-4 justify-center hover:bg-[#EEEEEE]">
            {visibleReservations < hotelReservations.length ? (
              <div
                onClick={loadMoreReservations}
                className="cursor-pointer"
                ref={loadMoreRef}
              >
                Load previous reservations
              </div>
            ) : (
              <div onClick={hidePreviousReservation} className="cursor-pointer">
                Hide previous reservations
              </div>
            )}
          </div>
        )}
      </div>
      <ReviewRegistrationModal
        reservation={bookingForReview}
        review={reviewToUpdate}
        currentUser={currentUser.id}
        room={reservationRoom}
      />
    </>
  );
};

export default HotelReservations;
