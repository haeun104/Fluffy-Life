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
    <div>
      <div className="font-bold">{userName}</div>
      <div>
        <span>{rating}</span>
      </div>
      <p>{review}</p>
    </div>
  );
};

export default RoomReviewItem;
