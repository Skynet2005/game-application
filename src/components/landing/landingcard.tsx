// src/components/landing/landingcard.tsx
'use client';

import * as React from 'react';
import Tilt from 'react-parallax-tilt';
import { motion, Variants } from 'framer-motion';

import { cn } from '@/lib/utils';

export const fadeIn = (direction = 'right', type = 'spring', delay = 0, duration = 0.75,): Variants => ({
  hidden: { opacity: 0, x: direction === 'right' ? 100 : -100 },
  show: { x: 0, opacity: 1, transition: { type, delay, duration } },
});

interface LandingCardProps extends React.HTMLAttributes<HTMLDivElement> {
  index: number;
}

const LandingCard = React.forwardRef<HTMLDivElement, LandingCardProps>(
  ({ className, index, ...props }, ref) => (
    <Tilt tiltMaxAngleX={25} tiltMaxAngleY={25}>
      <motion.div variants={fadeIn('right', 'spring', index * 0.5, 0.75)} initial="hidden" animate="show"      >
        <div  {...props} ref={ref} className={cn('rounded-lg border bg-card text-bold text-card-foreground shadow-sm', className,)} />
      </motion.div>
    </Tilt>
  ),
);
LandingCard.displayName = 'LandingCard';

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} {...props} className={cn('flex flex-col space-y-1.5 p-6', className)} />
));
CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>((props, ref) => (
  <h3 ref={ref} {...props} className={cn('text-2xl font-semibold leading-none tracking-tight', props.className,)} />
));
CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(({ className, ...props }, ref) => (
  <p ref={ref} {...props} className={cn('text-lg text-muted-foreground', className)} />
));
CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
));
CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} {...props} className={cn(' flex items-center p-6 pt-0', className)} />
));
CardFooter.displayName = 'CardFooter';

export { LandingCard, CardHeader, CardFooter, CardTitle, CardDescription, CardContent, };
