import { create } from 'zustand';

// Create a store for managing the dialog state
export const useDialogStore = create<{
  isOpen: boolean;
  openDialog: () => void;
  closeDialog: () => void;
}>((set) => ({
  isOpen: false,
  openDialog: () => set({ isOpen: true }),
  closeDialog: () => set({ isOpen: false }),
}));
