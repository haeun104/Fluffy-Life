"use client";

import useSignUpModal from "@/hooks/useSignUpModal";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";

const SignUpModal = () => {
  const signUpModal = useSignUpModal();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm();

  const bodyContent = (
    <div>
      <Heading
        title="Welcome to Fluffy Life"
        subTitle="Create an account now!"
      />
      <Input
        id="email"
        type="email"
        label="Email"
        register={register}
        required
      />
      <Input id="firstName" label="First Name" register={register} required />
      <Input id="lastName" label="Last Name" register={register} required />
      <Input
        id="password"
        type="password"
        label="Password"
        register={register}
        required
      />
      <div className="border-solid border-neutral-500 border-[2px] rounded-md px-4 py-[10px] text-center flex items-center cursor-pointer mt-6">
        <FcGoogle size={20} />
        <div className="flex-1">Continue with Google</div>
      </div>
    </div>
  );

  const createAccount = () => {
    return;
  };

  return (
    <Modal
      isOpen={signUpModal.isOpen}
      onClose={signUpModal.onClose}
      actionLabel="Sign Up"
      bodyContent={bodyContent}
      disabled={isSubmitting}
      onSubmit={handleSubmit(createAccount)}
    />
  );
};

export default SignUpModal;
