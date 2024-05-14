"use client";

import RoomReviewItem from "./RoomReviewItem";
import ReviewListModal from "../modals/ReviewListModal";
import useReviewListModal from "@/hooks/useReviewListModal";
import { RoomReview } from "@/types";
import AverageRating from "../AverageRating";

export interface RoomReviewProps {
  reviews: RoomReview[] | undefined;
}

const RoomReviewList: React.FC<RoomReviewProps> = ({ reviews }) => {
  const reviewListModal = useReviewListModal();

  return (
    <>
      <div>
        <h2 className="font-bold text-lg">Reviews</h2>
        <AverageRating reviews={reviews} />
        <div
          className={`border-solid border-y-[1px] border-[#EEEEEE] mt-4 flex ${
            reviews?.length === 0 && "justify-center items-center h-[200px]"
          }`}
        >
          {reviews?.length === 0 ? (
            <div>There is no review registered yet</div>
          ) : (
            <div className="w-full flex flex-col md:flex-row gap-4">
              {reviews?.map((review, index) => {
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
            </div>
          )}
        </div>
      </div>
      <ReviewListModal reviews={reviews} />
    </>
  );
};

export default RoomReviewList;
