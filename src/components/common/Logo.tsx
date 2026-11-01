import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  theme?: 'dark' | 'light';
}

export const Logo: React.FC<LogoProps> = ({ className = '', size = 'md', theme = 'dark' }) => {
  const sizeClasses = {
    sm: 'h-7',
    md: 'h-9',
    lg: 'h-12'
  }[size];

  const textSizes = {
    sm: 'text-base tracking-widest',
    md: 'text-xl tracking-widest',
    lg: 'text-2xl tracking-widest'
  }[size];

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* High-Contrast Dual-Tone Crest: Pure White & Jet Black */}
      <div className={`${sizeClasses} aspect-square bg-white text-black border border-neutral-300 rounded-lg flex items-center justify-center font-black shadow-sm group-hover:bg-neutral-100 transition-colors shrink-0`}>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="square"
          strokeLinejoin="miter"
          className="w-5 h-5 text-black"
        >
          {/* Angular dual-tone athletic bolt */}
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" fill="currentColor" stroke="none" />
        </svg>
      </div>

      <div className="flex flex-col leading-none">
        <span className={`font-black font-display uppercase ${textSizes} ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
          VOLT
        </span>
        <span className="text-[9px] font-bold tracking-[0.22em] text-neutral-400 uppercase mt-0.5">
          ATHLETIC CLUB
        </span>
      </div>
    </div>
  );
};
