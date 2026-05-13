import { GoogleGenAI, Modality } from "@google/genai";
import { Square, Sparkles } from "lucide-react";
import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { AudioRecorder } from "./lib/AudioRecorder";
import { AudioPlayer } from "./lib/AudioPlayer";
import { IAudioRecorder, IAudioPlayer } from "./lib/AudioService";
import { buildSystemPrompt } from "./lib/systemPrompt";
import { AnimatedCharacter } from "./components/AnimatedCharacter";
import { AVATARS, loadSavedAvatar, loadChildName, saveChildName, type AvatarId } from "./lib/avatarConfig";
import { getUsageStatus, trackUsage, type UsageStatus } from "./lib/usageLimits";

export default function App() {
  const [status, setStatus] = useState<"idle" | "connecting" | "listening">("idle");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [avatarId, setAvatarId] = useState<AvatarId>(loadSavedAvatar);
  const [childName, setChildName] = useState(loadChildName());
  const [childAge, setChildAge] = useState(localStorage.getItem("childAge") || "");
  const [showWelcomeModal, setShowWelcomeModal] = useState(!loadChildName());
  const [audioLevel, setAudioLevel] = useState(0);
  const [usageStatus, setUsageStatus] = useState<UsageStatus>(getUsageStatus());
  const audioLevelRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  // Throttle audioLevel updates to animation frames for performance
  const handleAudioLevel = useCallback((level: number) => {
    audioLevelRef.current = level;
    if (!rafRef.current) {
      rafRef.current = requestAnimationFrame(() => {
        setAudioLevel(audioLevelRef.current);
        rafRef.current = null;
      });
    }
  }, []);
  const audioRecorder = useRef<IAudioRecorder | null>(null);
  const audioPlayer = useRef<IAudioPlayer | null>(null);
  const sessionRef = useRef<any>(null);
  const speakingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const avatar = AVATARS[avatarId];

  useEffect(() => {
    audioRecorder.current = new AudioRecorder();
    audioPlayer.current = new AudioPlayer();

    // Check usage status every minute
    const statusInterval = setInterval(() => {
      const status = getUsageStatus();
      setUsageStatus(status);
      if (status.isRestricted && sessionRef.current) {
        stopSession();
      }
    }, 60000);

    return () => {
      audioRecorder.current?.stop();
      audioPlayer.current?.stop();
      sessionRef.current?.close();
      clearInterval(statusInterval);
    };
  }, []);

  // Usage tracking effect
  useEffect(() => {
    let timer: any;
    if (status === "listening" || isSpeaking) {
      timer = setInterval(() => {
        trackUsage(10); // track 10 seconds
      }, 10000);
    }
    return () => clearInterval(timer);
  }, [status, isSpeaking]);

  const startSession = async () => {
    const statusCheck = getUsageStatus();
    if (statusCheck.isRestricted) {
      setUsageStatus(statusCheck);
      setErrorMsg(statusCheck.message);
      return;
    }

    setStatus("connecting");
    setErrorMsg("");

    try {
      console.log("🚀 Démarrage de la session...");
      
      // Request microphone permission FIRST
      console.log("🎤 Demande de permission microphone...");
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });
      console.log("✅ Permission microphone accordée");
      // Stop the test stream immediately
      stream.getTracks().forEach(track => track.stop());
      
      const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });
      audioPlayer.current?.clearQueue();

      console.log("📡 Connexion à Gemini Live...");
      // Connect and await the session before setting callbacks that rely on it
      const session = await ai.live.connect({
        model: "gemini-3.1-flash-live-preview",
        callbacks: {
          onopen: () => {
            console.log("✅ Session ouverte !");
            setStatus("listening");
            // Start recording only after the session is ready
            try {
              console.log("🎤 Démarrage de l'enregistrement audio...");
              audioRecorder.current?.start(
                (base64Data) => {
                  // Ensure the session is still open before sending
                  if (sessionRef.current) {
                    sessionRef.current.sendRealtimeInput({
                      audio: { data: base64Data, mimeType: "audio/pcm;rate=16000" },
                    });
                  }
                },
                handleAudioLevel,
              );
              console.log("✅ Enregistrement audio démarré");
            } catch (error) {
              console.error("❌ Erreur lors du démarrage de l'enregistrement:", error);
            }
          },
          onmessage: (message: any) => {
            console.log("📨 Message reçu:", message);
            const base64Audio =
              message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
            if (base64Audio) {
              audioPlayer.current?.play(base64Audio);
              setIsSpeaking(true);
              if (speakingTimeoutRef.current) clearTimeout(speakingTimeoutRef.current);
              speakingTimeoutRef.current = setTimeout(() => setIsSpeaking(false), 1500);
            }
            if (message.serverContent?.interrupted) {
              audioPlayer.current?.clearQueue();
              setIsSpeaking(false);
              if (speakingTimeoutRef.current) clearTimeout(speakingTimeoutRef.current);
            }
          },
          onclose: (event: any) => {
            console.log("🔴 Session fermée");
            console.log("Code de fermeture:", event?.code);
            console.log("Raison:", event?.reason);
            console.log("Event complet:", event);
            console.trace("Stack trace de la fermeture");
            
            // Show error message if there's a reason
            if (event?.reason) {
              setErrorMsg(event.reason);
            }
            
            setStatus("idle");
            audioRecorder.current?.stop();
            // Cleanup session reference
            sessionRef.current = null;
          },
          onerror: (error: any) => {
            console.error("❌ Live API Error", error);
            console.error("Error details:", JSON.stringify(error, null, 2));
            setErrorMsg("Une erreur avec la connexion vocale s'est produite.");
            stopSession();
          },
        },
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: "Puck" } },
          },
          systemInstruction: buildSystemPrompt(avatarId, childName),
        },
      });

      console.log("💾 Session stockée");
      // Store the active session
      sessionRef.current = session;
    } catch (err: any) {
      console.error("💥 Failed to start session:", err);
      if (err.name === "NotAllowedError") {
        setErrorMsg("Je n'ai pas la permission d'utiliser le microphone !");
      } else {
        setErrorMsg(err.message || "Impossible de démarrer.");
      }
      setStatus("idle");
    }
  };

  const stopSession = () => {
    // Safely close the session if it exists and is not already closed
    if (sessionRef.current) {
      try {
        sessionRef.current.close();
      } catch (e) {
        console.warn("Attempted to close an already closed session", e);
      }
      sessionRef.current = null;
    }
    audioRecorder.current?.stop();
    audioPlayer.current?.clearQueue();
    setStatus("idle");
    setIsSpeaking(false);
    setAudioLevel(0);
    if (speakingTimeoutRef.current) clearTimeout(speakingTimeoutRef.current);
  };

  const handleWelcomeSubmit = (name: string, age: string) => {
    setChildName(name);
    setChildAge(age);
    saveChildName(name);
    localStorage.setItem("childAge", age);
    setShowWelcomeModal(false);
  };

  return (
    <div className="min-h-screen bg-[#020408] text-white flex flex-col font-sans relative overflow-hidden">
      {/* Welcome Modal */}
      <AnimatePresence>
        {showWelcomeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700/50 rounded-[32px] p-8 md:p-12 shadow-2xl max-w-md w-full mx-4"
              style={{ boxShadow: `0 20px 60px ${avatar.colors[0]}33` }}
            >
              <div className="text-center mb-8">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${avatar.accentClass} flex items-center justify-center shadow-lg`}>
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold mb-2" style={{ color: avatar.colors[0] }}>
                  Bienvenue ! 🎉
                </h2>
                <p className="text-slate-400 text-sm">
                  Dis-moi qui tu es pour commencer l'aventure
                </p>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  const name = formData.get("name") as string;
                  const age = formData.get("age") as string;
                  if (name && age) {
                    handleWelcomeSubmit(name, age);
                  }
                }}
                className="space-y-6"
              >
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
                    Ton prénom
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    autoFocus
                    placeholder="Ex: Marie"
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-2xl text-white placeholder:text-slate-500 focus:outline-none focus:border-slate-500 transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="age" className="block text-sm font-medium text-slate-300 mb-2">
                    Ton âge
                  </label>
                  <input
                    type="number"
                    id="age"
                    name="age"
                    required
                    min="3"
                    max="18"
                    placeholder="Ex: 8"
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-2xl text-white placeholder:text-slate-500 focus:outline-none focus:border-slate-500 transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r font-bold text-lg rounded-2xl shadow-xl hover:scale-105 transition-transform"
                  style={{ 
                    background: `linear-gradient(135deg, ${avatar.colors[0]}, ${avatar.colors[1]})`,
                    boxShadow: `0 10px 30px ${avatar.colors[0]}44`
                  }}
                >
                  Commencer ! 🚀
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background Atmosphere — colors adapt to avatar */}
      <div className="absolute inset-0 pointer-events-none">
        <div className={`absolute top-[-200px] left-[-200px] w-[600px] h-[600px] rounded-full ${avatar.atmosphereColors[0]} blur-[120px]`}></div>
        <div className={`absolute bottom-[-200px] right-[-200px] w-[600px] h-[600px] rounded-full ${avatar.atmosphereColors[1]} blur-[120px]`}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(66,133,244,0.05)_0%,transparent_70%)]"></div>
      </div>

      {/* Header Navigation */}
      <nav className="relative z-10 flex items-center justify-between px-10 py-8">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${avatar.accentClass} flex items-center justify-center shadow-lg`} style={{ boxShadow: `0 4px 14px ${avatar.colors[0]}33` }}>
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-semibold tracking-tight">KidsVoice <span style={{ color: avatar.colors[0] }}>AI</span></span>
        </div>
        <div className="flex items-center gap-4 text-sm font-medium text-slate-400">
          {/* Child Name Input / Greeting — only when idle */}
          {status === "idle" && (
            <div className="flex items-center gap-2">
              {!childName ? (
                <div className="flex items-center gap-2 bg-slate-800/30 px-3 py-1.5 rounded-full border border-slate-700/30 focus-within:border-slate-500 transition-colors">
                  <span className="text-xs uppercase tracking-wider font-bold opacity-50">Ton Prénom :</span>
                  <input
                    type="text"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        const val = (e.target as HTMLInputElement).value;
                        setChildName(val);
                        saveChildName(val);
                      }
                    }}
                    onBlur={(e) => {
                      const val = e.target.value;
                      if (val) {
                        setChildName(val);
                        saveChildName(val);
                      }
                    }}
                    placeholder="Tape ici..."
                    className="bg-transparent border-none outline-none text-slate-200 w-24 sm:w-32 placeholder:text-slate-600"
                  />
                </div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-3 bg-slate-800/30 px-4 py-1.5 rounded-full border border-slate-700/30"
                >
                  <span className="text-slate-300">Salut, <span className="font-bold" style={{ color: avatar.colors[0] }}>{childName}</span> !</span>
                  <button 
                    onClick={() => {
                      setChildName("");
                      saveChildName("");
                    }}
                    className="text-xs text-slate-500 hover:text-red-400 transition-colors"
                    title="Changer de nom"
                  >
                    (Changer)
                  </button>
                </motion.div>
              )}
            </div>
          )}
          <div className="flex items-center gap-2 bg-slate-800/50 px-4 py-2 rounded-full border border-slate-700/50">
            <div className={`w-2 h-2 rounded-full ${usageStatus.isRestricted ? "bg-amber-400" : "bg-green-400"}`}></div>
            <span>{usageStatus.isRestricted ? "Mode Repos" : "En ligne"}</span>
          </div>
        </div>
      </nav>

      {/* Rest Mode Overlay */}
      <AnimatePresence>
        {usageStatus.isRestricted && status === "idle" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-32 left-1/2 -translate-x-1/2 z-40 w-full max-w-md px-6"
          >
            <div className="bg-amber-900/40 border border-amber-500/30 backdrop-blur-xl p-6 rounded-[32px] text-center shadow-2xl">
              <span className="text-3xl mb-3 block">{usageStatus.reason === "night" ? "🌙" : "⏳"}</span>
              <h3 className="text-xl font-bold text-amber-200 mb-2">
                {usageStatus.reason === "night" ? "C'est l'heure de dormir" : "Pause nécessaire"}
              </h3>
              <p className="text-amber-100/80 text-sm leading-relaxed">
                {usageStatus.message}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Interaction Area */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 md:px-20">
        
        {/* Error Messages */}
        <div className="absolute top-10 inset-x-0 flex justify-center w-full z-30 pointer-events-none px-4">
          <AnimatePresence mode="wait">
            {errorMsg && (
              <motion.p
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="text-red-300 font-medium bg-red-900/40 border border-red-500/30 px-6 py-3 rounded-full text-sm shadow-2xl backdrop-blur-md max-w-lg text-center"
              >
                {errorMsg}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* The Listening/Speaking Orb */}
        <div className="relative mb-16 mt-8 flex items-center justify-center">
          {/* Glow Rings for Listening state */}
          <AnimatePresence>
            {status === "listening" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
              >
                <motion.div
                  animate={{ scale: [1.2, 1.6, 1.2], opacity: [0.3, 0, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute w-64 h-64 rounded-full"
                  style={{ border: `1px solid ${avatar.colors[0]}33` }}
                />
                <motion.div
                  animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 2, delay: 0.5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute w-64 h-64 rounded-full"
                  style={{ border: `1px solid ${avatar.colors[2]}4D` }}
                />
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Main Controls inside Orb */}
          <div className="relative z-20 flex items-center justify-center">
            {status === "idle" ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={startSession}
                className="relative rounded-full focus:outline-none"
                title="Clique pour parler !"
              >
                <AnimatedCharacter status={status} isSpeaking={isSpeaking} avatarId={avatarId} audioLevel={audioLevel} isRestricted={usageStatus.isRestricted} />
              </motion.button>
            ) : (
              <AnimatedCharacter status={status} isSpeaking={isSpeaking} avatarId={avatarId} audioLevel={audioLevel} isRestricted={usageStatus.isRestricted} />
            )}
          </div>
        </div>

        {/* Live Text / Status Preview */}
        <div className="w-full max-w-2xl text-center space-y-4">
          <h1 className="text-3xl font-medium text-slate-100">
            Un compagnon magique avec qui parler en vrai !
          </h1>
          
          <div className="h-10">
            <AnimatePresence mode="wait">
              {status === "idle" && (
                <motion.p
                  key="idle"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-xl text-slate-400 font-light leading-relaxed"
                >
                  Appuie sur moi pour parler !
                </motion.p>
              )}
              {status === "connecting" && (
                <motion.p
                  key="connect"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-xl font-light leading-relaxed"
                  style={{ color: avatar.colors[0] }}
                >
                  Connexion magique en cours...
                </motion.p>
              )}
              {status === "listening" && (
                <motion.p
                  key="listen"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-xl text-slate-300 font-light leading-relaxed animate-pulse"
                >
                  Je t'écoute... Pose ta question à haute voix !
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>
      
      {/* Footer Controls (Visible during conversation) */}
      <AnimatePresence>
        {(status === "listening" || status === "connecting") && (
          <motion.footer 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="relative z-10 px-10 py-12 flex justify-center items-end"
          >
            <div className="flex items-center gap-8 bg-slate-900/60 backdrop-blur-xl border border-white/10 p-2 rounded-[40px] shadow-2xl">
              <button 
                onClick={stopSession}
                className="px-12 py-5 bg-white text-black font-bold text-lg rounded-[32px] shadow-xl hover:scale-105 transition-transform flex gap-3 items-center"
              >
                <Square className="w-5 h-5" fill="currentColor" />
                ARRÊTER
              </button>
            </div>
          </motion.footer>
        )}
      </AnimatePresence>
    </div>
  );
}
