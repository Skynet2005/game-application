// src/components/image/prompt-form/PromptForm.tsx
import { useCallback } from 'react';
import ImageSelectInput from '../canvas/components/ImageSelectInput';
import TiltedWord from '../utils/TiltedWord';
import { ModelOptions, amountOptions } from '@/constants/image/constants';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useCanvasStore } from '../stores/canvasStore';

export interface FormData {
  prompt: string;
  nPrompt: string;
  structure: string;
  numOutputs: number;
  imageResolution: number;
}

export interface PromptFormProps {
  onSubmit: (formData: FormData) => void;
  prompt: string;
  setPrompt: React.Dispatch<React.SetStateAction<string>>;
  nPrompt: string;
  setNPrompt: React.Dispatch<React.SetStateAction<string>>;
  structure: string;
  setStructure: React.Dispatch<React.SetStateAction<string>>;
  numOutputs: number;
  setNumOutputs: React.Dispatch<React.SetStateAction<number>>;
  currentPlaceholder: string;
}

const PromptForm: React.FC<PromptFormProps> = ({ onSubmit, currentPlaceholder, prompt, setPrompt, nPrompt, setNPrompt, structure, setStructure, numOutputs, setNumOutputs }) => {
  const imageResolution = useCanvasStore(state => state.imageResolution);

  const handleFormSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData: FormData = { prompt, nPrompt, structure, numOutputs, imageResolution };
      onSubmit(formData);
    },
    [prompt, nPrompt, structure, numOutputs, imageResolution, onSubmit],
  );

  return (
    <form
      onSubmit={handleFormSubmit}
      className="animate-in fade-in duration-700 w-full"
    >
      <div className="flex flex-row mt-4 w-full">
        <Label className="text-center text-neutral-300 rounded ml-5">
          Your Image Prompt:
        </Label>
        <textarea
          id="prompt-input"
          name="prompt"
          value={prompt}
          placeholder={currentPlaceholder}
          onChange={e => setPrompt(e.target.value)}
          onKeyDown={e => { if (e.key === 'Tab') { e.preventDefault(); setPrompt(currentPlaceholder); } }}
          rows={2}
          className="w-full flex-grow rounded ml-4 resize-y"
        />
        <div className="inline-block">
          <div className="inline-block">
            <Button
              variant="outline"
              type="submit"
              className="flex items-center justify-center bg-green-700 hover:bg-red-500 rounded-lg text-white rounded-r-md px-2 py-3 ml-2"
            >
              Generate
            </Button>
          </div>
        </div>
      </div>
      <hr className="border-white m-2 border-t w-full" />
      <div className="text-center flex flex-row align-center justify-center pl-2 pr-2 m-2 ml-2 mr-2 mt-1 mb-1">
        {'Optional Settings:'.split(' ').map((word, i) => (
          <TiltedWord key={i} word={word} />
        ))}
      </div>
      <div className="flex justify-center">
        <label>Model:</label>
        <ImageSelectInput
          options={ModelOptions}
          value={structure}
          onChange={setStructure}
        />
        <Label className="text-center text-neutral-300 rounded ml-5">
          Quantity:
        </Label>
        <ImageSelectInput
          options={amountOptions}
          value={numOutputs}
          onChange={value => setNumOutputs(Number(value))}
        />
      </div>
      <div>
        <div className="flex flex-row mt-4">
          <Label className="text-center text-neutral-300 rounded ml-5">
            Negative Prompt:
          </Label>
          <textarea
            value={nPrompt}
            onChange={e => setNPrompt(e.target.value)}
            className="flex-grow w-full text-left rounded ml-5"
            rows={4}
          />
        </div>
        <hr className="border-white m-2 border-t w-full" />
      </div>
    </form>
  );
};

export default PromptForm;
