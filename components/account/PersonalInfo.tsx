"use client";

import { UserData } from "@/types";
import Input from "../inputs/Input";
import { FieldValues, useForm } from "react-hook-form";
import Button from "../Button";
import { MouseEvent, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

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

  const router = useRouter();

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

  // Update editable state for each input
  const updateInputStates = (id: string) => {
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

  // Update user info in DB
  const updateUserInfo = async (data: FieldValues) => {
    try {
      if (currentUser) {
        const dataToUpdate = { ...data, userId: currentUser.id };
        axios.post("/api/account", dataToUpdate);
        router.refresh();
        return;
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    }
  };

  // Implement user info update and change editable state
  const handleSaveClick = async (id: string) => {
    try {
      await handleSubmit(updateUserInfo)();
      updateInputStates(id);
    } catch (error) {
      toast.error("Failed to update user info");
      console.error(error);
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
              onClick={() => updateInputStates(item.id)}
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

export default PersonalInfo;
