/**
 * Conversation Memory System
 * Stores and retrieves conversation history to give the AI companion memory
 */

export interface ConversationTurn {
  timestamp: number;
  speaker: "child" | "companion";
  message: string;
}

export interface ConversationSession {
  childName: string;
  startTime: number;
  turns: ConversationTurn[];
}

const STORAGE_KEY = "kidsvoice_conversation_memory";
const MAX_TURNS_IN_MEMORY = 20; // Keep last 20 turns (10 exchanges)
const MAX_SESSIONS = 5; // Keep last 5 sessions

/**
 * Load all conversation sessions from localStorage
 */
export function loadConversationHistory(): ConversationSession[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    return JSON.parse(stored);
  } catch (error) {
    console.error("Failed to load conversation history:", error);
    return [];
  }
}

/**
 * Save conversation sessions to localStorage
 */
function saveConversationHistory(sessions: ConversationSession[]): void {
  try {
    // Keep only the most recent sessions
    const recentSessions = sessions.slice(-MAX_SESSIONS);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(recentSessions));
  } catch (error) {
    console.error("Failed to save conversation history:", error);
  }
}

/**
 * Get the current active session or create a new one
 */
export function getCurrentSession(childName: string): ConversationSession {
  const sessions = loadConversationHistory();
  const today = new Date().setHours(0, 0, 0, 0);
  
  // Find existing session for today
  const lastSession = sessions.find(
    s => s.childName === childName && 
         new Date(s.startTime).setHours(0, 0, 0, 0) === today
  );
  
  if (lastSession) {
    return lastSession;
  }
  
  // Create new session (but don't save it yet)
  return {
    childName,
    startTime: Date.now(),
    turns: [],
  };
}

/**
 * Add a conversation turn to the current session
 */
export function addConversationTurn(
  childName: string,
  speaker: "child" | "companion",
  message: string
): void {
  const sessions = loadConversationHistory();
  const today = new Date().setHours(0, 0, 0, 0);
  
  // Find existing session for today
  let currentSessionIndex = sessions.findIndex(
    s => s.childName === childName && 
         new Date(s.startTime).setHours(0, 0, 0, 0) === today
  );
  
  let currentSession: ConversationSession;
  
  if (currentSessionIndex >= 0) {
    // Use existing session
    currentSession = sessions[currentSessionIndex];
  } else {
    // Create new session
    currentSession = {
      childName,
      startTime: Date.now(),
      turns: [],
    };
    currentSessionIndex = sessions.length;
    sessions.push(currentSession);
  }
  
  // Add the new turn
  currentSession.turns.push({
    timestamp: Date.now(),
    speaker,
    message,
  });
  
  // Limit turns in memory
  if (currentSession.turns.length > MAX_TURNS_IN_MEMORY) {
    currentSession.turns = currentSession.turns.slice(-MAX_TURNS_IN_MEMORY);
  }
  
  // Update session in array
  sessions[currentSessionIndex] = currentSession;
  
  saveConversationHistory(sessions);
}

/**
 * Build a memory context string for the system prompt
 */
export function buildMemoryContext(childName: string): string {
  if (!childName) return "";
  
  const currentSession = getCurrentSession(childName);
  
  if (currentSession.turns.length === 0) {
    return "C'est ta première conversation avec cet enfant aujourd'hui. Sois accueillant et chaleureux !";
  }
  
  // Get recent turns (last 10 exchanges = 20 turns)
  const recentTurns = currentSession.turns.slice(-MAX_TURNS_IN_MEMORY);
  
  // Format the memory
  const memoryLines = recentTurns.map(turn => {
    const speaker = turn.speaker === "child" ? childName : "Toi";
    return `${speaker}: ${turn.message}`;
  });
  
  return `### MÉMOIRE DE LA CONVERSATION :
Voici ce dont vous avez parlé récemment (pour que tu puisses te souvenir) :

${memoryLines.join("\n")}

Utilise ces informations pour rendre la conversation plus naturelle et personnelle. Fais référence à ce dont vous avez parlé si c'est pertinent, mais ne répète pas exactement les mêmes choses.`;
}

/**
 * Clear all conversation history (for privacy/reset)
 */
export function clearConversationHistory(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error("Failed to clear conversation history:", error);
  }
}

/**
 * Get conversation statistics for display
 */
export function getConversationStats(childName: string): {
  totalSessions: number;
  totalTurns: number;
  lastConversationDate: Date | null;
} {
  const sessions = loadConversationHistory();
  const childSessions = sessions.filter(s => s.childName === childName);
  
  const totalTurns = childSessions.reduce((sum, s) => sum + s.turns.length, 0);
  const lastSession = childSessions[childSessions.length - 1];
  
  return {
    totalSessions: childSessions.length,
    totalTurns,
    lastConversationDate: lastSession ? new Date(lastSession.startTime) : null,
  };
}
