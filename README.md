# Mom Journey AI — Full-Stack Maternal Wellness & Pregnancy Care Companion

**Mom Journey AI** is a production-ready, full-stack pregnancy care and maternal wellness web application designed for expecting mothers. It combines evidence-based obstetric protocols (ACOG & WHO standards), a certified AI Indian food nutrition scanner, a dedicated Safe Exercises engine with 4 core routines and trimester filters, a voice recognition assistant, and multi-language support (English, Telugu, Hindi, Tamil, Kannada).

---

## 🌟 Key Features

### 1. Modern Maternal Dashboard
- **Gestational Age & EDD Tracker**: Accurate due date calculation using standard obstetric formulas ($\text{LMP} + 280\text{ days}$).
- **Baby Development Milestone**: Visual fruit/vegetable size comparisons (e.g. Corn on the Cob / Papaya at 24 weeks).
- **Streamlined Navigation**: Clean card layout, direct tactile actions, and no clutter.

### 2. Dedicated Safe Exercises Page (`/exercise`)
- **Four Core Evidence-Based Routines**:
  - **Gentle Walking** — *20–30 minutes*
  - **Prenatal Yoga** — *15–20 minutes*
  - **Swimming & Water Aerobics** — *20–30 minutes*
  - **Kegel / Pelvic Floor Exercises** — *5–10 minutes*
- **Trimester Filters**: Instant filtering for All Trimesters, 1st Trimester (W 1–13), 2nd Trimester (W 14–27), and 3rd Trimester (W 28–40).
- **Interactive "Learn More" Modals**: Step-by-step guidance, trimester adjustments, benefits, and safety precautions.
- **Three Core Safety Tips**:
  - *Hydration Protocol* (2.5L+ daily water intake)
  - *Overheating Prevention* (keep core temperature $< 38.3^\circ\text{C} / 101^\circ\text{F}$)
  - *Listening to Your Body* (maternal "Talk Test" and warning signs)
- **Downloadable Guide**: Instant download of `Mom_Journey_Safe_Exercises_Guide.txt`.

### 3. Voice Recognition Assistant
- Built-in microphone with **Web Speech API** integration and spoken audio responses (`speechSynthesis`).
- **Text-based Fallback**: Works on all devices even when microphone is unavailable.
- Supported voice commands:
  - *"Open safe exercises"*
  - *"Show second trimester exercises"*
  - *"Tell me the benefits of prenatal yoga"*
  - *"Read the safety tips"*
  - *"Go back to the dashboard"*
  - *"Download the file"* (downloads exercise guide or full project code)

### 4. Verified AI Nutrition Scanner & Food Composition Engine
- Based on verified **ICMR-NIN Indian Food Composition Tables (IFCT)** and **USDA FoodData Central**.
- Detailed macro and micronutrients essential for pregnancy: **Folate, Iron, Calcium, Protein, Dietary Fiber**.

### 5. Clinical Safety & Emergency SOS Protocol
- High-priority SOS emergency button.
- Real-time keyword triage (detects severe bleeding, severe abdominal pain, fluid leakage, visual disturbance).
- Direct access to local maternity emergency triage (108 / 112) and nearest hospital maps.

### 6. Multilingual Localization (5 Indian Languages)
- English (`en`), Telugu (`te` — తెలుగు), Hindi (`hi` — हिन्दी), Tamil (`ta` — தமிழ்), Kannada (`kn` — ಕನ್ನಡ).

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js (v18.0.0 or higher recommended)
- npm or yarn

### 1. Installation
```bash
npm install
```

### 2. Run Local Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:5173/`.

### 3. Run Automated Tests
```bash
npm test
```

### 4. Production Build
```bash
npm run build
```

---

## 📁 Project Structure

```
mom-journey-ai/
├── public/                 # Static assets (favicons, SVG icons, project zip)
├── src/
│   ├── __tests__/          # Automated unit tests (Vitest)
│   ├── components/         # Reusable UI components
│   │   ├── AppLayout.tsx   # Shell layout with sidebar, header & floating bar
│   │   ├── Navbar.tsx      # Header bar with SOS, Voice trigger, language picker
│   │   ├── BottomNav.tsx   # Mobile responsive navigation bar
│   │   ├── EmergencyModal.tsx # Clinical triage protocol modal
│   │   └── VoiceAssistantModal.tsx # Web Speech API voice assistant
│   ├── data/               # Medical, exercise & nutritional datasets
│   │   ├── exerciseRoutines.ts # 4 exercises, safety tips, guide generator
│   │   ├── foodCompositionDatabase.ts # ICMR-NIN & USDA nutritional tables
│   │   └── indianLanguages.ts # Multilingual dictionary & i18n
│   ├── pages/              # Application views
│   │   ├── DashboardPage.tsx   # Modern card dashboard
│   │   ├── ExercisePage.tsx    # Safe exercises, trimester filters & guides
│   │   ├── NutritionScannerPage.tsx # AI Food Scanner
│   │   ├── FoodDiaryPage.tsx   # Daily intake tracking
│   │   ├── SymptomTrackerPage.tsx # Clinical symptom logging & triage
│   │   ├── AppointmentsPage.tsx # Doctor visit schedule
│   │   ├── RemindersPage.tsx   # Medication & hydration reminders
│   │   ├── AssistantPage.tsx   # Mom Journey AI chat
│   │   ├── MedicalHistoryPage.tsx # Health records
│   │   └── SettingsPage.tsx    # User profile & language preferences
│   ├── services/           # Voice recognition & business logic
│   │   └── voiceAssistant.ts
│   ├── App.tsx             # Route definitions
│   ├── main.tsx            # App root
│   └── index.css           # Design tokens, gradients & animations
├── supabase_schema.sql     # PostgreSQL database schema with Row Level Security
├── tailwind.config.js      # Custom theme, colors (bloom, sage, cream)
├── vite.config.ts          # Vite configuration
└── package.json            # Project dependencies and scripts
```

---

## 🛡️ Database & Security Architecture
- Full PostgreSQL schema in [`supabase_schema.sql`](supabase_schema.sql).
- Implements strict **Row Level Security (RLS)** ensuring medical records, symptom logs, and appointments are strictly private to each user.

---

## 📄 License
MIT License. Built for maternal wellness and healthy outcomes.
