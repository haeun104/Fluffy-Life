"use client";

import useLoginModal from "@/hooks/useLoginModal";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const LoginModal = () => {
  const loginModal = useLoginModal();
  const router = useRouter();

  const {
    register,
    reset,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

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
      <div
        className="border-solid border-neutral-500 border-[2px] rounded-md px-4 py-[10px] text-center flex items-center cursor-pointer mt-6"
        onClick={() => signIn("google")}
      >
        <FcGoogle size={20} />
        <div className="flex-1">Continue with Google</div>
      </div>
    </div>
  );

  // Check user data with DB and login
  const login: SubmitHandler<FieldValues> = (data) => {
    signIn("credentials", {
      ...data,
      redirect: false,
    }).then((response) => {
      if (response?.ok) {
        toast.success("Successfully logged in!");
        router.refresh();
        loginModal.onClose();
        reset();
      }

      if (response?.error) {
        toast.error(response.error);
        reset();
      }
    });
  };

  return (
    <Modal
      isOpen={loginModal.isOpen}
      onClose={loginModal.onClose}
      actionLabel="Login"
      bodyContent={bodyContent}
      style="bg-accent-light-green"
      disabled={isSubmitting}
      onSubmit={handleSubmit(login)}
    />
  );
};

export default LoginModal;
