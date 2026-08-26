'use client';

import { useState } from 'react';

export default function ImageSlider({ images, alt }: { images: string[], alt: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) return null;
  if (images.length === 1) {
    return <img src={images[0]} alt={alt} className="w-full h-full object-cover" />;
  }

  const nextSlide = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <div className="relative w-full h-full group">
      <img src={images[currentIndex]} alt={`${alt} ${currentIndex + 1}`} className="w-full h-full object-cover" />
      
      {/* Navigation Buttons */}
      <button 
        onClick={prevSlide}
        className="absolute top-1/2 left-2 -translate-y-1/2 bg-black/50 text-white w-8 h-8 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gold z-10"
        aria-label="Previous image"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
      </button>
      
      <button 
        onClick={nextSlide}
        className="absolute top-1/2 right-2 -translate-y-1/2 bg-black/50 text-white w-8 h-8 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gold z-10"
        aria-label="Next image"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
      </button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5 z-10">
        {images.map((_, idx) => (
          <div 
            key={idx} 
            className={`h-1.5 rounded-full transition-all ${idx === currentIndex ? 'w-4 bg-gold' : 'w-1.5 bg-white/70'}`}
          />
        ))}
      </div>
    </div>
  );
}
