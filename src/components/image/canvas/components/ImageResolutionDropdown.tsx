"use client"
import React, { useState } from 'react';
import { useCanvasStore } from '../../stores/canvasStore';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';

export interface ImageResolutionProps {
  className?: string;
}

export default function ImageResolutionDropdown(
  className: ImageResolutionProps,
) {
  const [imageResolution, setImageResolution] = useCanvasStore(state => [
    state.imageResolution,
    state.setImageResolution,
  ]);

  const [isOpen, setIsOpen] = useState(false);

  const resolutionOptions = [
    { value: 512, label: '512px x 512px' },
    { value: 768, label: '768px x 768px' },
    { value: 256, label: '256px x 256px' },
    { value: 200, label: '200px x 200px' },
    { value: 300, label: '300px x 300px' },
    { value: 400, label: '400px x 400px' },
    { value: 500, label: '500px x 500px' },
    { value: 600, label: '600px x 600px' },
    { value: 700, label: '700px x 700px' },
  ];

  const handleSelect = (resolution: number) => {
    setImageResolution(resolution);
    setIsOpen(false);
  };

  // Find the corresponding label for the selected imageResolution
  const currentLabel =
    resolutionOptions.find(res => res.value === imageResolution)?.label ||
    imageResolution.toString();

  return (
    <div>
      <Popover>
        <div className="flex flex-col items-center">
          {' '}
          {/* Flex container */}
          <PopoverTrigger asChild className="mt-2 w-full">
            <Button
              className="border rounded-md text-center ring-offset-1"
              onClick={() => setIsOpen(!isOpen)}
            >
              <div className="h-full w-full rounded-md">{currentLabel}</div>
            </Button>
          </PopoverTrigger>
        </div>

        {isOpen && (
          <PopoverContent className="bg-black w-fit">
            <div className="bg-neutral-800 border rounded-md align-center w-full">
              {resolutionOptions.map((res, index) => (
                <Button
                  key={index}
                  onClick={() => handleSelect(res.value)}
                  className="flex flex-col w-full align-center rounded border border-none text-center px-4 py-2 hover:bg-neutral-700"
                >
                  {res.label}
                </Button>
              ))}
            </div>
          </PopoverContent>
        )}
      </Popover>
    </div>
  );
}
