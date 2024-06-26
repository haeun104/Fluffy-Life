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
  secondaryActionLabel?: string;
  secondaryAction?: () => void;
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
  secondaryAction,
  secondaryActionLabel,
}) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);

    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!showModal) {
    return null;
  }

  return (
    <div className="fixed inset-0 h-screen w-screen bg-neutral-800/70 flex justify-center items-center z-50">
      <div className="bg-white px-6 py-8 rounded-lg relative w-full max-w-[500px]">
        <IoMdClose
          className="cursor-pointer absolute right-4"
          onClick={onClose}
        />
        {bodyContent}
        <div className={`flex pt-4 ${secondaryActionLabel && "gap-4"}`}>
          {actionLabel && (
            <Button
              title={actionLabel}
              onClick={onSubmit}
              style={`flex-1 py-[12px] ${style}`}
              disabled={disabled}
            />
          )}
          {secondaryActionLabel && (
            <Button
              title={secondaryActionLabel}
              onClick={secondaryAction}
              style="flex-1 py-[12px] bg-main-gray"
              disabled={disabled}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
