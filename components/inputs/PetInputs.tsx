"use client";

import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import Input from "./Input";
import Button from "../Button";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";
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
    id: "chipNumber",
    label: "Chip Number",
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
    id: "remark",
    label: "Remark",
    btnLabel: "Edit",
    editDisable: true,
  },
];

export const schema = z.object({
  breed: z.string(),
  age: z.preprocess((val) => {
    if (typeof val === "string" && val.trim() !== "") {
      return parseInt(val, 10);
    }
    return val;
  }, z.number()),
  remark: z.string(),
});

const PetInputs: React.FC<PetInputsProps> = ({
  id,
  name,
  breed,
  age,
  chipNumber,
  remark,
  number,
}) => {
  const [inputStates, setInputStates] =
    useState<initialInputStatesType[]>(initialInputStates);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
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
    // reset({
    //   name,
    //   breed,
    //   age,
    //   chipNumber,
    //   remark,
    // });
  };

  // Update pet info in DB
  const updatePetInfo = async (data: FieldValues) => {
    try {
      await axios.put(`/api/pet/${id}`, data);
      toast.success("Successfully updated");
      router.refresh();
      updateEditableState(id);
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    }
  };

  // Implement user info update and change editable state
  const handleSaveClick = async (id: string) => {
    try {
      await handleSubmit(updatePetInfo)();
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
            />
            {item.id !== "name" && item.id !== "chipNumber" && (
              <button
                type="button"
                onClick={() => updateEditableState(item.id)}
                className="underline absolute top-0 right-0"
                disabled={isSubmitting}
              >
                {item.btnLabel}
              </button>
            )}
            {!item.editDisable && (
              <Button
                title="Save"
                style="mb-4 bg-accent-light-green"
                onClick={() => handleSaveClick(item.id)}
                disabled={isSubmitting}
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
