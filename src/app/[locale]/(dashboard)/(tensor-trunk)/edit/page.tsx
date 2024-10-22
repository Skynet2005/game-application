"use client"
import { transformationButtons } from './constants';
import { Button } from '@/components/old/ui/button';
import { Input } from '@/components/old/ui/input';
import { Label } from '@/components/old/ui/label';
import { CldImage } from 'next-cloudinary';
import { useState, use } from 'react';

export default function EditPage(props: { searchParams: Promise<{ publicId: string }>; }) {
  const searchParams = use(props.searchParams);

  const {
    publicId
  } = searchParams;

  const [transformation, setTransformation] = useState<string | undefined>();
  const [pendingPrompt, setPendingPrompt] = useState('');
  const [prompt] = useState('');
  const [sliderValue, setSliderValue] = useState<number>(0);

  const scroll = (direction: string) => {
    const container = document.getElementById('scroll-container');
    if (container) {
      container.scrollBy({
        left: (direction === 'left' ? -1 : 1) * 100,
        behavior: 'smooth',
      });
    }
  };

  const selectedButton = transformationButtons.find(
    button => button.transformation === transformation,
  );

  return (
    <section>
      <div className="absolute top-0 left-0 w-full h-96 rounded-md filter blur-3xl opacity-50 -z-50 gradientBackgroundGlobal"></div>
      <div className="flex flex-col gap-8 pl-10">
        <div className="flex justify-between">
          <h1 className="text-4xl font-bold">Edit File {publicId}</h1>
        </div>
        <div className="relative flex items-center gap-4">
          <Button
            variant="ghost"
            onClick={() => setTransformation(undefined)}
            className="bg-neutral-700 rounded-xl"
          >
            Clear All
          </Button>
          <div className="flex flex-col gap-4">
            <Label>Prompt</Label>
            <Input
              value={pendingPrompt}
              onChange={e => setPendingPrompt(e.currentTarget.value)}
            />
          </div>
          <button
            onClick={() => scroll('left')}
            className="absolute z-10 text-8xl left-0"
          >
            ←
          </button>
          <div
            id="scroll-container"
            className="flex gap-4 overflow-x-scroll hide-scroll-bar"
          >
            {transformationButtons.map(button => (
              <Button
                key={button.transformation}
                onClick={() => setTransformation(button.transformation)}
                className="bg-neutral-700 rounded-xl"
              >
                {button.label}
              </Button>
            ))}
          </div>
          <button
            onClick={() => scroll('right')}
            className="absolute z-10 text-8xl right-0"
          >
            →
          </button>
          {selectedButton?.hasSlider && (
            <div className="flex flex-col items-center">
              <input
                type="range"
                min={selectedButton.min}
                max={selectedButton.max}
                value={sliderValue}
                onChange={e => setSliderValue(Number(e.target.value))}
              />
              <span>{sliderValue}</span>
            </div>
          )}
        </div>
        <div className="grid grid-cols-2 gap-12">
          <CldImage
            src={publicId}
            alt="Selected Image"
            width={transformation === 'generative-fill' ? '1400' : '1200'}
            height={transformation === 'generative-fill' ? '900' : '1400'}
            {...(transformation === 'generative-fill'
              ? { crop: 'pad', fillBackground: { prompt } }
              : {})}
            {...(transformation === 'bg-remove'
              ? { removeBackground: true }
              : {})}
            {...(transformation === 'grayscale' ? { grayscale: true } : {})}
            {...(transformation === 'blackwhite'
              ? { threshold: sliderValue }
              : {})}
            {...(transformation === 'blur'
              ? { blur: sliderValue.toString() }
              : {})}
            {...(transformation === 'negate' ? { negate: true } : {})}
            {...(transformation === 'pixelate'
              ? { pixelate: sliderValue.toString() }
              : {})}
            {...(transformation === 'sepia' ? { level: sliderValue.toString() } : {})}
            {...(transformation === 'cartoonify' ? { cartoonify: true } : {})}
            {...(transformation === 'lut' ? { lut: 'style_transfer' } : {})}
            {...(transformation === 'improve' ? { blend: sliderValue } : {})}
            {...(transformation === 'sharpen' ? { strength: sliderValue } : {})}
            {...(transformation === 'redEye' ? { redEye: true } : {})}
          />
        </div>
      </div>
    </section>
  );
}
