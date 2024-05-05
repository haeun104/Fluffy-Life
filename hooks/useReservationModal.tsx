import { create } from "zustand";

interface ReservationStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useReservationModal = create<ReservationStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useReservationModal;
