
import { motion, useScroll, useTransform } from 'framer-motion';
import React, { useRef } from 'react';

interface TextRevealProps {
  children: string;
  className?: string;
  animationType?: 'paragraph' | 'word' | 'character';
  startOffset?: string;
  endOffset?: string;
}

export const TextReveal: React.FC<TextRevealProps> = ({
  children,
  className = '',
  animationType = 'word',
  startOffset = 'start 0.9',
  endOffset = 'start 0.25'
}) => {
  const container = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: [startOffset, endOffset] as any
  });

  const baseClasses = "flex flex-wrap text-ellipsis whitespace-wrap";
  const combinedClasses = `${baseClasses} ${className}`;

  switch (animationType) {
    case 'paragraph':
      return <ParagraphReveal ref={container} text={children} className={combinedClasses} scrollProgress={scrollYProgress} />;
    case 'character':
      return <CharacterReveal ref={container} text={children} className={combinedClasses} scrollProgress={scrollYProgress} />;
    default:
      return <WordReveal ref={container} text={children} className={combinedClasses} scrollProgress={scrollYProgress} />;
  }
};

const ParagraphReveal = React.forwardRef<HTMLParagraphElement, {
  text: string;
  className: string;
  scrollProgress: any;
}>(({ text, className, scrollProgress }, ref) => {
  const opacity = useTransform(scrollProgress, [0, 1], [0, 1]);

  return (
    <motion.p
      ref={ref}
      className={className}
      style={{ opacity }}
    >
      {text}
    </motion.p>
  );
});

const WordReveal = React.forwardRef<HTMLParagraphElement, {
  text: string;
  className: string;
  scrollProgress: any;
}>(({ text, className, scrollProgress }, ref) => {
  const words = text.split(" ");

  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + (1 / words.length);
        return (
          <Word key={i} progress={scrollProgress} range={[start, end]}>
            {word}
          </Word>
        );
      })}
    </p>
  );
});

const CharacterReveal = React.forwardRef<HTMLParagraphElement, {
  text: string;
  className: string;
  scrollProgress: any;
}>(({ text, className, scrollProgress }, ref) => {
  const words = text.split(" ");

  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + (1 / words.length);
        return (
          <CharacterWord key={i} progress={scrollProgress} range={[start, end]}>
            {word}
          </CharacterWord>
        );
      })}
    </p>
  );
});

const Word: React.FC<{
  children: string;
  progress: any;
  range: [number, number];
}> = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0, 1]);

  return (
    <span className="relative mr-3 mt-3 text-ellipsis whitespace-nowrap">
      <span className="absolute opacity-20">{children}</span>
      <motion.span style={{ opacity }}>{children}</motion.span>
    </span>
  );
};

const CharacterWord: React.FC<{
  children: string;
  progress: any;
  range: [number, number];
}> = ({ children, progress, range }) => {
  const amount = range[1] - range[0];
  const step = amount / children.length;

  return (
    <span className="relative mr-3 mt-3">
      {children.split("").map((char, i) => {
        const start = range[0] + (i * step);
        const end = range[0] + ((i + 1) * step);
        return (
          <Character key={`c_${i}`} progress={progress} range={[start, end]}>
            {char}
          </Character>
        );
      })}
    </span>
  );
};

const Character: React.FC<{
  children: string;
  progress: any;
  range: [number, number];
}> = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0, 1]);

  return (
    <span className="relative">
      <span className="absolute opacity-20">{children}</span>
      <motion.span style={{ opacity }}>{children}</motion.span>
    </span>
  );
};

ParagraphReveal.displayName = 'ParagraphReveal';
WordReveal.displayName = 'WordReveal';
CharacterReveal.displayName = 'CharacterReveal';
