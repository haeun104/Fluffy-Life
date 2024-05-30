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
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

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

  const schema = z.object({
    petName: z.string().min(1, { message: "Name must be input" }),
    chipNumber: z.string().min(1, { message: "Chip number must be input" }),
    mobile: z.union([
      z.string().length(9, { message: "Enter 9 digits" }),
      z.number().min(100000000).max(999999999),
    ]),
  });

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });

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
            <span className="font-bold">{totalPrice} PLN</span>
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

  const createReservation: SubmitHandler<FieldValues> = async (data) => {
    const { chipNumber, mobile, petName } = data;

    if (currentUser !== null) {
      try {
        const petResponse = await axios.get(`/api/pet/${chipNumber}`);
        const petExists = petResponse.data;

        await axios.post("/api/hotelReservation", {
          userId: currentUser.id,
          roomId: selectedRoom.id,
          petName: petName,
          petChipNumber: chipNumber,
          startDate: dataRange.startDate,
          endDate: dataRange.endDate,
          totalPrice,
        });

        if (profileUpdate) {
          await axios.put(`/api/account/${currentUser.id}`, {
            mobile: mobile,
          });

          if (!petExists) {
            await axios.post("/api/pet", {
              name: petName,
              chipNumber: chipNumber,
              userId: currentUser.id,
            });
          }
        }

        toast.success("Successfully reserved!");
        router.push("/");
        reservationModal.onClose();
      } catch (error) {
        toast.error("Something went wrong");
        console.error(error);
      }
    }
  };

  const handleCloseClick = () => {
    reservationModal.onClose();
    reset();
  };

  return (
    <Modal
      isOpen={reservationModal.isOpen}
      onClose={handleCloseClick}
      bodyContent={bodyContent}
      actionLabel="Confirm Reservation"
      style="bg-accent-red"
      onSubmit={handleSubmit(createReservation)}
      disabled={isSubmitting}
    />
  );
};

export default ReservationModal;
