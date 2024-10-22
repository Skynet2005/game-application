// src/components/image/canvas/components/BottomBar.tsx
import UndoButton from '../components/UndoButton';
import ClearButton from '../components/ClearButton';
import ImageResolutionDropdown from '../components/ImageResolutionDropdown';

// Import the new button components
import { GetSketchingTimeButton } from '../../utils/buttons/GetSketchTimeButton';
import { SaveCanvasGeoRefButton } from '../../utils/buttons/SaveCanvasGeoRefButton';
import { SaveSvgButton } from '../../utils/buttons/SaveSvgButton';
import { SaveTensorTrunkButton } from '../../utils/buttons/SaveTensorTrunkButton';

import { ToolbarProps } from '../../utils/types';

const BottomBar: React.FC<ToolbarProps> = ({ undo, clear, canvasRef }) => {
  return (
    <div className="shadow-md flex flex-col justify-between items-center p-4">
      <div className="flex space-x-2 mb-2 items-center">
        {' '}
        {/* Add items-center */}
        <UndoButton canvasRef={canvasRef} undo={undo} className="h-10" />{' '}
        {/* Add h-10 */}
        <ClearButton canvasRef={canvasRef} clear={clear} className="h-10" />
        <ImageResolutionDropdown className="h-10" />
      </div>
      <div className="flex space-x-2 items-center">
        {' '}
        {/* Add items-center */}
        <GetSketchingTimeButton canvasRef={canvasRef} className="h-10" />
        <SaveCanvasGeoRefButton canvasRef={canvasRef} className="h-10" />
        <SaveSvgButton canvasRef={canvasRef} className="h-10" />
        <SaveTensorTrunkButton canvasRef={canvasRef} className="h-10" />
      </div>
    </div>
  );
};

export default BottomBar;
