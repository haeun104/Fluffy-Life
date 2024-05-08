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

interface PetInputsProps {
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
        };
        // console.log(dataToUpdate);
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

  return (
    <div className="mt-5">
      <h3 className="mb-2 font-bold">Pet {number + 1}</h3>
      <div className="mt-2 max-w-[600px] flex flex-col gap-4">
        {inputStates.map((item, index) => (
          <div
            key={index}
            className="relative border-b-[1px] border-solid border-[#EEEEEE]"
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
      </div>
    </div>
  );
};

export default PetInputs;
