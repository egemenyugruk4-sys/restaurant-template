"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 500);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={scrollToTop}
          initial={{
            opacity: 0,
            scale: 0.8,
            y: 20,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            scale: 0.8,
            y: 20,
          }}
          whileHover={{
            y: -4,
            scale: 1.05,
          }}
          whileTap={{
            scale: 0.95,
          }}
          transition={{
            duration: 0.25,
          }}
          aria-label="Sayfanın başına dön"
          className="fixed bottom-6 right-6 z-[90] flex h-12 w-12 items-center justify-center rounded-full border border-[#7B1E22]/70 bg-[#070707]/85 text-xl font-black text-[#B85C5F] shadow-[0_16px_45px_rgba(0,0,0,0.45),0_0_28px_rgba(123,30,34,0.18)] backdrop-blur-xl transition-colors duration-300 hover:border-[#B85C5F] hover:bg-[#7B1E22] hover:text-white"
        >
          ↑
        </motion.button>
      )}
    </AnimatePresence>
  );
}