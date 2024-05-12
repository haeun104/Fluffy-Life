"use client";

import useHotelReviewModal from "@/hooks/useHotelReviewModal";
import Modal from "./Modal";
import Image from "next/image";
import { MdStarOutline } from "react-icons/md";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { HotelReview } from "@prisma/client";

interface HotelReviewModalProps {
  roomId: string;
  imageUrl: string;
  roomType: string;
  startDate: string;
  endDate: string;
  reservationId: string;
  currentUser: string;
  review: HotelReview | null;
}

const HotelReviewModal: React.FC<HotelReviewModalProps> = ({
  roomId,
  imageUrl,
  roomType,
  startDate,
  endDate,
  reservationId,
  currentUser,
  review,
}) => {
  const hotelReviewModal = useHotelReviewModal();
  const [rating, setRating] = useState<number | null>(null);
  const [hover, setHover] = useState<number | null>(null);
  const [feedback, setFeedback] = useState("");
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    if (review !== null) {
      setRating(review.rating);
      setFeedback(review.review);
    }
  }, [review]);

  const bodyContent = (
    <>
      <h2 className="font-bold mb-4">Share your feedback with us!</h2>
      <div className="flex flex-col gap-4">
        <div className="flex gap-2">
          <div className="w-[70px] border-solid border-[1px] border-[#EEEEEE] rounded-md overflow-hidden">
            <Image src={imageUrl} alt={roomType} height={70} width={70} />
          </div>
          <div className="flex-1 flex flex-col justify-between">
            <h3 className="">{roomType}</h3>
            <p className="text-sm">{`from ${startDate} to ${endDate}`}</p>
          </div>
        </div>
        <div>
          <h3 className="font-bold">Rating</h3>
          <div className="flex">
            {[...Array(5)].map((star, index) => {
              const currentRating = index + 1;
              return (
                <label className="flex" key={index}>
                  <input
                    type="radio"
                    className="hidden"
                    value={currentRating}
                    onClick={() => setRating(currentRating)}
                  />
                  <MdStarOutline
                    size={20}
                    className="hover:cursor-pointer"
                    color={
                      currentRating <= ((hover !== null ? hover : rating) ?? 0)
                        ? "#ffc109"
                        : "#e4e5e9"
                    }
                    onMouseEnter={() => setHover(currentRating)}
                    onMouseLeave={() => setHover(null)}
                  />
                </label>
              );
            })}
            {rating && <p className="ml-4">Your rating is {rating}</p>}
          </div>
        </div>
        <div>
          <label htmlFor="review">
            <textarea
              name="review"
              id="review"
              className="w-full h-[150px] outline-none border-solid border-[1px] border-[#EEEEEE] rounded-md p-2"
              placeholder="Write your feedback here"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            ></textarea>
          </label>
          {error !== null && <p className="text-accent-red text-sm">{error}</p>}
        </div>
      </div>
    </>
  );

  const handleCloseClick = () => {
    hotelReviewModal.onClose();
    setRating(null);
    setFeedback("");
  };

  const handleSubmit = async (rating: number | null, review: string) => {
    try {
      setError(null);
      if (rating === null || review === "") {
        setError("Rating and feedback must be input");
        return;
      }

      const data = {
        userId: currentUser,
        roomId,
        reservationId,
        rating,
        review,
      };

      await axios.post("/api/review", data);
      toast.success("Successfully registered");
      hotelReviewModal.onClose();
      router.refresh();
    } catch (error) {
      toast.error("Failed to register a review");
      console.error(error);
    }
  };

  return (
    <Modal
      isOpen={hotelReviewModal.isOpen}
      onClose={handleCloseClick}
      actionLabel={review !== null ? "Update" : "Submit"}
      bodyContent={bodyContent}
      style="bg-accent-light-green"
      onSubmit={() => handleSubmit(rating, feedback)}
    />
  );
};

export default HotelReviewModal;
