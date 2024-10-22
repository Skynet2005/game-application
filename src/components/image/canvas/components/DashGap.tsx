// DashGapSlider.tsx
"use client"
import { useState } from 'react';
import { useCanvasStore } from '../../stores/canvasStore';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

export default function DashGapSlider() {
  const dashGap = useCanvasStore(state => state.dashGap);
  const setDashGap = useCanvasStore(state => state.setDashGap);
  const [inputValue, setInputValue] = useState(dashGap.toString());

  // Increase the dash gap
  const handleIncrease = () => {
    if (dashGap < 100) {
      const newValue = dashGap + 1;
      setDashGap(newValue);
      setInputValue(newValue.toString());
    }
  };

  // Decrease the dash gap
  const handleDecrease = () => {
    if (dashGap > 0) {
      const newValue = dashGap - 1;
      setDashGap(newValue);
      setInputValue(newValue.toString());
    }
  };

  // Handle changes in the input
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    if (!isNaN(value) && value >= 0 && value <= 100) {
      setDashGap(value);
      setInputValue(value.toString());
    } else {
      setInputValue(event.target.value);
    }
  };

  return (
    <div>
      <div className="mb-4 flex select-none items-center justify-between text-center">
        <Label htmlFor="dashGap" className="text-center">
          Dash Gap
        </Label>
      </div>

      <div className="flex items-center">
        <Button
          onClick={handleDecrease}
          aria-label="Decrease dash gap"
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
          aria-label="Increase dash gap"
          className="border border-neutral-300 rounded-full p-1 w-[20px] hover:bg-neutral-700"
        >
          +
        </Button>
      </div>
    </div>
  );
}
