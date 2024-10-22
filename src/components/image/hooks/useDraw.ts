"use client"
import { useCallback, useEffect, useRef, useState } from 'react';

type AppTouchEvent = TouchEvent;

interface Point {
  x: number;
  y: number;
}

export interface DrawProps {
  ctx: CanvasRenderingContext2D;
  currentPoint: Point;
  prevPoint: Point | undefined;
}

// or any other number you prefer
const MAX_HISTORY_SIZE = 20;

// Main function useDraw which accepts a callback function onDraw
export default function useDraw(onDraw: (draw: DrawProps) => void) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prevPointRef = useRef<Point>(undefined);
  const [mouseDown, setMouseDown] = useState(false);
  const [canvasHistory, setCanvasHistory] = useState<string[]>([]);
  const [historyPosition, setHistoryPosition] = useState(-1);

  const updateCanvasHistory = () => {
    if (canvasRef.current) {
      const currentDataUrl = canvasRef.current.toDataURL();
      if (currentDataUrl !== canvasHistory[canvasHistory.length - 1]) {
        setCanvasHistory(prevHistory => [...prevHistory.slice(-(MAX_HISTORY_SIZE - 1)), currentDataUrl,]);
        setHistoryPosition(prev => prev + 1);
      }
    }
  };

  const onInteractStart = useCallback(() => { setMouseDown(true); updateCanvasHistory(); }, [canvasHistory]);

  const undo = () => {
    const canvasElement = canvasRef.current;
    if (!canvasElement) return;
    if (historyPosition <= 0) return;
    const ctx = canvasElement.getContext('2d');
    const prevDataUrl = canvasHistory[historyPosition - 1];
    if (ctx && prevDataUrl) {
      const img = new Image(); img.src = prevDataUrl; img.onload = () => { ctx.clearRect(0, 0, canvasElement.width, canvasElement.height); ctx.drawImage(img, 0, 0); };
      setHistoryPosition(prev => prev - 1);
    }
  };

  // Callback function to clear the canvas
  const clear = useCallback(() => {
    const canvasElement = canvasRef.current; if (!canvasElement) return;
    const ctx = canvasElement.getContext('2d'); if (!ctx) return;
    // Clearing the entire canvas
    ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);
  }, []);

  // useEffect hook to handle mouse/touch events
  useEffect(() => {
    // Function to compute point in canvas
    const computePointInCanvas = (clientX: number, clientY: number) => {
      const canvasElement = canvasRef.current;
      if (!canvasElement) return;
      const rect = canvasElement.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      return { x, y };
    };

    // Function to handle move events
    const handleMove = (e: MouseEvent | AppTouchEvent) => {
      if (!mouseDown) return;
      const canvasElement = canvasRef.current;
      const ctx = canvasElement?.getContext('2d');
      let currentPoint;
      // Checking if event is MouseEvent or TouchEvent
      if (e instanceof MouseEvent) {
        currentPoint = computePointInCanvas(e.clientX, e.clientY);
      } else {
        const { clientX, clientY } = e.touches[0]; currentPoint = computePointInCanvas(clientX, clientY);
      }
      if (!ctx || !currentPoint) return;
      // Calling onDraw with current context and points
      onDraw({ ctx, currentPoint, prevPoint: prevPointRef.current });
      prevPointRef.current = currentPoint;
    };

    // Function to handle end of interaction
    const handleInteractEnd = () => { setMouseDown(false); prevPointRef.current = undefined; };

    // Adding event listeners for move and end events
    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseup', handleInteractEnd);
    window.addEventListener('touchmove', handleMove);
    window.addEventListener('touchend', handleInteractEnd);
    // Removing event listeners on cleanup
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleInteractEnd);
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('touchend', handleInteractEnd);
    };
  }, [mouseDown, onDraw]);

  // Returning necessary variables and functions
  return { canvasRef, onInteractStart, clear, undo, };
}
