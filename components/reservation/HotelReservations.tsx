"use client";

import { HotelReview, Room } from "@prisma/client";
import ReservationItem from "./ReservationItem";
import ReviewRegistrationModal from "../modals/ReviewRegistrationModal";
import { useEffect, useRef, useState } from "react";
import { RoomData } from "@/types";
import useHotelReviewModal from "@/hooks/useReviewRegistrationModal";
import getHotelReservationsByUser from "@/actions/getHotelReservationsByUser";
import { FadeLoader } from "react-spinners";

export interface HotelReservation {
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
  initialReservations:
    | (HotelReservation & { review: HotelReview | undefined })[]
    | undefined;
  currentUser: string;
  reservationCount: number | undefined;
}

const HotelReservations: React.FC<HotelReservationsProps> = ({
  initialReservations,
  currentUser,
  reservationCount,
}) => {
  const [reservationsWithReviews, setReservationsWithReviews] =
    useState(initialReservations);
  const [bookingForReview, setBookingForReview] = useState<HotelReservation>();
  const [reservationRoom, setReservationRoom] = useState<RoomData>();
  const [reviewToUpdate, setReviewToUpdate] = useState<HotelReview | null>(
    null
  );
  const [visibleCount, setVisibleCount] = useState(1);
  const [remainedCount, setRemainedCount] = useState<number>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const hotelReviewModal = useHotelReviewModal();

  // Calculate and update initial count of reservations
  useEffect(() => {
    if (reservationCount && initialReservations) {
      const initialCount = reservationCount - initialReservations.length;
      setRemainedCount(initialCount);
    }
  }, [reservationCount, initialReservations]);

  // Fetch 3 next reservations and their reviews
  const fetchReservations = async () => {
    try {
      const take = 3;
      const skip = visibleCount * take;
      const response = await getHotelReservationsByUser(
        currentUser,
        skip,
        take
      );
      if (response && response.length > 0) {
        setReservationsWithReviews((prev) => {
          if (!prev) {
            return [...response];
          }
          return [...prev, ...response];
        });
        setVisibleCount((prev) => prev + 1);
        setRemainedCount((prev) => {
          if (prev) {
            return prev - response.length;
          }
        });
      }
    } catch (error: any) {
      console.error(error);
    }
  };

  // Implement fetching next reservations once load more is clicked
  const loadMoreReservations = async () => {
    setIsLoading(true);
    try {
      await fetchReservations();
      // Scroll page to get the load more button on user's view
      if (loadMoreRef.current) {
        loadMoreRef.current.scrollIntoView({ behavior: "smooth" });
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  // Reset the reservation list to its initial one
  const hidePreviousReservation = () => {
    setVisibleCount(1);
    setReservationsWithReviews(initialReservations);

    if (reservationCount && initialReservations) {
      const initialCount = reservationCount - initialReservations.length;
      setRemainedCount(initialCount);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openHotelReviewModal = async (id: string) => {
    if (reservationsWithReviews) {
      const reservation = reservationsWithReviews.find(
        (reservation) => reservation.id === id
      );
      if (reservation) {
        setBookingForReview(reservation);
        setReservationRoom(reservation.room);
        if (reservation.review) {
          setReviewToUpdate(reservation.review);
        } else {
          setReviewToUpdate(null);
        }
      }
    }

    hotelReviewModal.onOpen();
  };

  return (
    <>
      <div className="">
        <h3 className="text-accent-light-green font-bold text-lg mt-8">
          Hotel
        </h3>
        {reservationsWithReviews?.length === 0 || !reservationsWithReviews ? (
          <div className="mt-8">There is no reservations</div>
        ) : (
          <>
            <div className="flex flex-col gap-4 mt-4">
              {reservationsWithReviews.map((reservation) => {
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
                    existingReview={reservation.review ? true : false}
                    openHotelReviewModal={openHotelReviewModal}
                  />
                );
              })}
            </div>
            {!isLoading ? (
              <div className="border-[1px] border-[#EEEEEE] rounded-md p-2 shadow-md flex gap-4 mt-4 justify-center hover:bg-[#EEEEEE]">
                {remainedCount !== 0 ? (
                  <div
                    onClick={loadMoreReservations}
                    className="cursor-pointer"
                    ref={loadMoreRef}
                  >
                    Load previous reservations
                  </div>
                ) : (
                  <div
                    onClick={hidePreviousReservation}
                    className="cursor-pointer"
                  >
                    Hide previous reservations
                  </div>
                )}
              </div>
            ) : (
              <div className="flex justify-center py-2">
                <FadeLoader color="#219C90" />
              </div>
            )}
          </>
        )}
      </div>
      <ReviewRegistrationModal
        reservation={bookingForReview}
        review={reviewToUpdate}
        currentUser={currentUser}
        room={reservationRoom}
      />
    </>
  );
};

export default HotelReservations;
