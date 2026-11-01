import React, { useState } from 'react';
import { GYM_IMAGES } from '../../data/gymImages';

export interface GymGraphicProps {
  type:
    | 'hero'
    | 'strength'
    | 'hiit'
    | 'yoga'
    | 'pilates'
    | 'cycling'
    | 'combat'
    | 'recovery'
    | 'amenities'
    | 'turf'
    | 'cardio'
    | 'flagship'
    | 'executive'
    | 'cyber'
    | 'international'
    | 'trainer-m1'
    | 'trainer-f1'
    | 'trainer-m2'
    | 'trainer-f2'
    | 'trainer-vikram'
    | 'trainer-ananya'
    | 'trainer-rohan'
    | 'trainer-priya';
  className?: string;
  overlayText?: string;
  badge?: string;
  alt?: string;
}

export const GymGraphic: React.FC<GymGraphicProps> = ({
  type,
  className = 'w-full h-full',
  overlayText,
  badge,
  alt = 'VOLT Athletic Facility'
}) => {
  const [loaded, setLoaded] = useState(false);

  // Map type to image URL
  const getImageSrc = (): string => {
    if (type.startsWith('trainer-')) {
      const key = type as keyof typeof GYM_IMAGES.trainers;
      return GYM_IMAGES.trainers[key] || GYM_IMAGES.trainers['trainer-vikram'];
    }
    const key = type as keyof typeof GYM_IMAGES;
    const url = GYM_IMAGES[key];
    return typeof url === 'string' ? url : GYM_IMAGES.strength;
  };

  const imageSrc = getImageSrc();

  if (type === 'hero') {
    return (
      <div className={`relative overflow-hidden bg-black flex items-center justify-center ${className}`}>
        <img
          src={imageSrc}
          alt={alt}
          onLoad={() => setLoaded(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
            loaded ? 'opacity-55' : 'opacity-0'
          }`}
        />
        {/* Editorial Monochrome Vibe & Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/80 pointer-events-none" />
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-neutral-900 group ${className}`}>
      <img
        src={imageSrc}
        alt={alt}
        onLoad={() => setLoaded(true)}
        className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${
          loaded ? 'opacity-90' : 'opacity-0'
        }`}
        loading="lazy"
      />

      {/* Subtle black gradient overlay for crisp legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

      {/* Optional Badge */}
      {badge && (
        <div className="absolute top-3 left-3 z-10">
          <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded bg-black/90 text-white border border-neutral-700 backdrop-blur-md">
            {badge}
          </span>
        </div>
      )}

      {/* Optional Overlay Text */}
      {overlayText && (
        <div className="absolute bottom-3 left-3 right-3 z-10">
          <p className="text-xs sm:text-sm font-bold text-white tracking-wide drop-shadow-md">
            {overlayText}
          </p>
        </div>
      )}
    </div>
  );
};
