"use client";

import { UserData } from "@/types";
import Input from "../inputs/Input";
import { FieldValues, useForm } from "react-hook-form";
import Button from "../Button";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

interface PersonalInfoProps {
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
    id: "email",
    label: "Email",
    btnLabel: "Edit",
    editDisable: true,
  },
  {
    id: "street",
    label: "Street",
    btnLabel: "Edit",
    editDisable: true,
  },
  {
    id: "city",
    label: "City",
    btnLabel: "Edit",
    editDisable: true,
  },
  {
    id: "postalCode",
    label: "Postal code",
    btnLabel: "Edit",
    editDisable: true,
  },
  {
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
    reset,
    formState: { errors, isSubmitting },
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
    reset({
      name: currentUser?.name,
      email: currentUser?.email,
      street: currentUser?.street,
      city: currentUser?.city,
      postalCode: currentUser?.postalCode,
      mobile: currentUser?.mobile,
    });
  };

  // Update user info in DB
  const updateUserInfo = async (data: FieldValues, inputId: string) => {
    try {
      if (currentUser) {
        await axios.put(`/api/account/${currentUser.id}`, data);
        toast.success("Successfully updated");
        router.refresh();
        const updatedInputs = inputStates.map((state) => {
          if (state.id === inputId) {
            return {
              ...state,
              btnLabel: "Edit",
              editDisable: true,
            };
          }
          return state;
        });
        setInputStates(updatedInputs);
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    }
  };

  // Implement user info update and change editable state
  const handleSaveClick = async (inputId: string) => {
    try {
      await handleSubmit(async (data) => updateUserInfo(data, inputId))();
    } catch (error) {
      toast.error("Failed to update user info");
      console.error(error);
    }
  };

  return (
    <div className="mt-8">
      <h3 className="font-bold text-lg text-accent-light-green">
        Personal Information
      </h3>
      <div className="mt-2 flex flex-col gap-4">
        {inputStates.map((item, index) => (
          <div
            key={index}
            className="relative border-b-[1px] border-solid border-[#EEEEEE] mt-4"
          >
            <Input
              id={item.id}
              label={item.label}
              register={register}
              errors={errors}
              disabled={item.editDisable}
            />
            {item.id !== "name" && item.id !== "email" && (
              <button
                type="button"
                onClick={() => updateEditableState(item.id)}
                className="underline absolute top-0 right-0"
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
      </div>
    </div>
  );
};

export default PersonalInfo;
