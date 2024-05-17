"use client";

import { HotelReservationData } from "@/types";
import Input from "../inputs/Input";
import { FieldValues, useForm } from "react-hook-form";
import { useState } from "react";
import Button from "../Button";

interface PetReservationInfoProps {
  reservation: HotelReservationData;
}

const PetReservationInfo: React.FC<PetReservationInfoProps> = ({
  reservation,
}) => {
  const [disabled, setDisabled] = useState(true);

  const { name, chipNumber, age, breed, remark } = reservation.pet;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FieldValues>({
    defaultValues: {
      name,
      breed,
      age,
      chipNumber,
      remark,
    },
  });

  return (
    <div className="flex flex-col">
      <h3 className="font-bold text-accent-light-green">Pet</h3>
      <div className="mt-4">
        <Input
          id="name"
          label="Name"
          register={register}
          errors={errors}
          required
          disabled={disabled}
        />
        <Input
          id="breed"
          label="Breed"
          register={register}
          errors={errors}
          required
          disabled={disabled}
        />
        <Input
          id="age"
          label="Age"
          register={register}
          errors={errors}
          required
          disabled={disabled}
        />
        <Input
          id="chipNumber"
          label="Chip Number"
          register={register}
          errors={errors}
          required
          disabled={disabled}
        />
        <Input
          id="remark"
          label="Remark"
          register={register}
          errors={errors}
          required
          disabled={disabled}
        />
      </div>
      {disabled ? (
        <Button
          title="Edit"
          style="bg-accent-light-green"
          onClick={() => setDisabled(false)}
        />
      ) : (
        <div className="flex gap-2">
          <Button title="Save" style="bg-main-teal flex-1" />
          <Button
            title="Cancel"
            onClick={() => setDisabled(true)}
            style="bg-main-gray flex-1"
          />
        </div>
      )}
    </div>
  );
};

export default PetReservationInfo;
