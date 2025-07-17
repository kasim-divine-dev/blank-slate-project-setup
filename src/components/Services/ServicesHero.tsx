
import { motion } from 'framer-motion';
import BoxesLayer from '../BoxesLayer/BoxesLayer';
import { SEOTextReveal } from '../TextRevealAnimation';

export const ServicesHero = () => {

  return (
    <motion.section
      className="relative min-h-screen flex items-center justify-center px-4"
    >
      <BoxesLayer gridColor="#484440" />
      <motion.div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: `radial-gradient(circle at 25% 75%, rgba(72, 68, 64, 0.4), transparent 50%),
                     radial-gradient(circle at 75% 25%, rgba(72, 68, 64, 0.3), transparent 50%)`
        }}
      />

      <div className="relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-8"
        >
          <SEOTextReveal
            as="h1"
            animationType="character"
            id="services-hero-title"
            aria-label="We craft digital solutions that drive results and inspire growth"
            className="text-darkText text-start md:text-center text-4xl sm:text-5xl md:text-7xl lg:text-8xl leading-snug"
          >
            We craft digital solutions that drive results and inspire growth.
          </SEOTextReveal>
        </motion.div>

        <motion.p
          className="text-xl md:text-2xl max-md:text-start text-[#F5E7D3]/80 max-w-4xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          From concept to execution, we deliver comprehensive digital services that transform your vision into powerful, user-centric solutions.
        </motion.p>
      </div>
    </motion.section>
  );
};
