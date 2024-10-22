// StrokeWidthSlider.tsx
"use client"
import { useState } from 'react';
import { useCanvasStore } from '../../stores/canvasStore';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

export default function StrokeWidthSlider() {
  const strokeWidth = useCanvasStore(state => state.strokeWidth);
  const setStrokeWidth = useCanvasStore(state => state.setStrokeWidth);

  const [inputValue, setInputValue] = useState(strokeWidth.toString());

  // Increase the stroke width
  const handleIncrease = () => {
    if (strokeWidth < 50) {
      const newValue = strokeWidth + 1;
      setStrokeWidth(newValue);
      setInputValue(newValue.toString());
    }
  };

  // Decrease the stroke width
  const handleDecrease = () => {
    if (strokeWidth > 1) {
      const newValue = strokeWidth - 1;
      setStrokeWidth(newValue);
      setInputValue(newValue.toString());
    }
  };

  // Handle changes in the input
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    if (!isNaN(value) && value >= 1 && value <= 100) {
      setStrokeWidth(value);
      setInputValue(value.toString());
    } else {
      setInputValue(event.target.value);
    }
  };

  return (
    <div>
      <div className="mb-4 flex select-none items-center justify-between text-center">
        <Label htmlFor="strokeWidth" className="text-center">
          Stroke Width
        </Label>
      </div>

      <div className="flex items-center">
        <Button
          onClick={handleDecrease}
          aria-label="Decrease stroke width"
          className="border border-neutral-300 rounded-full p-1 w-[20px] hover:bg-neutral-700"
        >
          -
        </Button>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          className="mx-4 text-center w-20" // Adjust width as needed
        />
        <Button
          onClick={handleIncrease}
          aria-label="Increase stroke width"
          className="border border-neutral-300 rounded-full p-1 w-[20px] hover:bg-neutral-700"
        >
          +
        </Button>
      </div>
    </div>
  );
}
