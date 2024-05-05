"use client";

import { useForm } from "react-hook-form";
import Input from "../inputs/Input";

const ReservationInputs = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  return (
    <div className="flex flex-col">
      <Input
        id="petName"
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
          <input type="checkbox" />
          <span className="ml-2">Save to My Profile</span>
        </label>
      </div>
    </div>
  );
};

export default ReservationInputs;
