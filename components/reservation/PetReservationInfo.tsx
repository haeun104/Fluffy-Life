"use client";

import { HotelReservationData } from "@/types";
import Input from "../inputs/Input";
import { FieldValues, useForm } from "react-hook-form";
import { useState } from "react";
import Button from "../Button";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { schema } from "../inputs/PetInputs";

interface PetReservationInfoProps {
  reservation: HotelReservationData;
}

const PetReservationInfo: React.FC<PetReservationInfoProps> = ({
  reservation,
}) => {
  const [disabled, setDisabled] = useState(true);

  const { age, breed, remark } = reservation.pet;

  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FieldValues>({
    defaultValues: {
      name: reservation.petName,
      chipNumber: reservation.petChipNumber,
      breed: breed || "",
      age: age || null,
      remark: remark || "",
    },
    resolver: zodResolver(schema),
  });

  const updatePetInfo = async (data: FieldValues) => {
    try {
      const dataToUpdate = {
        ...data,
        name: reservation.petName,
        chipNumber: reservation.petChipNumber,
        userId: reservation.userId,
      };
      await axios.put(`/api/hotelReservation/${reservation.id}`, dataToUpdate);
      toast.success("Successfully updated!");
      router.refresh();
      setDisabled(true);
    } catch (error) {
      toast.error("Failed to update pet info");
      console.error(error);
    }
  };

  const handleCancelClick = () => {
    setDisabled(true);
    reset({
      name: reservation.petName,
      chipNumber: reservation.petChipNumber,
      breed: breed || "",
      age: age || null,
      remark: remark || "",
    });
  };

  return (
    <div className="flex flex-col">
      <h3 className="font-bold text-accent-light-green">Pet Information</h3>
      <div className="mt-4">
        <Input
          id="name"
          label="Name"
          register={register}
          errors={errors}
          disabled
        />
        <Input
          id="chipNumber"
          label="Chip Number"
          register={register}
          errors={errors}
          disabled
        />
        <Input
          id="breed"
          label="Breed"
          register={register}
          errors={errors}
          disabled={disabled}
        />
        <Input
          id="age"
          label="Age"
          register={register}
          errors={errors}
          disabled={disabled}
          type="number"
        />
        <Input
          id="remark"
          label="Remark"
          register={register}
          errors={errors}
          disabled={disabled}
        />
      </div>
      {disabled ? (
        <div className="flex mx-auto">
          <Button
            title="Edit"
            style="bg-accent-light-green flex-1 w-[200px]"
            onClick={() => setDisabled(false)}
            disabled={isSubmitting}
          />
        </div>
      ) : (
        <div className="flex gap-2 mx-auto">
          <Button
            title="Save"
            style="bg-main-teal flex-1 w-[150px]"
            onClick={handleSubmit(updatePetInfo)}
            disabled={isSubmitting}
          />
          <Button
            title="Cancel"
            onClick={handleCancelClick}
            style="bg-main-gray flex-1 w-[150px]"
            disabled={isSubmitting}
          />
        </div>
      )}
    </div>
  );
};

export default PetReservationInfo;
