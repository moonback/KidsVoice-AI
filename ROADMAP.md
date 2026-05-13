# 🛤️ KidsVoice AI - Roadmap Produit

Ce document définit les jalons pour faire évoluer KidsVoice AI vers une expérience vocale enfant de référence.
**Priorité actuelle : montée de niveau vocal (qualité, naturel, sécurité, robustesse).**

---

## 🟢 Phase 1 : Fondations & immersion (Terminé ✅)
*Objectif : établir une base stable et engageante.*

- [x] **Moteur Temps Réel** : Intégration de Gemini Live API (latence < 1s).
- [x] **Système d'Avatars** : 5 compagnons uniques avec identités visuelles et verbales.
- [x] **Réactivité Sonore** : Animations synchronisées avec le volume du micro (RMS).
- [x] **Personnalisation** : Mémorisation locale du prénom et des préférences.
- [x] **Architecture Abstraite** : Découplage de la logique audio pour le multi-plateforme.

---

## 🟡 Phase 2 : Niveau vocal (En cours 🏗️)
*Objectif : améliorer la qualité de conversation vocale de bout en bout.*

- [ ] **Pipeline micro robuste**
  - normalisation/gain auto plus fin ;
  - anti-clipping ;
  - détection du silence.
- [ ] **Voix plus naturelle**
  - benchmark de voix (douceur, intonation, vitesse) ;
  - profils par tranche d’âge.
- [ ] **Gestion des tours de parole**
  - meilleure détection interruption enfant ;
  - reprise contextuelle fluide ;
  - limitation des chevauchements audio.
- [ ] **Réduction de latence perçue**
  - tuning chunk audio ;
  - réduction du délai de réponse initial.
- [ ] **Qualité audio de sortie**
  - volume cible cohérent ;
  - réduction artefacts/rebond ;
  - tests écoute mobile.
- [ ] **Sécurité conversationnelle renforcée**
  - réponses plus courtes et adaptées ;
  - garde-fous thématiques enfant.

---

## 🟠 Phase 3 : Architecture & sécurité plateforme (Prochainement 🚀)
*Objectif : sécuriser la prod et préparer l’échelle.*

- [ ] **BFF (Backend for Frontend)** : proxy API, rotation de clé, quotas.
- [ ] **Observabilité**
  - logs techniques ;
  - métriques de latence et erreurs audio ;
  - tableaux de bord qualité vocale.
- [ ] **Tests**
  - tests e2e conversation vocale ;
  - tests de non-régression animations audio-réactives.

---

## 🟣 Phase 4 : Pédagogie & fonctionnalités avancées (Futur ✨)
*Objectif : enrichir l’expérience sans perdre la simplicité vocale.*

- [ ] **Sélecteur de niveau cognitif** (4-6, 7-9, 10+).
- [ ] **Mode tutorat** : sessions guidées.
- [ ] **Vision multimodale** : interaction caméra/dessin.
- [ ] **Dashboard parental** : synthèses non intrusives.
- [ ] **Application mobile native**.

---

## 📈 Indicateurs de Succès
- **Qualité vocale** :
  - latence moyenne perçue ;
  - taux d’interruptions gérées correctement ;
  - score de clarté des réponses.
- **Engagement** : durée moyenne de session.
- **Confiance** : satisfaction parentale (sécurité + ton adapté).

---
> *La roadmap est un document vivant et peut évoluer en fonction des retours de la communauté et des avancées technologiques.*
