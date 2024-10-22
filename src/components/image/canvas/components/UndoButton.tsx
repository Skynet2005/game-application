'use client';

import { useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Kbd } from '@/components/ui/kbd';
import { cn, isMacOS } from '@/lib/utils';

type UndoButtonProps = {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  undo: () => void;
  className?: string;
};

export default function UndoButton({ undo, canvasRef }: UndoButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const isMac = isMacOS();
  const hotKey = `${isMac ? 'Meta' : 'ctrl'} + z`;
  const undoCanvas = () => { setIsLoading(true); undo(); setIsLoading(false); };
  useHotkeys(hotKey, undoCanvas);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            className="rounded-md border p-2 focus-within:z-10"
            disabled={isLoading}
            onClick={undoCanvas}
          >
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Undo'}
          </Button>
        </TooltipTrigger>

        <TooltipContent className="flex gap-1">
          <Kbd className={cn({ 'text-xs': isMac })}>{isMac ? '⌘' : 'Ctrl'}</Kbd>
          <Kbd>Z</Kbd>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
