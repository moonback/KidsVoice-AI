import { motion } from "motion/react";
import type { AvatarProps } from "./AvatarProps";

/**
 * Cat Avatar — Cosmic cat.
 * Audio level drives ear twitching, whisker vibration, star blush glow, and pupil expansion.
 */
export function CatAvatar({ status, isSpeaking, audioLevel = 0 }: AvatarProps) {
  const al = status === "listening" ? audioLevel : 0;

  return (
    <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-[0_10px_20px_rgba(244,114,182,0.5)]">
      <defs>
        <linearGradient id="catBodyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F472B6" />
          <stop offset="50%" stopColor="#FB7185" />
          <stop offset="100%" stopColor="#818CF8" />
        </linearGradient>
        <linearGradient id="catEarGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FB7185" />
          <stop offset="100%" stopColor="#F472B6" />
        </linearGradient>
      </defs>

      {/* Ears - twitching reacts to audioLevel */}
      <motion.path
        d="M 50 70 L 30 20 L 80 50 Z"
        fill="url(#catEarGradient)"
        animate={{
          rotate: isSpeaking ? [-5, 5, -5] : status === "listening" ? [0, -20 * al, 0] : 0,
        }}
        style={{ transformOrigin: "60px 60px" }}
        transition={{ duration: isSpeaking ? 0.2 : Math.max(0.1, 0.4 - al * 0.3), repeat: Infinity }}
      />
      <motion.path
        d="M 150 70 L 170 20 L 120 50 Z"
        fill="url(#catEarGradient)"
        animate={{
          rotate: isSpeaking ? [5, -5, 5] : status === "listening" ? [0, 20 * al, 0] : 0,
        }}
        style={{ transformOrigin: "140px 60px" }}
        transition={{ duration: isSpeaking ? 0.2 : Math.max(0.1, 0.4 - al * 0.3), repeat: Infinity }}
      />

      {/* Body */}
      <motion.path
        d="M 100 35 C 145 35 165 75 165 130 C 165 170 135 175 100 175 C 65 175 35 170 35 130 C 35 75 55 35 100 35 Z"
        animate={{
          d: isSpeaking 
            ? "M 100 30 C 150 30 170 75 170 125 C 170 175 140 180 100 180 C 60 180 30 175 30 125 C 30 75 50 30 100 30 Z" 
            : "M 100 35 C 145 35 165 75 165 130 C 165 170 135 175 100 175 C 65 175 35 170 35 130 C 35 75 55 35 100 35 Z"
        }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        fill="url(#catBodyGradient)"
      />

      {/* Space Helmet Glass highlight */}
      <path
        d="M 100 45 C 135 45 150 75 150 115 C 150 150 125 155 100 155 C 75 155 50 150 50 115 C 50 75 65 45 100 45 Z"
        fill="white"
        opacity="0.1"
      />

      <g transform="translate(100, 100)">
        {/* Eyes */}
        <ellipse cx="-30" cy="-5" rx="12" ry="15" fill="white" />
        <ellipse cx="30" cy="-5" rx="12" ry="15" fill="white" />

        {status === "connecting" ? (
          <g>
            <path d="M -40 -2 Q -30 -12 -20 -2" stroke="#4C1D95" strokeWidth="4" strokeLinecap="round" fill="none" />
            <path d="M 20 -2 Q 30 -12 40 -2" stroke="#4C1D95" strokeWidth="4" strokeLinecap="round" fill="none" />
          </g>
        ) : (
          <>
            {/* Pupils - size and glow react to audioLevel */}
            <motion.circle
              cx="-30" cy={isSpeaking ? "-7" : "-3"} r={7 + al * 4} fill="#4C1D95"
              animate={{
                scaleY: [1, 1, 0.1, 1, 1],
              }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            <motion.circle
              cx="30" cy={isSpeaking ? "-7" : "-3"} r={7 + al * 4} fill="#4C1D95"
              animate={{
                scaleY: [1, 1, 0.1, 1, 1],
              }}
              transition={{ duration: 4, repeat: Infinity }}
            />
          </>
        )}

        {/* Nose */}
        <motion.path 
          d="M -5 10 L 5 10 L 0 16 Z" fill="#F472B6" 
          animate={{ scale: status === "listening" ? [1, 1.3, 1] : 1 }}
          transition={{ duration: 0.2, repeat: Infinity }}
        />

        {/* Whiskers - vibration reacts to audioLevel */}
        <motion.g
          animate={{
            x: status === "listening" ? [-al * 3, al * 3, -al * 3] : 0,
            rotate: status === "listening" ? [-al * 5, al * 5, -al * 5] : 0,
          }}
          transition={{ duration: 0.1, repeat: Infinity }}
        >
          <line x1="-15" y1="13" x2="-45" y2="8" stroke="white" strokeWidth="2" opacity="0.5" />
          <line x1="-15" y1="18" x2="-45" y2="23" stroke="white" strokeWidth="2" opacity="0.5" />
          <line x1="15" y1="13" x2="45" y2="8" stroke="white" strokeWidth="2" opacity="0.5" />
          <line x1="15" y1="18" x2="45" y2="23" stroke="white" strokeWidth="2" opacity="0.5" />
        </motion.g>

        {/* Mouth */}
        {status === "listening" ? (
          <motion.path
            d="M -10 20 Q -5 26 0 20 Q 5 26 10 20"
            stroke="#4C1D95"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
            animate={{ d: `M -${10 + al * 5} 20 Q -5 ${26 + al * 10} 0 20 Q 5 ${26 + al * 10} ${10 + al * 5} 20` }}
          />
        ) : isSpeaking ? (
          <motion.path
            d="M -10 20 Q -5 26 0 20 Q 5 26 10 20"
            stroke="#4C1D95"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
            animate={{ d: ["M -12 20 Q -6 32 0 20 Q 6 32 12 20", "M -8 20 Q -4 24 0 20 Q 4 24 8 20"] }}
          />
        ) : (
          <path
            d="M -10 20 Q -5 26 0 20 Q 5 26 10 20"
            stroke="#4C1D95"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
          />
        )}

        {/* Cosmic Star Blushes - glow reacts to audioLevel */}
        <motion.path
          d="M -45 15 L -42 22 L -35 23 L -41 28 L -40 35 L -45 31 L -50 35 L -49 28 L -55 23 L -48 22 Z"
          fill="#818CF8"
          animate={{ opacity: [0.3, 0.8 + al * 0.2, 0.3], scale: [1, 1.2 + al * 0.5, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.path
          d="M 45 15 L 48 22 L 55 23 L 49 28 L 50 35 L 45 31 L 40 35 L 41 28 L 35 23 L 42 22 Z"
          fill="#818CF8"
          animate={{ opacity: [0.3, 0.8 + al * 0.2, 0.3], scale: [1, 1.2 + al * 0.5, 1] }}
          transition={{ duration: 2, repeat: Infinity, delay: 1 }}
        />
      </g>
    </svg>
  );
}
