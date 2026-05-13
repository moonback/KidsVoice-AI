import { motion } from "motion/react";
import type { AvatarId } from "../lib/avatarConfig";
import { AVATARS } from "../lib/avatarConfig";
import { RobotAvatar } from "./avatars/RobotAvatar";
import { FoxAvatar } from "./avatars/FoxAvatar";
import { FairyAvatar } from "./avatars/FairyAvatar";
import { DragonAvatar } from "./avatars/DragonAvatar";
import { CatAvatar } from "./avatars/CatAvatar";

interface Props {
  status: "idle" | "connecting" | "listening";
  isSpeaking: boolean;
  avatarId?: AvatarId;
}

export function AnimatedCharacter({ status, isSpeaking, avatarId = "robot" }: Props) {
  const avatar = AVATARS[avatarId];

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
      ? { duration: 2, repeat: Infinity, ease: "easeInOut" as const }
      : status === "connecting"
        ? { duration: 0.5, repeat: Infinity, ease: "easeInOut" as const }
        : { duration: 3, repeat: Infinity, ease: "easeInOut" as const };

  /** Render the appropriate avatar SVG */
  function renderAvatar() {
    switch (avatarId) {
      case "fox":
        return <FoxAvatar status={status} isSpeaking={isSpeaking} />;
      case "fairy":
        return <FairyAvatar status={status} isSpeaking={isSpeaking} />;
      case "dragon":
        return <DragonAvatar status={status} isSpeaking={isSpeaking} />;
      case "cat":
        return <CatAvatar status={status} isSpeaking={isSpeaking} />;
      case "robot":
      default:
        return <RobotAvatar status={status} isSpeaking={isSpeaking} />;
    }
  }

  return (
    <div className="relative w-64 h-64 flex items-center justify-center">
      {/* Background Glow — color-matched to the avatar */}
      <motion.div
        animate={{
          scale: isSpeaking ? [1, 1.2, 1] : status === "listening" ? [1, 1.1, 1] : 1,
          opacity: isSpeaking ? 0.8 : status === "listening" ? 0.5 : 0.3,
        }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-56 h-56 rounded-full blur-3xl pointer-events-none"
        style={{ backgroundColor: avatar.colors[0] }}
      />

      <motion.div
        animate={{ y: bodyY }}
        transition={bodyTransition}
        className="relative w-56 h-56 z-10 pointer-events-none"
      >
        {renderAvatar()}
      </motion.div>
    </div>
  );
}
