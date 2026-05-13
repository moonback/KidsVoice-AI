import { GoogleGenAI, Modality } from "@google/genai";
import { Mic, Square, Sparkles, Loader2 } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { AudioRecorder } from "./lib/AudioRecorder";
import { AudioPlayer } from "./lib/AudioPlayer";
import { SYSTEM_PROMPT } from "./lib/systemPrompt";
import { AnimatedCharacter } from "./components/AnimatedCharacter";

export default function App() {
  const [status, setStatus] = useState<"idle" | "connecting" | "listening">("idle");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const audioRecorder = useRef<AudioRecorder | null>(null);
  const audioPlayer = useRef<AudioPlayer | null>(null);
  const sessionRef = useRef<any>(null);
  const speakingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    audioRecorder.current = new AudioRecorder();
    audioPlayer.current = new AudioPlayer();
    return () => {
      audioRecorder.current?.stop();
      audioPlayer.current?.stop();
      sessionRef.current?.close();
    };
  }, []);

  const startSession = async () => {
    // Prevent multiple concurrent sessions
    if (sessionRef.current) {
      // If a session already exists, close it before starting a new one
      sessionRef.current.close();
      sessionRef.current = null;
    }

    setStatus("connecting");
    setErrorMsg("");

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      audioPlayer.current?.clearQueue();

      // Connect and await the session before setting callbacks that rely on it
      const session = await ai.live.connect({
        model: "gemini-3.1-flash-live-preview",
        callbacks: {
          onopen: () => {
            setStatus("listening");
            // Start recording only after the session is ready
            audioRecorder.current?.start((base64Data) => {
              // Ensure the session is still open before sending
              if (sessionRef.current) {
                sessionRef.current.sendRealtimeInput({
                  audio: { data: base64Data, mimeType: "audio/pcm;rate=16000" },
                });
              }
            });
          },
          onmessage: (message: any) => {
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
          onclose: () => {
            setStatus("idle");
            audioRecorder.current?.stop();
            // Cleanup session reference
            sessionRef.current = null;
          },
          onerror: (error: any) => {
            console.error("Live API Error", error);
            setErrorMsg("Une erreur avec la connexion vocale s'est produite.");
            stopSession();
          },
        },
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: "Puck" } },
          },
          systemInstruction: SYSTEM_PROMPT,
        },
      });

      // Store the active session
      sessionRef.current = session;
    } catch (err: any) {
      console.error("Failed to start session:", err);
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
    if (speakingTimeoutRef.current) clearTimeout(speakingTimeoutRef.current);
  };

  return (
    <div className="min-h-screen bg-[#020408] text-white flex flex-col font-sans relative overflow-hidden">
      {/* Background Atmosphere */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-200px] left-[-200px] w-[600px] h-[600px] rounded-full bg-blue-900/20 blur-[120px]"></div>
        <div className="absolute bottom-[-200px] right-[-200px] w-[600px] h-[600px] rounded-full bg-purple-900/20 blur-[120px]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(66,133,244,0.05)_0%,transparent_70%)]"></div>
      </div>

      {/* Header Navigation */}
      <nav className="relative z-10 flex items-center justify-between px-10 py-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-semibold tracking-tight">KidsVoice <span className="text-blue-400">AI</span></span>
        </div>
        <div className="flex items-center gap-6 text-sm font-medium text-slate-400">
          <div className="flex items-center gap-2 bg-slate-800/50 px-4 py-2 rounded-full border border-slate-700/50">
            <div className="w-2 h-2 rounded-full bg-green-400"></div>
            <span>En ligne</span>
          </div>
        </div>
      </nav>

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
                  className="absolute w-64 h-64 rounded-full border border-blue-500/20"
                />
                <motion.div
                  animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 2, delay: 0.5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute w-64 h-64 rounded-full border border-purple-500/30"
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
                <AnimatedCharacter status={status} isSpeaking={isSpeaking} />
              </motion.button>
            ) : (
              <AnimatedCharacter status={status} isSpeaking={isSpeaking} />
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
                  className="text-xl text-blue-400 font-light leading-relaxed"
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
