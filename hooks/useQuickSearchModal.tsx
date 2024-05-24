import { create } from "zustand";

interface QuickSearchStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useQuickSearchModal = create<QuickSearchStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useQuickSearchModal;
