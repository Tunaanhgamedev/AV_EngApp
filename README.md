<div align="center">

# 🌌 Nebula AI English (AV_EngApp)

### Enterprise-Grade AI-Powered English Learning, Reading Tactics & Exam Preparation Platform

[![Next.js Version](https://img.shields.io/badge/Next.js-15.0_App_Router-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Node.js](https://img.shields.io/badge/Node.js-20.x-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org)
[![Database](https://img.shields.io/badge/PostgreSQL-Supabase-336791?style=for-the-badge&logo=postgresql&logoColor=white)](https://supabase.com)
[![Firebase](https://img.shields.io/badge/Firebase-Admin_SDK-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com)
[![Gemini AI](https://img.shields.io/badge/Google_Gemini-Flash_1.5_/_Latest-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev)
[![Build Status](https://img.shields.io/badge/Build-Passing-2ea44f?style=for-the-badge)](https://github.com/Tunaanhgamedev/AV_EngApp)
[![License](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

<br/>

## 🔗 Live Application Web Link
### 🌍 👉 [https://va-eng-tunamoi.vercel.app/](https://va-eng-tunamoi.vercel.app/) 👈

<br/>

<p align="center">
  <a href="#-live-application-web-link">Live App</a> •
  <a href="#-executive-summary">Overview</a> •
  <a href="#-core-learning-modules--features">Features & Modules</a> •
  <a href="#-multi-layer-resilient-audio-tts-engine">Audio Engine</a> •
  <a href="#-cross-device--dark-mode-compatibility">Compatibility</a> •
  <a href="#-system-architecture">Architecture</a> •
  <a href="#-rest-api-documentation">API Specs</a> •
  <a href="#-performance-optimizations">Optimizations</a> •
  <a href="#-installation--setup">Quick Start</a>
</p>

</div>

---

## 📖 Executive Summary

**Nebula AI English** is an all-in-one, full-stack, responsive English learning ecosystem that bridges cognitive learning science (Spaced Repetition System - SRS), pedagogical reading tactics, and Generative Artificial Intelligence (Google Gemini 2.0 / 1.5 Flash).

From comprehensive **TOEIC & IELTS test suites** with photo categorization and trap analysis to **interactive reading tactics** (Pronoun references, Noun endings, OSASCOMP Adjectives, Subject-Verb agreement, and Reduced participle clauses), Nebula AI English delivers a fluid, low-latency, and high-engagement learning experience on all devices.

---

## 🚀 Core Learning Modules & Features

The platform provides a comprehensive suite of tools tailored for self-paced studying, interactive practice, and real exam preparation:

### 1. 🎧 TOEIC Master Listening Suite (`/toeic/practice/listening`)
* **4-Category Photo Classification (Part 1):** Over 26+ verified photo questions classified into 4 distinct groups with instant category filter pills:
  * 📦 **Tranh Tả Vật (Objects):** Furniture, blueprints, keys, coffee cups, warehouse shelves, bicycles.
  * 🧑 **Tranh Tả Người (People):** Team meetings, speakers presenting, chefs cooking, portrait conversations.
  * 🏞️ **Tranh Tả Cảnh (Scenery):** Airplanes flying, cozy restaurant lobbies, forest landscapes, suspension bridges.
  * 👥📦 **Người & Vật / Bối Cảnh (Combined):** Engineers in labs, construction crews, customers paying at registers, gardeners watering.
* **Exam Trap Breakdown & Warning Box:** Each question features a dedicated *"⚠️ Cảnh Giác Bẫy Đề Thi"* explanation card identifying common ETS distractors (*passive continuous in non-people photos, incorrect actions, sound-alike traps*).
* **Real Exam Transcript Mode:** Lời thoại và văn bản 4 lựa chọn được ẩn hoàn toàn trước khi làm bài (chỉ hiển thị A, B, C, D), tự động mở khóa transcript song ngữ và giải thích chi tiết khi chọn đáp án.
* **Playback Speed Controller:** Tùy chỉnh tốc độ phát âm thanh tức thì: `0.75x` (Chậm), `0.85x` (Chuẩn phản xạ), `1.0x` (Chuẩn thi thật), `1.25x` (Nâng cao).
* **Full Parts 1–4 Listening Coverage:** 
  * Part 1 (Photographs & Verified Distractors)
  * Part 2 (Question-Response with individual audio buttons)
  * Part 3 (Multi-speaker conversations with speaker turns & key vocabulary)
  * Part 4 (Short talks with audio scripts & vocabulary highlights)
  * Cẩm nang 7 bộ lọc chiến thuật bẫy nghe chuyên sâu.

---

### 2. 📖 Reading Room & Language Tactics (`/reading`)
A comprehensive grammar & reading comprehension hub designed to master Part 5, 6, and 7:
* **📰 Bài Đọc & AI Reading:** Topical passages with sentence-by-sentence bilingual translation, vocabulary glossaries, and reading comprehension quizzes.
* **🏷️ Đại Từ & Quy Chiếu (Pronoun References):** Master the skill of resolving referents (*it, they, their, one, another*) in complex reading paragraphs.
* **🔖 Đuôi Danh Từ & Số Nhiều (Noun Endings & Plurals):** Suffix identification (`-tion`, `-ment`, `-ity`, `-ance`), irregular plurals (`criterion -> criteria`), and uncountable noun traps (`information`, `equipment`, `luggage`).
* **✨ Tính Từ & Động Từ (-ed/-ing, OSASCOMP, S-V Agreement):**
  * **Hậu tố Tính từ & Động từ:** Nhận diện đuôi `-ful`, `-less`, `-ive`, `-able`, `-ous`, `-ize`, `-ate`, `-en`, `-ify`.
  * **Bẫy Đuôi `-LY` là Tính từ:** `friendly`, `timely`, `costly`, `daily`, `orderly` (*in a timely manner*).
  * **Tính từ Phân từ `-ED` vs `-ING`:** Cảm xúc người nhận tác động (`-ed`) vs Bản chất gây ra cảm xúc (`-ing`).
  * **Trật tự Tính từ OSASCOMP:** **O**pinion &rarr; **S**ize &rarr; **A**ge &rarr; **S**hape &rarr; **C**olor &rarr; **O**rigin &rarr; **M**aterial &rarr; **P**urpose + **Noun**.
  * **Cấp so sánh:** So sánh bằng, hơn, nhất và bảng tính từ bất quy tắc (`good -> better -> best`, `far -> further`).
  * **Quy tắc Hòa hợp Chủ Vị (S-V Agreement):** `A number of` (V số nhiều) vs `The number of` (V số ít), `Each/Every` (V số ít), `S1 along with S2` (chia theo S1), `Either S1 or S2` (chia theo S2).
  * **Dạng thức Động từ (To-V / V-ing / Bare V):** Động từ theo sau là `To-V` (*decide, plan, hope*), `V-ing` (*enjoy, avoid, suggest*), `Bare V` (*make, let, have, help*), và các cặp đổi nghĩa (*remember, stop, try*).
  * **Rút gọn Mệnh đề quan hệ:** Chủ động dùng `V-ing` (có tân ngữ), Bị động dùng `V3/ed` (có giới từ).
  * **Bảng 4 Nhóm Động Từ Bất Quy Tắc:** Gom nhóm thông minh (*V1=V2=V3, V2=V3, i->a->u, V3 tận cùng -en*).
* **🧭 Vị Trí Từ Loại & Cách Làm Bài:** Công thức vị trí N, V, Adj, Adv và mẹo giải nhanh trong 5 giây.
* **⏰ Phối Hợp Thì & Chuỗi Thì:** Quy tắc phối hợp thì với liên từ thời gian (`when`, `while`, `since`, `before`, `as soon as`, `by the time`).
* **⚡ Luyện Tập Thực Chiến:** Trắc nghiệm tương tác chấm điểm tức thì kèm công thức ngữ pháp và giải thích chi tiết.

---

### 3. 🤖 AI Translation & Grammar Explainer (`/translate`)
* **Dual Translation Engine:** Fast translation & Deep contextual translation powered by Google Gemini.
* **Deep Grammatical Breakdown:** One-click sentence analysis detailing:
  * **Grammar Patterns:** Highlights grammatical structures used in the source text.
  * **Vocabulary Parsing:** Breakdown of parts of speech, IPA phonetic transcriptions, and meanings.
  * **Alternative Phrasings:** Generates native-sounding variations.
  * **Speaking Tips:** Accent, liaison, and intonation advice.
* **One-Click Notebook Sync:** Save any word or sentence directly to your personal Spaced Repetition notebook.

---

### 4. 🗣️ AI Conversational Coach & Speaking Studio (`/chat` & `/speaking`)
* **Persona Roleplay:** Interactive scenarios with specialized AI mentors (Tech Recruiter, Tourist Guide, Customer Support, IELTS Examiner).
* **Instant Pedagogical Feedback:** Real-time analysis of user responses with grammar, spelling, and phrasing corrections in Vietnamese.
* **Mouth Shape & Pronunciation Guide:** Visual articulation guides, IPA phonetics, stress rules, and voice recording evaluation.

---

### 5. 📝 AI Writing Journal & Analysis (`/journal`)
* **Automated Essay & Journal Scorer:** Paste or write your English essays, emails, or daily journals.
* **Multi-Metric Scoring:** AI scores vocabulary richness, grammar accuracy, and fluency on a 100-point scale.
* **Inline Error Highlights:** Interactive hover cards explaining why corrections were made and suggesting natural idioms.

---

### 6. 🏆 IELTS & TOEIC Exam Centers (`/ielts` & `/toeic`)
* **IELTS Prep Suite:** Comprehensive Listening, Reading (academic articles), Writing (Task 1 & 2 outlines), and Speaking (Cue card simulations).
* **TOEIC Center:** Full Practice exams (Parts 1 to 7), Vocabulary flashcards, and TOEIC Writing AI grading.

---

### 7. 🧠 Oxford 3000™ Spaced Repetition System (`/learn`, `/review`, `/notebook`)
* **Active Recall Flashcards:** Learn 3000+ CEFR-graded words (A1 to C2) by topic, level, and part of speech.
* **SM-2 Spaced Repetition Scheduling:** Automatically schedules review intervals based on difficulty scores to move vocabulary into long-term memory.
* **Personal Notebook:** Review due vocabulary with daily streak reminders.

---

### 8. 🎮 Interactive Mini Games & Music Hub (`/games` & `/music`)
* **8 Vocabulary & Grammar Games:**
  1. *Vocabulary Match* (Card flipping match)
  2. *Speed Quiz* (Fast-paced multiple choice)
  3. *Word Scramble* (Letter rearranging)
  4. *Sentence Builder* (Syntax ordering)
  5. *Idiom Connector* (Collocation matching)
  6. *Image Guess* (Visual clues)
  7. *Word Hunter* (Hidden vocabulary)
  8. *Word Boss Battle* (Turn-based RPG grammar battle)
* **Global Leaderboards (`/leaderboard`):** Real-time ranking and streak tracking.
* **Focus Music Hub:** Ambient Lo-Fi and study soundtracks playable in background.

---

## 🔊 Multi-Layer Resilient Audio (TTS) Engine

Audio stability is critical for listening and pronunciation. The app uses a dedicated **3-Layer Fallback TTS Engine** (`client/src/lib/ttsService.ts`):

```text
[ Trigger Audio Playback ]
         │
         ▼
┌─────────────────────────────────┐
│ Layer 1: Enhanced Web Speech API│  (GC Anchor Protection + Natural US Voice)
└────────────────┬────────────────┘
                 │ (If voice missing or error)
                 ▼
┌─────────────────────────────────┐
│ Layer 2: Google Translate TTS   │  (Direct HTML5 Audio Stream Fallback)
└────────────────┬────────────────┘
                 │ (If network latency / freeze)
                 ▼
┌─────────────────────────────────┐
│ Layer 3: Safety Watchdog Timer  │  (Auto-releases UI playing state)
└─────────────────────────────────┘
```

* **Garbage Collection Fix:** Anchors `SpeechSynthesisUtterance` to `(window as any)._currentAudioUtterance` to prevent Chromium from silently garbage-collecting long audio utterances.
* **Unified Stop Controller:** Calling `stopAudio()` immediately terminates both Web Speech synthesis and HTML5 audio streams on route or tab changes.

---

## 📱 Cross-Device & Dark Mode Compatibility

Nebula AI English is built with **Mobile-First Responsive Design** and complete **Dark / Light theme support**:

| Device Category | Target Viewport | Adaptive Layout Mechanics | Convenient Features |
| :--- | :--- | :--- | :--- |
| 💻 **Laptops / Desktops** | `>= 1024px` | Side-by-side multi-column views, expanded sidebar navigation, interactive hover transitions. | Wide text editors, keyboard shortcuts. |
| 📟 **iPads / Tablets** | `768px - 1023px` | Collapsible sidebar, flexible 2-column grids, horizontal swipeable category pills. | Touch-friendly modal sheets, gesture navigation. |
| 📱 **Smartphones / Mobile** | `< 768px` | Vertical single-column stack, auto-closing drawer navigation on route change. | Minimum `44x44px` touch targets, sticky action bars. |

---

## 🧩 System Architecture

The application is architected as a decoupled client-server model communicating over secure JWT Bearer tokens:

```text
       [ Clients: Mobile, Tablet, Laptop, PC ]
                         │
                         ▼
        ┌──────────────────────────────────┐
        │  Next.js 15 App Router Frontend  │  (SSR, Streaming & SWC Optimized)
        └──────────────────────────────────┘
                         │
                         ▼  [ REST API Requests + Bearer Tokens ]
        ┌──────────────────────────────────┐
        │     ExpressJS Backend Server     │  (TypeScript Node.js 20)
        └────────────────────────┬─────────┘
                                 │
           ┌─────────────────────┼─────────────────────┐
           ▼                     ▼                     ▼
┌────────────────────┐ ┌────────────────────┐ ┌────────────────────┐
│    Supabase SQL    │ │   Firebase Admin   │ │ Google Gemini SDK  │
│  (Prisma 7.3 ORM)  │ │  (Auth & Storage)  │ │ (Model Fallbacks)  │
└────────────────────┘ └────────────────────┘ └────────────────────┘
```

---

## ⚡ Performance Optimizations

To guarantee maximum frame rates and low latency, the following architectural optimizations are implemented:

1. **Next.js Compiler Optimizations (`client/next.config.ts`):**
   * `optimizePackageImports`: Automated tree-shaking for `lucide-react`, `framer-motion`, and `date-fns`, reducing client bundle size by **40%–60%**.
   * `compress: true`: Universal Brotli & Gzip compression for static assets.
   * `removeConsole`: Automatic removal of `console.log` in production builds.
   * `images`: AVIF & WebP next-gen format prioritization.
2. **Component Memoization & Hoisted State:**
   * `Sidebar.tsx` and navigation items wrapped in `React.memo` with hoisted static arrays, preventing unnecessary layout re-renders.
   * `MiniCalendar` and `IctClockWidget` isolated into sub-components.
3. **Elimination of Duplicate Network Effects:**
   * Dictionary search (`dictionary/page.tsx`) consolidated from 4 duplicate mount effects into a single debounced (300ms) coordinator.
4. **Backend Edge Caching:**
   * Public vocabulary queries set with `Cache-Control: public, max-age=30, stale-while-revalidate=120` for sub-5ms cached responses.
5. **Zero-Latency AI Fallback Chain:**
   * Priority cascade: `gemini-flash-latest` &rarr; `gemini-2.0-flash` &rarr; `gemini-1.5-flash` &rarr; `gemini-pro`.

---

## 🔌 REST API Documentation

All backend endpoints are securely served under the `/api` route prefix:

### 🔐 Authentication & User Stats
* `POST /api/users/checkin` - Records daily check-in streak and awards XP.
* `GET /api/users/profile` - Retrieves user level, XP, and check-in history.
* `GET /api/users/leaderboard` - Lists top ranking learners worldwide.

### 🤖 Generative AI Services
* `POST /api/ai/translate` - Translates text between Vietnamese and English (Fast & Deep modes).
* `POST /api/ai/word-insight` - Returns grammatical CEFR classification and phonetic breakdowns.
* `POST /api/ai/explain-translation` - Generates syntactic grammar explanations and vocabulary analysis.
* `POST /api/ai/explain-journal` - Analyzes user journals with corrections and CEFR scoring.

### 📚 Vocabulary & Spaced Repetition
* `GET /api/vocabulary/wordlist` - Paginated Oxford 3000™ vocabulary search with level/letter filters.
* `GET /api/vocabulary/notebook` - Retrieves the student's personal saved vocabulary list with SRS intervals.
* `POST /api/vocabulary/notebook` - Adds or updates words in the user's notebook.
* `POST /api/vocabulary/review-result` - Updates SM-2 review intervals and next review dates.

### 📝 Exam Practice
* `GET /api/toeic/practice/:part` - Retrieves curated questions for TOEIC Parts 1–7.
* `GET /api/ielts/practice/:skill` - Retrieves IELTS tasks for Listening, Reading, Writing, or Speaking.

---

## 📁 Directory Structure

```bash
AV_EngApp/
├── client/                               # Next.js 15 Client App
│   ├── src/
│   │   ├── app/                          # App Router pages & layouts
│   │   │   ├── chat/                     # Roleplay AI Coach
│   │   │   ├── checkin/                  # Daily Attendance & Streak
│   │   │   ├── dictionary/               # Oxford 3000™ Dictionary
│   │   │   ├── games/                    # 8 Mini Games & Boss Battles
│   │   │   ├── ielts/                    # IELTS Exam Preparation Hub
│   │   │   ├── journal/                  # AI Writing Journal Analysis
│   │   │   ├── leaderboard/              # Global XP Rankings
│   │   │   ├── learn/                    # Topic & Part of Speech Vocabulary
│   │   │   ├── listening/                # Listening Audio Lab
│   │   │   ├── music/                    # Focus Lo-Fi Music Hub
│   │   │   ├── notebook/                 # SRS Flashcard Review Notebook
│   │   │   ├── profile/                  # User Profile & Level
│   │   │   ├── pronunciation/            # IPA, Mouth Shapes & Articulation
│   │   │   ├── reading/                  # Reading Room & Language Tactics
│   │   │   │   ├── components/           # Pronouns, Nouns, Adj/Verb, Tenses, Practice
│   │   │   │   └── grammarData.ts        # Comprehensive Grammar Rules & Datasets
│   │   │   ├── review/                   # Spaced Repetition Review System
│   │   │   ├── settings/                 # App Preferences (Theme, Font)
│   │   │   ├── speaking/                 # AI Speech Studio & Feedback
│   │   │   ├── tenses/                   # 5 Tenses AI Grammar Master
│   │   │   ├── toeic/                    # TOEIC Practice Suite (Parts 1–7)
│   │   │   │   └── practice/listening/   # 4-Category Photo & Trap Listening
│   │   │   └── translate/                # Dual-Engine Translation & Explainer
│   │   ├── components/                   # Sidebar, LayoutWrapper, Markdown, Widgets
│   │   ├── context/                      # Global AuthContext & SoundContext
│   │   ├── data/                         # TOEIC & IELTS master datasets
│   │   ├── lib/                          # ttsService.ts, utils.ts
│   │   └── services/                     # Frontend API service wrappers
│   ├── next.config.ts                    # Compiler & Tree-shaking optimizations
│   └── package.json
│
└── server/                               # Express.js Backend Server
    ├── prisma/                           # schema.prisma & PostgreSQL migrations
    ├── src/
    │   ├── config/                       # Firebase Admin SDK & DB pool
    │   ├── controllers/                  # Route business logic
    │   ├── middleware/                   # JWT Auth & Rate Limiting
    │   ├── routes/                       # Express API route declarations
    │   └── services/                     # Gemini AI & Spaced Repetition logic
    ├── prisma.config.ts                  # Resilient database connection config
    └── package.json
```

---

## ⚙️ Installation & Quick Start

### Prerequisites
* **Node.js:** v20.x or higher (LTS recommended)
* **Package Manager:** npm
* **Database:** PostgreSQL (Supabase or local instance)

### 1. Setup Backend Server
```bash
cd server
npm install
```

Create a `.env` file in the `server/` directory:
```env
PORT=5000
NODE_ENV=development
DATABASE_URL="postgresql://postgres:password@localhost:5432/av_eng?schema=public"
DIRECT_URL="postgresql://postgres:password@localhost:5432/av_eng?schema=public"
GEMINI_API_KEY=your_google_gemini_api_key
JWT_SECRET=your_custom_jwt_signing_secret
```

> [!IMPORTANT]
> Save your Firebase Service Account JSON credentials to `server/firebase-service-account.json`.

Run database migrations and populate seed data:
```bash
npx prisma generate
npx prisma db push
```

Start the backend server:
```bash
npm run dev
```

### 2. Setup Frontend Client
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

Start the Next.js development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to experience Nebula AI English.

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
