import { create } from "zustand";

interface RoomSearchStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useRoomSearchModal = create<RoomSearchStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useRoomSearchModal;
