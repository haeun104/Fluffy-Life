"use client";

import useLoginModal from "@/hooks/useLoginModal";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";

const LoginModal = () => {
  const loginModal = useLoginModal();

  const {
    register,
    reset,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm();

  const bodyContent = (
    <div>
      <Heading title="Welcome back" subTitle="Login to your account!" />
      <Input
        id="email"
        type="email"
        label="Email"
        register={register}
        errors={errors}
      />
      <Input
        id="password"
        type="password"
        label="Password"
        register={register}
        errors={errors}
      />
      <div className="border-solid border-neutral-500 border-[2px] rounded-md px-4 py-[10px] text-center flex items-center cursor-pointer mt-6">
        <FcGoogle size={20} />
        <div className="flex-1">Continue with Google</div>
      </div>
    </div>
  );

  return (
    <Modal
      isOpen={loginModal.isOpen}
      onClose={loginModal.onClose}
      actionLabel="Login"
      bodyContent={bodyContent}
      style="bg-accent-light-green"
      disabled={isSubmitting}
    />
  );
};

export default LoginModal;
