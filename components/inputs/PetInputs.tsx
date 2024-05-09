"use client";

import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import Input from "./Input";
import Button from "../Button";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";
import { UserData } from "@/types";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { IoMdCloseCircle } from "react-icons/io";

interface PetInputsProps {
  id: string;
  name: string;
  breed: string | null;
  age: number | null;
  chipNumber: string;
  remark: string | null;
  number: number;
  currentUser: UserData | null;
}

interface initialInputStatesType {
  id: string;
  label: string;
  btnLabel: string;
  editDisable: boolean;
}

const initialInputStates = [
  {
    id: "name",
    label: "Name",
    btnLabel: "Edit",
    editDisable: true,
  },
  {
    id: "breed",
    label: "Breed",
    btnLabel: "Edit",
    editDisable: true,
  },
  {
    id: "age",
    label: "Age",
    btnLabel: "Edit",
    editDisable: true,
  },
  {
    id: "chipNumber",
    label: "Chip Number",
    btnLabel: "Edit",
    editDisable: true,
  },
  {
    id: "remark",
    label: "Remark",
    btnLabel: "Edit",
    editDisable: true,
  },
];

const PetInputs: React.FC<PetInputsProps> = ({
  id,
  name,
  breed,
  age,
  chipNumber,
  remark,
  number,
  currentUser,
}) => {
  const [inputStates, setInputStates] =
    useState<initialInputStatesType[]>(initialInputStates);

  const router = useRouter();

  const schema = z.object({
    name: z.string().min(1, { message: "Name must be input" }),
    breed: z.string().nullable(),
    age: z.number().nullable(),
    chipNumber: z.string().min(1, { message: "Name must be input" }),
    remark: z.string().nullable(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name,
      breed,
      age,
      chipNumber,
      remark,
    },
    resolver: zodResolver(schema),
  });

  //Toggle editable state for a selected input
  const updateEditableState = (id: string) => {
    const updatedInputs = inputStates.map((state) => {
      if (state.id === id) {
        return {
          ...state,
          btnLabel: state.btnLabel === "Edit" ? "Cancel" : "Edit",
          editDisable: !state.editDisable,
        };
      }
      return state;
    });
    setInputStates(updatedInputs);
  };

  // Update pet info in DB
  const updatePetInfo = async (data: FieldValues) => {
    if (currentUser) {
      try {
        const dataToUpdate = {
          ...data,
          age: parseFloat(data.age),
          userId: currentUser.id,
          id: id,
        };
        axios.post("/api/pet", dataToUpdate);
        router.refresh();
      } catch (error) {
        toast.error("Something went wrong");
        console.error(error);
      }
    }
  };

  // Implement user info update and change editable state
  const handleSaveClick = async (id: string) => {
    try {
      await handleSubmit(updatePetInfo)();
      updateEditableState(id);
    } catch (error) {
      toast.error("Failed to update pet info");
      console.error(error);
    }
  };

  // Delete a selected pet in DB
  const deletePet = async (petId: string) => {
    try {
      await axios.delete(`/api/pet/${petId}`);
      router.refresh();
      toast.success("Successfully deleted");
    } catch (error) {
      toast.error("Failed to delete a pet");
      console.error(error);
    }
  };

  return (
    <div className="my-8">
      <h3 className="mb-4 font-bold">Pet {number + 1}</h3>
      <div className="mt-2 max-w-[600px] flex flex-col gap-4 relative">
        {inputStates.map((item, index) => (
          <div
            key={index}
            className="relative border-b-[1px] border-solid border-[#EEEEEE] mt-4"
          >
            <Input
              register={register}
              id={item.id}
              label={item.label}
              errors={errors}
              disabled={item.editDisable}
              type={item.id === "age" ? "number" : "text"}
            />
            <button
              type="button"
              onClick={() => updateEditableState(item.id)}
              className="underline absolute top-0 right-0"
            >
              {item.btnLabel}
            </button>
            {!item.editDisable && (
              <Button
                title="Save"
                style="mb-4 bg-accent-light-green"
                onClick={() => handleSaveClick(item.id)}
              />
            )}
          </div>
        ))}
        <div
          className="mt-2 absolute -top-10 right-0 cursor-pointer"
          onClick={() => deletePet(id)}
        >
          <IoMdCloseCircle size={24} />
        </div>
      </div>
    </div>
  );
};

export default PetInputs;
