"use client";

import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import Button from "../Button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: () => void;
  bodyContent: React.ReactElement;
  actionLabel?: string;
  disabled?: boolean;
  style?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  bodyContent,
  actionLabel,
  disabled,
  style,
}) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  if (!showModal) {
    return null;
  }

  return (
    <div className="absolute top-0 left-0 h-screen w-screen bg-neutral-800/70 flex justify-center items-center z-50">
      <div className="bg-white px-6 py-8 rounded-lg relative w-full max-w-[500px]">
        <IoMdClose
          className="cursor-pointer absolute right-4"
          onClick={onClose}
        />
        {bodyContent}
        {actionLabel && (
          <div className="flex pt-4">
            <Button
              title={actionLabel}
              onClick={onSubmit}
              style={`flex-1 py-[12px] ${style}`}
              disabled={disabled}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
