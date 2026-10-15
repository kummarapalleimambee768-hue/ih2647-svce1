export interface PregnancyExercise {
  id: string;
  name: string;
  category: 'walking' | 'yoga' | 'swimming' | 'kegel';
  recommendedDuration: string; // e.g. "20–30 minutes"
  durationMinutes: number;
  trimesterApplicability: (1 | 2 | 3)[];
  shortSummary: string;
  benefits: string[];
  howToPerform: string[];
  trimesterGuidance: {
    firstTrimester: string;
    secondTrimester: string;
    thirdTrimester: string;
  };
  safetyPrecautions: string[];
  icon: string;
}

export interface SafetyTip {
  id: string;
  title: string;
  icon: string;
  shortDescription: string;
  detailedPoints: string[];
}

export const FOUR_SAFE_EXERCISES: PregnancyExercise[] = [
  {
    id: 'gentle_walking',
    name: 'Gentle Walking',
    category: 'walking',
    recommendedDuration: '20–30 minutes',
    durationMinutes: 25,
    trimesterApplicability: [1, 2, 3],
    icon: '🚶‍♀️',
    shortSummary: 'A safe, low-impact cardiovascular workout that can be continued throughout your entire pregnancy on flat surfaces.',
    benefits: [
      'Boosts cardiovascular health without straining knees, hips, or pelvic joints',
      'Helps prevent gestational diabetes by regulating post-meal blood sugar levels',
      'Reduces peripheral swelling in feet and ankles via the calf muscle pump',
      'Promotes better sleep, elevates mood, and relieves prenatal fatigue',
    ],
    howToPerform: [
      'Choose supportive athletic shoes with cushioned arches and non-slip tread.',
      'Maintain an upright posture with shoulders relaxed and eyes looking forward.',
      'Start with a 5-minute slow stroll warm-up, followed by a comfortable conversational pace.',
      'End with a 3-5 minute gentle deceleration cooldown and light calf stretches.',
    ],
    trimesterGuidance: {
      firstTrimester: 'Walk during cooler morning hours if nausea is less severe. Keep pace conversational.',
      secondTrimester: 'Your center of gravity is shifting; stick to flat park paths and avoid uneven trails.',
      thirdTrimester: 'Break walks into two 15-minute sessions if carrying extra belly weight causes pelvic fatigue.',
    },
    safetyPrecautions: [
      'Apply the "Talk Test": You must be able to speak a full sentence comfortably without gasping.',
      'Avoid walking outdoors during peak midday heat or in humid weather.',
      'Stop if you feel lightheaded, experience pelvic cramping, or notice fluid leakage.',
    ],
  },
  {
    id: 'prenatal_yoga',
    name: 'Prenatal Yoga',
    category: 'yoga',
    recommendedDuration: '15–20 minutes',
    durationMinutes: 20,
    trimesterApplicability: [1, 2, 3],
    icon: '🧘‍♀️',
    shortSummary: 'Gentle postures, spinal mobility, and breathing exercises specifically adapted for pregnancy.',
    benefits: [
      'Relieves lower back pain, hip stiffness, and sacroiliac joint tension',
      'Gently stretches pelvic floor and adductor muscles in preparation for labor',
      'Encourages optimal fetal positioning by taking gravity pressure off the maternal spine',
      'Calms the nervous system and lowers cortisol through deep diaphragmatic breathing',
    ],
    howToPerform: [
      'Practice on a non-slip yoga mat with cushions, blocks, or a folded blanket nearby.',
      'Focus on Cat-Cow spinal flows (8-10 breath cycles) on hands and knees.',
      'Practice supported Butterfly Pose (Baddha Konasana) with cushions under knees.',
      'Incorporate side-lying Child’s Pose with wide knees to accommodate your baby bump.',
    ],
    trimesterGuidance: {
      firstTrimester: 'Gentle mobility and breathing; avoid deep abdominal twists or intense inversions.',
      secondTrimester: 'Never lie flat on your back (supine) to avoid inferior vena cava compression.',
      thirdTrimester: 'Use a sturdy wall or birth ball for balance support. Avoid overstretching loose ligaments.',
    },
    safetyPrecautions: [
      'Avoid "Hot Yoga", Bikram yoga, or rooms above 26°C (79°F).',
      'Never bounce or push into painful stretches (the hormone Relaxin makes joints more vulnerable).',
      'Avoid holding your breath (no Kumbhaka or rapid breathing techniques like Kapalabhati).',
    ],
  },
  {
    id: 'swimming',
    name: 'Swimming',
    category: 'swimming',
    recommendedDuration: '20–30 minutes',
    durationMinutes: 25,
    trimesterApplicability: [1, 2, 3],
    icon: '🏊‍♀️',
    shortSummary: 'Zero-gravity buoyancy that relieves spine and joint pressure while delivering full-body conditioning.',
    benefits: [
      'Water buoyancy supports your weight, relieving spinal compression and pelvic pressure',
      'Provides a cool, comfortable environment that prevents maternal overheating',
      'Enhances lung capacity and overall aerobic stamina without impact stress',
      'Dramatically reduces edema in lower legs and ankles through hydrostatic pressure',
    ],
    howToPerform: [
      'Enter the pool slowly using steps and handrails to prevent slipping on wet tiles.',
      'Perform gentle breaststroke, modified backstroke, or light water walking.',
      'Keep head above water or use a kickboard / pool noodle for buoyant support.',
      'Swim at an easy, rhythmic rhythm where your breathing remains steady and comfortable.',
    ],
    trimesterGuidance: {
      firstTrimester: 'Great for morning sickness as cool water helps refresh the body and reduces nausea.',
      secondTrimester: 'Enjoy the weightless sensation as the uterus expands; breaststroke keeps hips comfortable.',
      thirdTrimester: 'Relieves backache and sciatic pressure; use pool noodles for effortless floating rest.',
    },
    safetyPrecautions: [
      'Never dive, jump into the pool, or use water slides during pregnancy.',
      'Ensure the pool water is comfortably warm (28–30°C / 82–86°F), never hot.',
      'Avoid hot tubs, jacuzzis, and saunas, which raise maternal core temperature dangerously.',
    ],
  },
  {
    id: 'kegel_exercises',
    name: 'Kegel Exercises',
    category: 'kegel',
    recommendedDuration: '5–10 minutes',
    durationMinutes: 8,
    trimesterApplicability: [1, 2, 3],
    icon: '✨',
    shortSummary: 'Targeted strengthening and controlled relaxation of the pelvic floor muscles supporting your uterus and bladder.',
    benefits: [
      'Strengthens the pubococcygeus muscles supporting the uterus, bladder, and bowels',
      'Prevents and treats stress urinary incontinence during pregnancy and after birth',
      'Promotes muscle control and awareness for smoother perineal relaxation during delivery',
      'Accelerates postpartum healing and helps restore core stability',
    ],
    howToPerform: [
      'Empty your bladder first before beginning your Kegel routine.',
      'Identify the muscles you use to stop urination mid-flow (do not do this while actually urinating).',
      'Contract and lift these pelvic muscles for 5 seconds, breathing smoothly throughout.',
      'Completely relax the muscles for 5 seconds before the next contraction.',
      'Aim for 2 to 3 sets of 10 repetitions spread throughout the day.',
    ],
    trimesterGuidance: {
      firstTrimester: 'Build muscle awareness and establish a daily habit (e.g. after morning routine).',
      secondTrimester: 'Practice in both seated and side-lying positions as your baby grows.',
      thirdTrimester: 'Equally prioritize the RELAXATION phase so pelvic muscles can open easily during labor.',
    },
    safetyPrecautions: [
      'Do not hold your breath while squeezing; keep breathing naturally.',
      'Do not tighten your buttocks, thighs, or upper abdominal muscles simultaneously.',
      'If you have been diagnosed with a hypertonic (overly tight) pelvic floor, consult a therapist.',
    ],
  },
];

export const SAFETY_TIPS: SafetyTip[] = [
  {
    id: 'hydration',
    title: 'Hydration Guidelines',
    icon: '💧',
    shortDescription: 'Maintain optimal amniotic fluid and prevent premature uterine cramping with adequate fluids.',
    detailedPoints: [
      'Drink 250–350 ml (1 glass) of water 30 minutes before beginning any physical activity.',
      'Take regular small sips every 10–15 minutes while exercising, even if you do not feel thirsty.',
      'Rehydrate afterwards with fresh water, tender coconut water, or diluted lemon water with a pinch of rock salt for natural electrolytes.',
      'Check your urine color: Pale straw yellow indicates good hydration, while dark yellow warns you to drink more.',
    ],
  },
  {
    id: 'overheating',
    title: 'Overheating Prevention',
    icon: '☀️',
    shortDescription: 'Protect your baby’s development by keeping maternal core temperature below 38.3°C (101°F).',
    detailedPoints: [
      'Exercise in well-ventilated, air-conditioned rooms or outdoors in the early morning/evening hours.',
      'Wear loose, breathable, lightweight cotton or moisture-wicking maternity clothing.',
      'Never use saunas, hot tubs, steam baths, or heated yoga studios during pregnancy.',
      'If you start sweating profusely, feel flushed, or skin feels uncomfortably hot, stop immediately, sit in the shade, and sip cool water.',
    ],
  },
  {
    id: 'listen_to_body',
    title: 'Listening to Your Body',
    icon: '👂',
    shortDescription: 'Pregnancy is a time for gentle maintenance and wellness, not personal fitness records.',
    detailedPoints: [
      'Never exercise to the point of exhaustion or physical depletion; you should feel energized afterwards, not drained.',
      'Use the "Talk Test": If you cannot speak comfortably while moving, slow down your pace.',
      'Respect daily fluctuations: If morning nausea or poor sleep leaves you tired, choose a gentle 10-minute stretch or rest instead.',
      'Stop immediately and contact your doctor if you experience dizziness, headache, chest pain, calf swelling/pain, vaginal spotting, or painful contractions.',
    ],
  },
];

export function generateExerciseGuideText(): string {
  const dateStr = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return `================================================================================
MOM JOURNEY AI — PREGNANCY SAFE EXERCISES & WELLNESS GUIDE
Generated on: ${dateStr}
Reference Standards: ACOG & WHO Maternal Physical Activity Guidelines
================================================================================

1. THE FOUR CORE PREGNANCY EXERCISES

--------------------------------------------------------------------------------
1. GENTLE WALKING
--------------------------------------------------------------------------------
Recommended Duration: 20–30 minutes
Applicability: First, Second, and Third Trimesters
Benefits:
  - Low-impact cardiovascular conditioning that protects joints and ligaments
  - Helps regulate blood sugar and lowers the risk of gestational diabetes
  - Activates the calf muscle pump to prevent swollen ankles and leg edema
  - Relieves fatigue and improves nighttime sleep quality

How to Perform:
  - Wear supportive athletic shoes with non-slip soles and arch support.
  - Maintain an upright spine, shoulders relaxed, looking forward.
  - Start with a 5-minute easy stroll, walk at a conversational pace, and end with a 3-minute cooldown.

--------------------------------------------------------------------------------
2. PRENATAL YOGA
--------------------------------------------------------------------------------
Recommended Duration: 15–20 minutes
Applicability: First, Second, and Third Trimesters
Benefits:
  - Relieves lower back ache, pelvic stiffness, and sacroiliac joint tension
  - Stretches and opens the pelvic inlet to prepare for labor and birth
  - Improves circulation and calms the maternal nervous system
  - Teaches deep, controlled diaphragmatic breathing for contraction coping

How to Perform:
  - Practice on a non-slip mat with cushions or blocks for joint support.
  - Focus on Cat-Cow flows, supported Butterfly Pose, and side-lying stretches.
  - Never lie flat on your back (supine) beyond week 16. Avoid deep abdominal twists.

--------------------------------------------------------------------------------
3. SWIMMING
--------------------------------------------------------------------------------
Recommended Duration: 20–30 minutes
Applicability: First, Second, and Third Trimesters
Benefits:
  - Water buoyancy supports total body weight, eliminating joint and spinal stress
  - Naturally cools the body and prevents maternal overheating
  - Enhances lung capacity and endurance without impact stress
  - Water hydrostatic pressure reduces lower leg edema and leg heaviness

How to Perform:
  - Enter and exit slowly using pool handrails to prevent slipping.
  - Perform gentle breaststroke, modified backstroke, or light water walking.
  - Ensure pool water is comfortably warm (28–30°C / 82–86°F), never hot. Avoid hot tubs!

--------------------------------------------------------------------------------
4. KEGEL EXERCISES
--------------------------------------------------------------------------------
Recommended Duration: 5–10 minutes
Applicability: First, Second, and Third Trimesters
Benefits:
  - Strengthens the pelvic floor muscles supporting the bladder, uterus, and bowels
  - Prevents and treats stress urinary incontinence during and after pregnancy
  - Improves conscious muscle control for smoother perineal relaxation during birth
  - Accelerates postpartum healing and tissue recovery

How to Perform:
  - Empty your bladder before starting.
  - Contract the pelvic floor muscles for 5 seconds while breathing naturally.
  - Completely relax the muscles for 5 seconds before the next contraction.
  - Perform 2 to 3 sets of 10 repetitions daily.

================================================================================
2. CRITICAL PREGNANCY EXERCISE SAFETY TIPS
================================================================================

A. HYDRATION GUIDELINES
  - Drink 250–350 ml of water 30 minutes before starting any movement.
  - Sip water every 10–15 minutes during activity.
  - Rehydrate with fresh water or tender coconut water for natural electrolytes.
  - Check urine color: pale straw yellow indicates good hydration.

B. OVERHEATING PREVENTION
  - Maternal core temperature must not exceed 38.3°C (101°F).
  - Exercise in cool, well-ventilated rooms or early morning/evening hours.
  - Wear loose, breathable cotton or moisture-wicking clothing.
  - Avoid saunas, steam rooms, hot tubs, and heated hot-yoga classes.

C. LISTENING TO YOUR BODY
  - Never exercise to the point of exhaustion; pregnancy is for wellness, not strain.
  - Use the "Talk Test": You must be able to hold a conversation without gasping.
  - Respect tired days: Swap a workout for gentle stretching or extra sleep.
  - STOP IMMEDIATELY and contact your doctor if you experience:
      * Vaginal bleeding or fluid leakage
      * Dizziness, faintness, or sudden shortness of breath
      * Chest pain or rapid heartbeat
      * Painful, regular uterine contractions
      * Severe pelvic, abdominal, or calf pain

================================================================================
IMPORTANT MEDICAL NOTICE
This guide provides evidence-based supportive wellness education. It does not
replace personalized clinical advice from your obstetrician or midwife.
Always confirm your physical activity plan with your healthcare provider.
================================================================================
`;
}
