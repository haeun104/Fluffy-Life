"use client";

import useReservationModal from "@/hooks/useReservationModal";
import Modal from "./Modal";
import ReservationInputs from "../inputs/ReservationInputs";
import { Range } from "react-date-range";

interface ReservationModalProps {
  dataRange: Range;
  totalPrice: number;
  totalDays: number;
}

const ReservationModal: React.FC<ReservationModalProps> = ({
  dataRange,
  totalPrice,
  totalDays,
}) => {
  const reservationModal = useReservationModal();

  const bodyContent = (
    <>
      <div>
        <h2 className="font-bold mb-4">Reservation Summary</h2>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            <span>Check In</span>
            <span className="font-bold">
              {dataRange.startDate?.toLocaleDateString()}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Check Out</span>
            <span className="font-bold">
              {dataRange.endDate?.toLocaleDateString()}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Total Stay</span>
            <span className="font-bold">{totalDays} nights</span>
          </div>
          <div className="flex justify-between mb-4">
            <span>Total price</span>
            <span className="font-bold">Total {totalPrice} PLN</span>
          </div>
        </div>
      </div>
      <hr />
      <div>
        <h2 className="font-bold my-4">
          Confirm below information to finalize reservation
        </h2>
        <ReservationInputs />
      </div>
    </>
  );

  return (
    <Modal
      isOpen={reservationModal.isOpen}
      onClose={reservationModal.onClose}
      bodyContent={bodyContent}
      actionLabel="Confirm Reservation"
      style="bg-accent-red"
    />
  );
};

export default ReservationModal;
