import { create } from 'zustand';

interface CanvasState {
  backgroundColor: string;
  strokeColor: string;
  strokeWidth: number;
  imageResolution: number;
  dashGap: number;
  setBackgroundColor: (backgroundColor: string) => void;
  setStrokeColor: (strokeColor: string) => void;
  setStrokeWidth: (strokeWidth: number) => void;
  setDashGap: (dashGap: number) => void;
  setImageResolution: (imageResolution: number) => void;
}

export const useCanvasStore = create<CanvasState>(set => ({
  backgroundColor: '#ffffff',
  strokeColor: '#000',
  strokeWidth: 4,
  dashGap: 0,
  imageResolution: 512,
  setBackgroundColor: color => set({ backgroundColor: color }),
  setStrokeColor: strokeColor => set({ strokeColor }),
  setStrokeWidth: (strokeWidth: number) => set({ strokeWidth }),
  setDashGap: (dashGap: number) => set({ dashGap }),
  setImageResolution: imageResolution => set({ imageResolution }),
}));
