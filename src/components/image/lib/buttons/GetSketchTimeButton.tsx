import { Button } from '@/components/ui/button';

export type GetSketchingTimeButtonProps = {
  canvasRef: React.RefObject<{} | null>;
  className: string;
};

export const GetSketchingTimeButton: React.FC<GetSketchingTimeButtonProps> = ({ canvasRef, className, }) => (
  <Button
    className="lil-button flex p-1 m-2 align-center border rounded text-xs text-neutral-500 border-neutral-500"
    onClick={async () => {
      const canvas = canvasRef.current as any;
      if (canvas && typeof canvas.getSketchingTime === 'function') {
        const timeDrawing =
          await canvas.getSketchingTime(); alert(`Total sketching time on drawing canvas: ${timeDrawing}ms`);
      }
    }}
  >
    Get Sketching Time
  </Button>
);
