"use client";

import usePetRegisterModal from "@/hooks/usePetRegisterModal";
import Modal from "./Modal";
import Input from "../inputs/Input";
import { FieldValues, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import axios from "axios";
import { UserData } from "@/types";
import { useRouter } from "next/navigation";

interface PetRegisterModalProps {
  currentUser: UserData | null;
}

const PetRegisterModal: React.FC<PetRegisterModalProps> = ({ currentUser }) => {
  const petRegisterModal = usePetRegisterModal();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const router = useRouter();

  const bodyContent = (
    <div>
      <h2 className="font-bold mb-4">Enter below information about your pet</h2>
      <div>
        <Input
          id="name"
          label="Name"
          register={register}
          errors={errors}
          required
          disabled={isSubmitting}
        />
        <Input
          id="breed"
          label="Breed"
          register={register}
          errors={errors}
          disabled={isSubmitting}
        />
        <Input
          id="age"
          label="Age"
          register={register}
          type="number"
          errors={errors}
          disabled={isSubmitting}
        />
        <Input
          id="chipNumber"
          label="Chip Number"
          register={register}
          errors={errors}
          required
          disabled={isSubmitting}
        />
        <Input
          id="remark"
          label="Remark"
          register={register}
          errors={errors}
          disabled={isSubmitting}
        />
      </div>
    </div>
  );

  const registerPet = async (data: FieldValues) => {
    try {
      const dataToRegister = {
        ...data,
        age: parseInt(data.age),
        userId: currentUser?.id,
      };
      await axios.post("/api/pet", dataToRegister);
      toast.success("Successfully registered");
      petRegisterModal.onClose();
      reset();
      router.refresh();
    } catch (error) {
      toast.error("Failed to register a pet");
      console.error(error);
    }
  };

  return (
    <Modal
      isOpen={petRegisterModal.isOpen}
      onClose={petRegisterModal.onClose}
      bodyContent={bodyContent}
      actionLabel="register"
      style="bg-accent-light-green"
      onSubmit={handleSubmit(registerPet)}
    />
  );
};

export default PetRegisterModal;
