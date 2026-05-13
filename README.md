# KidsVoice AI 🎙️✨

[![React](https://img.shields.io/badge/React-19-blue.svg)](https://react.dev/)
[![Tailwind](https://img.shields.io/badge/Tailwind-v4-38B2AC.svg)](https://tailwindcss.com/)
[![Gemini](https://img.shields.io/badge/Gemini-Live_API-orange.svg)](https://ai.google.dev/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

> **KidsVoice AI** est un compagnon vocal pour enfants : rapide, visuel, ludique et pensé pour une conversation naturelle en temps réel.

---

## 🌟 Objectif du projet

L’application transforme l’IA en ami imaginaire interactif grâce à la voix.  
Le focus produit actuel est clair : **améliorer la qualité vocale** (stabilité micro, fluidité, latence, expressivité, confort d’écoute, sécurité enfant).

### 🎭 Compagnons disponibles
Choisissez parmi une sélection d'avatars animés, chacun possédant sa propre personnalité et son univers visuel :
- **Robot Cool** 🤖 : High-tech, logique et fasciné par les gadgets.
- **Maysson le Renard** 🦊 : Malin, protecteur et amoureux de la nature.
- **Leanna la Fée** 🧚 : Douce, chantante et experte en poussière d'étoiles.
- **Drago le Dragon** 🐲 : Courageux, drôle et amateur de trésors cachés.
- **Mistigri l'Espace** 🐱 : Un chat cosmique explorateur de galaxies lointaines.

### 🔊 Réactivité sonore dynamique
Le moteur d’animation est couplé au flux audio en temps réel :
- halo, yeux, ailes et expressions réagissent au niveau RMS micro ;
- animations pilotées par l’intensité vocale ;
- transitions fluides via Motion.

### 👤 Personnalisation locale
- **Mémoire du prénom** : l’IA personnalise la conversation.
- **Persistance locale** : avatar + prénom sauvegardés dans le navigateur.

---

## 🛠️ Stack & architecture

### Stack
- **Frontend** : React 19 + TypeScript + Vite.
- **UI/Animation** : Tailwind CSS v4 + Motion.
- **IA Temps Réel** : Google GenAI Live API (audio bidirectionnel PCM).
- **Audio** : pipeline local micro/lecture avec interfaces `IAudioRecorder` / `IAudioPlayer`.

### Structure du code
- `src/lib/AudioService.ts` : Couche d'abstraction pour le multi-plateforme.
- `src/components/avatars/` : Système modulaire d'avatars SVG animés.
- `src/lib/systemPrompt.ts` : Générateur dynamique de personnalité injectant le contexte utilisateur.
- `src/lib/usageLimits.ts` : Gestion de limites d’usage.
- `src/App.tsx` : Orchestration session live, UI principale, état global.

---

## 🎯 Priorité actuelle : amélioration du niveau vocal

Cette version du projet se concentre sur la **qualité d’expérience vocale** :

1. **Stabilité micro**
   - normalisation des niveaux audio ;
   - protection contre les valeurs invalides.
2. **Réduction de latence**
   - flux live optimisé ;
   - démarrage/arrêt de session plus fiable.
3. **Qualité perçue**
   - voix plus douce ;
   - prosodie plus naturelle ;
   - meilleure gestion des interruptions.
4. **Confort enfant**
   - volume de sortie cohérent ;
   - réponses courtes et claires ;
   - ton rassurant.
5. **Sécurité**
   - garde-fous conversationnels ;
   - limitation des usages prolongés.

---

## 🚀 Installation Rapide

1. **Clonage & Installation**
   ```bash
   git clone https://github.com/votre-username/kidsvoice-ai.git
   npm install
   ```

2. **Configuration**
   Créez un fichier `.env` à la racine :
   ```env
   VITE_GEMINI_API_KEY=votre_cle_gemini_ici
   ```

3. **Décollage**
   ```bash
   npm run dev
   ```

---

## 🛡️ Sécurité & Confidentialité

- **Zéro stockage serveur des préférences** : données enfant conservées localement.
- **Prompt de sécurité** : restrictions sur sujets sensibles.
- **Respect de la vie privée** : ne pas demander d’informations personnelles.

---

## 🗺️ Roadmap
Consultez [ROADMAP.md](ROADMAP.md) pour suivre le plan d’amélioration, avec un accent immédiat sur la **voix** (qualité, expressivité, robustesse).

---
*Développé avec ❤️ pour la prochaine génération d'explorateurs.*
