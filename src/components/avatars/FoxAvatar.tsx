import { motion } from "motion/react";

interface Props {
  status: "idle" | "connecting" | "listening";
  isSpeaking: boolean;
}

/**
 * Fox Avatar — A playful magic fox with large pointed ears,
 * a fluffy body, a bushy tail, and whiskers.
 */
export function FoxAvatar({ status, isSpeaking }: Props) {
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

      {/* Tail - behind body */}
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
          duration: isSpeaking ? 0.3 : 2.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      {/* Tail tip (white) */}
      <motion.path
        d="M 185 90 Q 190 80 187 85 Q 192 92 185 90"
        fill="#FEFCE8"
        animate={{
          d: isSpeaking
            ? "M 190 75 Q 195 65 192 70 Q 197 77 190 75"
            : "M 185 90 Q 190 80 187 85 Q 192 92 185 90",
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Left Ear */}
      <motion.path
        d="M 55 75 L 35 20 L 75 55 Z"
        fill="url(#foxEarGradient)"
        animate={{
          rotate: isSpeaking ? [-4, 4, -4] : status === "listening" ? [0, -8, 0] : 0,
        }}
        style={{ transformOrigin: "60px 65px" }}
        transition={{ duration: isSpeaking ? 0.2 : 2, repeat: Infinity }}
      />
      {/* Left Ear Inner */}
      <motion.path
        d="M 55 65 L 42 30 L 68 55 Z"
        fill="#FDE68A"
        animate={{
          rotate: isSpeaking ? [-4, 4, -4] : status === "listening" ? [0, -8, 0] : 0,
        }}
        style={{ transformOrigin: "60px 65px" }}
        transition={{ duration: isSpeaking ? 0.2 : 2, repeat: Infinity }}
      />

      {/* Right Ear */}
      <motion.path
        d="M 145 75 L 165 20 L 125 55 Z"
        fill="url(#foxEarGradient)"
        animate={{
          rotate: isSpeaking ? [4, -4, 4] : status === "listening" ? [0, 8, 0] : 0,
        }}
        style={{ transformOrigin: "140px 65px" }}
        transition={{ duration: isSpeaking ? 0.2 : 2, repeat: Infinity }}
      />
      {/* Right Ear Inner */}
      <motion.path
        d="M 145 65 L 158 30 L 132 55 Z"
        fill="#FDE68A"
        animate={{
          rotate: isSpeaking ? [4, -4, 4] : status === "listening" ? [0, 8, 0] : 0,
        }}
        style={{ transformOrigin: "140px 65px" }}
        transition={{ duration: isSpeaking ? 0.2 : 2, repeat: Infinity }}
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
            {/* Pupils */}
            <motion.circle
              cx="-28" cy={isSpeaking ? "-7" : "-3"} r="6" fill="#78350F"
              animate={{
                x: status === "listening" ? [-5, 5, -5] : 0,
                y: status === "listening" ? [-2, 2, -2] : 0,
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.circle
              cx="28" cy={isSpeaking ? "-7" : "-3"} r="6" fill="#78350F"
              animate={{
                x: status === "listening" ? [-5, 5, -5] : 0,
                y: status === "listening" ? [-2, 2, -2] : 0,
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            {/* Highlights */}
            <motion.circle
              cx="-31" cy={isSpeaking ? "-10" : "-6"} r="2" fill="white"
              animate={{
                x: status === "listening" ? [-5, 5, -5] : 0,
                y: status === "listening" ? [-2, 2, -2] : 0,
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.circle
              cx="25" cy={isSpeaking ? "-10" : "-6"} r="2" fill="white"
              animate={{
                x: status === "listening" ? [-5, 5, -5] : 0,
                y: status === "listening" ? [-2, 2, -2] : 0,
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
          </>
        )}

        {/* Nose */}
        <ellipse cx="0" cy="15" rx="6" ry="4" fill="#78350F" />

        {/* Whiskers */}
        <motion.g
          animate={{
            rotate: isSpeaking ? [-3, 3, -3] : 0,
          }}
          style={{ transformOrigin: "0px 15px" }}
          transition={{ duration: 0.3, repeat: Infinity }}
        >
          <line x1="-8" y1="13" x2="-40" y2="8" stroke="#78350F" strokeWidth="1.5" opacity="0.6" />
          <line x1="-8" y1="17" x2="-40" y2="20" stroke="#78350F" strokeWidth="1.5" opacity="0.6" />
          <line x1="8" y1="13" x2="40" y2="8" stroke="#78350F" strokeWidth="1.5" opacity="0.6" />
          <line x1="8" y1="17" x2="40" y2="20" stroke="#78350F" strokeWidth="1.5" opacity="0.6" />
        </motion.g>

        {/* Mouth */}
        {isSpeaking ? (
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
        ) : status === "listening" ? (
          <path
            d="M -10 22 Q 0 30 10 22"
            stroke="#78350F"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
          />
        ) : status === "connecting" ? (
          <path
            d="M -7 25 Q 0 20 7 25"
            stroke="#78350F"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
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

        {/* Blinking overlay */}
        <motion.path
          d="M -45 -20 L 45 -20 L 45 15 L -45 15 Z"
          fill="url(#foxBodyGradient)"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: status === "idle" ? [0, 0, 1, 0, 0] : 0 }}
          transition={{ duration: 4, times: [0, 0.9, 0.95, 0.98, 1], repeat: Infinity }}
          style={{ transformOrigin: "0 -20px" }}
        />

        {/* Blushes */}
        <circle cx="-42" cy="10" r="8" fill="#FBBF24" opacity="0.5" />
        <circle cx="42" cy="10" r="8" fill="#FBBF24" opacity="0.5" />
      </g>
    </svg>
  );
}
