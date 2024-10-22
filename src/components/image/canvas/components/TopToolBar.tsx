// src/components/image/canvas/components/TopToolBar.tsx
import ColorPicker from '../components/ColorPicker';
import StrokeWidthSlider from './StrokeWidth';
import DashGapSlider from './DashGap';
import BackgroundColorPicker from '../components/BackgroundColorPicker';

const TopBar: React.FC = () => {
  return (
    <div className="flex justify-between items-center p-4">
      <div className="flex space-x-4 items-center justify center">
        <div className="p-2">
          <StrokeWidthSlider />
        </div>
        <div className="p-2"></div>
        <DashGapSlider />
      </div>
      <div className="p-2">
        <ColorPicker />
      </div>
      <div className="p-2">
        <BackgroundColorPicker />
      </div>
    </div>
  );
};

export default TopBar;
