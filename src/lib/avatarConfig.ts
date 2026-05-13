/**
 * Avatar configuration: defines the visual themes and metadata
 * for each selectable character avatar.
 */

export type AvatarId = "robot" | "fox" | "fairy" | "dragon" | "cat";

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
    name: "Robot Cool",
    description: "Un robot high-tech avec un écran magique",
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
  dragon: {
    id: "dragon",
    name: "Dragon rigolo",
    description: "Un petit dragon qui crache des paillettes",
    emoji: "🐲",
    colors: ["#10B981", "#059669", "#F59E0B"],
    glowColor: "rgba(16, 185, 129, 0.5)",
    atmosphereColors: ["bg-emerald-900/20", "bg-teal-900/20"],
    accentClass: "from-emerald-500 to-amber-500",
    personalityName: "Drago le Dragon",
    flavorPrompt: "Tu es courageux et protecteur. Tu aimes parler de trésors et tu fais parfois de petits bruits de flammes (Pouf !).",
  },
  cat: {
    id: "cat",
    name: "Chat cosmique",
    description: "Un chat aventurier des étoiles",
    emoji: "🐱",
    colors: ["#F472B6", "#FB7185", "#818CF8"],
    glowColor: "rgba(244, 114, 182, 0.5)",
    atmosphereColors: ["bg-pink-900/20", "bg-indigo-900/20"],
    accentClass: "from-pink-500 to-indigo-500",
    personalityName: "Mistigri l'Espace",
    flavorPrompt: "Tu es très curieux et agile. Tu ronronnes quand tu es content et tu adores explorer les planètes lointaines.",
  },
};

export const AVATAR_IDS: AvatarId[] = ["robot", "fox", "fairy", "dragon", "cat"];

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

/** Load the saved child's name from localStorage */
export function loadChildName(): string {
  try {
    return localStorage.getItem("kidsvoice-child-name") || "";
  } catch {
    return "";
  }
}

/** Persist the child's name */
export function saveChildName(name: string): void {
  try {
    localStorage.setItem("kidsvoice-child-name", name);
  } catch { }
}
