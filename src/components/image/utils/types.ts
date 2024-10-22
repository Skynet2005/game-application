export interface Point {
  x: number;
  y: number;
}

export interface DrawOptions {
  ctx: CanvasRenderingContext2D;
  currentPoint: Point;
  prevPoint: Point | undefined;
  backgroundColor: string;
  strokeColor: string;
  strokeWidth: number;
  dashGap: number;
  imageResolution: number;
}

export interface ToolbarProps {
  undo: () => void;
  clear: () => void;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
}
