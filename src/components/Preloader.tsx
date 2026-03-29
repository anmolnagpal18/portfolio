"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PreloaderProps {
  isLoading: boolean;
}

const Preloader: React.FC<PreloaderProps> = ({ isLoading }) => {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    if (!isLoading) {
      setPercent(100);
      return;
    }

    const interval = setInterval(() => {
      setPercent((prev) => {
        if (prev >= 99) {
          clearInterval(interval);
          return 99;
        }
        return prev + 1;
      });
    }, 20); // Fast increment to 99%

    return () => clearInterval(interval);
  }, [isLoading]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            y: "-100%",
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 }
          }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0a0a0a]"
        >
          {/* Background Text / Logo */}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none overflow-hidden">
            <h1 className="text-[20vw] font-bold whitespace-nowrap select-none uppercase tracking-tighter">
              ANMOL NAGPAL
            </h1>
          </div>

          <div className="relative z-10 text-center px-6 max-w-lg w-full">
            {/* Percentage Display */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-7xl md:text-8xl font-display font-medium text-white tracking-tighter">
                  {percent}
                </span>
                <span className="text-3xl md:text-4xl font-display text-[#BEFD4A] font-light">%</span>
              </div>
              <p className="text-gray-500 uppercase tracking-[0.3em] text-[10px] font-bold mt-4">
                Brewing Digital Experiences
              </p>
            </motion.div>

            {/* Progress Bar Container */}
            <div className="relative h-[2px] w-full bg-white/5 overflow-hidden rounded-full">
              <motion.div
                className="absolute left-0 top-0 h-full bg-[#BEFD4A]"
                initial={{ width: "0%" }}
                animate={{ width: `${percent}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </div>

            {/* Corner Decorative Elements */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-[1px] border-l-[1px] border-white/20 m-4" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t-[1px] border-r-[1px] border-white/20 m-4" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-[1px] border-l-[1px] border-white/20 m-4" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-[1px] border-r-[1px] border-white/20 m-4" />
          </div>

          {/* Subtle noise/grain overlay for texture */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.02] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
