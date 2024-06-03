import useReviewListModal from "@/hooks/useReviewListModal";
import { format } from "date-fns";
import { useMemo } from "react";
import { IoMdStar } from "react-icons/io";

interface RoomReviewItemProps {
  rating: number;
  review: string;
  createdAt: Date;
  userName: string;
  modal?: boolean;
}

const RoomReviewItem: React.FC<RoomReviewItemProps> = ({
  rating,
  review,
  createdAt,
  userName,
  modal,
}) => {
  const formattedDate = useMemo(() => {
    return format(createdAt, "MM/dd/yyyy");
  }, [createdAt]);

  const reviewListModal = useReviewListModal();

  return (
    <div className={`py-4 ${modal ? "w-full" : "md:w-1/2 md:pr-2"}`}>
      <div className="text-sm">{userName}</div>
      <div className="flex">
        {[...Array(5)].map((star, index) => {
          const userRating = index + 1;
          return (
            <IoMdStar
              key={index}
              size={12}
              color={userRating <= rating ? "#000000" : "#e4e5e9"}
            />
          );
        })}
      </div>
      <div className="text-xs mt-2">{formattedDate}</div>
      <div className="text-sm mt-2">
        <p className={`mb-2 ${modal ? "break-words" : "truncate"}`}>{review}</p>
        {review.length >= 70 && !modal && (
          <span
            className="border-b-[1px] border-black cursor-pointer"
            onClick={() => reviewListModal.onOpen()}
          >
            More
          </span>
        )}
      </div>
    </div>
  );
};

export default RoomReviewItem;
