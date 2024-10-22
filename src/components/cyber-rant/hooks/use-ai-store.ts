// src/hooks/cyber-rant/use-ai-store.ts
import { create } from 'zustand';

type State = {
  aiInput: string;
  setAiInput: (input: string) => void;
};

export const useAiInputStore = create<State>((set) => ({
  aiInput: '',
  setAiInput: (input: string) => set({ aiInput: input }),
}));
