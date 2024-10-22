// BackgroundColorPicker.ts
import { HexAlphaColorPicker } from 'react-colorful';
import { useCanvasStore } from '../../stores/canvasStore';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

export default function BackgroundColorPicker() {
  const [backgroundColor, setBackgroundColor] = useCanvasStore(state => [
    state.backgroundColor,
    state.setBackgroundColor,
  ]);

  return (
    <div>
      <Label htmlFor="backgroundColor" className="select-none">
        Background Color
      </Label>

      <Popover>
        <PopoverTrigger asChild className="mt-2 w-full">
          <Button className="h-8 w-full rounded-md p-0 ring-2 ring-border ring-offset-2">
            <div
              className="h-full w-full rounded-md"
              style={{ background: backgroundColor }}
            />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-fit">
          <HexAlphaColorPicker
            id="backgroundColor"
            color={backgroundColor}
            onChange={setBackgroundColor}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
