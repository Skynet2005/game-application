import { Circuit, CircuitType, Terminal } from "@prisma/client";
import { create } from "zustand";

export type ModalType = "createTerminal" | "invite" | "editTerminal" | "members" | "createCircuit" | "leaveTerminal" | "deleteTerminal" | "deleteCircuit" | "editCircuit" | "messageFile" | "deleteMessage";

interface ModalData {
  terminal?: Terminal;
  circuit?: Circuit;
  circuitType?: CircuitType;
  apiUrl?: string;
  query?: Record<string, any>;
}

interface ModalStore {
  type: ModalType | null;
  data: ModalData;
  isOpen: boolean;
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
  onClose: () => set({ type: null, isOpen: false })
}));
