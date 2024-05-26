"use client";

import usePetRegisterModal from "@/hooks/usePetRegisterModal";
import Modal from "./Modal";
import Input from "../inputs/Input";
import { FieldValues, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import axios from "axios";
import { UserData } from "@/types";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface PetRegisterModalProps {
  currentUser: UserData | null;
}

const PetRegisterModal: React.FC<PetRegisterModalProps> = ({ currentUser }) => {
  const petRegisterModal = usePetRegisterModal();

  const schema = z.object({
    name: z.string().min(1, { message: "Name must be input" }),
    chipNumber: z.string().min(1, { message: "Chip number must be input" }),
    breed: z.string(),
    age: z.preprocess((val) => {
      if (typeof val === "string" && val.trim() !== "") {
        return parseInt(val, 10);
      }
      if (val === "") {
        return null;
      }
      return val;
    }, z.number().nullable()),
    remark: z.string(),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      chipNumber: "",
      breed: "",
      age: "",
      remark: "",
    },
    resolver: zodResolver(schema),
  });

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
          disabled={isSubmitting}
        />
        <Input
          id="chipNumber"
          label="Chip Number"
          register={register}
          errors={errors}
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
          errors={errors}
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
    } catch (error: any) {
      if (error.response) {
        if (error.response.status === 400) {
          toast.error("Pet already exists");
        }
      } else {
        toast.error("Failed to register a pet");
        console.error(error);
      }
    }
  };

  const handleCloseClick = () => {
    petRegisterModal.onClose();
    reset();
  };

  return (
    <Modal
      isOpen={petRegisterModal.isOpen}
      onClose={handleCloseClick}
      bodyContent={bodyContent}
      actionLabel="register"
      style="bg-accent-light-green"
      onSubmit={handleSubmit(registerPet)}
      disabled={isSubmitting}
    />
  );
};

export default PetRegisterModal;
