import { create } from "zustand";

interface HotelReviewStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useHotelReviewModal = create<HotelReviewStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useHotelReviewModal;
