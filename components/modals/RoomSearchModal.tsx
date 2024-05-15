import useRoomSearchModal from "@/hooks/useRoomSearchModal";
import Modal from "./Modal";
import Input from "../inputs/Input";
import { FieldError, FieldValues, useForm } from "react-hook-form";
import { getFormattedDate } from "@/util";

const RoomSearchModal = () => {
  const roomSearchModal = useRoomSearchModal();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const bodyContent = (
    <div>
      <h2 className="font-bold mb-4">Quick Availability Check</h2>
      <div>
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
          <label htmlFor="roomType" className="mb-2">
            Room type
          </label>
          <select
            className={`border-solid ${
              errors["roomType"] ? "border-accent-red " : "border-neutral-300"
            } border-[1px] rounded-md outline-none p-2 disabled:border-none disabled:bg-white disabled:px-0 disabled:text-gray-500`}
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
      </div>
    </div>
  );

  const searchAvailableRoom = (data: FieldValues) => {
    console.log(data);
  };

  return (
    <Modal
      isOpen={roomSearchModal.isOpen}
      onClose={roomSearchModal.onClose}
      actionLabel="Search"
      bodyContent={bodyContent}
      style="bg-accent-light-green"
      onSubmit={handleSubmit(searchAvailableRoom)}
    />
  );
};

export default RoomSearchModal;
