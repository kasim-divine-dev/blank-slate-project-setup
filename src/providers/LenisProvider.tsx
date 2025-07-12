
import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { gsap } from 'gsap';

interface LenisProviderProps {
  children: React.ReactNode;
}

export const LenisProvider: React.FC<LenisProviderProps> = ({ children }) => {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis
    lenisRef.current = new Lenis({
      lerp: 0.1,
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    // GSAP ScrollTrigger integration
    gsap.registerPlugin(ScrollTrigger);
    
    const updateScrollTrigger = (time: number) => {
      if (lenisRef.current) {
        lenisRef.current.raf(time);
        ScrollTrigger.update();
      }
    };

    // Animation loop
    const animate = (time: number) => {
      updateScrollTrigger(time);
      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);

    // ScrollTrigger integration
    lenisRef.current.on('scroll', ScrollTrigger.update);

    return () => {
      if (lenisRef.current) {
        lenisRef.current.destroy();
      }
    };
  }, []);

  return <>{children}</>;
};
