import Input from "../inputs/Input";
import {
  FieldError,
  FieldErrors,
  FieldValues,
  UseFormRegister,
} from "react-hook-form";
import { getFormattedDate } from "@/util";

interface RoomSearchInputsProps {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  isSubmitting: boolean;
}

const RoomSearchInputs: React.FC<RoomSearchInputsProps> = ({
  register,
  errors,
  isSubmitting,
}) => {
  return (
    <>
      <Input
        id="startDate"
        label="Check-in"
        type="date"
        register={register}
        required
        errors={errors}
        disabled={isSubmitting}
        min={getFormattedDate(new Date())}
      />
      <Input
        id="endDate"
        label="Check-out"
        type="date"
        register={register}
        required
        errors={errors}
        disabled={isSubmitting}
        min={getFormattedDate(new Date())}
      />
      <div className="w-full flex flex-col mb-4">
        <label htmlFor="roomType" className="mb-2 text-sm">
          Room type
        </label>
        <select
          className={`border-solid ${
            errors["roomType"] ? "border-accent-red " : "border-neutral-300"
          } border-[1px] rounded-md outline-none p-2 disabled:border-none disabled:bg-white disabled:px-0 disabled:text-gray-500 h-[44px]`}
          id="roomType"
          {...register("roomType", { required: true })}
        >
          <option value="all">All</option>
          <option value="suite">Suite</option>
          <option value="standard">Standard</option>
          <option value="suite-package">Suite Package</option>
          <option value="standard-package">Standard Package</option>
        </select>
        {errors["roomType"] && (
          <span className="text-accent-red text-sm">
            {(errors["roomType"] as FieldError).message}
          </span>
        )}
      </div>
    </>
  );
};

export default RoomSearchInputs;
