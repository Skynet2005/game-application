import ColorPicker from './ColorPicker';
import StrokeWidthSlider from './StrokeWidth';
import DashGapSlider from './DashGap';
import BackgroundColorPicker from './BackgroundColorPicker';

export default function RightPanel() {
  return (
    <div className="flex h-full justify-center py-8">
      <div className="relative flex h-full w-[12.5rem] flex-col gap-6">
        <ColorPicker />

        <StrokeWidthSlider />

        <DashGapSlider />

        <BackgroundColorPicker />
      </div>
    </div>
  );
}
