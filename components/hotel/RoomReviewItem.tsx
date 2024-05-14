import { IoMdStar } from "react-icons/io";

interface RoomReviewItemProps {
  rating: number;
  review: string;
  createdAt: Date;
  userName: string;
}

const RoomReviewItem: React.FC<RoomReviewItemProps> = ({
  rating,
  review,
  createdAt,
  userName,
}) => {
  return (
    <div className="md:w-1/2 py-4">
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
      <p className="mt-2">{review}</p>
    </div>
  );
};

export default RoomReviewItem;
