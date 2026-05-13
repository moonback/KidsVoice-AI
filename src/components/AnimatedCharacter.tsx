import { motion } from "motion/react";

interface Props {
  status: "idle" | "connecting" | "listening";
  isSpeaking: boolean;
}

export function AnimatedCharacter({ status, isSpeaking }: Props) {
  // Body bounce animations
  const bodyY = isSpeaking 
    ? [0, -10, 0] 
    : status === "listening" 
      ? [0, -5, 0] 
      : status === "connecting"
        ? [0, -2, 0]
        : [0, 5, 0];
        
  const bodyTransition = isSpeaking 
    ? { duration: 0.3, repeat: Infinity } 
    : status === "listening" 
      ? { duration: 2, repeat: Infinity, ease: "easeInOut" } 
      : status === "connecting"
        ? { duration: 0.5, repeat: Infinity, ease: "easeInOut" }
        : { duration: 3, repeat: Infinity, ease: "easeInOut" };

  return (
    <div className="relative w-64 h-64 flex items-center justify-center">
      {/* Background Glow */}
      <motion.div
        animate={{
          scale: isSpeaking ? [1, 1.2, 1] : status === "listening" ? [1, 1.1, 1] : 1,
          opacity: isSpeaking ? 0.8 : status === "listening" ? 0.5 : 0.3
        }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-56 h-56 bg-indigo-500 rounded-full blur-3xl pointer-events-none"
      />

      <motion.div
        animate={{ y: bodyY }}
        transition={bodyTransition}
        className="relative w-56 h-56 z-10 pointer-events-none"
      >
        <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-[0_10px_20px_rgba(129,140,248,0.5)]">
          <defs>
            <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#818CF8" />
              <stop offset="50%" stopColor="#A78BFA" />
              <stop offset="100%" stopColor="#F472B6" />
            </linearGradient>
            <linearGradient id="earGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#F472B6" />
              <stop offset="100%" stopColor="#A78BFA" />
            </linearGradient>
          </defs>

          {/* Left Ear/Antenna */}
          <motion.path
            d="M 50 80 Q 20 40 30 20 Q 40 30 60 60"
            stroke="url(#earGradient)"
            strokeWidth="8"
            strokeLinecap="round"
            fill="none"
            animate={{
              rotate: isSpeaking ? [-5, 5, -5] : status === "listening" ? [0, -10, 0] : 0,
            }}
            style={{ transformOrigin: "60px 60px" }}
            transition={{ duration: isSpeaking ? 0.2 : 2, repeat: Infinity }}
          />

          {/* Right Ear/Antenna */}
          <motion.path
            d="M 150 80 Q 180 40 170 20 Q 160 30 140 60"
            stroke="url(#earGradient)"
            strokeWidth="8"
            strokeLinecap="round"
            fill="none"
            animate={{
              rotate: isSpeaking ? [5, -5, 5] : status === "listening" ? [0, 10, 0] : 0,
            }}
            style={{ transformOrigin: "140px 60px" }}
            transition={{ duration: isSpeaking ? 0.2 : 2, repeat: Infinity }}
          />

          {/* Body */}
          <motion.path
            d="M 100 30 C 150 30 170 80 170 140 C 170 180 130 180 100 180 C 70 180 30 180 30 140 C 30 80 50 30 100 30 Z"
            animate={{
              d: isSpeaking 
                ? "M 100 20 C 160 20 180 80 180 130 C 180 180 140 190 100 190 C 60 190 20 180 20 130 C 20 80 40 20 100 20 Z" 
                : "M 100 30 C 150 30 170 80 170 140 C 170 180 130 180 100 180 C 70 180 30 180 30 140 C 30 80 50 30 100 30 Z"
            }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            fill="url(#bodyGradient)"
          />

          <g transform="translate(100, 95)">
            {/* Left Eye outline */}
            <ellipse cx="-35" cy="0" rx="14" ry="18" fill="white" />
            {/* Right Eye outline */}
            <ellipse cx="35" cy="0" rx="14" ry="18" fill="white" />

            {/* Pupils & Eye Expressions */}
            {status === "connecting" ? (
              <g>
                <path d="M -42 -5 L -28 5 M -28 -5 L -42 5" stroke="#1E1B4B" strokeWidth="4" strokeLinecap="round" />
                <path d="M 28 -5 L 42 5 M 42 -5 L 28 5" stroke="#1E1B4B" strokeWidth="4" strokeLinecap="round" />
              </g>
            ) : (
              <>
                <motion.circle
                  cx="-35" cy={isSpeaking ? "-2" : "2"} r="7" fill="#1E1B4B"
                  animate={{
                    x: status === "listening" ? [-8, 8, -8] : 0,
                    y: status === "listening" ? [-3, 3, -3] : 0,
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.circle
                  cx="35" cy={isSpeaking ? "-2" : "2"} r="7" fill="#1E1B4B"
                  animate={{
                    x: status === "listening" ? [-8, 8, -8] : 0,
                    y: status === "listening" ? [-3, 3, -3] : 0,
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />
                
                {/* Highlights */}
                <motion.circle
                  cx="-38" cy={isSpeaking ? "-5" : "-1"} r="2" fill="white"
                  animate={{
                    x: status === "listening" ? [-8, 8, -8] : 0,
                    y: status === "listening" ? [-3, 3, -3] : 0,
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.circle
                  cx="32" cy={isSpeaking ? "-5" : "-1"} r="2" fill="white"
                  animate={{
                    x: status === "listening" ? [-8, 8, -8] : 0,
                    y: status === "listening" ? [-3, 3, -3] : 0,
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />
              </>
            )}

            {/* Mouth */}
            {isSpeaking ? (
              <motion.path
                d="M -15 25 Q 0 45 15 25 Q 0 45 -15 25"
                fill="#1E1B4B"
                animate={{
                  d: [
                    "M -15 25 Q 0 50 15 25 Q 0 50 -15 25", // Big open
                    "M -10 25 Q 0 35 10 25 Q 0 35 -10 25", // Small open
                  ]
                }}
                transition={{ duration: 0.15, repeat: Infinity, repeatType: "mirror" }}
              />
            ) : status === "listening" ? (
              <path
                d="M -15 25 Q 0 35 15 25"
                stroke="#1E1B4B"
                strokeWidth="5"
                strokeLinecap="round"
                fill="none"
              />
            ) : status === "connecting" ? (
              <path
                d="M -10 28 Q 0 22 10 28"
                stroke="#1E1B4B"
                strokeWidth="5"
                strokeLinecap="round"
                fill="none"
              />
            ) : (
              <path
                d="M -10 25 Q 0 30 10 25"
                stroke="#1E1B4B"
                strokeWidth="5"
                strokeLinecap="round"
                fill="none"
              />
            )}
            
            {/* Blinking overlay */}
            <motion.path
               d="M -50 -20 L 50 -20 L 50 20 L -50 20 Z"
               fill="url(#bodyGradient)"
               initial={{ scaleY: 0 }}
               animate={{ scaleY: status === "idle" ? [0, 0, 1, 0, 0] : 0 }}
               transition={{ duration: 4, times: [0, 0.9, 0.95, 0.98, 1], repeat: Infinity }}
               style={{ transformOrigin: "0 -20px" }}
            />

            {/* Blushes */}
            <circle cx="-50" cy="18" r="9" fill="#F472B6" opacity="0.8" />
            <circle cx="50" cy="18" r="9" fill="#F472B6" opacity="0.8" />
          </g>
        </svg>
      </motion.div>
    </div>
  );
}
