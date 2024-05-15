"use client";

import Button from "../Button";
import { useEffect, useMemo, useState } from "react";
import { format } from "date-fns";
import { isAfter } from "date-fns";
import { BsThreeDots } from "react-icons/bs";
import Image from "next/image";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios from "axios";

interface ReservationItemProps {
  id: string;
  startDate: Date;
  endDate: Date;
  totalPrice: number;
  imageUrl: string;
  roomType: string;
  roomId: string;
  existingReview: boolean;
  openHotelReviewModal: (reservationId: string) => void;
}

const ReservationItem: React.FC<ReservationItemProps> = ({
  id,
  startDate,
  endDate,
  totalPrice,
  imageUrl,
  roomType,
  roomId,
  existingReview,
  openHotelReviewModal,
}) => {
  const [isReservationPassed, setIsReservationPassed] = useState<boolean>();
  const [menuHidden, setMenuHidden] = useState(true);

  const router = useRouter();

  useEffect(() => {
    setIsReservationPassed(isAfter(new Date(), startDate));
  }, [startDate]);

  const formatDate = useMemo(() => {
    const start = format(startDate, "MM/dd/yyyy");
    const end = format(endDate, "MM/dd/yyyy");
    return {
      start,
      end,
    };
  }, [startDate, endDate]);

  const goToReservationDetails = (id: string) => {
    router.push(`/reservations/${id}`);
  };

  const goToReservationPage = (roomId: string) => {
    router.push(`/hotel/${roomId}`);
  };

  const handleCancelClick = async (reservationId: string) => {
    try {
      await axios.delete(`/api/hotelReservation/${reservationId}`);
      toast.success("Successfully deleted");
      router.refresh();
    } catch (error) {
      toast.error("Failed to delete the reservation");
      console.error(error);
    }
  };

  const handleModalOpen = (reservationId: string) => {
    setMenuHidden(true);
    openHotelReviewModal(reservationId);
  };

  return (
    <>
      <div className="border-solid border-[1px] border-[#EEEEEE] rounded-md p-4 shadow-md flex gap-4">
        <div className="w-[70px] border-solid border-[1px] border-[#EEEEEE] rounded-md overflow-hidden">
          <Image src={imageUrl} alt="room" height={70} width={70} />
        </div>
        <div className="flex-1 flex flex-col justify-between">
          <h3 className="font-bold">{roomType}</h3>
          <span className="font-bold">{totalPrice} PLN</span>
          <p className="text-sm">{`from ${formatDate.start} to ${formatDate.end}`}</p>
          {isReservationPassed && <span className="text-sm">Finished</span>}
        </div>
        {!isReservationPassed ? (
          <div className="hidden sm:flex sm:flex-col sm:gap-2">
            <Button
              title="Edit reservation"
              style="bg-accent-light-green text-sm font-normal"
              onClick={() => goToReservationDetails(id)}
            />
            <Button
              title="Cancel reservation"
              style="bg-[#DDDDDD] text-sm font-normal"
              onClick={() => handleCancelClick(id)}
            />
          </div>
        ) : (
          <div className="hidden sm:flex sm:flex-col sm:gap-2 min-w-[160px]">
            <Button
              title={existingReview ? "Edit your review" : "Write a review"}
              style="bg-accent-light-green text-sm font-normal"
              onClick={() => handleModalOpen(id)}
            />
            <Button
              title="Reserve again"
              style="bg-accent-red text-sm font-normal"
              onClick={() => goToReservationPage(roomId)}
            />
          </div>
        )}
        <div className="sm:hidden relative">
          <div
            className="cursor-pointer"
            onClick={() => setMenuHidden(!menuHidden)}
          >
            <BsThreeDots />
          </div>
          <div
            className={`text-sm text-right absolute top-6 right-0 ${
              menuHidden ? "hidden" : ""
            } bg-white border-solid border-[1px] border-[#EEEEEE] rounded-lg px-4 py-2 whitespace-nowrap`}
          >
            {!isReservationPassed ? (
              <>
                <div
                  className="cursor-pointer mb-2"
                  onClick={() => goToReservationDetails(id)}
                >
                  Edit reservation
                </div>
                <div
                  className="cursor-pointer"
                  onClick={() => handleCancelClick(id)}
                >
                  Cancel reservation
                </div>
              </>
            ) : (
              <>
                <div
                  className="cursor-pointer mb-2"
                  onClick={() => handleModalOpen(id)}
                >
                  {existingReview ? "Edit your review" : "Write a review"}
                </div>
                <div
                  className="cursor-pointer"
                  onClick={() => goToReservationPage(roomId)}
                >
                  Reserve again
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ReservationItem;
