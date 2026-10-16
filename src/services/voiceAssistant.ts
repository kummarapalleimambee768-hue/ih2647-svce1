import { FOUR_SAFE_EXERCISES, SAFETY_TIPS, generateExerciseGuideText } from '../data/exerciseRoutines';

export type VoicePersonaId = 'maternal' | 'doctor' | 'coach' | 'calm';

export interface VoicePersona {
  id: VoicePersonaId;
  name: string;
  role: string;
  description: string;
  pitch: number;
  rate: number;
  badge: string;
}

export const VOICE_PERSONAS: Record<VoicePersonaId, VoicePersona> = {
  maternal: {
    id: 'maternal',
    name: 'Aanya (Maternal Companion)',
    role: 'Nurturing & Gentle Companion',
    description: 'Warm, empathetic, and gentle conversational cadence designed to reassure expecting mothers.',
    pitch: 1.15,
    rate: 0.92,
    badge: '🌸 Soothing'
  },
  doctor: {
    id: 'doctor',
    name: 'Dr. Sunita (OB/GYN Guide)',
    role: 'Clinical Healthcare Specialist',
    description: 'Professional, articulate, and reassuring clinical tone delivering evidence-based guidance.',
    pitch: 1.0,
    rate: 0.98,
    badge: '🩺 Clinical'
  },
  coach: {
    id: 'coach',
    name: 'Zara (Wellness Coach)',
    role: 'Active Prenatal Fitness Coach',
    description: 'Upbeat, encouraging, and vibrant guidance for daily safe workouts and positive mindset.',
    pitch: 1.22,
    rate: 1.04,
    badge: '⚡ Energetic'
  },
  calm: {
    id: 'calm',
    name: 'Maya (Zen Relaxation)',
    role: 'Mindfulness & Breathing Guide',
    description: 'Deep, slow, tranquil meditative tone ideal for evening relaxation and labor breathing.',
    pitch: 0.88,
    rate: 0.82,
    badge: '🧘 Tranquil'
  }
};

export const PERSONA_STORAGE_KEY = 'mom_journey_voice_persona';

export function getStoredVoicePersona(): VoicePersonaId {
  if (typeof window === 'undefined') return 'maternal';
  try {
    const saved = localStorage.getItem(PERSONA_STORAGE_KEY) as VoicePersonaId;
    if (saved && VOICE_PERSONAS[saved]) return saved;
  } catch (e) {}
  return 'maternal';
}

export function setStoredVoicePersona(id: VoicePersonaId): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(PERSONA_STORAGE_KEY, id);
  } catch (e) {}
}

export type VoiceActionType =
  | 'NAVIGATE_EXERCISES'
  | 'NAVIGATE_DASHBOARD'
  | 'NAVIGATE_NUTRITION'
  | 'NAVIGATE_ASSISTANT'
  | 'LOGIN_USER'
  | 'EXPLAIN_BENEFITS'
  | 'READ_SAFETY_TIPS'
  | 'DOWNLOAD_FILE'
  | 'UNKNOWN';

export interface VoiceCommandResult {
  action: VoiceActionType;
  spokenResponse: string;
  targetTrimester?: 1 | 2 | 3;
  exerciseName?: string;
  benefits?: string[];
  safetyTips?: typeof SAFETY_TIPS;
  downloadTriggered?: boolean;
  sisterId?: 'sister-1-ananya' | 'sister-2-priya' | 'sister-3-meera';
  sisterName?: string;
}

export function getSpeechRecognitionLang(langCode?: string): string {
  const code = (langCode || 'en').toLowerCase().split('-')[0];
  switch (code) {
    case 'hi':
      return 'hi-IN';
    case 'te':
      return 'te-IN';
    case 'ta':
      return 'ta-IN';
    case 'kn':
      return 'kn-IN';
    case 'en':
    default:
      return 'en-IN';
  }
}

export function processVoiceCommand(input: string, langCode: string = 'en'): VoiceCommandResult {
  const query = input.trim().toLowerCase();

  // 1. Voice Login commands (English, Hindi, Telugu, Tamil, Kannada)
  if (
    query.includes('ananya') ||
    query.includes('अनन्या') ||
    query.includes('అనన్య') ||
    query.includes('அனன்யா') ||
    query.includes('ಅನನ್ಯಾ')
  ) {
    return {
      action: 'LOGIN_USER',
      sisterId: 'sister-1-ananya',
      sisterName: 'Ananya (Week 24 - 2nd Trimester)',
      spokenResponse: 'Logging you in as Ananya, 24 weeks pregnant, second trimester. Navigating to your personalized dashboard.',
    };
  }

  if (
    query.includes('priya') ||
    query.includes('प्रिया') ||
    query.includes('ప్రియా') ||
    query.includes('பிரியா') ||
    query.includes('ಪ್ರಿಯಾ')
  ) {
    return {
      action: 'LOGIN_USER',
      sisterId: 'sister-2-priya',
      sisterName: 'Priya (Week 10 - 1st Trimester)',
      spokenResponse: 'Logging you in as Priya, 10 weeks pregnant, first trimester. Welcome back!',
    };
  }

  if (
    query.includes('meera') ||
    query.includes('मीरा') ||
    query.includes('మీరా') ||
    query.includes('மீரா') ||
    query.includes('ಮೀರಾ')
  ) {
    return {
      action: 'LOGIN_USER',
      sisterId: 'sister-3-meera',
      sisterName: 'Meera (Week 34 - 3rd Trimester)',
      spokenResponse: 'Logging you in as Meera, 34 weeks pregnant, third trimester. Ready for your birth prep!',
    };
  }

  if (
    query.includes('quick demo') ||
    query.includes('demo login') ||
    query.includes('log in') ||
    query.includes('लॉगिन') ||
    query.includes('లాగిన్')
  ) {
    return {
      action: 'LOGIN_USER',
      sisterId: 'sister-1-ananya',
      sisterName: 'Ananya (Demo)',
      spokenResponse: 'Accessing Mom Journey demo account and launching your dashboard.',
    };
  }

  if (
    query.includes('zip') ||
    query.includes('project code') ||
    query.includes('whole project') ||
    query.includes('source code') ||
    query.includes('download project') ||
    query.includes('जिप') ||
    query.includes('ಜಿಪ್') ||
    query.includes('ஜிப்') ||
    query.includes('కోడ్')
  ) {
    return {
      action: 'UNKNOWN',
      spokenResponse: 'Project ZIP downloads are not available here. You can download the safe exercise guide instead.',
    };
  }

  // 2. Download exercise guide
  if (
    query.includes('download') ||
    query.includes('save file') ||
    query.includes('export guide') ||
    query.includes('डाउनलोड') ||
    query.includes('డౌన్‌లోడ్') ||
    query.includes('பதிவிறக்கு')
  ) {
    triggerFileDownload();
    return {
      action: 'DOWNLOAD_FILE',
      spokenResponse: 'Downloading the Pregnancy Safe Exercises and Wellness Guide for you now.',
      downloadTriggered: true,
    };
  }

  // 3. Trimester-specific exercises command
  if (
    query.includes('second trimester') ||
    query.includes('trimester 2') ||
    query.includes('2nd trimester') ||
    query.includes('दूसरी तिमाही') ||
    query.includes('రెండవ త్రైమాసికం')
  ) {
    return {
      action: 'NAVIGATE_EXERCISES',
      targetTrimester: 2,
      spokenResponse: 'Opening safe exercises filtered for the second trimester: Gentle Walking, Prenatal Yoga, Swimming, and Kegels.',
    };
  }

  if (
    query.includes('first trimester') ||
    query.includes('trimester 1') ||
    query.includes('1st trimester') ||
    query.includes('पहली तिमाही') ||
    query.includes('మొదటి త్రైమాసికం')
  ) {
    return {
      action: 'NAVIGATE_EXERCISES',
      targetTrimester: 1,
      spokenResponse: 'Opening safe exercises filtered for the first trimester, focusing on gentle movement and morning nausea management.',
    };
  }

  if (
    query.includes('third trimester') ||
    query.includes('trimester 3') ||
    query.includes('3rd trimester') ||
    query.includes('तीसरी तिमाही') ||
    query.includes('మూడవ త్రైమాసికం')
  ) {
    return {
      action: 'NAVIGATE_EXERCISES',
      targetTrimester: 3,
      spokenResponse: 'Opening safe exercises filtered for the third trimester, prioritizing joint relief, swimming, and pelvic floor relaxation.',
    };
  }

  // 4. Open safe exercises generic command
  if (
    query.includes('safe exercises') ||
    query.includes('open exercise') ||
    query.includes('show exercise') ||
    query.includes('go to exercise') ||
    query.includes('exercise page') ||
    query.includes('एक्सरसाइज') ||
    query.includes('व्यायाम') ||
    query.includes('कसरत') ||
    query.includes('వ్యాయామం') ||
    query.includes('உடற்பயிற்சி') ||
    query.includes('ವ್ಯಾಯಾಮ')
  ) {
    return {
      action: 'NAVIGATE_EXERCISES',
      spokenResponse: 'Opening the Safe Exercises page. Here you will find Gentle Walking, Prenatal Yoga, Swimming, and Kegel exercises.',
    };
  }

  // 5. Read safety tips command
  if (
    query.includes('safety tip') ||
    query.includes('read safety') ||
    query.includes('tell me safety') ||
    query.includes('hydration') ||
    query.includes('overheating') ||
    query.includes('सुरक्षा') ||
    query.includes('टिप्स') ||
    query.includes('భద్రతా చిట్కాలు')
  ) {
    return {
      action: 'READ_SAFETY_TIPS',
      safetyTips: SAFETY_TIPS,
      spokenResponse: 'Here are your three core safety tips: First, Hydration: drink water before and every 15 minutes during activity. Second, Overheating: stay in cool areas and avoid hot tubs or saunas. Third, Listen to your body: use the talk test, never exercise to exhaustion, and stop immediately if you feel dizzy or notice cramping.',
    };
  }

  // 7. Benefits of specific exercises
  if (query.includes('yoga') || query.includes('prenatal yoga') || query.includes('योग')) {
    const yoga = FOUR_SAFE_EXERCISES.find((e) => e.category === 'yoga')!;
    return {
      action: 'EXPLAIN_BENEFITS',
      exerciseName: 'Prenatal Yoga',
      benefits: yoga.benefits,
      spokenResponse: `The key benefits of Prenatal Yoga (15 to 20 minutes) are: ${yoga.benefits.join('. ')}.`,
    };
  }

  if (query.includes('walking') || query.includes('gentle walking') || query.includes('टहलना') || query.includes('నడక')) {
    const walking = FOUR_SAFE_EXERCISES.find((e) => e.category === 'walking')!;
    return {
      action: 'EXPLAIN_BENEFITS',
      exerciseName: 'Gentle Walking',
      benefits: walking.benefits,
      spokenResponse: `The key benefits of Gentle Walking (20 to 30 minutes) are: ${walking.benefits.join('. ')}.`,
    };
  }

  if (query.includes('swimming') || query.includes('pool') || query.includes('तैराकी') || query.includes('ఈత')) {
    const swimming = FOUR_SAFE_EXERCISES.find((e) => e.category === 'swimming')!;
    return {
      action: 'EXPLAIN_BENEFITS',
      exerciseName: 'Swimming',
      benefits: swimming.benefits,
      spokenResponse: `The key benefits of Swimming (20 to 30 minutes) are: ${swimming.benefits.join('. ')}.`,
    };
  }

  if (query.includes('kegel') || query.includes('pelvic floor') || query.includes('कीगल')) {
    const kegel = FOUR_SAFE_EXERCISES.find((e) => e.category === 'kegel')!;
    return {
      action: 'EXPLAIN_BENEFITS',
      exerciseName: 'Kegel Exercises',
      benefits: kegel.benefits,
      spokenResponse: `The key benefits of Kegel Exercises (5 to 10 minutes) are: ${kegel.benefits.join('. ')}.`,
    };
  }

  // 8. Navigation: Dashboard
  if (
    query.includes('dashboard') ||
    query.includes('home') ||
    query.includes('go back') ||
    query.includes('back to dashboard') ||
    query.includes('डैशबोर्ड') ||
    query.includes('డ్యాష్‌బోర్డ్') ||
    query.includes('டாஷ்போர்டு') ||
    query.includes('ಡ್ಯಾಶ್‌ಬೋರ್ಡ್')
  ) {
    return {
      action: 'NAVIGATE_DASHBOARD',
      spokenResponse: 'Taking you back to your main pregnancy dashboard.',
    };
  }

  // 9. Navigation: Nutrition Scanner
  if (
    query.includes('food') ||
    query.includes('nutrition') ||
    query.includes('scanner') ||
    query.includes('diet') ||
    query.includes('खाना') ||
    query.includes('पोषण') ||
    query.includes('आहार') ||
    query.includes('ఆహారం') ||
    query.includes('உணவு') ||
    query.includes('ಆಹಾರ')
  ) {
    return {
      action: 'NAVIGATE_NUTRITION',
      spokenResponse: 'Opening the AI Nutrition Scanner with verified Indian and USDA food pregnancy safety verdicts.',
    };
  }

  // 10. Navigation: Assistant
  if (
    query.includes('assistant') ||
    query.includes('chat') ||
    query.includes('ask ai') ||
    query.includes('सहायक') ||
    query.includes('సహాయకుడు')
  ) {
    return {
      action: 'NAVIGATE_ASSISTANT',
      spokenResponse: 'Opening Mom Journey AI Assistant.',
    };
  }

  // Fallback
  return {
    action: 'UNKNOWN',
    spokenResponse: `I heard: "${input}". Try saying "Log in as Ananya", "Open safe exercises", "Show second trimester exercises", "Tell me the benefits of prenatal yoga", "Read safety tips", or "Download the safe exercise guide".`,
  };
}

export function triggerFileDownload(): void {
  if (typeof document === 'undefined') return;
  const content = generateExerciseGuideText();
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = 'Mom_Journey_Safe_Exercises_Guide.txt';
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}

export function speakText(
  text: string,
  options?: { personaId?: VoicePersonaId; lang?: string }
): void {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

  try {
    window.speechSynthesis.cancel();

    const personaId = options?.personaId || getStoredVoicePersona();
    const persona = VOICE_PERSONAS[personaId] || VOICE_PERSONAS.maternal;
    const langCode = options?.lang || 'en';
    const targetSpeechLang = getSpeechRecognitionLang(langCode);

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.pitch = persona.pitch;
    utterance.rate = persona.rate;
    utterance.lang = targetSpeechLang;

    // Pick best matching browser voice
    const voices = window.speechSynthesis.getVoices();
    if (voices && voices.length > 0) {
      // 1. Exact language match (e.g. hi-IN or te-IN)
      const exactVoice = voices.find(
        (v) => v.lang.toLowerCase() === targetSpeechLang.toLowerCase()
      );
      // 2. Language prefix match (e.g. hi or te)
      const prefixVoice = voices.find((v) =>
        v.lang.toLowerCase().startsWith(targetSpeechLang.split('-')[0].toLowerCase())
      );
      // 3. Indian English match
      const indianVoice = voices.find((v) => v.lang.includes('en-IN') || v.name.includes('India'));
      // 4. Female voice fallback for maternal persona
      const femaleVoice = voices.find(
        (v) => v.name.toLowerCase().includes('female') || v.name.toLowerCase().includes('zira') || v.name.toLowerCase().includes('samantha')
      );

      utterance.voice = exactVoice || prefixVoice || indianVoice || femaleVoice || voices[0];
    }

    window.speechSynthesis.speak(utterance);
  } catch (err) {
    console.warn('Speech synthesis error:', err);
  }
}
