import { create } from "zustand";

interface SignUpModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useSignUpModal = create<SignUpModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useSignUpModal;
