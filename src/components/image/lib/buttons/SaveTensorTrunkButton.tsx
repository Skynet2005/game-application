// SaveTensorTrunkButton.tsx
import { Button } from '@/components/ui/button';

export type SaveTensorTrunkButtonProps = {
  canvasRef: React.RefObject<{} | null>;
  className: string;
};

export const SaveTensorTrunkButton: React.FC<SaveTensorTrunkButtonProps> = ({ canvasRef, className }) => {
  const saveToTensorTrunk = async () => {
    const canvas = canvasRef.current as any;

    if (canvas && typeof canvas.exportPaths === 'function') {
      const pathsData = await canvas.exportPaths();
      if (pathsData) {
        const allPaths = pathsData.map((pathData: any) => {
          return {
            drawMode: true,
            strokeColor: pathData.strokeColor,
            strokeWidth: pathData.strokeWidth,
            paths: pathData.paths.map((coordinate: any) => ({
              x: coordinate.x,
              y: coordinate.y,
            })),
          };
        });
        const seeds = [
          { prompt: 'An intricately detailed scene', paths: allPaths },
        ];
        const coordinatesString = JSON.stringify(seeds, null, 2);
        const blob = new Blob([coordinatesString], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'coordinates.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }
    }
  };

  return (
    <Button
      className="lil-button flex p-1 m-2 align-center border rounded text-xs text-neutral-500 border-neutral-500"
      onClick={saveToTensorTrunk}
    >
      Save to Tensor Trunk (TBD)
    </Button>
  );
};
