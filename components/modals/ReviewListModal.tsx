"use client";

import useReviewListModal from "@/hooks/useReviewListModal";
import { RoomReviewProps } from "../hotel/RoomReviewList";
import Modal from "./Modal";
import RoomReviewItem from "../hotel/RoomReviewItem";
import AverageRating from "../AverageRating";
import { useEffect, useRef, useState } from "react";

const ReviewListModal: React.FC<RoomReviewProps> = ({ reviews }) => {
  const reviewListModal = useReviewListModal();

  const [visibleReviews, setVisibleReviews] = useState(2);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleObserver = (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && reviews) {
        setVisibleReviews((prev) => Math.min(prev + 1, reviews.length));
      }
    };

    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: "20px",
      threshold: 1.0,
    });

    const currentLoadMoreRef = loadMoreRef.current;
    if (currentLoadMoreRef) {
      observer.observe(currentLoadMoreRef);
    }

    return () => {
      if (currentLoadMoreRef) {
        observer.unobserve(currentLoadMoreRef);
      }
    };
  }, [reviews]);

  const bodyContent = (
    <div>
      <h2 className="font-bold">Reviews</h2>
      <AverageRating reviews={reviews} />
      <div className="flex flex-col w-full max-h-[350px] overflow-auto">
        {reviews?.slice(0, visibleReviews).map((review, index) => (
          <RoomReviewItem
            key={review.id}
            rating={review.rating}
            review={review.review}
            createdAt={review.createdAt}
            userName={review.user.name}
            modal={true}
          />
        ))}
        {reviews && visibleReviews < reviews.length && (
          <div
            ref={loadMoreRef}
            className="w-full h-10 flex justify-center items-center"
          >
            <span>Loading more reviews...</span>
          </div>
        )}
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
