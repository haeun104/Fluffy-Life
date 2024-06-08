"use client";

import RoomReviewItem from "./RoomReviewItem";
import { RoomReview } from "@/types";
import AverageRating from "../AverageRating";
import { useCallback, useEffect, useState } from "react";
import getHotelReviews from "@/actions/getHotelReviews";
import useReviewListModal from "@/hooks/useReviewListModal";

export interface RoomReviewProps {
  roomId: string;
}

const RoomReviewList: React.FC<RoomReviewProps> = ({ roomId }) => {
  const [reviews, setReviews] = useState<RoomReview[]>([]);
  const reviewListModal = useReviewListModal();

  // fetch reviews for initial display
  const fetchReviews = useCallback(async () => {
    try {
      const take = 4;
      const skip = 0;
      const response = await getHotelReviews(roomId, false, skip, take);
      if (response && response.length > 0) {
        setReviews(response);
      } else {
      }
    } catch (error: any) {
      console.error(error);
    }
  }, [roomId]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  // Open modal for more reviews
  const handleClickMoreReviews = () => {
    reviewListModal.onOpen();
  };

  return (
    <>
      <div>
        <h2 className="font-bold text-lg">Reviews</h2>
        <AverageRating reviews={reviews} />
        <div
          className={`relative border-y-[1px] border-[#EEEEEE] mt-4 flex ${
            reviews.length === 0 && "justify-center items-center h-[200px]"
          }`}
        >
          {reviews.length === 0 ? (
            <div>Loading...</div>
          ) : reviews.length === 0 ? (
            <div>There is no review registered yet</div>
          ) : (
            <div className="w-full flex flex-col gap-4 md:flex-row md:flex-wrap md:gap-0 relative">
              {reviews.map((review, index) => {
                const { name } = review.user;
                return (
                  <RoomReviewItem
                    key={index}
                    rating={review.rating}
                    review={review.review}
                    createdAt={review.createdAt}
                    userName={name}
                  />
                );
              })}
              <div className="absolute inset-x-0 bottom-0 h-[250px] bg-gradient-to-t from-white to-transparent"></div>
            </div>
          )}
          <div className="absolute z-50 bottom-0 py-6 bg-white w-full text-center">
            <span className="cursor-pointer" onClick={handleClickMoreReviews}>
              Show more reviews
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default RoomReviewList;
