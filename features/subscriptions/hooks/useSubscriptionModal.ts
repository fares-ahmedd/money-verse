import { create } from "zustand";

type SubscriptionModal = {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
};

export const useSubscriptionModal = create<SubscriptionModal>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
