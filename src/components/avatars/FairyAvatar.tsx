import { motion } from "motion/react";
import type { AvatarProps } from "./AvatarProps";

/**
 * Fairy Avatar — Magical fairy.
 * Audio level drives wing flapping speed, sparkle intensity, and eye glow.
 */
export function FairyAvatar({ status, isSpeaking, audioLevel = 0 }: AvatarProps) {
  const al = status === "listening" ? audioLevel : 0;

  return (
    <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-[0_10px_20px_rgba(232,121,249,0.5)]">
      <defs>
        <linearGradient id="fairyBodyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E879F9" />
          <stop offset="50%" stopColor="#C084FC" />
          <stop offset="100%" stopColor="#67E8F9" />
        </linearGradient>
        <linearGradient id="fairyWingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E879F9" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#67E8F9" stopOpacity="0.3" />
        </linearGradient>
        <linearGradient id="fairyWingGradient2" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#C084FC" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#F0ABFC" stopOpacity="0.3" />
        </linearGradient>
        <radialGradient id="fairyGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#F0ABFC" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#F0ABFC" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Sparkle particles - count and intensity react to audioLevel */}
      <motion.circle
        cx="40" cy="45" r={2 + al * 2}
        fill="#FDE68A"
        animate={{
          opacity: [0, 1, 0],
          scale: [0.5, 1.2 + al, 0.5],
          y: [0, -8 - al * 10, 0],
        }}
        transition={{ duration: Math.max(0.2, 2 - al * 1.5), repeat: Infinity, delay: 0 }}
      />
      <motion.circle
        cx="160" cy="55" r={1.5 + al * 1.5}
        fill="#FDE68A"
        animate={{
          opacity: [0, 1, 0],
          scale: [0.5, 1.5 + al, 0.5],
          y: [0, -6 - al * 10, 0],
        }}
        transition={{ duration: Math.max(0.2, 2.5 - al * 1.5), repeat: Infinity, delay: 0.8 }}
      />
      {al > 0.3 && (
        <motion.circle
          cx="100" cy="40" r={2 + al * 3}
          fill="#FDE68A"
          animate={{ opacity: [0, 1, 0], scale: [0.5, 2, 0.5], y: [0, -20, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
        />
      )}

      {/* Left Wing - flapping reacts to audioLevel */}
      <motion.path
        d="M 55 90 Q 5 60 15 110 Q 20 140 50 130"
        fill="url(#fairyWingGradient)"
        stroke="#E879F9"
        strokeWidth="1"
        strokeOpacity="0.4"
        animate={{
          d: isSpeaking || status === "listening"
            ? [
                `M 55 90 Q ${0 - al * 30} ${55 - al * 10} 10 110 Q 15 145 50 130`,
                `M 55 90 Q ${10 + al * 20} ${65 + al * 10} 20 110 Q 25 140 50 130`,
              ]
            : "M 55 90 Q 5 60 15 110 Q 20 140 50 130",
        }}
        transition={{
          duration: isSpeaking ? 0.4 : Math.max(0.2, 3 - al * 2.5),
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Right Wing */}
      <motion.path
        d="M 145 90 Q 195 60 185 110 Q 180 140 150 130"
        fill="url(#fairyWingGradient)"
        stroke="#E879F9"
        strokeWidth="1"
        strokeOpacity="0.4"
        animate={{
          d: isSpeaking || status === "listening"
            ? [
                `M 145 90 Q ${200 + al * 30} ${55 - al * 10} 190 110 Q 185 145 150 130`,
                `M 145 90 Q ${190 - al * 20} ${65 + al * 10} 180 110 Q 175 140 150 130`,
              ]
            : "M 145 90 Q 195 60 185 110 Q 180 140 150 130",
        }}
        transition={{
          duration: isSpeaking ? 0.4 : Math.max(0.2, 3 - al * 2.5),
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Body */}
      <motion.path
        d="M 100 45 C 140 45 158 85 158 130 C 158 168 132 172 100 172 C 68 172 42 168 42 130 C 42 85 60 45 100 45 Z"
        animate={{
          d: isSpeaking
            ? "M 100 42 C 145 42 162 85 162 128 C 162 170 135 175 100 175 C 65 175 38 170 38 128 C 38 85 55 42 100 42 Z"
            : "M 100 45 C 140 45 158 85 158 130 C 158 168 132 172 100 172 C 68 172 42 168 42 130 C 42 85 60 45 100 45 Z",
        }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        fill="url(#fairyBodyGradient)"
      />

      {/* Inner glow - intensity reacts to audioLevel */}
      <ellipse 
        cx="100" cy="120" rx={40 + al * 20} ry={35 + al * 15} 
        fill="url(#fairyGlow)" 
        opacity={0.4 + al * 0.4}
      />

      {/* Face features */}
      <g transform="translate(100, 95)">
        {/* Left Eye */}
        <ellipse cx="-28" cy="0" rx="12" ry="15" fill="white" />
        {/* Right Eye */}
        <ellipse cx="28" cy="0" rx="12" ry="15" fill="white" />

        {status === "connecting" ? (
          <g>
            <path d="M -38 -2 Q -28 -10 -18 -2" stroke="#581C87" strokeWidth="3.5" strokeLinecap="round" fill="none" />
            <path d="M 18 -2 Q 28 -10 38 -2" stroke="#581C87" strokeWidth="3.5" strokeLinecap="round" fill="none" />
          </g>
        ) : (
          <>
            {/* Pupils - size and glow react to audioLevel */}
            <motion.circle
              cx="-28" cy={isSpeaking ? "-2" : "2"} r={6 + al * 3} fill="#581C87"
              animate={{
                x: status === "listening" ? [-5, 5, -5] : 0,
                y: status === "listening" ? [-2, 2, -2] : 0,
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.circle
              cx="28" cy={isSpeaking ? "-2" : "2"} r={6 + al * 3} fill="#581C87"
              animate={{
                x: status === "listening" ? [-5, 5, -5] : 0,
                y: status === "listening" ? [-2, 2, -2] : 0,
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
          </>
        )}

        {/* Mouth */}
        {status === "listening" ? (
          <motion.path
            d="M -10 22 Q 0 30 10 22"
            stroke="#581C87"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
            animate={{ d: `M -${10 + al * 5} 22 Q 0 ${30 + al * 10} ${10 + al * 5} 22` }}
          />
        ) : isSpeaking ? (
          <motion.path
            d="M -10 22 Q 0 36 10 22 Q 0 36 -10 22"
            fill="#581C87"
            animate={{
              d: [
                "M -10 22 Q 0 40 10 22 Q 0 40 -10 22",
                "M -7 22 Q 0 30 7 22 Q 0 30 -7 22",
              ]
            }}
            transition={{ duration: 0.15, repeat: Infinity, repeatType: "mirror" }}
          />
        ) : (
          <path
            d="M -8 22 Q 0 28 8 22"
            stroke="#581C87"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
          />
        )}
      </g>
    </svg>
  );
}
