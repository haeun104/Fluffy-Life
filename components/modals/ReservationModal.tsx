"use client";

import useReservationModal from "@/hooks/useReservationModal";
import Modal from "./Modal";
import ReservationInputs from "../inputs/ReservationInputs";
import { Range } from "react-date-range";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { RoomData, UserData } from "@/types";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface ReservationModalProps {
  dataRange: Range;
  totalPrice: number;
  totalDays: number;
  currentUser: UserData | null;
  selectedRoom: RoomData;
}

const ReservationModal: React.FC<ReservationModalProps> = ({
  dataRange,
  totalPrice,
  totalDays,
  currentUser,
  selectedRoom,
}) => {
  const reservationModal = useReservationModal();
  const [profileUpdate, setProfileUpdate] = useState(false);

  const router = useRouter();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

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
        <ReservationInputs
          register={register}
          errors={errors}
          updateProfile={(value) => setProfileUpdate(value)}
        />
      </div>
    </>
  );

  const createReservation: SubmitHandler<FieldValues> = (data) => {
    const { name, chipNumber, mobile } = data;

    if (currentUser !== null) {
      axios
        .post("/api/hotelReservation", {
          userId: currentUser.id,
          roomId: selectedRoom.id,
          petChipNumber: chipNumber,
          startDate: dataRange.startDate,
          endDate: dataRange.endDate,
          totalPrice,
        })
        .then(() => {
          axios.patch("/api/profile", {
            mobile,
          });
        })
        .then(() => {
          axios.post("/api/pet", {
            name,
            chipNumber,
          });
        })
        .then(() => {
          toast.success("Successfully reserved!");
          router.push("/");
        })
        .catch((error) => {
          toast.error("Something went wrong");
          console.error(error);
        });
    }
  };

  return (
    <Modal
      isOpen={reservationModal.isOpen}
      onClose={reservationModal.onClose}
      bodyContent={bodyContent}
      actionLabel="Confirm Reservation"
      style="bg-accent-red"
      onSubmit={handleSubmit(createReservation)}
    />
  );
};

export default ReservationModal;
