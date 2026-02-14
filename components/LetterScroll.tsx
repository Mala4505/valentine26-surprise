"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const letterLines = [
  "My dearest,",
  "",
  "Happy Valentine's Day Love!",
  "",
  "I wanted to make this day special for you and I want to make each day more special and loving.",
  "I wish I could have given you the gift you wanted for this valentine’s.",
  "This is my way of saying sorry and thanking you for everything that you did for me.",
  "",
  "Mane tamara saathe rehwu hatu aaj na din ma especially. Itnu aawu ch ne mane Dubai magar halaat...",
  "",
  "These moments are one of the most cherished and beautiful moments of this year.",
  "These aren’t just pictures, each hold a story that make my heart loathe over these moments.",
  "",
  "I wish that I get the chance to remake these dates, even make better ones.",
  "This is a small present compared to what I love you. I hope you liked it",
  "I hope that I brought a smile on your face . ",
  "",
  "I Love you, Always and Ever!",
  "With all my heart,",
  "",
  "Forever yours",
  "Aliasger ",
];


function LetterLine({
  line,
  index,
}: {
  line: string;
  index: number;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-20px" });

  if (line === "") {
    return <div className="h-4" />;
  }

  const isSignature = index >= letterLines.length - 2;
  const isGreeting = index === 0;

  return (
    <motion.p
      ref={ref}
      initial={{ opacity: 0, y: 12 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.8,
        delay: 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`${isGreeting
          ? "font-script text-2xl sm:text-3xl text-primary mb-2"
          : isSignature
            ? "font-script text-xl sm:text-2xl text-primary/80 mt-1"
            : "text-sm sm:text-base text-foreground/80 leading-relaxed"
        }`}
    >
      {line}
    </motion.p>
  );
}

export default function LetterScroll({
  onFinished,
}: {
  onFinished: () => void;
}) {
  const endRef = useRef<HTMLDivElement>(null);
  const isEndInView = useInView(endRef, { once: true, margin: "-30px" });

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
      className="relative w-full flex flex-col items-center px-4 py-12"
    >
      {/* Parchment Background */}
      <motion.div
        initial={{ scaleY: 0, originY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-md parchment-bg rounded-lg overflow-hidden"
        style={{
          boxShadow:
            "0 4px 30px hsla(30, 30%, 40%, 0.12), 0 1px 4px hsla(30, 30%, 40%, 0.08)",
        }}
      >
        {/* Decorative top edge */}
        <div className="h-2 bg-secondary/60" />

        {/* Wax seal */}
        <div className="flex justify-center -mt-1 mb-4 pt-6">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            className="w-12 h-12 rounded-full bg-primary flex items-center justify-center shadow-lg"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="hsl(0, 0%, 100%)"
              stroke="none"
            >
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            </svg>
          </motion.div>
        </div>

        {/* Letter Content */}
        <div className="px-6 sm:px-10 pb-10 flex flex-col gap-1">
          {letterLines.map((line, index) => (
            <LetterLine key={index} line={line} index={index} />
          ))}

          {/* Decorative line under signature */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="w-24 h-px bg-primary/30 mt-4 mx-auto origin-left"
          />
        </div>

        {/* Decorative bottom edge */}
        <div className="h-2 bg-secondary/60" />
      </motion.div>

      {/* "Your turn" button */}
      <div ref={endRef} className="mt-10">
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={isEndInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          onClick={onFinished}
          className="relative px-8 py-3.5 rounded-full bg-primary text-primary-foreground font-script text-lg tracking-wide transition-all hover:opacity-90 active:scale-95 animate-pulse-glow"
        >
          Your turn
        </motion.button>
      </div>
    </motion.section>
  );
}
