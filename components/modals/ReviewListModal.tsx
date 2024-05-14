import useReviewListModal from "@/hooks/useReviewListModal";
import { RoomReviewProps } from "../hotel/RoomReviewList";
import Modal from "./Modal";
import RoomReviewItem from "../hotel/RoomReviewItem";
import AverageRating from "../AverageRating";

const ReviewListModal: React.FC<RoomReviewProps> = ({ reviews }) => {
  const reviewListModal = useReviewListModal();

  const bodyContent = (
    <div className="">
      <h2 className="font-bold">Reviews</h2>
      <AverageRating reviews={reviews} />
      <div className="flex flex-col w-full">
        {reviews?.map((review) => (
          <RoomReviewItem
            key={review.id}
            rating={review.rating}
            review={review.review}
            createdAt={review.createdAt}
            userName={review.user.name}
            modal={true}
          />
        ))}
      </div>
    </div>
  );

  return (
    <Modal
      isOpen={reviewListModal.isOpen}
      onClose={reviewListModal.onClose}
      bodyContent={bodyContent}
    />
  );
};

export default ReviewListModal;
