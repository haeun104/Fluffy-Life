import { HotelReview } from "@prisma/client";
import { useMemo } from "react";

interface RoomReviewProps {
  reviews: HotelReview[] | undefined;
}

const RoomReview: React.FC<RoomReviewProps> = ({ reviews }) => {
  const getAvgRating = useMemo(() => {
    if (reviews) {
      let sum = 0;
      reviews.forEach((review) => (sum += review.rating));
      if (reviews.length === 1 || sum === 0) {
        return sum;
      }
      return (sum / reviews.length).toFixed(2);
    }
    return null;
  }, [reviews]);

  return (
    <div>
      <h2 className="font-bold">Reviews </h2>
      {getAvgRating !== null && <span>{`${getAvgRating}/5`}</span>}
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

export default RoomReview;
