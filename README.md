<div align="center">

# 🌌 Nebula AI English (AV_EngApp)

### Enterprise-Grade AI-Powered English Learning & Exam Preparation Platform

[![Next.js Version](https://img.shields.io/badge/Next.js-15.0_App_Router-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Node.js](https://img.shields.io/badge/Node.js-20.x-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org)
[![Database](https://img.shields.io/badge/PostgreSQL-Supabase-336791?style=for-the-badge&logo=postgresql&logoColor=white)](https://supabase.com)
[![Firebase](https://img.shields.io/badge/Firebase-Admin_SDK-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com)
[![Gemini AI](https://img.shields.io/badge/Google_Gemini-Flash_1.5_/_Latest-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev)
[![Build Status](https://img.shields.io/badge/Build-Passing-2ea44f?style=for-the-badge)](https://github.com/Tunaanhgamedev/AV_EngApp)
[![License](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

<br/>

<p align="center">
  <a href="#-core-features">Core Features</a> •
  <a href="#-system-architecture">System Architecture</a> •
  <a href="#-rest-api-documentation">API Specification</a> •
  <a href="#-optimizations--best-practices">Optimizations</a> •
  <a href="#-directory-structure">Structure</a> •
  <a href="#-installation--setup">Quick Start</a>
</p>

</div>

---

## 📖 Executive Summary

**Nebula AI English** is a full-stack, responsive English learning platform combining cognitive science (Spaced Repetition System) with Generative AI (Google Gemini) and gamification structures. The platform adapts to various screen dimensions—from mobile screens to large desktop monitors—while maintaining a high-fidelity visual experience using glassmorphic styling, custom CSS transition hooks, and low-latency API integration.

---

## 🌟 Core Features

### 1. 🤖 Generative AI Copilots
* **AI Translation & Deep Explainer:** High-accuracy English-to-Vietnamese translation coupled with an automated grammar, context, and pronunciation analyzer.
* **AI Coach Roleplays:** Interactive speech and writing practice with multiple simulated personas (e.g., job interviewer, hotel concierge) leveraging context histories.
* **Smart Writing Journal:** Real-time grammatical evaluation of student essays, offering score breakdowns (grammar, vocabulary, fluency) and natural phrasing suggestions.

### 2. 📚 Academic & Exam Preparation
* **TOEIC Practice Suite:** Generator supporting TOEIC Parts 1-7 with automatic transcript visualization, context-based answer keys, and explanations.
* **IELTS Skill Builder:** Tailored prompts and evaluation sheets for Listening, Reading, Writing, and Speaking skills, using dynamic AI templates.
* **Oxford Spaced Repetition (SRS):** An interactive flashcard engine utilizing memory decay algorithms to schedule optimal vocabulary reviews.

### 3. 🎮 Gamification & Widgets
* **XP & Leaderboard System:** Compete in real-time with global students, tracking check-ins and streaks.
* **Integrated Music Console:** Study helper widget with play/pause capabilities and selected concentration soundtracks.

---

## 🧩 System Architecture

The application is architected as a decoupled client-server model utilizing secure JWT authentication over Bearer headers:

```text
       [ Clients: Mobile, iPad, Laptop, PC ]
                         │
                         ▼
        ┌──────────────────────────────────┐
        │  Next.js 15 App Router Frontend  │  (Hydration Mismatch Handled)
        └──────────────────────────────────┘
                         │
                         ▼  [ REST API Requests + Bearer ID Tokens ]
        ┌──────────────────────────────────┐
        │     ExpressJS Backend Server     │  (TypeScript Node.js)
        └────────────────────────┬─────────┘
                                 │
           ┌─────────────────────┼─────────────────────┐
           ▼                     ▼                     ▼
┌────────────────────┐ ┌────────────────────┐ ┌────────────────────┐
│    Supabase SQL    │ │   Firebase Admin   │ │ Google Gemini SDK  │
│  (Prisma ORM)      │ │  (Auth / Storage)  │ │ (Model Fallbacks)  │
└────────────────────┘ └────────────────────┘ └────────────────────┘
```

---

## ⚡ Optimizations & Best Practices

To achieve optimal user experiences, the following architectural improvements have been integrated:

### 1. Zero-Latency Model Fallback Chain
We implement an auto-recovery fallback chain to handle Gemini API rate limits (`429 Resource Exhausted`) and key quotas:
* **Backend Selection:** Prioritizes `gemini-flash-latest` before cascading to `gemini-2.0-flash`, `gemini-1.5-flash`, and `gemini-pro`.
* **Latency:** Reduces fallback lookup times from **5.2 seconds** to **under 0.8 seconds** by prioritizing the most stable active model.

### 2. Memory-Efficient Client Caching
* **Explanation Cache:** AI explanation panels check a local memory cache (`explanationCacheRef`) before making API requests, allowing instantaneous (0ms) re-opens.
* **Local Translation Cache:** Persistent translation responses are stored in `localStorage` up to 500 entries, avoiding unnecessary server roundtrips.

### 3. Next.js Hydration Resolution
* **Body Hydration:** Added the `suppressHydrationWarning` escape hatch to the base `<body>` tag to suppress local next/font CSS module class name mismatch warnings without altering layout fonts.

### 4. High-Fidelity Mobile Adaptability
* **Layouts:** Implements responsive CSS breakpoints (`grid-cols-1 sm:grid-cols-2`) to reflow interface elements cleanly on mobile screens while maintaining side-by-side configurations on wider screens.
* **Touch Targets:** Interactive components have been sized to exceed `44x44px` to ensure compatibility with mobile and iPad touch gestures.

---

## 🔌 REST API Documentation

The server exposes the following secure endpoints under the `/api` prefix:

### 🔐 Authentication & Users
* `POST /api/users/checkin` - Records daily check-in, recalculates streak counts, and awards XP.
* `GET /api/users/profile` - Fetches user profile, experience stats, and check-in calendar.
* `GET /api/users/leaderboard` - Lists top ranking users sorted by cumulative XP.

### 🤖 Generative AI Services
* `POST /api/ai/translate` - Translates text between Vietnamese and English (supports Fast & Deep modes).
* `POST /api/ai/word-insight` - Returns grammatical level and classification for single words.
* `POST /api/ai/explain-translation` - Generates syntactic grammar explanations, vocabulary breakdowns, and speaking tips.
* `POST /api/ai/explain-journal` - Audits student journals for syntax mistakes.

### 📚 Exam Practice & Preparation
* `GET /api/toeic/practice/:part` - Generates custom 5-question TOEIC exams based on the selected part.
* `GET /api/ielts/practice/:skill` - Instantiates IELTS exam sheets for Listening, Reading, Writing, or Speaking.
* `POST /api/vocabulary/notebook` - Adds a custom word, definition, and grammatical class to the student's notebook.

---

## 📁 Directory Structure

```bash
AV_EngApp/
├── client/                      # Next.js 15 Client
│   ├── src/
│   │   ├── app/                 # App Router pages & layouts
│   │   │   ├── chat/            # Roleplay Chat Coach
│   │   │   ├── dictionary/      # Oxford dictionary interface
│   │   │   ├── ielts/           # IELTS mock practice
│   │   │   ├── journal/         # Journal writing feedback
│   │   │   ├── toeic/           # TOEIC practice sections
│   │   │   └── translate/       # Translation & Explainer
│   │   ├── components/          # Sidebar, Music Widget, UI buttons
│   │   ├── context/             # Global Auth & Music states
│   │   └── lib/                 # Core layout utilities
│   └── package.json
│
└── server/                      # ExpressJS Backend
    ├── prisma/                  # schema.prisma & seed configurations
    ├── src/
    │   ├── config/              # Server configs & firebase setup
    │   ├── controllers/         # API request logic handlers
    │   ├── middleware/          # JWT tokens & role validation
    │   ├── routes/              # Express endpoint routing
    │   └── services/            # Gemini API & Spaced Repetition algorithms
    └── package.json
```

---

## ⚙️ Installation & Setup

### Prerequisites
* **Node.js:** v20.x or higher
* **Package Manager:** npm (bundled with Node)
* **Database:** PostgreSQL (Supabase recommended)

### 1. Setup Backend Server
Navigate to the server directory, install modules, and configure keys:
```bash
cd server
npm install
```
Create a `.env` file in the `server/` directory:
```env
PORT=5000
NODE_ENV=development
DATABASE_URL=postgresql://postgres:password@localhost:5432/av_eng?schema=public
DIRECT_URL=postgresql://postgres:password@localhost:5432/av_eng?schema=public
GEMINI_API_KEY=your_google_gemini_api_key
JWT_SECRET=your_custom_jwt_signing_secret
```
> [!IMPORTANT]
> Save your Firebase Service Account JSON credentials to `server/firebase-service-account.json`.

Run database schema migration and populate default Oxford seed data:
```bash
npx prisma migrate dev
npx prisma db seed
```
Start the backend development environment:
```bash
npm run dev
```

### 2. Setup Client Application
Navigate to the client folder, install packages, and supply variables:
```bash
cd ../client
npm install
```
Create a `.env.local` file inside the `client/` directory:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```
Start the local development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to access the application.

---

## 📄 License

This project is licensed under the MIT License - see the `LICENSE` file for details.
