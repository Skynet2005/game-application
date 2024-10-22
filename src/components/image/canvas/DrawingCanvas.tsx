"use client"
import { useCallback, useEffect, useRef, useState } from 'react';
import type { DrawOptions } from '../utils/types';
import useDraw, { DrawProps } from '../hooks/useDraw';
import { draw } from '@/lib/utils';
import { useCanvasStore } from '../stores/canvasStore';
import TopBar from './components/TopToolBar';
import BottomBar from './components/BottomToolBar';

interface DrawingCanvasProps {
  onSketchChange: (exists: boolean) => void;
  setCanvasData: (data: any) => void;
  onCapture?: () => void;
  clearCanvas: () => void;
}

const DrawingCanvas: React.FC<DrawingCanvasProps> = ({ onSketchChange, setCanvasData, onCapture, clearCanvas, }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isCanvasLoading, setIsCanvasLoading] = useState(true);
  const backgroundColor = useCanvasStore(state => state.backgroundColor);
  const strokeColor = useCanvasStore(state => state.strokeColor);
  const strokeWidth = useCanvasStore(state => state.strokeWidth);
  const imageResolution = useCanvasStore(state => state.imageResolution);
  const dashGap = useCanvasStore(state => state.dashGap);

  const onDraw = useCallback(
    ({ ctx, currentPoint, prevPoint }: DrawProps) => {
      const drawOptions: DrawOptions = { ctx, currentPoint, prevPoint, backgroundColor, strokeColor, strokeWidth, dashGap, imageResolution, };
      draw(drawOptions);
    },
    [strokeColor, strokeWidth, dashGap, imageResolution, backgroundColor],
  );

  const { canvasRef, onInteractStart, clear, undo } = useDraw(onDraw);

  useEffect(() => {
    const setCanvasDimensions = () => {
      if (!canvasRef.current) return;
      canvasRef.current.width = imageResolution;
      canvasRef.current.height = imageResolution;
    };
    setCanvasDimensions();
  }, [canvasRef, imageResolution]);

  const immediateCaptureCanvasData = () => { redrawCanvasWithBackgroundColor(); captureCanvasData(); };
  const handleInteractStart = () => { onInteractStart(); setTimeout(immediateCaptureCanvasData, 5000); };
  const handleClear = () => { clear(); setCanvasData(null); onSketchChange(false); clearCanvas(); };

  useEffect(() => {
    const canvasElement = canvasRef.current;
    if (!canvasElement) return;
    const ctx = canvasElement.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);
  }, [canvasRef, imageResolution]);

  useEffect(() => {
    const canvasElement = canvasRef.current;
    if (!canvasElement) return;
    const ctx = canvasElement.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvasElement.width, canvasElement.height);
  }, [canvasRef, backgroundColor]);

  const captureCanvasData = () => {
    if (canvasRef.current) {
      const data = canvasRef.current.toDataURL();
      setCanvasData(data);
      if (onCapture) onCapture();
    }
  };

  const redrawCanvasWithBackgroundColor = () => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = canvasRef.current.width;
        tempCanvas.height = canvasRef.current.height;
        const tempCtx = tempCanvas.getContext('2d');
        if (tempCtx) {
          tempCtx.drawImage(canvasRef.current, 0, 0);
          ctx.fillStyle = backgroundColor;
          ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
          ctx.drawImage(tempCanvas, 0, 0);
        }
      }
    }
  };

  useEffect(() => { setIsCanvasLoading(false); }, []);

  return (
    <div ref={containerRef} className="relative flex flex-col h-full w-full items-center justify-center"    >
      <div>
        <TopBar />
        <canvas
          id="canvas"
          ref={canvasRef}
          onMouseDown={handleInteractStart}
          onTouchStart={handleInteractStart}
          width={imageResolution}
          height={imageResolution}
          className="touch-none rounded border bg-white mx-auto"
        />
        <BottomBar undo={undo} clear={handleClear} canvasRef={canvasRef} />
      </div>
    </div>
  );
};

export default DrawingCanvas;
