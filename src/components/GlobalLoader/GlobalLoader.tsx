
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLoading } from '../../contexts/LoadingContext';

const GlobalLoader: React.FC = () => {
  const { isLoading, loadingProgress } = useLoading();

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[200] bg-black flex items-center justify-center"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{ 
            // Ensure the loader covers everything immediately
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 200
          }}
        >
          <div className="text-center">
            {/* MkRonix loader animation */}
            <div className="flex items-center justify-center mb-8">
              {"Mkronix".split("").map((letter, i) => (
                <motion.span
                  key={i}
                  className={`font-spectral uppercase text-[8vw] md:text-[4vw] leading-[.85] tracking-tight ${
                    letter === "M" || letter === "k" ? "text-[#F5E7D3]" : "text-[#F5E7D3]/60"
                  }`}
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{
                    y: 0,
                    opacity: 1,
                    transition: {
                      duration: 0.8,
                      delay: i * 0.1,
                      ease: [0.87, 0, 0.13, 1],
                    },
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </div>

            {/* Progress bar */}
            <div className="w-64 h-1 bg-[#484440] rounded-full overflow-hidden mx-auto">
              <motion.div
                className="h-full bg-[#F5E7D3] rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${loadingProgress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            
            <motion.p
              className="text-[#F5E7D3]/60 mt-4 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Loading... {Math.round(loadingProgress)}%
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GlobalLoader;
