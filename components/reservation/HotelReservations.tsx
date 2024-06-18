"use client";

import { HotelReview, Room } from "@prisma/client";
import ReservationItem from "./ReservationItem";
import ReviewRegistrationModal from "../modals/ReviewRegistrationModal";
import { useRef, useState } from "react";
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

interface ReservationsByUser {
  reservationsWithReviews: (HotelReservation & {
    review: HotelReview | undefined;
  })[];
  hasMoreReservations: boolean;
}

interface HotelReservationsProps {
  initialReservations: ReservationsByUser;
  currentUser: string;
}

const HotelReservations: React.FC<HotelReservationsProps> = ({
  initialReservations,
  currentUser,
}) => {
  const [reservationsWithReviews, setReservationsWithReviews] = useState(
    initialReservations.reservationsWithReviews
  );
  const [bookingForReview, setBookingForReview] = useState<HotelReservation>();
  const [reservationRoom, setReservationRoom] = useState<RoomData>();
  const [reviewToUpdate, setReviewToUpdate] = useState<HotelReview | null>(
    null
  );
  const [visiblePage, setVisiblePage] = useState(1);
  const [currentCount, setCurrentCount] = useState<number | undefined>(
    initialReservations.reservationsWithReviews.length
  );
  const [hasMore, setHasMore] = useState(
    initialReservations.hasMoreReservations
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const hotelReviewModal = useHotelReviewModal();

  // Fetch 3 next reservations and their reviews
  const fetchReservations = async () => {
    try {
      const skip = visiblePage * 3;
      const response = await getHotelReservationsByUser(
        currentUser,
        skip,
        currentCount
      );
      if (response) {
        if (response.reservationsWithReviews.length > 0) {
          setReservationsWithReviews((prev) => {
            if (!prev) {
              return [...response.reservationsWithReviews];
            }
            return [...prev, ...response.reservationsWithReviews];
          });
          setVisiblePage((prev) => prev + 1);
          setCurrentCount((prev) => {
            if (prev) {
              return prev + response.reservationsWithReviews.length;
            }
          });
        }
        setHasMore(response.hasMoreReservations);
      }
    } catch (error: any) {
      console.error(error);
    }
  };

  // Implement fetching next reservations once load more is clicked
  const loadMoreReservations = async () => {
    setIsLoading(true);
    try {
      // Scroll page to get the load more button on user's view
      if (loadMoreRef.current) {
        loadMoreRef.current.scrollIntoView({ behavior: "smooth" });
      }
      await fetchReservations();
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  // Reset the reservation list to its initial one
  const hidePreviousReservation = () => {
    setVisiblePage(1);
    setReservationsWithReviews(initialReservations.reservationsWithReviews);
    setCurrentCount(initialReservations.reservationsWithReviews.length);
    setHasMore(initialReservations.hasMoreReservations);
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
            <div
              className={`${
                currentCount && currentCount <= 3 && !hasMore && "hidden"
              }`}
            >
              {!isLoading ? (
                <div className="border-[1px] border-[#EEEEEE] rounded-md p-2 shadow-md flex gap-4 mt-4 justify-center hover:bg-[#EEEEEE]">
                  {hasMore ? (
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
            </div>
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
