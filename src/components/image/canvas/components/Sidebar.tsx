import ColorPicker from './ColorPicker';
import StrokeWidthSlider from './StrokeWidth';
import DashGapSlider from './DashGap';
import BackgroundColorPicker from './BackgroundColorPicker';

export default function Sidebar() {
  return (
    <aside className="hidden border-l px-6 py-8 lg:block">
      <div className="relative flex h-full w-[12.5rem] flex-col gap-6">
        <ColorPicker />

        <StrokeWidthSlider />

        <DashGapSlider />

        <BackgroundColorPicker />
      </div>
    </aside>
  );
}
