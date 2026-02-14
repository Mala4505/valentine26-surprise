export type UnlockType = "choice" | "word" | "none";

export interface Memory {
  id: number;
  image: string;
  caption: string;
  shortText: string;
  unlockType: UnlockType;
  question?: string;
  hint?: string;
  answer?: string;
  choices?: string[];
  rotation: number;
}

export const memories: Memory[] = [
  {
    id: 1,
    image: "/1.jpeg",
    caption: "The First (Proper) Date",
    shortText:
      "When we finally met after months of chatting and talking. The date didn't go as planned but was worth every second...",
    unlockType: "word",
    question: "Where did we meet in person for the first time? (Surat)",
    hint: "I reminded you the name  in Surat recently :)",
    answer: "kafe",
    rotation: -3,
  },
  {
    id: 2,
    image: "/2.jpeg",
    caption: "The Confession Date",
    shortText:
      "The date where I hand-fed you cake for the very first time and surprised you with something that you didn't expect at all.",
    unlockType: "none",
    rotation: 2,
  },
  {
    id: 3,
    image: "/3.jpeg",
    caption: "Falling Pins, Falling Hearts...",
    shortText:
      "I saw the other side of you that day, the one that was competitive and playful, and it made me fall for you even more.",
    unlockType: "none",
    rotation: -1,
  },
  {
    id: 4,
    image: "/4.jpeg",
    caption: "Best Date Ever",
    shortText:
      "The leaves were falling, the sun sparkled through the trees. The scenery was perfect, but doesn't compare to the company I had that day.",
    unlockType: "choice",
    question: "What was the occasion of going to the picnic?",
    hint: "One of us always picked the same thing...",
    answer: "Belated Bday Party",
    choices: ["Just a 'normal' date", "Belated Bday Party", "It was too late for my Bday Party"],
    rotation: 3,
  },
  {
    id: 5,
    image: "/5.jpeg",
    caption: "(Half) Dream came true",
    shortText:
      "That day, the smile on your face was the cutest, as if u wanted to wear it forever. Until it started to pain...",
    unlockType: "none",
    rotation: -2,
  },
  {
    id: 6,
    image: "/6.jpeg",
    caption: "Last but not least",
    shortText:
      "The last one was way too emotional for both of us. We ignored that fact unitl we met in the Mall, and it hit us hard...",
    unlockType: "none",
    rotation: -2,
  },
  {
    id: 10,
    image: "/10.jpeg",
    caption: "Honourable Mention #1",
    shortText:
      "The date was unique and fun, but the picture was way too funny to be left out. I still can't stop laughing whenever I see it.",
    unlockType: "none",
    rotation: -2,
  },
  {
    id: 8,
    image: "/11.jpeg",
    caption: "Honourable Mention #2",
    shortText:
      "I had a blast that day, and watching you pray salawaat and get scared made me want to hold you and protect you forever.",
    unlockType: "none",
    rotation: -2,
  },
  {
    id: 20,
    image: "/20.jpeg",
    caption: "The Competive One",
    shortText:
      "The last one was way too emotional for both of us. We ignored that fact unitl we met in the Mall, and it hit us hard...",
    unlockType: "none",
    rotation: -2,
  },
  {
    id: 21,
    image: "/21.jpeg",
    caption: "The Foodie One",
    shortText:"The fruits were sweet, not as sweet as you though...",
    unlockType: "none",
    rotation: -2,
  },
  {
    id: 22,
    image: "/22.jpeg",
    caption: "The Confused One",
    shortText:"I wish I would have taken more pictures of you that day...",
    unlockType: "none",
    rotation: -2,
  },
  {
    id: 23,
    image: "/23.jpeg",
    caption: "The Cute One",
    shortText:"I want to keep looking at this picture forever, and kiss your cheeks. You look so cute in it!",
    unlockType: "none",
    rotation: -2,
  },
];
