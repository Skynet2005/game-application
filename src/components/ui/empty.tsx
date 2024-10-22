import React from 'react';
import Image from 'next/image';
import Tilt from 'react-parallax-tilt';

export interface EmptyProps {
  label: string;
}

export const Empty = ({ label }: EmptyProps) => {
  return (
    <div className="h-full pt-20 flex flex-col items-center justify-center">
      <div className="relative h-32 w-32 flex items-center justify-center">
        <Tilt tiltMaxAngleY={65} tiltMaxAngleX={0}>
          <Image
            src="/logo1.png"
            alt="logo1"
            width={120}
            height={120}
            style={{ position: 'relative', width: 'auto', height: 'auto' }}
          />
        </Tilt>
      </div>
      <p className="text-muted-foreground text-sm text-center">{label}</p>
    </div>
  );
};
