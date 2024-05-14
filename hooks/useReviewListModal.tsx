import { create } from "zustand";

interface ReviewListStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useReviewListModal = create<ReviewListStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useReviewListModal;
