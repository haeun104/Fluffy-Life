"use client";

import { HotelReview } from "@prisma/client";
import { useMemo } from "react";
import { MdStarOutline } from "react-icons/md";
import RoomReviewItem from "./RoomReviewItem";
import { UserData } from "@/types";

interface RoomReviewWithUser {
  id: string;
  userId: string;
  roomId: string;
  reservationId: string;
  rating: number;
  review: string;
  createdAt: Date;
  user: UserData;
}

interface RoomReviewProps {
  reviews: RoomReviewWithUser[] | undefined;
}

const RoomReviewList: React.FC<RoomReviewProps> = ({ reviews }) => {
  const getAvgRating = useMemo(() => {
    if (reviews) {
      let sum = 0;
      reviews.forEach((review) => (sum += review.rating));
      if (reviews.length === 1 || sum === 0) {
        return sum;
      }
      return sum / reviews.length;
    }
    return 0;
  }, [reviews]);

  return (
    <div>
      <h2 className="font-bold text-lg">Reviews </h2>
      <div>
        <div className="text-sm">
          <span className="text-lg font-bold">{getAvgRating.toFixed(2)}</span> /
          5
        </div>
        <div className="flex">
          {[...Array(5)].map((star, index) => {
            const rating = index + 1;
            return (
              <div key={index}>
                <MdStarOutline
                  size={18}
                  color={rating <= getAvgRating ? "#000000" : "#e4e5e9"}
                />
              </div>
            );
          })}
        </div>
      </div>
      <div
        className={`border-solid border-y-[1px] border-[#EEEEEE] mt-4 flex ${
          reviews?.length === 0 && "justify-center items-center h-[200px]"
        }`}
      >
        {reviews?.length === 0 ? (
          <div>There is no review registered yet</div>
        ) : (
          <div className="w-full flex flex-col md:flex-row">
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
  );
};

export default RoomReviewList;
