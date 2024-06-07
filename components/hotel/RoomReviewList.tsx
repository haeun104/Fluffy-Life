"use client";

import RoomReviewItem from "./RoomReviewItem";
import ReviewListModal from "../modals/ReviewListModal";
import { RoomReview } from "@/types";
import AverageRating from "../AverageRating";
import { useCallback, useEffect, useState } from "react";
import getHotelReviews from "@/actions/getHotelReviews";
import InfiniteScroll from "react-infinite-scroll-component";

export interface RoomReviewProps {
  roomId: string;
}

const RoomReviewList: React.FC<RoomReviewProps> = ({ roomId }) => {
  const [reviews, setReviews] = useState<RoomReview[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [visibleCount, setVisibleCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const take = 2;
      const skip = visibleCount * take;
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
    } finally {
      setIsLoading(false);
    }
  }, [roomId, visibleCount]);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div>
        <h2 className="font-bold text-lg">Reviews</h2>
        <AverageRating reviews={reviews} />
        <div
          className={`border-solid border-y-[1px] border-[#EEEEEE] mt-4 flex ${
            reviews.length === 0 && "justify-center items-center h-[200px]"
          }`}
        >
          {isLoading && reviews.length === 0 ? (
            <div>Loading...</div>
          ) : reviews.length === 0 ? (
            <div>There is no review registered yet</div>
          ) : (
            <div className="w-full">
              <InfiniteScroll
                dataLength={reviews.length}
                next={fetchData}
                hasMore={hasMore}
                loader={<p>Loading...</p>}
                className="flex flex-col gap-4 md:flex-row md:flex-wrap md:gap-0"
              >
                {reviews.map((review, index) => {
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
              </InfiniteScroll>
            </div>
          )}
        </div>
      </div>
      <ReviewListModal />
    </>
  );
};

export default RoomReviewList;
