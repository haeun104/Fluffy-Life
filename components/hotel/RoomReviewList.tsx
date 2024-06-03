"use client";

import RoomReviewItem from "./RoomReviewItem";
import ReviewListModal from "../modals/ReviewListModal";
import { RoomReview } from "@/types";
import AverageRating from "../AverageRating";
import { useEffect, useRef, useState } from "react";

export interface RoomReviewProps {
  reviews: RoomReview[] | undefined;
}

const RoomReviewList: React.FC<RoomReviewProps> = ({ reviews }) => {
  const [visibleReviews, setVisibleReviews] = useState(2);
  const loadMoreRef = useRef(null);

  useEffect(() => {
    const handleObserver = (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && reviews) {
        setVisibleReviews((prev) => Math.min(prev + 2, reviews.length));
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

  return (
    <>
      <div>
        <h2 className="font-bold text-lg">Reviews</h2>
        <AverageRating reviews={reviews} />
        <div
          className={`border-solid border-y-[1px] border-[#EEEEEE] mt-4 flex ${
            reviews?.length === 0 && "justify-center items-center h-[200px]"
          }`}
        >
          {reviews?.length === 0 ? (
            <div>There is no review registered yet</div>
          ) : (
            <div className="w-full flex flex-col gap-4 md:flex-row md:flex-wrap md:gap-0">
              {reviews?.slice(0, visibleReviews).map((review, index) => {
                const { name } = review.user;
                return (
                  <RoomReviewItem
                    key={index}
                    rating={review.rating}
                    review={review.review}
                    createdAt={review.createdAt}
                    userName={name}
                  />
                );
              })}
              {reviews && visibleReviews < reviews.length && (
                <div
                  ref={loadMoreRef}
                  className="w-full h-10 flex justify-center items-center"
                >
                  <span>Loading more reviews...</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <ReviewListModal reviews={reviews} />
    </>
  );
};

export default RoomReviewList;
