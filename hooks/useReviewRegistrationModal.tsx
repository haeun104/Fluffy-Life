import { create } from "zustand";

interface ReviewRegistrationStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useReviewRegistrationModal = create<ReviewRegistrationStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useReviewRegistrationModal;
