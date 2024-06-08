"use client";

import { MdStarOutline } from "react-icons/md";

interface AverageRatingProps {
  rating: number;
}

const AverageRating: React.FC<AverageRatingProps> = ({
  rating: totalRating,
}) => {
  return (
    <div>
      <div className="text-sm">
        <span className="text-lg font-bold">{totalRating}</span> / 5
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
};

export default AverageRating;
