'use client';
import { LandingCard, CardContent, CardHeader, CardTitle, } from './landingcard';
import { testimonials } from '@/constants/landing/constants'

export const LandingContent = () => {
  return (
    <div className="px-10 pb-20">
      <h2 className="text-center text-4xl text-white font-extrabold mb-10">
        Testimonials
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {testimonials.map((item, index) => (
          <LandingCard
            key={item.description}
            className="bg-neutral-400 border-none text-black rounded-xl"
            index={index}
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-x-2">
                <div>
                  <p className="text-lg">{item.name}</p>
                  <p className="text-zinc-700 text-sm">{item.title}</p>
                </div>
              </CardTitle>
              <CardContent className="pt-4 px-0">
                {item.description}
              </CardContent>
            </CardHeader>
          </LandingCard>
        ))}
      </div>
    </div>
  );
};
