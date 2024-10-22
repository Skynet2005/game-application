import React from 'react';

import { cn } from '@/lib/utils';

interface HeadingProps {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  titleClassName?: string;
  descriptionClassName?: string;
}

export const Heading = ({ title, description, icon: IconComponent, titleClassName, descriptionClassName }: HeadingProps) => {
  return (
    <>
      <div className="px-4 lg:px-8 flex items-center gap-x-3 mb-8 rounded-xl">
        <div className={cn('p-2 w-fit rounded-md')}>
          <IconComponent className={cn('w-10 h-10')} />
        </div>
        <div>
          <h2 className={cn('text-3xl text-neutral-950 dark:text-white font-bold', titleClassName)}>
            {title}
          </h2>
          <p className={cn('text-base/7 text-neutral-500', descriptionClassName)}>
            {description}
          </p>
        </div>
      </div>
    </>
  );
};
