"use client";

import { motion } from "framer-motion";

// Floating petal component
function FloatingPetal({ delay, size, x, duration }: { delay: number; size: number; x: string; duration: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20, x: 0, rotate: 0 }}
      animate={{
        opacity: [0, 0.6, 0.6, 0],
        y: ["-5vh", "105vh"],
        rotate: [0, 360],
        x: [0, Math.random() > 0.5 ? 30 : -30, Math.random() > 0.5 ? -20 : 20, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "linear",
      }}
      className="absolute pointer-events-none"
      style={{ left: x, top: 0 }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 20 20"
        fill="hsl(350, 60%, 75%)"
        style={{ opacity: 0.5 }}
      >
        <ellipse cx="10" cy="8" rx="5" ry="8" />
      </svg>
    </motion.div>
  );
}

export default function HeroSection({ onStart }: { onStart: () => void }) {
  const petals = Array.from({ length: 8 }, (_, i) => ({
    delay: i * 1.5 + Math.random() * 2,
    size: 10 + Math.random() * 10,
    x: `${10 + Math.random() * 80}%`,
    duration: 8 + Math.random() * 6,
  }));

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4">
      {/* Floating petals */}
      {petals.map((petal, i) => (
        <FloatingPetal key={i} {...petal} />
      ))}

      {/* Soft radial glow background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 40%, hsla(350, 50%, 85%, 0.3) 0%, transparent 70%)",
        }}
      />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 flex flex-col items-center text-center"
      >
        {/* Heart icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="mb-6"
        >
          <motion.div
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="hsl(350, 60%, 55%)"
              stroke="none"
            >
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            </svg>
          </motion.div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="font-script text-5xl sm:text-6xl lg:text-7xl text-primary mb-4 text-balance"
        >
          Our Memories
        </motion.h1>
        <br/>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-muted-foreground text-base sm:text-lg max-w-xs leading-relaxed mb-10"
        >
          A journey through the moments that made us, us.
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-muted-foreground text-base sm:text-lg max-w-xs leading-relaxed mb-10"
        >
          I hope you like it. Please do watch till the end…
        </motion.p>

        {/* Decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="w-16 h-px bg-primary/30 mb-10"
        />

        {/* CTA */}
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          onClick={onStart}
          className="relative px-8 py-3.5 rounded-full bg-primary text-primary-foreground font-serif text-sm tracking-widest uppercase transition-all hover:opacity-90 active:scale-95"
        >
          <span>Begin</span>
          <motion.div
            className="absolute inset-0 rounded-full"
            animate={{
              boxShadow: [
                "0 0 0 0 hsla(350, 60%, 55%, 0.4)",
                "0 0 0 12px hsla(350, 60%, 55%, 0)",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.button>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 2 }}
          className="mt-12"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              className="text-muted-foreground"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
