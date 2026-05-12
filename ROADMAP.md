# ROADMAP 🛤️

Ce document présente la vision produit de **KidsVoice AI** et détaille le chemin du MVP aux futures implémentations.

## 🟢 Étape 1 : Le MVP (Current State)
*Statut : **En production (Terminé)***

- [x] Application SPA sous React / Vite / TailwindCSS.
- [x] Personnage SVG interactif (idle, listening, connecting, speaking).
- [x] Cœur magique Temps Réel (Gemini Live API).
- [x] Enregistrement et restitution audio en Base64 stream continu.
- [x] Fichier `systemPrompt.ts` externalisé pour l'édition de la personnalité IA.
- [x] Gestion des interruptions intelligentes (Barge-in de Gemini).

---

## 🟡 Étape 2 : Version 1 - Backend sécurisé et Profils Multiples
*Statut : **Prochaine étape***

- [ ] **Proxy Serveur / BFF (Backend for Frontend)** : Migration de la logique Google API vers un backend Express ou un serverless function (Vercel/Supabase Functions) pour **cacher la clé API Gemini**.
- [ ] **Supabase Auth** : Intégration de l'authentification (Google OAuth ou PIN) pour que chaque enfant ait un espace fermé.
- [ ] **Personnalisation locale de l'UI** : Possibilité de choisir entre plusieurs Avatars (Robot, Renard magique, Fée).
- [ ] **Sélecteur de niveau** : Ajustement automatique du prompt système en fonction de l'âge déclaré de l'enfant (ex: 4-6 ans vs 8-10 ans).

---

## 🟠 Étape 3 : Version 2 - Mémoire et Dashboard Parental
*Statut : **Planifié***

- [ ] **Mémoire BDD temporelle** : Sauvegarde facultative des sessions dans Supabase via text-transcript (pour assurer un suivi des centres d'intérêt de l'enfant : "Tu m'as dit hier que tu aimais les trains...").
- [ ] **Dashboard Sécurisé (Parent)** : 
  - Visualisation des statistiques d'usage (temps passé).
  - Accès aux résumés (transcription texte optionnelle et sécurisée) des questions posées pour suivre les apprentissages et la curiosité de l'enfant.
- [ ] **Filtres Thématiques** : Restreindre les discussions à certains thèmes (Sciences, Histoire, Apprentissage pur).

---

## 🟣 Étape 4 : Version 3 - Intégrations Pédagogiques
*Statut : **En cours de réflexion***

- [ ] **Intégration d'outils (Tool Calling)** : Permettre à KidsVoice de déclencher des appels API externes (ex: récupérer la vraie météo locale, lire une histoire générée à la volée avec des sons ambiants FX).
- [ ] **Mode Apprentissage de Langue** : Configuration pour discuter et pratiquer une nouvelle langue étrangère à travers un jeu de rôle interactif.
- [ ] **Application Mobile (React Native)** : Porter l'expérience client vers un store applicatif iOS/Android.
