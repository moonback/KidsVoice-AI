import { motion } from "motion/react";
import type { AvatarProps } from "./AvatarProps";

/**
 * Fox Avatar — Playful magic fox.
 * Audio level drives ear twitching intensity, tail wagging speed, and eye glow.
 */
export function FoxAvatar({ status, isSpeaking, audioLevel = 0 }: AvatarProps) {
  const normalizedAudioLevel = Number.isFinite(audioLevel) ? Math.min(1, Math.max(0, audioLevel)) : 0;
  const al = status === "listening" ? normalizedAudioLevel : 0;

  return (
    <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-[0_10px_20px_rgba(251,146,60,0.5)]">
      <defs>
        <linearGradient id="foxBodyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FB923C" />
          <stop offset="50%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#EF4444" />
        </linearGradient>
        <linearGradient id="foxEarGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#EF4444" />
          <stop offset="100%" stopColor="#FB923C" />
        </linearGradient>
        <linearGradient id="foxBellyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FEF3C7" />
          <stop offset="100%" stopColor="#FDE68A" />
        </linearGradient>
        <linearGradient id="foxTailGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FB923C" />
          <stop offset="70%" stopColor="#EF4444" />
          <stop offset="100%" stopColor="#FEFCE8" />
        </linearGradient>
      </defs>

      {/* Tail - speed reacts to audioLevel */}
      <motion.path
        d="M 155 150 Q 190 120 185 90 Q 195 100 190 130 Q 185 155 160 160"
        fill="url(#foxTailGradient)"
        animate={{
          d: isSpeaking
            ? "M 160 148 Q 200 110 190 75 Q 200 90 195 125 Q 190 155 165 158"
            : status === "listening"
              ? [
                  "M 155 150 Q 190 120 185 90 Q 195 100 190 130 Q 185 155 160 160",
                  "M 158 148 Q 195 115 188 85 Q 198 95 192 128 Q 188 152 163 158",
                  "M 155 150 Q 190 120 185 90 Q 195 100 190 130 Q 185 155 160 160",
                ]
              : "M 155 150 Q 190 120 185 90 Q 195 100 190 130 Q 185 155 160 160",
        }}
        transition={{
          duration: isSpeaking ? 0.3 : Math.max(0.4, 2.5 - al * 2),
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Left Ear - twitching reacts to audioLevel */}
      <motion.path
        d="M 55 75 L 35 20 L 75 55 Z"
        fill="url(#foxEarGradient)"
        animate={{
          rotate: isSpeaking ? [-4, 4, -4] : status === "listening" ? [0, -15 * al, 0] : 0,
          scale: status === "listening" ? [1, 1 + al * 0.1, 1] : 1,
        }}
        style={{ transformOrigin: "60px 65px" }}
        transition={{ duration: isSpeaking ? 0.2 : Math.max(0.1, 0.5 - al * 0.4), repeat: Infinity }}
      />

      {/* Right Ear */}
      <motion.path
        d="M 145 75 L 165 20 L 125 55 Z"
        fill="url(#foxEarGradient)"
        animate={{
          rotate: isSpeaking ? [4, -4, 4] : status === "listening" ? [0, 15 * al, 0] : 0,
          scale: status === "listening" ? [1, 1 + al * 0.1, 1] : 1,
        }}
        style={{ transformOrigin: "140px 65px" }}
        transition={{ duration: isSpeaking ? 0.2 : Math.max(0.1, 0.5 - al * 0.4), repeat: Infinity }}
      />

      {/* Body */}
      <motion.path
        d="M 100 40 C 145 40 165 80 165 130 C 165 170 135 175 100 175 C 65 175 35 170 35 130 C 35 80 55 40 100 40 Z"
        animate={{
          d: isSpeaking
            ? "M 100 35 C 150 35 170 80 170 125 C 170 175 140 180 100 180 C 60 180 30 175 30 125 C 30 80 50 35 100 35 Z"
            : "M 100 40 C 145 40 165 80 165 130 C 165 170 135 175 100 175 C 65 175 35 170 35 130 C 35 80 55 40 100 40 Z"
        }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        fill="url(#foxBodyGradient)"
      />

      {/* Belly patch */}
      <path
        d="M 100 90 C 125 90 135 110 135 135 C 135 160 120 165 100 165 C 80 165 65 160 65 135 C 65 110 75 90 100 90 Z"
        fill="url(#foxBellyGradient)"
        opacity="0.9"
      />

      {/* Face features group */}
      <g transform="translate(100, 100)">
        {/* Left Eye */}
        <ellipse cx="-28" cy="-5" rx="11" ry="14" fill="white" />
        {/* Right Eye */}
        <ellipse cx="28" cy="-5" rx="11" ry="14" fill="white" />

        {status === "connecting" ? (
          <g>
            <path d="M -35 -10 L -21 0 M -21 -10 L -35 0" stroke="#78350F" strokeWidth="3.5" strokeLinecap="round" />
            <path d="M 21 -10 L 35 0 M 35 -10 L 21 0" stroke="#78350F" strokeWidth="3.5" strokeLinecap="round" />
          </g>
        ) : (
          <>
            {/* Pupils - glow and size react to audioLevel */}
            <motion.circle
              cx="-28" cy={isSpeaking ? "-7" : "-3"} r={6 + al * 2} fill="#78350F"
              animate={{
                x: status === "listening" ? [-5, 5, -5] : 0,
                y: status === "listening" ? [-2, 2, -2] : 0,
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.circle
              cx="28" cy={isSpeaking ? "-7" : "-3"} r={6 + al * 2} fill="#78350F"
              animate={{
                x: status === "listening" ? [-5, 5, -5] : 0,
                y: status === "listening" ? [-2, 2, -2] : 0,
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
          </>
        )}

        {/* Nose */}
        <motion.ellipse 
          cx="0" cy="15" rx={6 + al * 2} ry={4 + al} fill="#78350F" 
          animate={{ scale: status === "listening" ? [1, 1.2, 1] : 1 }}
          transition={{ duration: 0.2, repeat: Infinity }}
        />

        {/* Whiskers - shaking reacts to audioLevel */}
        <motion.g
          animate={{
            rotate: isSpeaking ? [-3, 3, -3] : status === "listening" ? [-5 * al, 5 * al, -5 * al] : 0,
          }}
          style={{ transformOrigin: "0px 15px" }}
          transition={{ duration: 0.1, repeat: Infinity }}
        >
          <line x1="-8" y1="13" x2="-40" y2="8" stroke="#78350F" strokeWidth="1.5" opacity="0.6" />
          <line x1="-8" y1="17" x2="-40" y2="20" stroke="#78350F" strokeWidth="1.5" opacity="0.6" />
          <line x1="8" y1="13" x2="40" y2="8" stroke="#78350F" strokeWidth="1.5" opacity="0.6" />
          <line x1="8" y1="17" x2="40" y2="20" stroke="#78350F" strokeWidth="1.5" opacity="0.6" />
        </motion.g>

        {/* Mouth */}
        {status === "listening" ? (
          <motion.path
            d="M -10 22 Q 0 30 10 22"
            stroke="#78350F"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
            animate={{ d: `M -${10 + al * 5} 22 Q 0 ${30 + al * 10} ${10 + al * 5} 22` }}
          />
        ) : isSpeaking ? (
          <motion.path
            d="M -10 22 Q 0 38 10 22 Q 0 38 -10 22"
            fill="#78350F"
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
            d="M -8 22 Q 0 27 8 22"
            stroke="#78350F"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
          />
        )}
      </g>
    </svg>
  );
}
