"use client";

import useHotelReviewModal from "@/hooks/useHotelReviewModal";
import Modal from "./Modal";

const HotelReviewModal = () => {
  const hotelReviewModal = useHotelReviewModal();

  const bodyContent = (
    <div>
      <h2>Share your opinion with us</h2>
    </div>
  );

  return (
    <Modal
      isOpen={hotelReviewModal.isOpen}
      onClose={hotelReviewModal.onClose}
      actionLabel="Submit"
      bodyContent={bodyContent}
      style="bg-accent-light-green"
    />
  );
};

export default HotelReviewModal;
