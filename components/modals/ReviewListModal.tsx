"use client";

import useReviewListModal from "@/hooks/useReviewListModal";
import Modal from "./Modal";
import RoomReviewItem from "../hotel/RoomReviewItem";
import AverageRating from "../AverageRating";
import { useCallback, useEffect, useState } from "react";
import { RoomReview } from "@/types";
import getHotelReviews from "@/actions/getHotelReviews";
import InfiniteScroll from "react-infinite-scroll-component";

interface ReviewListModalProps {
  roomId: string;
  rating: number | undefined;
}

const ReviewListModal: React.FC<ReviewListModalProps> = ({
  roomId,
  rating,
}) => {
  const reviewListModal = useReviewListModal();
  const [reviews, setReviews] = useState<RoomReview[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [visibleCount, setVisibleCount] = useState(0);

  const fetchData = useCallback(async () => {
    try {
      const take = 2;
      const skip = visibleCount * take;
      console.log(`Fetching reviews: skip=${skip}, take=${take}`);
      const response = await getHotelReviews(roomId, false, skip, take);
      if (response && response.length > 0) {
        setReviews((prev) => [...prev, ...response]);
        setVisibleCount((prev) => prev + 1);
      } else {
        setHasMore(false);
      }
    } catch (error: any) {
      console.error(error);
      setHasMore(false);
    }
  }, [roomId, visibleCount]);

  useEffect(() => {
    if (reviewListModal.isOpen) {
      fetchData();
    }
  }, [reviewListModal]);

  const bodyContent = (
    <div>
      <h2 className="font-bold">Reviews</h2>
      <AverageRating rating={rating || 0} />
      <div
        className="flex flex-col w-full max-h-[350px] overflow-auto"
        id="modalScrollableDiv"
      >
        <InfiniteScroll
          dataLength={reviews.length}
          next={fetchData}
          hasMore={hasMore}
          loader={<p>Loading...</p>}
          scrollableTarget="modalScrollableDiv"
        >
          {reviews.map((review) => (
            <RoomReviewItem
              key={review.id}
              rating={review.rating}
              review={review.review}
              createdAt={review.createdAt}
              userName={review.user.name}
              modal={true}
            />
          ))}
        </InfiniteScroll>
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
