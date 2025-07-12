
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import BoxesLayer from '../BoxesLayer/BoxesLayer';
import { DrawCircleText } from '../DrawCircleText/DrawCircleText';

export const ContactHero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <motion.section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center px-4"
      style={{ y: textY }}
    >
      <BoxesLayer gridColor="#484440" />
      <motion.div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          y: backgroundY,
          background: `radial-gradient(circle at 30% 70%, rgba(72, 68, 64, 0.4), transparent 50%),
                     radial-gradient(circle at 70% 30%, rgba(72, 68, 64, 0.3), transparent 50%)`
        }}
      />

      <div ref={heroRef} className="relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-8"
        >
          <DrawCircleText
            normalText="Let's bring your vision to "
            normalText2="together and create something extraordinary."
            circleText="life"
          />
        </motion.div>

        <motion.p
          className="text-xl md:text-2xl text-[#F5E7D3]/80 max-w-4xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Ready to transform your ideas into digital reality? We'd love to hear about your project and explore how we can make magic happen.
        </motion.p>
      </div>
    </motion.section>
  );
};
