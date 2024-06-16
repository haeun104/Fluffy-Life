"use client";

import useRoomSearchModal from "@/hooks/useRoomSearchModal";
import Modal from "./Modal";
import RoomSearchInputs from "../inputs/RoomSearchInputs";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "../hotel/RoomSearchBar";
import { useEffect } from "react";

interface RoomSearchModalProps {
  searchAvailableRoom: (data: FieldValues) => void;
}

const RoomSearchModal: React.FC<RoomSearchModalProps> = ({
  searchAvailableRoom,
}) => {
  const roomSearchModal = useRoomSearchModal();

  const {
    register,
    handleSubmit,
    clearErrors,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FieldValues>({
    defaultValues: {
      startDate: "",
      endDate: "",
      roomType: "All",
    },
    resolver: zodResolver(schema),
  });

  // Watch changes on input values
  const startDateWatch = watch("startDate");
  const endDateWatch = watch("endDate");
  const roomTypeWatch = watch("roomType");

  // Reset error messages whenever input values are changed
  useEffect(() => {
    clearErrors();
  }, [startDateWatch, endDateWatch, roomTypeWatch, clearErrors]);

  const bodyContent = (
    <div>
      <h2 className="font-bold mb-4">Quick Availability Check</h2>
      <div>
        <RoomSearchInputs
          register={register}
          errors={errors}
          isSubmitting={isSubmitting}
        />
      </div>
    </div>
  );

  const checkAvailableRoom = (data: FieldValues) => {
    searchAvailableRoom(data);
    reset();
    roomSearchModal.onClose();
  };

  return (
    <Modal
      isOpen={roomSearchModal.isOpen}
      onClose={roomSearchModal.onClose}
      actionLabel="Search"
      bodyContent={bodyContent}
      style="bg-accent-light-green"
      onSubmit={handleSubmit(checkAvailableRoom)}
    />
  );
};

export default RoomSearchModal;
