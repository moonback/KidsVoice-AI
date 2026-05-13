/**
 * Avatar configuration: defines the visual themes and metadata
 * for each selectable character avatar.
 */

export type AvatarId = "robot" | "fox" | "fairy";

export interface AvatarConfig {
  id: AvatarId;
  name: string;
  description: string;
  emoji: string;
  /** Primary gradient colors [start, mid, end] */
  colors: [string, string, string];
  /** Glow / accent color for background effects */
  glowColor: string;
  /** Background atmosphere blobs */
  atmosphereColors: [string, string];
  /** Accent for the UI (buttons, badges) */
  accentClass: string;
  /** Prompt personality name injected into the system prompt */
  personalityName: string;
  /** Specific personality traits or verbal habits */
  flavorPrompt: string;
}

export const AVATARS: Record<AvatarId, AvatarConfig> = {
  robot: {
    id: "robot",
    name: "Robot",
    description: "Un petit robot curieux et rigolo",
    emoji: "🤖",
    colors: ["#818CF8", "#A78BFA", "#F472B6"],
    glowColor: "rgba(129, 140, 248, 0.5)",
    atmosphereColors: ["bg-blue-900/20", "bg-purple-900/20"],
    accentClass: "from-blue-500 to-purple-600",
    personalityName: "Lisa le Robot",
    flavorPrompt: "Tu aimes faire des bruits de robot (Bip-boup !) et tu es fascinée par la technologie et les gadgets.",
  },
  fox: {
    id: "fox",
    name: "Renard magique",
    description: "Un renard espiègle et plein de sagesse",
    emoji: "🦊",
    colors: ["#FB923C", "#F59E0B", "#EF4444"],
    glowColor: "rgba(251, 146, 60, 0.5)",
    atmosphereColors: ["bg-orange-900/20", "bg-amber-900/20"],
    accentClass: "from-orange-500 to-amber-500",
    personalityName: "Maysson le Renard",
    flavorPrompt: "Tu es très malin, tu aimes les énigmes et tu parles souvent de la nature et de la forêt.",
  },
  fairy: {
    id: "fairy",
    name: "Fée",
    description: "Une fée douce et pleine de magie",
    emoji: "🧚",
    colors: ["#E879F9", "#C084FC", "#67E8F9"],
    glowColor: "rgba(232, 121, 249, 0.5)",
    atmosphereColors: ["bg-fuchsia-900/20", "bg-cyan-900/20"],
    accentClass: "from-fuchsia-500 to-cyan-400",
    personalityName: "Leanna la Fée",
    flavorPrompt: "Tu es très douce, tu parles de magie et de poussière d'étoiles, et tu aimes chanter un petit peu.",
  },
};

export const AVATAR_IDS: AvatarId[] = ["robot", "fox", "fairy"];

/** Load the saved avatar from localStorage, default to robot */
export function loadSavedAvatar(): AvatarId {
  try {
    const saved = localStorage.getItem("kidsvoice-avatar") as AvatarId | null;
    if (saved && saved in AVATARS) return saved;
  } catch { }
  return "robot";
}

/** Persist the avatar choice */
export function saveAvatar(id: AvatarId): void {
  try {
    localStorage.setItem("kidsvoice-avatar", id);
  } catch { }
}
