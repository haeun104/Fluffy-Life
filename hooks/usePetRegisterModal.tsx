import { create } from "zustand";

interface PetRegisterStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const usePetRegisterModal = create<PetRegisterStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default usePetRegisterModal;
