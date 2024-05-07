"use client";

import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import Input from "./Input";
import Button from "../Button";

interface PetInputsProps {
  name: string;
  breed: string | null;
  age: number | null;
  chipNumber: string;
  remark: string | null;
  number: number;
}

const initialInputStates = [
  {
    order: 1,
    id: "name",
    label: "Name",
    btnLabel: "Edit",
    editDisable: true,
  },
  {
    order: 2,
    id: "breed",
    label: "Breed",
    btnLabel: "Edit",
    editDisable: true,
  },
  {
    order: 3,
    id: "age",
    label: "Age",
    btnLabel: "Edit",
    editDisable: true,
  },
  {
    order: 4,
    id: "chipNumber",
    label: "Chip Number",
    btnLabel: "Edit",
    editDisable: true,
  },
  {
    order: 5,
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
}) => {
  const [inputStates, setInputStates] = useState(initialInputStates);

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
  });

  // Update user info in DB
  const updateUserInfo = async (data: FieldValues) => {};

  // Implement user info update and change editable state
  const handleSaveClick = async (id: string) => {};

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
            />
            <button
              type="button"
              onClick={() => {}}
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
