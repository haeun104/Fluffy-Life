"use client";

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import Input from "../inputs/Input";
import { ChangeEvent } from "react";

interface ReservationInputsProps {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  updateProfile: (value: boolean) => void;
}

const ReservationInputs: React.FC<ReservationInputsProps> = ({
  register,
  errors,
  updateProfile,
}) => {
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    updateProfile(e.target.checked);
  };

  return (
    <div className="flex flex-col">
      <Input
        id="name"
        register={register}
        errors={errors}
        label="Pet Name"
        required
      />
      <Input
        id="chipNumber"
        register={register}
        errors={errors}
        label="Pet's Chip Number"
        required
      />
      <Input
        id="mobile"
        register={register}
        errors={errors}
        label="Mobile"
        required
      />
      <div>
        <label className="cursor-pointer">
          <input type="checkbox" onChange={handleOnChange} />
          <span className="ml-2">Save to My Account</span>
        </label>
      </div>
    </div>
  );
};

export default ReservationInputs;
