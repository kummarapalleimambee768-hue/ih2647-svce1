# Mom Journey AI

Mom Journey AI is a maternal wellness and pregnancy companion built with React, TypeScript, and Vite. It brings pregnancy tracking, wellness tools, and educational guidance together in one responsive web app.

> **Important:** This project provides educational and organizational support, not medical diagnosis, treatment, or emergency triage. Always consult a qualified clinician. The included accounts and records are demonstration data.

## Features

### Pregnancy dashboard and timeline

- View pregnancy week, trimester, estimated due date, days remaining, and a 40-week progress indicator.
- Explore week-by-week fetal development milestones, maternal changes, nutrition focus, exercise guidance, recommended tests, and warning signs.
- See a fruit-size comparison and summary cards for appointments, reminders, exercise, nutrition, and assistant access.
- Calculate pregnancy dates from a last menstrual period or clinician-provided due date during onboarding.

### Pregnancy wellness and tracking

- Browse four gentle exercise routines: walking, prenatal yoga, swimming, and pelvic floor exercises.
- Filter exercise guidance by trimester; view instructions, benefits, safety precautions, and downloadable guidance.
- Record symptoms, severity, frequency, notes, and possible triggers.
- Keep an exercise activity log.
- Create and manage medication, supplement, and hydration reminders.

### Nutrition tools

- Search a built-in food composition dataset for common foods and Indian dishes.
- Calculate serving-based calories, macronutrients, and selected micronutrients, including protein, carbohydrates, fat, fiber, folate, iron, calcium, and vitamin C.
- Review pregnancy food-safety guidance and preparation notes where available.
- Add foods to a daily diary and review intake summaries and trends.
- The food dataset records its stated references (including ICMR-NIN and USDA sources); values are informational and should be checked with a clinician or dietitian for individual needs.

### AI and voice assistants

- Ask pregnancy and wellness questions through the assistant page.
- Use built-in emergency keyword checks and educational local responses.
- Optionally configure a Gemini or OpenAI provider for live responses.
- Open the voice assistant to use supported browser speech recognition, spoken responses, and typed commands when speech services are unavailable.
- Choose from available voice personas and try navigation-related voice commands.

### Emergency support

- Open the emergency support modal from the SOS controls.
- Review urgent warning information and quick actions to call emergency services or a clinician.
- Configure emergency contact details and use supported location-sharing actions.
- The SOS interface is a convenience feature, not a substitute for emergency services or clinical triage.

### Personal records and appointments

- Maintain a medical history with conditions, allergies, and notes.
- Add and track antenatal appointments, including visit type, clinician, location, questions, and instructions.
- Manage medical document records and review document previews or extracted summaries where available.
- Configure profile, pregnancy, dietary, language, emergency-contact, and AI-provider preferences.

### Demo profiles and language support

- Explore three sample pregnancy profiles and switch between them using the sister switcher.
- Switch the interface among English, Telugu, Hindi, Tamil, and Kannada.
- The language selection is saved in browser storage. Translated strings are supplied by the locale files and shared-copy dictionary; untranslated text falls back to its original English.

## Application routes

| Route | Page |
| --- | --- |
| `/` | Landing page |
| `/login` | Sign in |
| `/signup` | Create an account |
| `/onboarding` | Pregnancy and profile setup |
| `/dashboard` | Pregnancy dashboard |
| `/exercise` | Exercise and wellness |
| `/nutrition` | Food scanner and safety information |
| `/food-diary` | Food diary |
| `/symptoms` | Symptom tracker |
| `/appointments` | Antenatal appointments |
| `/reminders` | Reminders |
| `/assistant` | Pregnancy assistant |
| `/medical-history` | Medical history |
| `/medical-history/documents` | Medical documents |
| `/settings` | Profile and app settings |

## Technology

- React 19, TypeScript, and Vite
- React Router for navigation
- Tailwind CSS for styling
- i18next and react-i18next for language resources
- Recharts for dashboard charts
- Supabase JavaScript client and a PostgreSQL schema for optional backend integration
- Vitest for automated tests

## Run locally

### Requirements

- Node.js (use a current LTS release)
- npm

### Install dependencies and start the development server

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (usually `http://localhost:5173`).

### Available scripts

```bash
npm run dev     # Start the Vite development server
npm run build   # Type-check and build for production
npm run preview # Preview the production build locally
npm test        # Run the Vitest suite
npm run lint    # Run Oxlint
```

## Demo data, storage, and integrations

- The app initializes with sample sister accounts and records. In the current demo, profile and tracking data are persisted in the browser's `localStorage`; they are not automatically synchronized to a server.
- `supabase_schema.sql` contains a PostgreSQL schema for a possible Supabase-backed deployment. `src/services/supabaseClient.ts` initializes the client when `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are provided. Configure and integrate authentication, storage, and data operations before treating the app as a connected production service.
- The assistant supports optional provider API keys in app settings. Requests are made from the browser in this implementation. Do not use a private production API key in a public client-side deployment; route provider requests through a secured server-side endpoint instead.
- Browser speech recognition and speech synthesis support depends on the browser, device, permissions, and network.

## Project structure

```text
src/
├── __tests__/       # Vitest tests
├── assets/          # Images and static assets
├── components/      # Navigation, layout, dialogs, and shared UI
├── context/         # App state and demo data persistence
├── data/            # Exercise, food, milestone, and demo-profile data
├── locales/         # English, Telugu, Hindi, Tamil, Kannada, and shared copy
├── pages/           # Route-level screens
├── services/        # AI, Supabase client, and voice assistant services
├── types/           # Shared TypeScript types
└── utils/           # Pregnancy date calculations and helpers
```

## Database schema

The optional Supabase/PostgreSQL schema is in [`supabase_schema.sql`](./supabase_schema.sql). Review and adapt its policies, authentication setup, and deployment configuration for your environment before using real personal or health information.
