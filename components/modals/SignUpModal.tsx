"use client";

import useSignUpModal from "@/hooks/useSignUpModal";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import { FcGoogle } from "react-icons/fc";

const SignUpModal = () => {
  const signUpModal = useSignUpModal();

  const bodyContent = (
    <div>
      <Heading
        title="Welcome to Fluffy Life"
        subTitle="Create an account now!"
      />
      <Input id="email" type="email" label="Email" />
      <Input id="firstName" label="First Name" />
      <Input id="lastName" label="Last Name" />
      <Input id="password" type="password" label="Password" />
      <div className="border-solid border-neutral-500 border-[2px] rounded-md px-4 py-[6px] text-center flex items-center cursor-pointer mt-6">
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
    />
  );
};

export default SignUpModal;
