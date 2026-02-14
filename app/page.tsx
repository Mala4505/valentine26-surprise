"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HeroSection from "@/components/HeroSection";
import MemoryBoard from "@/components/MemoryBoard";
import LetterScroll from "@/components/LetterScroll";
import ReplyBox from "@/components/ReplyBox";

type Section = "hero" | "board" | "letter" | "reply";

export default function Home() {
  const [currentSection, setCurrentSection] = useState<Section>("hero");
  const mainRef = useRef<HTMLDivElement>(null);

  const scrollToTop = useCallback(() => {
    if (mainRef.current) {
      mainRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleStart = useCallback(() => {
    setCurrentSection("board");
    setTimeout(scrollToTop, 100);
  }, [scrollToTop]);

  const handleAllUnlocked = useCallback(() => {
    setCurrentSection("letter");
    setTimeout(scrollToTop, 100);
  }, [scrollToTop]);

  const handleLetterFinished = useCallback(() => {
    setCurrentSection("reply");
    setTimeout(scrollToTop, 100);
  }, [scrollToTop]);

  return (
    <main
      ref={mainRef}
      className="relative min-h-screen overflow-x-hidden"
    >
      {/* Subtle background pattern */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 30%, hsla(350, 40%, 90%, 0.3) 0%, transparent 40%), radial-gradient(circle at 80% 70%, hsla(30, 40%, 90%, 0.3) 0%, transparent 40%)",
        }}
      />

      <div className="relative z-10">
        <AnimatePresence mode="wait">
          {currentSection === "hero" && (
            <motion.div
              key="hero"
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.8 }}
            >
              <HeroSection onStart={handleStart} />
            </motion.div>
          )}

          {currentSection === "board" && (
            <motion.div
              key="board"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.8 }}
              className="min-h-screen flex flex-col items-center justify-center py-12"
            >
              <MemoryBoard onAllUnlocked={handleAllUnlocked} />
            </motion.div>
          )}

          {currentSection === "letter" && (
            <motion.div
              key="letter"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.8 }}
              className="min-h-screen flex flex-col items-center justify-start py-12"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-center mb-6 px-4"
              >
                <h2 className="font-script text-3xl sm:text-4xl text-primary mb-2">
                  A Letter For You
                </h2>
                <p className="text-sm text-muted-foreground">
                  Read slowly, feel deeply
                </p>
              </motion.div>
              <LetterScroll onFinished={handleLetterFinished} />
            </motion.div>
          )}

          {currentSection === "reply" && (
            <motion.div
              key="reply"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="min-h-screen flex flex-col items-center justify-center"
            >
              <ReplyBox />

              {/* Footer */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="mt-8 pb-8 text-center"
              >
                <p className="font-script text-sm text-muted-foreground/50">
                  Made with love, for you
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
