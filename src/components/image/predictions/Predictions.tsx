'use client';
import { useEffect, useRef, useState, Fragment } from 'react';
import { FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon } from 'react-share';
import { Copy as CopyIcon, Download as DownloadIcon } from 'lucide-react';
import copy from 'copy-to-clipboard';
import Tilt from 'react-parallax-tilt';
import Image from 'next/image';
import Loader from '@/components/ui/loader';
import BackToTopButton from '@/components/image/lib/buttons/BackToTopButton';
import { Button } from '@/components/ui/button';

export interface PredictionType {
  id: number;
  uuid?: string;
  input: { prompt: string; image: string; structure?: string };
  output?: string[];
}

export interface PredictionsProps {
  predictions: Record<string, PredictionType>;
  submissionCount: number;
  isProcessing?: boolean;
}

export default function Predictions({ predictions, submissionCount, isProcessing, }: PredictionsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => { if (submissionCount > 0 && scrollRef.current) { scrollRef.current.scrollIntoView({ behavior: 'smooth' }); } }, [predictions, submissionCount]);
  if (submissionCount === 0) return null;

  return (
    <section className="w-full my-5 rounded-xl">
      <h2 className="text-center text-3xl font-bold mt-5">Results</h2>
      {isProcessing ? (
        <div className="flex justify-center items-center h-2/3">
          <Loader />
        </div>
      ) : (
        <div className="image-output-container flex flex-wrap justify-center">
          {Object.values(predictions).slice().reverse().map((prediction, index) => (
            <Fragment key={prediction.id}>
              {index === 0 && submissionCount === Object.keys(predictions).length && (
                <div className="p-2" style={{ scrollMarginTop: '150px' }} ref={scrollRef} />
              )}
              <Prediction
                prediction={prediction}
                showLinkToNewSketch={true}
                uuid={prediction.uuid ?? null}
              />
            </Fragment>
          ))}
        </div>
      )}
    </section>
  );
}

export interface PredictionProps {
  prediction: PredictionType;
  uuid: string | null;
  showLinkToNewSketch?: boolean;
}

export function Prediction({ prediction, showLinkToNewSketch = false }: PredictionProps) {
  const [linkCopied, setLinkCopied] = useState(false);
  const [predictionUrl, setPredictionUrl] = useState('');

  useEffect(() => { const url = window.location.origin + '/scribbles/' + (prediction.uuid || prediction.id); setPredictionUrl(url); }, [prediction.id, prediction.uuid]);
  useEffect(() => { const intervalId = setInterval(() => { setLinkCopied(false); }, 4 * 1000); return () => clearInterval(intervalId); }, []);

  const saveImageToGallery = async () => {
    try {
      const response = await fetch('/api/predictions/saveImage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          image: prediction.input.image,
          prompt: prediction.input.prompt,
          structure: prediction.input.structure,
          output: prediction.output,
        }),
      });
      const data = await response.json();
      if (data.error) { console.error('Error saving image:', data.error); } else { console.log('Image saved:', data); }
    } catch (error) {
      console.error('Error saving image:', error);
    }
  };

  const downloadImage = (imageUrl: string) => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.target = '_blank';
    link.download = 'output-image.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const copyLink = (imageUrl: string) => { copy(imageUrl); setLinkCopied(true); };
  if (!prediction.output) return null;

  const colors = ['text-red-700', 'text-blue-500', 'text-green-500', 'text-yellow-500', 'text-indigo-500', 'text-orange-500', 'text-teal-500', 'text-lime-500', 'text-rose-500', 'text-cyan-500',];

  return (
    <div className="h-full w-full mt-4 mb-12">
      <div className="text-center px-4 opacity-60 text-xl">
        {prediction.input.prompt}
      </div>
      <div className="text-center px-4 pb-4 opacity-60 text-xl">
        model: {prediction.input.structure}
        <Button variant="outline" className="m-4" onClick={saveImageToGallery}>
          Save to Gallery
        </Button>
      </div>
      <div className="image-container flex flex-wrap justify-center w-full">
        {/* Input image */}
        <div className="single-image shadow-lg w-100 h-100 p-5 pt-4 pr-2 pl-2 bg-transparent flex flex-col items-center justify-center">
          <div className="flex flex-col items-center justify-center relative">
            <div className="flex items-center justify-center">
              <Tilt>
                <Image
                  src={prediction.input.image}
                  alt="input image"
                  width={256}
                  height={256}
                  className="w-full h-full bg-neutral-400 border border-neutral-300 rounded"
                />
              </Tilt>
            </div>
            <div className="absolute inset-x-0 mt-6 text-center text-sm text-gray-500 opacity-0 hover:opacity-100 transition-opacity">
              SketchNetic Image downloads as an PNG and with a transparent background
            </div>
          </div>
          <div className="flex mt-2">
            <Button
              className="rounded p-1 m-1 border hover:bg-transparent hover:text-neutral-300"
              onClick={() => downloadImage(prediction.input.image)}
            >
              <DownloadIcon className="icon" />
            </Button>
            {showLinkToNewSketch && (
              <Button
                className="rounded p-1 m-1 border hover:bg-transparent hover:text-neutral-300"
                onClick={() => copyLink(prediction.input.image)}
              >
                <CopyIcon className="icon" />
              </Button>
            )}
          </div>
        </div>

        {/* Generated images */}
        {prediction.output?.map((outputImgUrl, index) => (
          <div
            className="single-image shadow-lg w-100 h-100 p-5 pt-4 pl-2 pr-2 bg-transparent flex flex-col items-center justify-center"
            key={index}
          >
            <div className="flex items-center justify-center">
              <Tilt>
                <Image
                  src={outputImgUrl}
                  alt={`output image ${index}`}
                  width={256}
                  height={256}
                  className="w-full h-full border border-neutral-300 rounded"
                />
              </Tilt>
            </div>
            <div className="flex mt-2">
              <Button
                className="rounded p-1 m-1 border hover:bg-transparent hover:text-neutral-300"
                onClick={() => downloadImage(outputImgUrl)}
              >
                <DownloadIcon className="icon" />
              </Button>
              {showLinkToNewSketch && (
                <Button
                  className="rounded p-1 m-1 border hover:bg-transparent hover:text-neutral-300"
                  onClick={() => copyLink(outputImgUrl)}
                >
                  <CopyIcon className="icon" />
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="social-media-buttons flex flex-row m-2 p-2 pt-4">
        <div className="pr-4 flex flex-row justify-center items-center">
          {'Share On :'.split(' ').map((word, i) => (
            <Tilt key={i}>
              <div className="text-center items-center flex flex-row bg-neutral-700 border-2 border-neutral-400 rounded-lg pl-2 pr-2 m-2 ml-2 mr-2 mt-1 mb-1">
                {word.split('').map((char, j) => (
                  <div className="fonnt-bold text-6xl" key={j}>
                    <span className={char === ' ' ? '' : colors[j % colors.length]} style={{ display: 'inline-block', width: '100%', textAlign: 'center', }}>
                      {char}
                    </span>
                  </div>
                ))}
              </div>
            </Tilt>
          ))}
        </div>

        <FacebookShareButton url={predictionUrl}>
          <FacebookIcon size={32} round />
        </FacebookShareButton>
        <TwitterShareButton url={predictionUrl}>
          <TwitterIcon size={32} round />
        </TwitterShareButton>
      </div>
      <div className="text-center py-2 flex items-center justify-center">
        <BackToTopButton />
      </div>
    </div>
  );
}
