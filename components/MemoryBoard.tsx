"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef } from "react";
import { memories } from "./MemoryData";
import MemoryCard from "./MemoryCard";

// Mini polaroid for corkboard preview
function MiniPolaroid({
  memory,
  isUnlocked,
  onClick,
  index,
}: {
  memory: (typeof memories)[0];
  isUnlocked: boolean;
  onClick: () => void;
  index: number;
}) {
  const floatClass =
    index % 2 === 0 ? "animate-gentle-float" : "animate-gentle-float-delayed";

  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      whileTap={{ scale: 0.95 }}
      className={`relative ${floatClass}`}
      style={{
        transform: `rotate(${memory.rotation}deg)`,
      }}
    >
      <div
        className={`bg-card p-1.5 pb-6 rounded-sm polaroid-shadow transition-all duration-500 ${
          isUnlocked ? "soft-glow" : ""
        }`}
      >
        <div className="relative w-20 h-16 sm:w-24 sm:h-20 overflow-hidden rounded-[2px]">
          <Image
            src={memory.image}
            alt={memory.caption}
            fill
            className={`object-cover transition-all duration-700 ${
              isUnlocked ? "blur-0" : "blur-sm brightness-75"
            }`}
            sizes="96px"
          />
          {!isUnlocked && (
            <div className="absolute inset-0 flex items-center justify-center">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="hsl(350 60% 80%)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>
          )}
        </div>
        <p className="absolute bottom-1 left-0 right-0 text-center font-script text-[10px] sm:text-xs text-muted-foreground truncate px-1">
          {memory.caption}
        </p>
      </div>
    </motion.button>
  );
}

// Sticky note component
function StickyNote({
  text,
  color,
  rotation,
  delay,
}: {
  text: string;
  color: string;
  rotation: number;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="px-3 py-2 rounded-sm shadow-md text-xs font-serif leading-relaxed"
      style={{
        backgroundColor: color,
        transform: `rotate(${rotation}deg)`,
        color: "hsl(350 20% 25%)",
      }}
    >
      {text}
    </motion.div>
  );
}

// String / connection line SVG
function StringConnection() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none opacity-20"
      viewBox="0 0 400 300"
      fill="none"
      preserveAspectRatio="none"
    >
      <path
        d="M50 50 Q200 20 350 80"
        stroke="hsl(350 40% 60%)"
        strokeWidth="1"
        strokeDasharray="4 4"
      />
      <path
        d="M80 120 Q250 100 320 200"
        stroke="hsl(350 40% 60%)"
        strokeWidth="1"
        strokeDasharray="4 4"
      />
      <path
        d="M120 40 Q180 160 300 140"
        stroke="hsl(30 40% 60%)"
        strokeWidth="1"
        strokeDasharray="4 4"
      />
    </svg>
  );
}

export default function MemoryBoard({
  onAllUnlocked,
}: {
  onAllUnlocked: () => void;
}) {
  const [unlockedMemories, setUnlockedMemories] = useState<Set<number>>(
    new Set()
  );
  const [activeMemoryIndex, setActiveMemoryIndex] = useState<number | null>(
    null
  );
  const boardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(boardRef, { once: true, margin: "-50px" });

  const handleUnlock = useCallback(
    (id: number) => {
      const newSet = new Set(unlockedMemories);
      newSet.add(id);
      setUnlockedMemories(newSet);

      // Close active card after a short delay
      setTimeout(() => {
        setActiveMemoryIndex(null);
        // Check if all memories are unlocked
        if (newSet.size === memories.length) {
          setTimeout(() => onAllUnlocked(), 800);
        }
      }, 2000);
    },
    [unlockedMemories, onAllUnlocked]
  );

  return (
    <section ref={boardRef} className="relative w-full">
      {/* Intro Text */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, ease: "easeOut" }}
        className="text-center mb-10 px-4"
      >
        <h2 className="font-script text-3xl sm:text-4xl text-primary mb-3">
          Our Memory Board
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-md mx-auto">
          Some moments with you are too special to stay in the past...
        </p>
        <p className="text-xs text-muted-foreground/60 mt-2">
          Tap a memory to unlock it
        </p>
      </motion.div>

      {/* Corkboard */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="relative mx-auto max-w-md rounded-xl corkboard-bg p-5 sm:p-6 border-4 border-secondary/40"
        style={{
          boxShadow:
            "inset 0 2px 10px rgba(0,0,0,0.15), 0 4px 20px rgba(0,0,0,0.1)",
        }}
      >
        <StringConnection />

        {/* Sticky Notes */}
        <div className="absolute top-3 right-3 z-10">
          <StickyNote
            text="Always & forever"
            color="hsl(350 50% 90%)"
            rotation={5}
            delay={0.6}
          />
        </div>
        <div className="absolute bottom-4 left-3 z-10">
          <StickyNote
            text="You & me"
            color="hsl(45 60% 90%)"
            rotation={-3}
            delay={0.8}
          />
        </div>

        {/* Mini Polaroids Grid */}
        <div className="relative z-20 grid grid-cols-3 gap-3 sm:gap-4 place-items-center py-4">
          {memories.map((memory, index) => (
            <MiniPolaroid
              key={memory.id}
              memory={memory}
              isUnlocked={unlockedMemories.has(memory.id)}
              onClick={() => setActiveMemoryIndex(index)}
              index={index}
            />
          ))}
          {/* Empty spot with decorative pin */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24"
          >
            <div className="w-3 h-3 rounded-full bg-primary/40" />
          </motion.div>
        </div>

        {/* Progress indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-3 flex items-center justify-center gap-1.5"
        >
          {memories.map((m) => (
            <div
              key={m.id}
              className={`w-2 h-2 rounded-full transition-all duration-500 ${
                unlockedMemories.has(m.id)
                  ? "bg-primary scale-110"
                  : "bg-card/40"
              }`}
            />
          ))}
        </motion.div>
      </motion.div>

      {/* Active Memory Card Overlay */}
      <AnimatePresenceWrapper
        activeMemoryIndex={activeMemoryIndex}
        unlockedMemories={unlockedMemories}
        handleUnlock={handleUnlock}
        onClose={() => setActiveMemoryIndex(null)}
      />
    </section>
  );
}

function AnimatePresenceWrapper({
  activeMemoryIndex,
  unlockedMemories,
  handleUnlock,
  onClose,
}: {
  activeMemoryIndex: number | null;
  unlockedMemories: Set<number>;
  handleUnlock: (id: number) => void;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {activeMemoryIndex !== null && (
        <motion.div
          key="overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: "hsla(350, 30%, 20%, 0.6)" }}
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-sm"
          >
            <MemoryCard
              memory={memories[activeMemoryIndex]}
              index={0}
              isActive={true}
              onUnlocked={handleUnlock}
              isUnlocked={unlockedMemories.has(
                memories[activeMemoryIndex].id
              )}
            />
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              onClick={onClose}
              className="mx-auto mt-4 flex items-center justify-center w-10 h-10 rounded-full bg-card/80 text-muted-foreground backdrop-blur-sm"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
