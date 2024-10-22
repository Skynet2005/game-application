// src/components/landing/landing-hero.tsx
'use client';

import { useEffect, useState } from 'react';
import TypewriterComponent from 'typewriter-effect';
import { useAuth } from '@clerk/nextjs';
import Link from 'next/link';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { images, videoPath, audioPath, songVidPath } from "@/constants/landing/constants";

const useSlideshow = (images: string[]) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => { setCurrentSlide(prevSlide => (prevSlide + 1) % images.length); }, 3000);
    return () => clearInterval(timer);
  }, [images.length]);
  return images[currentSlide];
};

export const LandingHero = () => {
  const { isSignedIn } = useAuth();
  const currentImage = useSlideshow(images);

  return (
    <div className="py-10 align-center text-center space-y-5">
      {/* Image and Video container */}
      <div className="flex flex-row justify-center items-center space-x-4">

        {/* Slideshow */}
        <div className="flex flex-col justify-center rounded overflow-hidden shadow-lg shadow-sky-500">
          <Image
            src={currentImage}
            priority
            alt="Slideshow"
            width={475}
            height={475}
            className="rounded-xl"
          />
        </div>

        {/* SongVideo Player */}
        <div className="flex flex-col justify-center shadow-lg shadow-sky-500">
          <video controls className="">
            <source src={songVidPath} type="video/mp4" />
          </video>
        </div>

        {/* Video Player */}
        <div className="flex flex-col justify-center shadow-lg shadow-sky-500">
          <video controls className="relative w-[500px]">
            <source src={videoPath} type="video/mp4" />
          </video>
        </div>
      </div>

      {/* Audio Player */}
      <div className="flex justify-center">
        <audio controls className="rounded-md">
          <source src={audioPath} type="audio/wav" />
        </audio>
      </div>

      <div className="text-base sm:text-2xl md:text-2xl lg:text-2xl space-y-5 font-extrabold">
        <h1 className="bg-clip-text bg-gradient-to-r from-lime-400 to-green-400">
          Not Just Another AI Tool,
        </h1>
        <h1>It&apos;s Your Creative Sidekick for</h1>
        <div className="text-transparent text-2xl bg-clip-text bg-gradient-to-r from-sky-400 to-blue-400">
          <TypewriterComponent
            options={{
              strings: [
                'Conjuring Quantum Clones!',
                'Crafting Image Masterpieces!',
                'Blogging Like a Boss!',
                'Spinning Epic Yarns!',
                'Turning Text into Cinema!',
                'Email Alchemy!',
                'Composing Overtures in Bytes!',
              ],
              autoStart: true,
              loop: true,
            }}
          />
        </div>
      </div>
      <div className="text-sm md:text-xl font-light text-zinc-300">
        🎨 Where creativity meets code and pixels dance to prose.
        <br />
        🚀 Buckle up for a journey at the speed of thought!
        <br />⏰ Say goodbye to mundane, and hello to the future of imagination
        💭!
      </div>
      <div>
        <Link href={isSignedIn ? '/dashboard' : '/sign-up'}>
          <Button variant="premium" className="md:text-lg p-6 md:p-6 rounded-full font-semibold">
            Embark on a Creative Odyssey
          </Button>
        </Link>
      </div>
      <div className="text-zinc-400 text-xs md:text-sm font-normal">
        Payment? Pshaw! Dive in without a dime.
      </div>
    </div>
  );
};
