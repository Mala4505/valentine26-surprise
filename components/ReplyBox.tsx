"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Heart particle component
function HeartParticle({ delay, x }: { delay: number; x: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 0, x, scale: 0 }}
      animate={{
        opacity: [0, 1, 1, 0],
        y: [0, -40, -80, -130],
        x: [x, x + (Math.random() - 0.5) * 40, x + (Math.random() - 0.5) * 60],
        scale: [0, 1, 0.8, 0.3],
        rotate: [0, (Math.random() - 0.5) * 30],
      }}
      transition={{
        duration: 2.5,
        delay,
        ease: "easeOut",
      }}
      className="absolute bottom-0 pointer-events-none"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="hsl(350, 60%, 55%)"
        stroke="none"
        style={{ opacity: 0.7 + Math.random() * 0.3 }}
      >
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      </svg>
    </motion.div>
  );
}

export default function ReplyBox() {
  const [message, setMessage] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const [showParticles, setShowParticles] = useState(false);
  const [particles, setParticles] = useState<{ id: number; delay: number; x: number }[]>([]);

  const handleSubmit = useCallback(() => {
    if (!message.trim()) return;

    // Save to localStorage
    const savedMessages = JSON.parse(
      localStorage.getItem("love-messages") || "[]"
    );
    savedMessages.push({
      text: message,
      date: new Date().toISOString(),
    });
    localStorage.setItem("love-messages", JSON.stringify(savedMessages));

    // Generate heart particles
    const newParticles = Array.from({ length: 15 }, (_, i) => ({
      id: Date.now() + i,
      delay: i * 0.1,
      x: (Math.random() - 0.5) * 200,
    }));
    setParticles(newParticles);
    setShowParticles(true);
    setIsSaved(true);

    // Clean up particles after animation
    setTimeout(() => {
      setShowParticles(false);
      setParticles([]);
    }, 4000);
  }, [message]);

  // Check for existing message
  useEffect(() => {
    const savedMessages = JSON.parse(
      localStorage.getItem("love-messages") || "[]"
    );
    if (savedMessages.length > 0) {
      const last = savedMessages[savedMessages.length - 1];
      setMessage(last.text);
    }
  }, []);

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className="w-full flex flex-col items-center px-4 py-12"
    >
      <motion.h3
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="font-script text-2xl sm:text-3xl text-primary mb-2 text-center"
      >
        Your Words
      </motion.h3>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-sm text-muted-foreground mb-8 text-center"
      >
        Leave something beautiful for future us
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.8 }}
        className="relative w-full max-w-md"
      >
        {/* Message area */}
        <div className="relative parchment-bg rounded-xl p-6 polaroid-shadow">
          {/* Decorative corner flourishes */}
          <div className="absolute top-2 left-3 text-primary/20 font-script text-lg select-none">
            {String.fromCharCode(8220)}
          </div>
          <div className="absolute bottom-2 right-3 text-primary/20 font-script text-lg select-none">
            {String.fromCharCode(8221)}
          </div>

          <textarea
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              if (isSaved) setIsSaved(false);
            }}
            placeholder="Write something for future us..."
            rows={5}
            className="w-full bg-transparent text-foreground text-sm leading-relaxed placeholder:text-muted-foreground/50 resize-none focus:outline-none font-serif"
          />
        </div>

        {/* Heart particles container */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
          <AnimatePresence>
            {showParticles &&
              particles.map((p) => (
                <HeartParticle key={p.id} delay={p.delay} x={p.x} />
              ))}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Submit button or saved confirmation */}
      <div className="mt-6 h-12 flex items-center">
        <AnimatePresence mode="wait">
          {isSaved ? (
            <motion.div
              key="saved"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2 text-primary"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
                stroke="none"
              >
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
              </svg>
              <span className="font-script text-lg">Saved.</span>
            </motion.div>
          ) : (
            <motion.button
              key="submit"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleSubmit}
              disabled={!message.trim()}
              className="px-8 py-3 rounded-full bg-primary text-primary-foreground font-script text-lg tracking-wide transition-all hover:opacity-90 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Send with love
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  );
}
