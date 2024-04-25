"use client";

import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import Button from "../Button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: () => void;
  bodyContent: React.ReactElement;
  actionTitle: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  bodyContent,
  actionTitle,
}) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  if (!showModal) {
    return null;
  }

  return (
    <div className="absolute top-0 left-0 h-screen w-screen opacity-70 bg-neutral-800 flex justify-center items-center">
      <div className="max-w-[300px] bg-white px-6 py-4 rounded-lg relative">
        <IoMdClose
          className="cursor-pointer absolute right-4"
          onClick={onClose}
        />
        {bodyContent}
        <Button title={actionTitle} onClick={onSubmit} />
      </div>
    </div>
  );
};

export default Modal;
