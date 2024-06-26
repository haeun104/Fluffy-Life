"use client";

import useSignUpModal from "@/hooks/useSignUpModal";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import { FcGoogle } from "react-icons/fc";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { ZodType, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { signIn } from "next-auth/react";
import useLoginModal from "@/hooks/useLoginModal";

const SignUpModal = () => {
  const signUpModal = useSignUpModal();
  const loginModal = useLoginModal();

  //Define schema for form validation
  const schema: ZodType<FieldValues> = z
    .object({
      email: z
        .string()
        .min(1, { message: "Email must be input" })
        .email("Invalid email"),
      name: z.string().min(1, { message: "Name must be input" }),
      password: z
        .string()
        .min(8, { message: "Password must contain min 7 characters" })
        .max(15, { message: "Password can contain max 12 characters" })
        .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*?])(?=.*[0-9]).{8,}$/, {
          message:
            "Password must contain at least one uppercase letter, one lowercase letter, one special character among !@#$%^&*?, one digit, and is at least 8 characters long",
        }),
      passwordCheck: z.string().min(1, { message: "Input password again" }),
    })
    .refine((data) => data.password === data.passwordCheck, {
      message: "Passwords do not match",
      path: ["passwordCheck"], // where error message occurs when validation failed
    });

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      name: "",
      password: "",
      passwordCheck: "",
    },
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (!signUpModal.isOpen) {
      reset();
    }
  }, [signUpModal.isOpen, reset]);

  // Create a new user in DB
  const createUser: SubmitHandler<FieldValues> = (data) => {
    const { passwordCheck, ...userData } = data;

    axios
      .post("/api/signup", userData)
      .then(() => {
        toast.success("Successfully registered!");
        signUpModal.onClose();
        reset();
        loginModal.onOpen();
      })
      .catch((error) => {
        const errorMsg = error.response.data.error || "Something went wrong";
        toast.error(errorMsg);
        console.error(error);
      });
  };

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
        errors={errors}
      />
      <Input
        id="name"
        label="Name"
        register={register}
        required
        errors={errors}
      />
      <Input
        id="password"
        type="password"
        label="Password"
        register={register}
        required
        errors={errors}
      />
      <Input
        id="passwordCheck"
        type="password"
        label="Confirm Password"
        register={register}
        required
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

  return (
    <Modal
      isOpen={signUpModal.isOpen}
      onClose={signUpModal.onClose}
      actionLabel="Sign Up"
      bodyContent={bodyContent}
      disabled={isSubmitting}
      onSubmit={handleSubmit(createUser)}
      style="bg-accent-red"
    />
  );
};

export default SignUpModal;
