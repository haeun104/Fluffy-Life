"use client";

import { HotelReview } from "@prisma/client";
import { useMemo } from "react";
import { MdStarOutline } from "react-icons/md";

interface RoomReviewProps {
  reviews: HotelReview[] | undefined;
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
        className={`border-solid border-y-[1px] border-[#EEEEEE] h-[200px] mt-4 flex ${
          reviews?.length === 0 && "justify-center items-center"
        }`}
      >
        {reviews?.length === 0 ? (
          <div>There is no review registered yet</div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default RoomReviewList;
