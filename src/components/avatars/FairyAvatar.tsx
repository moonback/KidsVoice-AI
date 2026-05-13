import { motion } from "motion/react";

interface Props {
  status: "idle" | "connecting" | "listening";
  isSpeaking: boolean;
}

/**
 * Fairy Avatar — A magical fairy with translucent wings,
 * a flowing silhouette, sparkle particles, and a wand-like antenna.
 */
export function FairyAvatar({ status, isSpeaking }: Props) {
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

      {/* Sparkle particles */}
      <motion.circle
        cx="40" cy="45" r="2"
        fill="#FDE68A"
        animate={{
          opacity: [0, 1, 0],
          scale: [0.5, 1.2, 0.5],
          y: [0, -8, 0],
        }}
        transition={{ duration: 2, repeat: Infinity, delay: 0 }}
      />
      <motion.circle
        cx="160" cy="55" r="1.5"
        fill="#FDE68A"
        animate={{
          opacity: [0, 1, 0],
          scale: [0.5, 1.5, 0.5],
          y: [0, -6, 0],
        }}
        transition={{ duration: 2.5, repeat: Infinity, delay: 0.8 }}
      />
      <motion.circle
        cx="55" cy="165" r="1.8"
        fill="#A5F3FC"
        animate={{
          opacity: [0, 1, 0],
          scale: [0.5, 1.3, 0.5],
          y: [0, -10, 0],
        }}
        transition={{ duration: 2, repeat: Infinity, delay: 1.2 }}
      />
      <motion.circle
        cx="150" cy="170" r="1.5"
        fill="#F0ABFC"
        animate={{
          opacity: [0, 1, 0],
          scale: [0.5, 1.4, 0.5],
          y: [0, -7, 0],
        }}
        transition={{ duration: 1.8, repeat: Infinity, delay: 0.4 }}
      />
      <motion.circle
        cx="100" cy="30" r="2"
        fill="#FDE68A"
        animate={{
          opacity: [0, 1, 0],
          scale: [0.5, 1.5, 0.5],
        }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
      />

      {/* Left Wing */}
      <motion.path
        d="M 55 90 Q 5 60 15 110 Q 20 140 50 130"
        fill="url(#fairyWingGradient)"
        stroke="#E879F9"
        strokeWidth="1"
        strokeOpacity="0.4"
        animate={{
          d: isSpeaking
            ? [
                "M 55 90 Q 0 55 10 110 Q 15 145 50 130",
                "M 55 90 Q 10 65 20 110 Q 25 140 50 130",
              ]
            : status === "listening"
              ? [
                  "M 55 90 Q 5 60 15 110 Q 20 140 50 130",
                  "M 55 90 Q 0 55 12 108 Q 18 142 50 130",
                  "M 55 90 Q 5 60 15 110 Q 20 140 50 130",
                ]
              : "M 55 90 Q 5 60 15 110 Q 20 140 50 130",
        }}
        transition={{
          duration: isSpeaking ? 0.4 : 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      {/* Left Lower Wing */}
      <motion.path
        d="M 55 120 Q 20 130 25 155 Q 30 170 55 155"
        fill="url(#fairyWingGradient2)"
        stroke="#C084FC"
        strokeWidth="1"
        strokeOpacity="0.3"
        animate={{
          d: isSpeaking
            ? [
                "M 55 120 Q 15 128 20 155 Q 25 172 55 155",
                "M 55 120 Q 25 132 30 155 Q 35 170 55 155",
              ]
            : "M 55 120 Q 20 130 25 155 Q 30 170 55 155",
        }}
        transition={{
          duration: isSpeaking ? 0.4 : 3,
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
          d: isSpeaking
            ? [
                "M 145 90 Q 200 55 190 110 Q 185 145 150 130",
                "M 145 90 Q 190 65 180 110 Q 175 140 150 130",
              ]
            : status === "listening"
              ? [
                  "M 145 90 Q 195 60 185 110 Q 180 140 150 130",
                  "M 145 90 Q 200 55 188 108 Q 182 142 150 130",
                  "M 145 90 Q 195 60 185 110 Q 180 140 150 130",
                ]
              : "M 145 90 Q 195 60 185 110 Q 180 140 150 130",
        }}
        transition={{
          duration: isSpeaking ? 0.4 : 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      {/* Right Lower Wing */}
      <motion.path
        d="M 145 120 Q 180 130 175 155 Q 170 170 145 155"
        fill="url(#fairyWingGradient2)"
        stroke="#C084FC"
        strokeWidth="1"
        strokeOpacity="0.3"
        animate={{
          d: isSpeaking
            ? [
                "M 145 120 Q 185 128 180 155 Q 175 172 145 155",
                "M 145 120 Q 175 132 170 155 Q 165 170 145 155",
              ]
            : "M 145 120 Q 180 130 175 155 Q 170 170 145 155",
        }}
        transition={{
          duration: isSpeaking ? 0.4 : 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Crown / Tiara */}
      <motion.path
        d="M 70 52 L 80 35 L 90 48 L 100 28 L 110 48 L 120 35 L 130 52"
        stroke="#FDE68A"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        animate={{
          y: isSpeaking ? [0, -2, 0] : 0,
        }}
        transition={{ duration: 0.3, repeat: Infinity }}
      />
      {/* Crown jewels */}
      <circle cx="100" cy="28" r="3" fill="#FDE68A" />
      <circle cx="80" cy="35" r="2" fill="#A5F3FC" />
      <circle cx="120" cy="35" r="2" fill="#F0ABFC" />

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

      {/* Inner glow */}
      <ellipse cx="100" cy="120" rx="40" ry="35" fill="url(#fairyGlow)" />

      {/* Face features */}
      <g transform="translate(100, 95)">
        {/* Left Eye */}
        <ellipse cx="-28" cy="0" rx="12" ry="15" fill="white" />
        {/* Right Eye */}
        <ellipse cx="28" cy="0" rx="12" ry="15" fill="white" />

        {status === "connecting" ? (
          <g>
            {/* Happy closed eyes — arcs */}
            <path d="M -38 -2 Q -28 -10 -18 -2" stroke="#581C87" strokeWidth="3.5" strokeLinecap="round" fill="none" />
            <path d="M 18 -2 Q 28 -10 38 -2" stroke="#581C87" strokeWidth="3.5" strokeLinecap="round" fill="none" />
          </g>
        ) : (
          <>
            {/* Pupils — large, sparkly anime-style */}
            <motion.circle
              cx="-28" cy={isSpeaking ? "-2" : "2"} r="6" fill="#581C87"
              animate={{
                x: status === "listening" ? [-5, 5, -5] : 0,
                y: status === "listening" ? [-2, 2, -2] : 0,
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.circle
              cx="28" cy={isSpeaking ? "-2" : "2"} r="6" fill="#581C87"
              animate={{
                x: status === "listening" ? [-5, 5, -5] : 0,
                y: status === "listening" ? [-2, 2, -2] : 0,
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            {/* Large highlights */}
            <motion.circle
              cx="-31" cy={isSpeaking ? "-5" : "-1"} r="2.5" fill="white"
              animate={{
                x: status === "listening" ? [-5, 5, -5] : 0,
                y: status === "listening" ? [-2, 2, -2] : 0,
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.circle
              cx="25" cy={isSpeaking ? "-5" : "-1"} r="2.5" fill="white"
              animate={{
                x: status === "listening" ? [-5, 5, -5] : 0,
                y: status === "listening" ? [-2, 2, -2] : 0,
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            {/* Small secondary highlights */}
            <motion.circle
              cx="-25" cy={isSpeaking ? "1" : "5"} r="1.5" fill="white" opacity="0.6"
              animate={{
                x: status === "listening" ? [-5, 5, -5] : 0,
                y: status === "listening" ? [-2, 2, -2] : 0,
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.circle
              cx="31" cy={isSpeaking ? "1" : "5"} r="1.5" fill="white" opacity="0.6"
              animate={{
                x: status === "listening" ? [-5, 5, -5] : 0,
                y: status === "listening" ? [-2, 2, -2] : 0,
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
          </>
        )}

        {/* Mouth */}
        {isSpeaking ? (
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
        ) : status === "listening" ? (
          <path
            d="M -10 22 Q 0 30 10 22"
            stroke="#581C87"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
          />
        ) : status === "connecting" ? (
          <path
            d="M -8 24 Q 0 19 8 24"
            stroke="#581C87"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
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

        {/* Blinking overlay */}
        <motion.path
          d="M -45 -18 L 45 -18 L 45 18 L -45 18 Z"
          fill="url(#fairyBodyGradient)"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: status === "idle" ? [0, 0, 1, 0, 0] : 0 }}
          transition={{ duration: 4, times: [0, 0.9, 0.95, 0.98, 1], repeat: Infinity }}
          style={{ transformOrigin: "0 -18px" }}
        />

        {/* Blushes — soft pink/purple */}
        <circle cx="-42" cy="14" r="8" fill="#F0ABFC" opacity="0.6" />
        <circle cx="42" cy="14" r="8" fill="#F0ABFC" opacity="0.6" />
      </g>
    </svg>
  );
}
