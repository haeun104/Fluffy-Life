"use client";

import useSignUpModal from "@/hooks/useSignUpModal";
import Modal from "./Modal";

const SignUpModal = () => {
  const signUpModal = useSignUpModal();

  return (
    <Modal
      isOpen={signUpModal.isOpen}
      onClose={signUpModal.onClose}
      actionTitle="Submit"
    />
  );
};

export default SignUpModal;
