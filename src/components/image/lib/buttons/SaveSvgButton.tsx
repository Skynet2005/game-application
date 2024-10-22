import { Button } from '@/components/ui/button';

export type SaveSvgButtonProps = {
  canvasRef: React.RefObject<{} | null>;
  className: string;
};

export const SaveSvgButton: React.FC<SaveSvgButtonProps> = ({ canvasRef, className, }) => {
  const saveSvg = async () => {
    const canvas = canvasRef.current as any;

    if (canvas && typeof canvas.exportSvg === 'function') {
      const svg = await canvas.exportSvg();
      if (svg) {
        const blob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.target = '_blank';
        a.download = 'drawing.svg';
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
      onClick={saveSvg}
    >
      Save SVG
    </Button>
  );
};
