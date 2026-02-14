// // "use client";

// // import { useState, useCallback, useRef, useEffect } from "react";
// // import Image from "next/image";
// // import { motion, AnimatePresence } from "framer-motion";
// // import type { Memory } from "./MemoryData";

// // /* ── Single-letter input row ── */
// // function LetterBoxes({
// //   answer,
// //   onCorrect,
// //   onWrong,
// // }: {
// //   answer: string;
// //   onCorrect: () => void;
// //   onWrong: () => void;
// // }) {
// //   const letters = answer.toUpperCase().split("");
// //   const [values, setValues] = useState<string[]>(Array(letters.length).fill(""));
// //   const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

// //   useEffect(() => {
// //     inputRefs.current = inputRefs.current.slice(0, letters.length);
// //   }, [letters.length]);

// //   const handleChange = (index: number, char: string) => {
// //     const sanitized = char.replace(/[^a-zA-Z]/g, "").toUpperCase();
// //     if (!sanitized && char !== "") return;

// //     const next = [...values];
// //     next[index] = sanitized;
// //     setValues(next);

// //     if (sanitized && index < letters.length - 1) {
// //       inputRefs.current[index + 1]?.focus();
// //     }

// //     if (sanitized) {
// //       const filled = next.filter(Boolean).length;
// //       if (filled === letters.length) {
// //         const attempt = next.join("");
// //         if (attempt === answer.toUpperCase()) {
// //           onCorrect();
// //         } else {
// //           onWrong();
// //           setTimeout(() => {
// //             setValues(Array(letters.length).fill(""));
// //             inputRefs.current[0]?.focus();
// //           }, 700);
// //         }
// //       }
// //     }
// //   };

// //   const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
// //     if (e.key === "Backspace" && !values[index] && index > 0) {
// //       inputRefs.current[index - 1]?.focus();
// //       const next = [...values];
// //       next[index - 1] = "";
// //       setValues(next);
// //     }
// //   };

// //   return (
// //     <div className="flex items-center justify-center gap-1.5 flex-wrap">
// //       {letters.map((_, i) => (
// //         <input
// //           key={i}
// //           ref={(el) => {
// //             inputRefs.current[i] = el;
// //           }}
// //           type="text"
// //           inputMode="text"
// //           maxLength={1}
// //           value={values[i]}
// //           onChange={(e) => handleChange(i, e.target.value)}
// //           onKeyDown={(e) => handleKeyDown(i, e)}
// //           className="w-9 h-11 sm:w-10 sm:h-12 rounded-md bg-card border-2 border-border text-center text-lg font-serif text-foreground uppercase transition-all duration-200 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
// //         />
// //       ))}
// //     </div>
// //   );
// // }

// // /* ── Main MemoryCard ── */
// // interface MemoryCardProps {
// //   memory: Memory;
// //   index: number;
// //   isActive: boolean;
// //   onUnlocked: (id: number) => void;
// //   isUnlocked: boolean;
// // }

// // export default function MemoryCard({
// //   memory,
// //   index,
// //   isActive,
// //   onUnlocked,
// //   isUnlocked,
// // }: MemoryCardProps) {
// //   const [showHint, setShowHint] = useState(false);
// //   const [isShaking, setIsShaking] = useState(false);
// //   const [isRevealed, setIsRevealed] = useState(false);

// //   const handleCorrect = useCallback(() => {
// //     setIsRevealed(true);
// //     setTimeout(() => onUnlocked(memory.id), 300);
// //   }, [memory.id, onUnlocked]);

// //   const handleWrong = useCallback(() => {
// //     setIsShaking(true);
// //     setShowHint(true);
// //     setTimeout(() => setIsShaking(false), 700);
// //   }, []);

// //   const handleChoiceSelect = useCallback(
// //     (choice: string) => {
// //       if (memory.answer && choice.toLowerCase().trim() === memory.answer.toLowerCase()) {
// //         handleCorrect();
// //       } else {
// //         handleWrong();
// //       }
// //     },
// //     [memory.answer, handleCorrect, handleWrong]
// //   );

// //   const handleAutoUnlock = useCallback(() => {
// //     if (memory.unlockType === "none") {
// //       setIsRevealed(true);
// //       setTimeout(() => onUnlocked(memory.id), 300);
// //     }
// //   }, [memory.unlockType, memory.id, onUnlocked]);

// //   const revealed = isUnlocked || isRevealed;

// //   return (
// //     <motion.div
// //       initial={{ opacity: 0, y: 60 }}
// //       animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0.3, y: 20 }}
// //       transition={{
// //         duration: 0.8,
// //         ease: [0.22, 1, 0.36, 1],
// //         delay: index * 0.1,
// //       }}
// //       className="w-full max-w-sm mx-auto"
// //     >
// //       <motion.div
// //         animate={isShaking ? { x: [-8, 8, -6, 6, -3, 3, 0] } : {}}
// //         transition={{ duration: 0.6 }}
// //         className={`relative rounded-lg overflow-hidden transition-all duration-700 ${
// //           revealed ? "soft-glow" : ""
// //         }`}
// //         style={{ transform: `rotate(${memory.rotation}deg)` }}
// //       >
// //         {/* Polaroid */}
// //         {/* <div className="bg-card rounded-lg polaroid-shadow flex flex-col">
          
// //           <div className="relative w-full overflow-hidden rounded-sm flex-grow">
// //             <Image
// //               src={memory.image}
// //               alt={memory.caption}
// //               width={300}
// //               height={400}
// //               className={`object-contain object-center transition-all duration-1000 ${
// //                 revealed ? "blur-0 scale-100" : "blur-md scale-105"
// //               }`}
// //             />

// //             <AnimatePresence>
// //               {!revealed && (
// //                 <motion.div
// //                   exit={{ opacity: 0 }}
// //                   transition={{ duration: 0.8 }}
// //                   className="absolute inset-0 flex flex-col items-center justify-center bg-foreground/10 backdrop-blur-sm"
// //                 >
// //                   <motion.div
// //                     animate={{ scale: [1, 1.1, 1] }}
// //                     transition={{ duration: 2, repeat: Infinity }}
// //                   >
// //                     <svg
// //                       width="32"
// //                       height="32"
// //                       viewBox="0 0 24 24"
// //                       fill="none"
// //                       stroke="hsl(350 60% 55%)"
// //                       strokeWidth="1.5"
// //                       strokeLinecap="round"
// //                       strokeLinejoin="round"
// //                     >
// //                       <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
// //                     </svg>
// //                   </motion.div>
// //                 </motion.div>
// //               )}
// //             </AnimatePresence>
// //           </div>

// //           <div className="bg-white py-3 px-2">
// //             <p className="font-script text-xl text-foreground/80 text-center">
// //               {memory.caption}
// //             </p>
// //           </div>
// //         </div> */}

// // {/* Polaroid */}
// // <div className="bg-white rounded-lg polaroid-shadow flex flex-col items-center p-3 pb-6">
// //   {/* Inner photo frame */}
// //   <div className="relative w-[85%] overflow-hidden rounded-sm bg-black">
// //     <Image
// //       src={memory.image}
// //       alt={memory.caption}
// //       width={300}
// //       height={400}
// //       className={`object-contain object-center transition-all duration-1000 ${
// //         revealed ? "blur-0 scale-100" : "blur-md scale-105"
// //       }`}
// //     />

// //     <AnimatePresence>
// //       {!revealed && (
// //         <motion.div
// //           exit={{ opacity: 0 }}
// //           transition={{ duration: 0.8 }}
// //           className="absolute inset-0 flex flex-col items-center justify-center bg-foreground/10 backdrop-blur-sm"
// //         >
// //           <motion.div
// //             animate={{ scale: [1, 1.1, 1] }}
// //             transition={{ duration: 2, repeat: Infinity }}
// //           >
// //             {/* Lock icon */}
// //             <svg
// //               width="32"
// //               height="32"
// //               viewBox="0 0 24 24"
// //               fill="none"
// //               stroke="hsl(350 60% 55%)"
// //               strokeWidth="1.5"
// //               strokeLinecap="round"
// //               strokeLinejoin="round"
// //             >
// //               <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
// //             </svg>
// //           </motion.div>
// //         </motion.div>
// //       )}
// //     </AnimatePresence>
// //   </div>

// //   {/* Caption strip */}
// //   <div className="mt-3">
// //     <p className="font-script text-lg text-foreground/80 text-center">
// //       {memory.caption}
// //     </p>
// //   </div>
// // </div>


// //         {/* Interaction */}
// //         <AnimatePresence mode="wait">
// //           {revealed ? (
// //             <motion.div
// //               key="revealed"
// //               initial={{ opacity: 0, y: 10 }}
// //               animate={{ opacity: 1, y: 0 }}
// //               transition={{ duration: 0.6, delay: 0.3 }}
// //               className="mt-4 px-2"
// //             >
// //               <p className="text-sm leading-relaxed text-muted-black text-center italic">
// //                 {`"${memory.shortText}"`}
// //               </p>
// //             </motion.div>
// //           ) : isActive ? (
// //             <motion.div
// //               key="interaction"
// //               initial={{ opacity: 0, y: 10 }}
// //               animate={{ opacity: 1, y: 0 }}
// //               transition={{ duration: 0.5 }}
// //               className="mt-5 px-2"
// //             >
// //               {memory.unlockType === "none" ? (
// //                 <button
// //                   onClick={handleAutoUnlock}
// //                   className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-serif text-sm tracking-wide transition-all duration-300 hover:opacity-90 active:scale-[0.98] animate-pulse-glow"
// //                 >
// //                   Reveal this memory
// //                 </button>
// //               ) : memory.unlockType === "word" ? (
// //                 <div className="flex flex-col gap-3">
// //                   <p className="text-sm text-muted-foreground text-center">
// //                     {memory.question}
// //                   </p>
// //                   <LetterBoxes
// //                     answer={memory.answer!}
// //                     onCorrect={handleCorrect}
// //                     onWrong={handleWrong}
// //                   />
// //                   <AnimatePresence>
// //                     {showHint && memory.hint && (
// //                       <motion.p
// //                         initial={{ opacity: 0, height: 0 }}
// //                         animate={{ opacity: 1, height: "auto" }}
// //                         exit={{ opacity: 0, height: 0 }}
// //                         className="text-xs text-primary/70 text-center italic"
// //                       >
// //                         {memory.hint}
// //                       </motion.p>
// //                     )}
// //                   </AnimatePresence>
// //                 </div>
// //               ) : memory.unlockType === "choice" ? (
// //                 <div className="flex flex-col gap-3">
// //                   <p className="text-sm text-muted-foreground text-center">
// //                     {memory.question}
// //                   </p>
// //                   <div className="grid grid-cols-2 gap-2">
// //                     {memory.choices?.map((choice) => (
// //                       <button
// //                         key={choice}
// //                         onClick={() => handleChoiceSelect(choice)}
// //                         className="py-2.5 px-3 rounded-lg bg-card border border-border text-foreground text-sm transition-all hover:bg-accent hover:border-primary/30 active:scale-95"
// //                       >
// //                         {choice}
// //                       </button>
// //                     ))}
// //                   </div>
// //                   <AnimatePresence>
// //                     {showHint && memory.hint && (
// //                       <motion.p
// //                         initial={{ opacity: 0, height: 0 }}
// //                         animate={{ opacity: 1, height: "auto" }}
// //                         exit={{ opacity: 0, height: 0 }}
// //                         className="text-xs text-primary/70 text-center italic"
// //                       >
// //                         {memory.hint}
// //                       </motion.p>
// //                     )}
// //                   </AnimatePresence>
// //                 </div>
// //               ) : null}
// //             </motion.div>
// //           ) : null}
// //         </AnimatePresence>
// //       </motion.div>
// //     </motion.div>
// //   );
// // }


// "use client";

// import { useState, useCallback, useRef, useEffect } from "react";
// import Image from "next/image";
// import { motion, AnimatePresence } from "framer-motion";
// import type { Memory } from "./MemoryData";

// /* ── Single-letter input row ── */
// function LetterBoxes({
//   answer,
//   onCorrect,
//   onWrong,
// }: {
//   answer: string;
//   onCorrect: () => void;
//   onWrong: () => void;
// }) {
//   const letters = answer.toUpperCase().split("");
//   const [values, setValues] = useState<string[]>(Array(letters.length).fill(""));
//   const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

//   useEffect(() => {
//     inputRefs.current = inputRefs.current.slice(0, letters.length);
//   }, [letters.length]);

//   const handleChange = (index: number, char: string) => {
//     const sanitized = char.replace(/[^a-zA-Z]/g, "").toUpperCase();
//     if (!sanitized && char !== "") return;

//     const next = [...values];
//     next[index] = sanitized;
//     setValues(next);

//     if (sanitized && index < letters.length - 1) {
//       inputRefs.current[index + 1]?.focus();
//     }

//     if (sanitized) {
//       const filled = next.filter(Boolean).length;
//       if (filled === letters.length) {
//         const attempt = next.join("");
//         if (attempt === answer.toUpperCase()) {
//           onCorrect();
//         } else {
//           onWrong();
//           setTimeout(() => {
//             setValues(Array(letters.length).fill(""));
//             inputRefs.current[0]?.focus();
//           }, 700);
//         }
//       }
//     }
//   };

//   const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === "Backspace" && !values[index] && index > 0) {
//       inputRefs.current[index - 1]?.focus();
//       const next = [...values];
//       next[index - 1] = "";
//       setValues(next);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center gap-1.5 flex-wrap">
//       {letters.map((_, i) => (
//         <input
//           key={i}
//           ref={(el) => {
//             inputRefs.current[i] = el;
//           }}
//           type="text"
//           inputMode="text"
//           maxLength={1}
//           value={values[i]}
//           onChange={(e) => handleChange(i, e.target.value)}
//           onKeyDown={(e) => handleKeyDown(i, e)}
//           className="w-9 h-11 sm:w-10 sm:h-12 rounded-md bg-card border-2 border-border text-center text-lg font-serif text-foreground uppercase transition-all duration-200 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
//         />
//       ))}
//     </div>
//   );
// }

// /* ── Main MemoryCard ── */
// interface MemoryCardProps {
//   memory: Memory;
//   index: number;
//   isActive: boolean;
//   onUnlocked: (id: number) => void;
//   isUnlocked: boolean;
// }

// export default function MemoryCard({
//   memory,
//   index,
//   isActive,
//   onUnlocked,
//   isUnlocked,
// }: MemoryCardProps) {
//   const [showHint, setShowHint] = useState(false);
//   const [isShaking, setIsShaking] = useState(false);
//   const [isRevealed, setIsRevealed] = useState(false);

//   const handleCorrect = useCallback(() => {
//     setIsRevealed(true);
//     setTimeout(() => onUnlocked(memory.id), 300);
//   }, [memory.id, onUnlocked]);

//   const handleWrong = useCallback(() => {
//     setIsShaking(true);
//     setShowHint(true);
//     setTimeout(() => setIsShaking(false), 700);
//   }, []);

//   const handleChoiceSelect = useCallback(
//     (choice: string) => {
//       if (memory.answer && choice.toLowerCase().trim() === memory.answer.toLowerCase()) {
//         handleCorrect();
//       } else {
//         handleWrong();
//       }
//     },
//     [memory.answer, handleCorrect, handleWrong]
//   );

//   const handleAutoUnlock = useCallback(() => {
//     if (memory.unlockType === "none") {
//       setIsRevealed(true);
//       setTimeout(() => onUnlocked(memory.id), 300);
//     }
//   }, [memory.unlockType, memory.id, onUnlocked]);

//   const revealed = isUnlocked || isRevealed;

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 60 }}
//       animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0.3, y: 20 }}
//       transition={{
//         duration: 0.8,
//         ease: [0.22, 1, 0.36, 1],
//         delay: index * 0.1,
//       }}
//       className="w-full max-w-sm mx-auto"
//     >
//       <motion.div
//         animate={isShaking ? { x: [-8, 8, -6, 6, -3, 3, 0] } : {}}
//         transition={{ duration: 0.6 }}
//         className={`relative rounded-lg overflow-hidden transition-all duration-700 ${
//           revealed ? "soft-glow" : ""
//         }`}
//         style={{ transform: `rotate(${memory.rotation}deg)` }}
//       >
//         {/* Polaroid */}
//         <div className="bg-white rounded-lg polaroid-shadow flex flex-col items-center p-3 pb-6">
//           {/* Inner photo frame */}
//           <div className="relative w-[85%] overflow-hidden rounded-sm bg-black">
//             <Image
//               src={memory.image}
//               alt={memory.caption}
//               width={300}
//               height={400}
//               className={`object-contain object-center transition-all duration-1000 ${
//                 revealed ? "blur-0 scale-100" : "blur-md scale-105"
//               }`}
//             />

//             <AnimatePresence>
//               {!revealed && (
//                 <motion.div
//                   exit={{ opacity: 0 }}
//                   transition={{ duration: 0.8 }}
//                   className="absolute inset-0 flex flex-col items-center justify-center bg-foreground/10 backdrop-blur-sm"
//                 >
//                   <motion.div
//                     animate={{ scale: [1, 1.1, 1] }}
//                     transition={{ duration: 2, repeat: Infinity }}
//                   >
//                     {/* Lock icon */}
//                     <svg
//                       width="32"
//                       height="32"
//                       viewBox="0 0 24 24"
//                       fill="none"
//                       stroke="hsl(350 60% 55%)"
//                       strokeWidth="1.5"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     >
//                       <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
//                     </svg>
//                   </motion.div>
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </div>

//           {/* Caption strip */}
//           <div className="mt-3">
//             <p className="font-script text-lg text-foreground/80 text-center">
//               {memory.caption}
//             </p>
//           </div>
//         </div>

//         {/* Interaction */}
//         <AnimatePresence mode="wait">
//           {revealed ? (
//             <motion.div
//               key="revealed"
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, delay: 0.3 }}
//               className="mt-4 px-2"
//             >
//               {/* Short text with translucent backdrop */}
//               <p
//                 className="text-sm leading-relaxed text-center italic text-white bg-black/40 px-3 py-2 rounded-md"
//                 style={{ textShadow: "0 2px 4px rgba(0,0,0,0.8)" }}
//               >
//                 {`"${memory.shortText}"`}
//               </p>
//             </motion.div>
//           ) : isActive ? (
//             <motion.div
//               key="interaction"
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5 }}
//               className="mt-5 px-2"
//             >
//               {memory.unlockType === "none" ? (
//                 <button
//                   onClick={handleAutoUnlock}
//                   className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-serif text-sm tracking-wide transition-all duration-300
//                                     hover:opacity-90 active:scale-[0.98] animate-pulse-glow"
//                 >
//                   Reveal this memory
//                 </button>
//               ) : memory.unlockType === "word" ? (
//                 <div className="flex flex-col gap-3">
//                   {/* Question with backdrop */}
//                   <p
//                     className="text-sm text-center text-white bg-black/40 px-3 py-2 rounded-md"
//                     style={{ textShadow: "0 2px 4px rgba(0,0,0,0.8)" }}
//                   >
//                     {memory.question}
//                   </p>
//                   <LetterBoxes
//                     answer={memory.answer!}
//                     onCorrect={handleCorrect}
//                     onWrong={handleWrong}
//                   />
//                   <AnimatePresence>
//                     {showHint && memory.hint && (
//                       <motion.p
//                         initial={{ opacity: 0, height: 0 }}
//                         animate={{ opacity: 1, height: "auto" }}
//                         exit={{ opacity: 0, height: 0 }}
//                         className="text-xs text-primary/70 text-center italic bg-black/30 px-2 py-1 rounded-md"
//                         style={{ textShadow: "0 1px 3px rgba(0,0,0,0.7)" }}
//                       >
//                         {memory.hint}
//                       </motion.p>
//                     )}
//                   </AnimatePresence>
//                 </div>
//               ) : memory.unlockType === "choice" ? (
//                 <div className="flex flex-col gap-3">
//                   {/* Question with backdrop */}
//                   <p
//                     className="text-sm text-center text-white bg-black/40 px-3 py-2 rounded-md"
//                     style={{ textShadow: "0 2px 4px rgba(0,0,0,0.8)" }}
//                   >
//                     {memory.question}
//                   </p>
//                   <div className="grid grid-cols-2 gap-2">
//                     {memory.choices?.map((choice) => (
//                       <button
//                         key={choice}
//                         onClick={() => handleChoiceSelect(choice)}
//                         className="py-2.5 px-3 rounded-lg bg-card border border-border text-foreground text-sm transition-all hover:bg-accent hover:border-primary/30 active:scale-95"
//                       >
//                         {choice}
//                       </button>
//                     ))}
//                   </div>
//                   <AnimatePresence>
//                     {showHint && memory.hint && (
//                       <motion.p
//                         initial={{ opacity: 0, height: 0 }}
//                         animate={{ opacity: 1, height: "auto" }}
//                         exit={{ opacity: 0, height: 0 }}
//                         className="text-xs text-primary/70 text-center italic bg-black/30 px-2 py-1 rounded-md"
//                         style={{ textShadow: "0 1px 3px rgba(0,0,0,0.7)" }}
//                       >
//                         {memory.hint}
//                       </motion.p>
//                     )}
//                   </AnimatePresence>
//                 </div>
//               ) : null}
//             </motion.div>
//           ) : null}
//         </AnimatePresence>
//       </motion.div>
//     </motion.div>
//   );
// }


"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import type { Memory } from "./MemoryData";

/* ── Single-letter input row ── */
function LetterBoxes({
  answer,
  onCorrect,
  onWrong,
}: {
  answer: string;
  onCorrect: () => void;
  onWrong: () => void;
}) {
  const letters = answer.toUpperCase().split("");
  const [values, setValues] = useState<string[]>(Array(letters.length).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, letters.length);
  }, [letters.length]);

  const handleChange = (index: number, char: string) => {
    const sanitized = char.replace(/[^a-zA-Z]/g, "").toUpperCase();
    if (!sanitized && char !== "") return;

    const next = [...values];
    next[index] = sanitized;
    setValues(next);

    if (sanitized && index < letters.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    if (sanitized) {
      const filled = next.filter(Boolean).length;
      if (filled === letters.length) {
        const attempt = next.join("");
        if (attempt === answer.toUpperCase()) {
          onCorrect();
        } else {
          onWrong();
          setTimeout(() => {
            setValues(Array(letters.length).fill(""));
            inputRefs.current[0]?.focus();
          }, 700);
        }
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !values[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
      const next = [...values];
      next[index - 1] = "";
      setValues(next);
    }
  };

  return (
    <div className="flex items-center justify-center gap-1.5 flex-wrap">
      {letters.map((_, i) => (
        <input
          key={i}
          ref={(el) => {
            inputRefs.current[i] = el;
          }}
          type="text"
          inputMode="text"
          maxLength={1}
          value={values[i]}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          className="w-9 h-11 sm:w-10 sm:h-12 rounded-md bg-card border-2 border-border text-center text-lg font-serif text-foreground uppercase transition-all duration-200 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
      ))}
    </div>
  );
}

/* ── Main MemoryCard ── */
interface MemoryCardProps {
  memory: Memory;
  index: number;
  isActive: boolean;
  onUnlocked: (id: number) => void;
  isUnlocked: boolean;
}

export default function MemoryCard({
  memory,
  index,
  isActive,
  onUnlocked,
  isUnlocked,
}: MemoryCardProps) {
  const [showHint, setShowHint] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isOpen, setIsOpen] = useState(true); // NEW state for manual close

  const handleCorrect = useCallback(() => {
    setIsRevealed(true);
    setTimeout(() => onUnlocked(memory.id), 300);
  }, [memory.id, onUnlocked]);

  const handleWrong = useCallback(() => {
    setIsShaking(true);
    setShowHint(true);
    setTimeout(() => setIsShaking(false), 700);
  }, []);

  const handleChoiceSelect = useCallback(
    (choice: string) => {
      if (memory.answer && choice.toLowerCase().trim() === memory.answer.toLowerCase()) {
        handleCorrect();
      } else {
        handleWrong();
      }
    },
    [memory.answer, handleCorrect, handleWrong]
  );

  const handleAutoUnlock = useCallback(() => {
    if (memory.unlockType === "none") {
      setIsRevealed(true);
      setTimeout(() => onUnlocked(memory.id), 300);
    }
  }, [memory.unlockType, memory.id, onUnlocked]);

  const handleClose = () => setIsOpen(false); // NEW close handler

  const revealed = isUnlocked || isRevealed;

  if (!isOpen) return null; // Card only disappears when X is clicked

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0.3, y: 20 }}
      transition={{
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
        delay: index * 0.1,
      }}
      className="w-full max-w-sm mx-auto relative"
    >
      {/* Close button */}
      <button
        onClick={handleClose}
        className="absolute top-2 right-2 text-foreground/70 hover:text-foreground transition"
      >
        ✕
      </button>

      <motion.div
        animate={isShaking ? { x: [-8, 8, -6, 6, -3, 3, 0] } : {}}
        transition={{ duration: 0.6 }}
        className={`relative rounded-lg overflow-hidden transition-all duration-700 ${
          revealed ? "soft-glow" : ""
        }`}
        style={{ transform: `rotate(${memory.rotation}deg)` }}
      >
        {/* Polaroid */}
        <div className="bg-white rounded-lg polaroid-shadow flex flex-col items-center p-3 pb-6">
          {/* Inner photo frame */}
          <div className="relative w-[85%] overflow-hidden rounded-sm bg-black">
            <Image
              src={memory.image}
              alt={memory.caption}
              width={300}
              height={400}
              className={`object-contain object-center transition-all duration-1000 ${
                revealed ? "blur-0 scale-100" : "blur-md scale-105"
              }`}
            />

            <AnimatePresence>
              {!revealed && (
                <motion.div
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                  className="absolute inset-0 flex flex-col items-center justify-center bg-foreground/10 backdrop-blur-sm"
                >
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {/* Lock icon */}
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="hsl(350 60% 55%)"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                    </svg>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Caption strip */}
          <div className="mt-3">
            <p className="font-script text-lg text-foreground/80 text-center">
              {memory.caption}
            </p>
          </div>
        </div>

        {/* Interaction */}
        <AnimatePresence mode="wait">
          {revealed ? (
            <motion.div
              key="revealed"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-4 px-2"
            >
              {/* Short text with translucent backdrop */}
              <p
                className="text-sm leading-relaxed text-center italic text-white bg-black/40 px-3 py-2 rounded-md"
                style={{ textShadow: "0 2px 4px rgba(0,0,0,0.8)" }}
              >
                {`"${memory.shortText}"`}
              </p>
            </motion.div>
          ) : isActive ? (
            <motion.div
              key="interaction"
              initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-5 px-2"
            >
              {memory.unlockType === "none" ? (
                <button
                  onClick={handleAutoUnlock}
                  className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-serif text-sm tracking-wide transition-all duration-300 hover:opacity-90 active:scale-[0.98] animate-pulse-glow"
                >
                  Reveal this memory
                </button>
              ) : memory.unlockType === "word" ? (
                <div className="flex flex-col gap-3">
                  <p
                    className="text-sm text-center text-white bg-black/40 px-3 py-2 rounded-md"
                    style={{ textShadow: "0 2px 4px rgba(0,0,0,0.8)" }}
                  >
                    {memory.question}
                  </p>
                  <LetterBoxes
                    answer={memory.answer!}
                    onCorrect={handleCorrect}
                    onWrong={handleWrong}
                  />
                  <AnimatePresence>
                    {showHint && memory.hint && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="text-xs text-primary/70 text-center italic bg-black/30 px-2 py-1 rounded-md"
                        style={{ textShadow: "0 1px 3px rgba(0,0,0,0.7)" }}
                      >
                        {memory.hint}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              ) : memory.unlockType === "choice" ? (
                <div className="flex flex-col gap-3">
                  <p
                    className="text-sm text-center text-white bg-black/40 px-3 py-2 rounded-md"
                    style={{ textShadow: "0 2px 4px rgba(0,0,0,0.8)" }}
                  >
                    {memory.question}
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {memory.choices?.map((choice) => (
                      <button
                        key={choice}
                        onClick={() => handleChoiceSelect(choice)}
                        className="py-2.5 px-3 rounded-lg bg-card border border-border text-foreground text-sm transition-all hover:bg-accent hover:border-primary/30 active:scale-95"
                      >
                        {choice}
                      </button>
                    ))}
                  </div>
                  <AnimatePresence>
                    {showHint && memory.hint && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="text-xs text-primary/70 text-center italic bg-black/30 px-2 py-1 rounded-md"
                        style={{ textShadow: "0 1px 3px rgba(0,0,0,0.7)" }}
                      >
                        {memory.hint}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              ) : null}
            </motion.div>
          ) : null}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
