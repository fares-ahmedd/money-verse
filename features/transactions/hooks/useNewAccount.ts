import { create } from "zustand";

type NewAccountState = {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
};

export const useNewAccount = create<NewAccountState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
