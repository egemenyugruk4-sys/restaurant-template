"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Preloader({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsLoading(false);
    }, 1700);

    return () => {
      window.clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = isLoading ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isLoading]);

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="preloader"
            className="fixed inset-0 z-[9999] overflow-hidden bg-[#090909]"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              initial={{ y: "0%" }}
              exit={{ y: "-100%" }}
              transition={{
                duration: 0.9,
                ease: [0.76, 0, 0.24, 1],
              }}
              className="absolute inset-x-0 top-0 h-1/2 bg-[#0a0a0a]"
            />

            <motion.div
              initial={{ y: "0%" }}
              exit={{ y: "100%" }}
              transition={{
                duration: 0.9,
                ease: [0.76, 0, 0.24, 1],
              }}
              className="absolute inset-x-0 bottom-0 h-1/2 bg-[#0a0a0a]"
            />

            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(251,191,36,0.08),transparent_45%)]" />

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.45 }}
              className="relative z-10 flex h-full items-center justify-center px-6"
            >
              <div className="flex flex-col items-center">
                <motion.p
                  initial={{
                    opacity: 0,
                    y: 18,
                    letterSpacing: "0.15em",
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    letterSpacing: "0.45em",
                  }}
                  transition={{
                    duration: 0.7,
                    ease: "easeOut",
                  }}
                  className="text-xs font-bold text-amber-400 sm:text-sm"
                >
                  KUŞADASI MARİNA
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, scale: 0.75 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.7,
                    delay: 0.15,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="mt-7 flex h-28 w-28 items-center justify-center rounded-full border border-amber-400/30 bg-amber-400/[0.04] shadow-[0_0_80px_rgba(251,191,36,0.14)] sm:h-32 sm:w-32"
                >
                  <motion.span
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.35,
                      ease: "easeOut",
                    }}
                    className="text-5xl font-black tracking-[-0.08em] text-white sm:text-6xl"
                  >
                    01
                  </motion.span>
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.4,
                    ease: "easeOut",
                  }}
                  className="mt-7 text-center text-2xl font-black tracking-tight text-white sm:text-4xl"
                >
                  ADANA OCAKBAŞI
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.65,
                  }}
                  className="mt-2 text-center text-sm font-medium tracking-[0.35em] text-white/35"
                >
                  MARİNA
                </motion.p>

                <div className="mt-9 h-px w-64 overflow-hidden bg-white/10">
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{
                      duration: 1.15,
                      delay: 0.35,
                      ease: [0.65, 0, 0.35, 1],
                    }}
                    className="h-full origin-left bg-gradient-to-r from-transparent via-amber-400 to-transparent"
                  />
                </div>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.65, 0.35] }}
                  transition={{
                    duration: 1.1,
                    delay: 0.55,
                  }}
                  className="mt-5 text-[10px] font-semibold tracking-[0.35em] text-white/35"
                >
                  SOFRANIZ HAZIRLANIYOR
                </motion.p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: isLoading ? 0 : 1,
        }}
        transition={{
          duration: 0.65,
          delay: isLoading ? 0 : 0.15,
        }}
      >
        {children}
      </motion.div>
    </>
  );
}