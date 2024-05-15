"use client";

import { RoomReview } from "@/types";
import { useEffect, useState } from "react";
import { MdStarOutline } from "react-icons/md";

interface AverageRatingProps {
  reviews: RoomReview[] | undefined;
}

const AverageRating: React.FC<AverageRatingProps> = ({ reviews }) => {
  const [totalRating, setRating] = useState<number>();

  useEffect(() => {
    if (reviews) {
      const getAvgRating = (reviewList: RoomReview[]) => {
        let sum = 0;
        reviewList.forEach((item) => (sum += item.rating));
        if (reviewList.length === 1 || sum === 0) {
          return sum;
        }
        return sum / reviewList.length;
      };
      setRating(getAvgRating(reviews));
    }
  }, [reviews]);

  if (reviews && totalRating) {
    return (
      <div>
        <div className="text-sm">
          <span className="text-lg font-bold">{totalRating.toFixed(2)}</span> /
          5
        </div>
        <div className="flex">
          {[...Array(5)].map((star, index) => {
            const rating = index + 1;
            return (
              <div key={index}>
                <MdStarOutline
                  size={18}
                  color={rating <= totalRating ? "#000000" : "#e4e5e9"}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
};

export default AverageRating;