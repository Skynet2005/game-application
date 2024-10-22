import Thread from "@/components/cyber-rant/lib/models/thread.model";
import User from "@/components/cyber-rant/lib/models/user.model";
import Community from "@/components/cyber-rant/lib/models/community.model";
import { create } from "zustand";

export type CyberRantModalType = "createPost" | "editPost" | "deletePost" | "createThread" | "editThread" | "deleteThread" | "updateUser" | "viewUser" | "messageFile";

interface CyberRantModalData {
  post?: typeof Thread;
  user?: typeof User;
  community?: typeof Community;
  apiUrl?: string;
  query?: Record<string, any>;
}

interface CyberRantModalStore {
  type: CyberRantModalType | null;
  data: CyberRantModalData;
  isOpen: boolean;
  onOpen: (type: CyberRantModalType, data?: CyberRantModalData) => void;
  onClose: () => void;
}

export const useCyberRantModal = create<CyberRantModalStore>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
  onClose: () => set({ type: null, isOpen: false, data: {} })
}));
