
import { motion, useScroll, useTransform } from 'framer-motion';
import React, { useRef } from 'react';

interface ParagraphProps {
  paragraph: string;
  className?: string;
}

export default function Paragraph({ paragraph, className = '' }: ParagraphProps) {
  const container = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start 0.9", "start 0.25"]
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const baseClasses = "flex flex-wrap text-4xl md:text-5xl lg:text-6xl leading-none p-6 md:p-10 max-w-7xl text-darkText";

  return (
    <motion.p
      ref={container}
      className={`${baseClasses} ${className}`}
      style={{ opacity }}
    >
      {paragraph}
    </motion.p>
  );
}
