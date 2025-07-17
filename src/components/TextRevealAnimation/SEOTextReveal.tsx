
import React from 'react';
import { TextReveal } from './TextReveal';

interface SEOTextRevealProps {
  children: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';
  className?: string;
  animationType?: 'paragraph' | 'word' | 'character';
  startOffset?: string;
  endOffset?: string;
  id?: string;
  'aria-label'?: string;
}

export const SEOTextReveal: React.FC<SEOTextRevealProps> = ({
  children,
  as: Component = 'p',
  className = '',
  animationType = 'word',
  startOffset,
  endOffset,
  id,
  'aria-label': ariaLabel,
  ...props
}) => {
  return (
    <>
      {/* SEO-friendly hidden text for crawlers */}
      <Component
        className="sr-only"
        id={id}
        aria-label={ariaLabel}
        {...props}
      >
        {children}
      </Component>
      
      {/* Animated text for visual users */}
      <TextReveal
        className={className}
        animationType={animationType}
        startOffset={startOffset}
        endOffset={endOffset}
        aria-hidden="true"
      >
        {children}
      </TextReveal>
    </>
  );
};
