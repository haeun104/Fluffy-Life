import useRoomSearchModal from "@/hooks/useRoomSearchModal";
import Modal from "./Modal";
import RoomSearchInputs from "../inputs/RoomSearchInputs";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const RoomSearchModal = () => {
  const roomSearchModal = useRoomSearchModal();

  const schema = z
    .object({
      startDate: z.string(),
      endDate: z.string(),
      roomType: z.string(),
    })
    .refine(
      (data) => {
        return (
          (data.startDate !== "" && data.endDate !== "") ||
          (data.startDate === "" && data.endDate === "")
        );
      },
      {
        message: "Both of check in and out dates need to be input",
        path: ["startDate", "endDate"],
      }
    );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FieldValues>({
    defaultValues: {
      startDate: "",
      endDate: "",
      roomType: "all",
    },
    resolver: zodResolver(schema),
  });

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
