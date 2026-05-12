# KidsVoice AI 🎙️✨

> Un assistant vocal interactif, ludique et en temps réel conçu spécialement pour les enfants.

KidsVoice AI exploite la puissance de l'API **Gemini Live** pour offrir une expérience conversationnelle fluide et naturelle. Les enfants peuvent poser leurs questions à voix haute (comment se forment les nuages, pourquoi le ciel est bleu, etc.), et un personnage magique animé leur répond instantanément.

## 🛠️ Stack Technique

- **Frontend** : React 19, TypeScript, Vite
- **Styling** : Tailwind CSS v4
- **Animations** : Motion (anciennement Framer Motion)
- **Icônes** : Lucide React
- **IA & Logique** : Google GenAI SDK (`@google/genai`)
- **Audio Processing** : Web Audio API native (Capture via `getUserMedia`, Lecture via `AudioContext`)

## ✨ Fonctionnalités principales (MVP)

- 🎙️ **Streaming Vocal Bidirectionnel** : Communication temps réel voix-à-voix avec le modèle `gemini-3.1-flash-live-preview`.
- 👾 **Personnage Animé Réactif** : Un compagnon SVG qui cligne des yeux, bouge et s'anime lorsqu'il parle ou écoute.
- 🎨 **Interface Immersive** : Design "Immersive UI" avec des effets de halo lumineux, des gradients profonds et des retours visuels clairs.
- ⚙️ **Prompt Personnalisable** : Le comportement de l'IA est facilement modifiable via un fichier système dédié (`systemPrompt.ts`).
- 🔒 **Privacy-first** : L'audio est traité en temps réel et directement envoyé à l'API de Google, sans stockage intermédiaire.

## 📦 Installation et Lancement

### Prérequis
- **Node.js** (v18 ou supérieur)
- Git
- Une clé **API Google Gemini** valide.

### Étape par étape

1. **Cloner le dépôt**
   ```bash
   git clone https://github.com/votre-username/kidsvoice-ai.git
   cd kidsvoice-ai
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Configurer les variables d'environnement**
   Copiez le fichier d'exemple et ajoutez votre clé API.
   ```bash
   cp .env.example .env
   ```
   *Ouvrez le fichier `.env` et définissez `GEMINI_API_KEY="votre-cle-secrete"`.*

4. **Lancer le serveur de développement**
   ```bash
   npm run dev
   ```
   L'application sera accessible sur `http://localhost:3000`.

### Mode Production
Pour builder l'application pour la production :
```bash
npm run build
npm run preview
```

## 📁 Structure du Projet

```text
/
├── public/                 # Assets statiques
├── src/
│   ├── components/         # Composants React réutilisables (ex: AnimatedCharacter)
│   ├── lib/                # Logique métier et utilitaires
│   │   ├── AudioPlayer.ts  # Gestion de la lecture audio (Base64 -> PCM -> AudioContext)
│   │   ├── AudioRecorder.ts# Capture du microphone (Stream -> PCM 16-bit -> Base64)
│   │   └── systemPrompt.ts # Prompt de configuration de l'IA
│   ├── App.tsx             # Composant racine, interface principale et logique de session API
│   ├── index.css           # Fichier CSS global (Tailwind)
│   └── main.tsx            # Point d'entrée de l'application React
├── .cursorrules            # Règles pour les assistants IA (Cursor/Copilot)
├── package.json            # Dépendances et scripts
└── vite.config.ts          # Configuration du bundler
```

## 🔐 Variables d'Environnement

L'application requiert les variables suivantes dans un fichier `.env` :

- `GEMINI_API_KEY` : Clé secrète pour communiquer avec l'API Google Gemini. **Ne la publiez jamais publiquement.** *Note : En production client-side pur, cette architecture est pour des démos/projets internes. Pour un projet grand public, l'appel doit passer par un backend proxy.*

## 🤝 Bonnes pratiques pour contribuer

1. **Créer une branche par fonctionnalité** (`feat/nom-de-la-feature`, `fix/nom-du-bug`).
2. **Utiliser TypeScript strictement** : Éviter les types `any`, typifier les props et les retours de fonctions.
3. **Composants isolés** : Garder une logique par composant.
4. **Style conditionnel** : Utiliser Tailwind pour les classes et Framer Motion `motion.div` pour les animations complexes.

## 📄 Licence
Ce projet est sous licence **MIT**. Voir le fichier [LICENSE](LICENSE) pour plus de détails.
