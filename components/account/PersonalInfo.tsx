"use client";

import { UserData } from "@/types";
import Input from "../inputs/Input";
import { FieldValues, useForm } from "react-hook-form";
import Button from "../Button";
import { MouseEvent, useState } from "react";

interface PersonalInfoProps {
  currentUser: UserData | null;
}

interface initialInputStatesType {
  order: number;
  id: string;
  label: string;
  btnLabel: string;
  editDisable: boolean;
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
    id: "email",
    label: "Email",
    btnLabel: "Edit",
    editDisable: true,
  },
  {
    order: 3,
    id: "street",
    label: "Street",
    btnLabel: "Edit",
    editDisable: true,
  },
  {
    order: 4,
    id: "city",
    label: "City",
    btnLabel: "Edit",
    editDisable: true,
  },
  {
    order: 5,
    id: "postalCode",
    label: "Postal code",
    btnLabel: "Edit",
    editDisable: true,
  },
  {
    order: 6,
    id: "mobile",
    label: "Mobile",
    btnLabel: "Edit",
    editDisable: true,
  },
];

const PersonalInfo: React.FC<PersonalInfoProps> = ({ currentUser }) => {
  const [inputStates, setInputStates] =
    useState<initialInputStatesType[]>(initialInputStates);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: currentUser?.name,
      email: currentUser?.email,
      street: currentUser?.street,
      city: currentUser?.city,
      postalCode: currentUser?.postalCode,
      mobile: currentUser?.mobile,
    },
  });

  const updateInputStates = (e: MouseEvent<HTMLButtonElement>, id: string) => {
    const selectedInput = inputStates.find((state) => state.id === id);
    if (selectedInput) {
      const updatedInput = {
        ...selectedInput,
        btnLabel: selectedInput.btnLabel === "Edit" ? "Cancel" : "Edit",
        editDisable: !selectedInput.editDisable,
      };
      const filteredInputs = inputStates.filter((state) => state.id !== id);
      const newInputStates = [...filteredInputs, updatedInput];

      newInputStates.sort((a, b) => {
        if (a.order && b.order) {
          return a.order - b.order;
        }
        return 0;
      });
      setInputStates(newInputStates);
    }
  };

  return (
    <div className="mt-5">
      <h3 className="font-bold text-lg text-accent-light-green">
        Personal Information
      </h3>
      <div className="mt-2 max-w-[600px] flex flex-col gap-4">
        {inputStates.map((item, index) => (
          <div
            key={index}
            className="relative border-b-[1px] border-solid border-[#EEEEEE]"
          >
            <Input
              id={item.id}
              label={item.label}
              register={register}
              errors={errors}
              disabled={item.editDisable}
            />
            <button
              type="button"
              onClick={(e) => updateInputStates(e, item.id)}
              className="underline absolute top-0 right-0"
            >
              {item.btnLabel}
            </button>
            {!item.editDisable && (
              <Button title="Save" style="mb-4 bg-accent-light-green" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PersonalInfo;
