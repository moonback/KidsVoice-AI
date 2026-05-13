import { motion } from "motion/react";
import type { AvatarProps } from "./AvatarProps";

/**
 * Dragon Avatar — Friendly dragon.
 * Audio level drives wing flapping speed, smoke particle intensity, and horn glow.
 */
export function DragonAvatar({ status, isSpeaking, audioLevel = 0 }: AvatarProps) {
  const normalizedAudioLevel = Number.isFinite(audioLevel) ? Math.min(1, Math.max(0, audioLevel)) : 0;
  const al = status === "listening" ? normalizedAudioLevel : 0;

  return (
    <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-[0_10px_20px_rgba(16,185,129,0.5)]">
      <defs>
        <linearGradient id="dragonBodyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#10B981" />
          <stop offset="50%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <linearGradient id="dragonSpikeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#D97706" />
        </linearGradient>
      </defs>

      {/* Tiny Wings - flapping reacts to audioLevel */}
      <motion.path
        d="M 40 100 Q 10 70 35 120"
        fill="#047857"
        opacity="0.6"
        animate={{
          rotate: isSpeaking ? [-10, 10, -10] : status === "listening" ? [-5 - al * 15, 5 + al * 15, -5 - al * 15] : 0,
          scale: status === "listening" ? [1, 1 + al * 0.2, 1] : 1,
        }}
        style={{ transformOrigin: "40px 100px" }}
        transition={{ duration: Math.max(0.1, 0.4 - al * 0.3), repeat: Infinity }}
      />
      <motion.path
        d="M 160 100 Q 190 70 165 120"
        fill="#047857"
        opacity="0.6"
        animate={{
          rotate: isSpeaking ? [10, -10, 10] : status === "listening" ? [5 + al * 15, -5 - al * 15, 5 + al * 15] : 0,
          scale: status === "listening" ? [1, 1 + al * 0.2, 1] : 1,
        }}
        style={{ transformOrigin: "160px 100px" }}
        transition={{ duration: Math.max(0.1, 0.4 - al * 0.3), repeat: Infinity }}
      />

      {/* Back Spikes */}
      <path d="M 100 25 L 110 10 L 120 28" fill="url(#dragonSpikeGradient)" />
      <path d="M 130 35 L 145 25 L 150 50" fill="url(#dragonSpikeGradient)" />
      <path d="M 70 35 L 55 25 L 50 50" fill="url(#dragonSpikeGradient)" />

      {/* Body */}
      <motion.path
        d="M 100 30 C 150 30 175 80 175 140 C 175 180 135 185 100 185 C 65 185 25 180 25 140 C 25 80 50 30 100 30 Z"
        animate={{
          d: isSpeaking 
            ? "M 100 25 C 160 25 180 80 180 135 C 180 185 140 190 100 190 C 60 190 20 185 20 135 C 20 80 40 25 100 25 Z" 
            : "M 100 30 C 150 30 175 80 175 140 C 175 180 135 185 100 185 C 65 185 25 180 25 140 C 25 80 50 30 100 30 Z"
        }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        fill="url(#dragonBodyGradient)"
      />

      {/* Horns - glow reacts to audioLevel */}
      <motion.path
        d="M 75 45 Q 65 20 55 35"
        stroke="#F59E0B"
        strokeWidth={6 + al * 2}
        strokeLinecap="round"
        fill="none"
        animate={{ opacity: status === "listening" ? [0.6, 1, 0.6] : 1 }}
        transition={{ duration: 0.5, repeat: Infinity }}
      />
      <motion.path
        d="M 125 45 Q 135 20 145 35"
        stroke="#F59E0B"
        strokeWidth={6 + al * 2}
        strokeLinecap="round"
        fill="none"
        animate={{ opacity: status === "listening" ? [0.6, 1, 0.6] : 1 }}
        transition={{ duration: 0.5, repeat: Infinity }}
      />

      <g transform="translate(100, 100)">
        {/* Eyes */}
        <ellipse cx="-32" cy="-5" rx="13" ry="16" fill="white" />
        <ellipse cx="32" cy="-5" rx="13" ry="16" fill="white" />

        {status === "connecting" ? (
          <g>
            <path d="M -40 -10 L -24 0 M -24 -10 L -40 0" stroke="#064E3B" strokeWidth="4" strokeLinecap="round" />
            <path d="M 24 -10 L 40 0 M 40 -10 L 24 0" stroke="#064E3B" strokeWidth="4" strokeLinecap="round" />
          </g>
        ) : (
          <>
            {/* Pupils - size reacts to audioLevel */}
            <motion.circle
              cx="-32" cy={isSpeaking ? "-7" : "-3"} r={6 + al * 3} fill="#064E3B"
              animate={{
                x: status === "listening" ? [-6, 6, -6] : 0,
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <motion.circle
              cx="32" cy={isSpeaking ? "-7" : "-3"} r={6 + al * 3} fill="#064E3B"
              animate={{
                x: status === "listening" ? [-6, 6, -6] : 0,
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </>
        )}

        {/* Smoke/Sparkle particles when listening - reacts to audioLevel */}
        {status === "listening" && al > 0.1 && (
          <motion.g>
             <motion.circle cx="0" cy="20" r={2 + al * 4} fill="#F59E0B" animate={{ y: [0, -20 - al * 30], opacity: [1, 0], x: [-5, 5, -5] }} transition={{ duration: 0.6, repeat: Infinity }} />
             <motion.circle cx="-10" cy="18" r={1 + al * 3} fill="#EF4444" animate={{ y: [0, -15 - al * 25], opacity: [1, 0], x: [5, -5, 5] }} transition={{ duration: 0.5, repeat: Infinity, delay: 0.1 }} />
             <motion.circle cx="10" cy="18" r={1 + al * 3} fill="#FCD34D" animate={{ y: [0, -15 - al * 25], opacity: [1, 0], x: [-3, 3, -3] }} transition={{ duration: 0.7, repeat: Infinity, delay: 0.2 }} />
          </motion.g>
        )}

        {/* Mouth */}
        {status === "listening" ? (
          <motion.path
            d="M -12 28 Q 0 35 12 28"
            stroke="#064E3B"
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
            animate={{ d: `M -${12 + al * 8} 28 Q 0 ${35 + al * 15} ${12 + al * 8} 28` }}
          />
        ) : isSpeaking ? (
          <motion.path
            d="M -15 25 Q 0 45 15 25 Q 0 50 -15 25"
            fill="#064E3B"
            animate={{ d: ["M -15 25 Q 0 50 15 25 Q 0 55 -15 25", "M -12 25 Q 0 35 12 25 Q 0 40 -12 25"] }}
            transition={{ duration: 0.15, repeat: Infinity, repeatType: "mirror" }}
          />
        ) : (
          <path d="M -12 28 Q 0 35 12 28" stroke="#064E3B" strokeWidth="5" strokeLinecap="round" fill="none" />
        )}
      </g>
    </svg>
  );
}
