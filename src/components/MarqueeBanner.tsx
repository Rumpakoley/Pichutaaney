import React from 'react';

export const MarqueeBanner: React.FC = () => {
  const items = [
    'For the wanderers',
    '•',
    'Rooted in memory and barir khabar',
    '•',
    'For the wanderers',
    '•',
    'Stories carried gently through time',
    '•',
    'For the wanderers',
    '•',
    'Intuitive Indian Cooking',
    '•',
  ];

  return (
    <div className="w-full bg-[#171716] text-[#E9E4DD] py-4 sm:py-5 border-y border-[#2D2D2A] overflow-hidden select-none">
      <div className="flex w-max animate-marquee whitespace-nowrap">
        <div className="flex items-center space-x-6 sm:space-x-10 px-4">
          {items.map((item, idx) => (
            <span
              key={`m1-${idx}`}
              className={`font-serif tracking-widest uppercase transition-colors ${
                item === '•'
                  ? 'text-[#EED485] text-xs'
                  : 'text-sm sm:text-base md:text-lg font-normal tracking-[0.2em] text-[#E9E4DD]/90 hover:text-[#EED485]'
              }`}
            >
              {item}
            </span>
          ))}
        </div>
        <div className="flex items-center space-x-6 sm:space-x-10 px-4" aria-hidden="true">
          {items.map((item, idx) => (
            <span
              key={`m2-${idx}`}
              className={`font-serif tracking-widest uppercase transition-colors ${
                item === '•'
                  ? 'text-[#EED485] text-xs'
                  : 'text-sm sm:text-base md:text-lg font-normal tracking-[0.2em] text-[#E9E4DD]/90 hover:text-[#EED485]'
              }`}
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
