'use client';
import { useHotkeys } from 'react-hotkeys-hook';

import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Kbd } from '@/components/ui/kbd';

export interface ClearButtonProps {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  clear: () => void;
  className?: string;
}

export default function ClearButton({ canvasRef, clear }: ClearButtonProps) {
  const clearCanvas = () => {
    const canvasElement = canvasRef.current;
    if (!canvasElement) return;
    clear();
  };
  useHotkeys('c', clearCanvas);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            className="rounded-md border focus-within:z-10"
            onClick={clearCanvas}
          >
            Clear
          </Button>
        </TooltipTrigger>

        <TooltipContent>
          <Kbd>C</Kbd>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
