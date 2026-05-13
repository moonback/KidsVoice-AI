# 🛤️ KidsVoice AI - Vision & Roadmap

Ce document définit les jalons stratégiques pour transformer KidsVoice AI d'un MVP en une plateforme pédagogique et ludique complète.

---

## 🟢 Phase 1 : Fondations & Immersion (Terminé ✅)
*Objectif : Créer une expérience stable, engageante et sécurisée.*

- [x] **Moteur Temps Réel** : Intégration de Gemini Live API (latence < 1s).
- [x] **Système d'Avatars** : 5 compagnons uniques avec identités visuelles et verbales.
- [x] **Réactivité Sonore** : Animations synchronisées avec le volume du micro (RMS).
- [x] **Personnalisation** : Mémorisation locale du prénom et des préférences.
- [x] **Architecture Abstraite** : Découplage de la logique audio pour le multi-plateforme.

---

## 🟡 Phase 2 : Intelligence & Sécurité (En cours 🏗️)
*Objectif : Sécuriser l'infrastructure et affiner la pertinence pédagogique.*

- [ ] **BFF (Backend for Frontend)** : Serveur proxy (Express/Node) pour masquer la clé API et gérer les quotas.
- [ ] **Sélecteur de Niveau Cognitif** : Adaptation dynamique du vocabulaire et de la complexité des réponses selon l'âge (4-6 ans, 7-9 ans, 10+).
- [ ] **Mode Nuit / Temps de Repos** : Limitation d'usage pour encourager l'enfant à faire des pauses.
- [ ] **Optimisation de la Voix** : Exploration de voix plus douces et expressives via les modèles TTS personnalisés.

---

## 🟠 Phase 3 : Vision & Apprentissage (Prochainement 🚀)
*Objectif : Ajouter de nouvelles dimensions d'interaction et de mémoire.*

- [ ] **Vision Multimodale** : "Montre-moi ton dessin !" — Utiliser la caméra pour que l'avatar puisse commenter et interagir avec l'environnement réel de l'enfant.
- [ ] **Mémoire Long-Terme** : Utilisation de vecteurs (RAG) pour que l'avatar se souvienne des aventures passées et des goûts de l'enfant au fil des sessions.
- [ ] **Mode Tutorat** : Activités guidées sur des thèmes spécifiques (apprentissage des langues, initiation aux sciences).
- [ ] **Tool Calling** : Capacité pour l'avatar de déclencher des effets sonores ou d'ouvrir des "portails magiques" (liens pédagogiques/images).

---

## 🟣 Phase 4 : Écosystème & Dashboard Parental (Futur ✨)
*Objectif : Donner de la visibilité aux parents et sortir du navigateur.*

- [ ] **Dashboard Parental (Insights)** : 
  - Cartographie de la curiosité (quels thèmes l'enfant explore-t-il ?).
  - Résumés hebdomadaires des apprentissages (sans violer la vie privée).
- [ ] **Application Mobile Native** : Portage final vers iOS/Android via React Native.
- [ ] **Mode Hors-Ligne (Hybrid)** : Mini-jeux et interactions basiques sans connexion internet.
- [ ] **Éducation Connectée** : Partenariats avec des plateformes éducatives pour transformer les discussions en exercices ludiques.

---

## 📈 Indicateurs de Succès
- **Engagement** : Temps moyen passé par session.
- **Diversité** : Nombre de thèmes pédagogiques abordés.
- **Confiance** : Satisfaction des parents sur la sécurité des échanges.

---
> *La roadmap est un document vivant et peut évoluer en fonction des retours de la communauté et des avancées technologiques.*
