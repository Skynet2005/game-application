// src/components/image/buttons/BackToTopButton.tsx
import { ArrowUpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const BackToTopButton = () => {
  const handleClick = () => { console.log('Button clicked!'); window.location.href = '#top'; };

  return (
    <div className="flex items-center justify-center button holder w-full">
      <Button onClick={handleClick} className="flex items-center justify-center bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-4 mt-10 rounded">
        Top
        <ArrowUpCircle className="icon ml-2 justify-center items-center align-center" />
      </Button>
    </div>
  );
};

export default BackToTopButton;
