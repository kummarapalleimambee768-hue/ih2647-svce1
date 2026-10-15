import { describe, it, expect } from 'vitest';
import { calculateFromLMP, calculateFromEDD } from '../utils/pregnancyCalculations';
import {
  calculateVerifiedNutrients,
  VERIFIED_FOOD_DATABASE,
  getMealSafetyVerdict,
} from '../data/foodComposition';
import { askPregnancyAssistant } from '../services/aiService';
import {
  FOUR_SAFE_EXERCISES,
  SAFETY_TIPS,
  generateExerciseGuideText,
} from '../data/exerciseRoutines';
import { processVoiceCommand, VOICE_PERSONAS } from '../services/voiceAssistant';

describe('1. Pregnancy Gestational Calculations (Naegele Rule)', () => {
  it('correctly calculates EDD as LMP + 280 days', () => {
    const testLmp = '2026-07-23';
    const refDate = new Date('2026-10-15');
    const result = calculateFromLMP(testLmp, refDate);

    expect(result.estimatedDueDate).toBe('2027-04-29');
    expect(result.currentWeek).toBe(12);
    expect(result.currentTrimester).toBe(1);
    expect(result.daysElapsed).toBe(84);
    expect(result.daysRemaining).toBe(196);
  });

  it('correctly maps second and third trimesters', () => {
    const refDate = new Date('2026-10-15');
    const lmpT2 = '2026-04-30';
    const resT2 = calculateFromLMP(lmpT2, refDate);
    expect(resT2.currentTrimester).toBe(2);

    const lmpT3 = '2026-02-19';
    const resT3 = calculateFromLMP(lmpT3, refDate);
    expect(resT3.currentTrimester).toBe(3);
  });

  it('calculates consistent gestational age from clinician EDD', () => {
    const edd = '2027-04-29';
    const refDate = new Date('2026-10-15');
    const res = calculateFromEDD(edd, refDate);

    expect(res.currentWeek).toBe(12);
    expect(res.estimatedDueDate).toBe(edd);
  });
});

describe('2. Four Core Safe Exercises & Safety Tips', () => {
  it('contains the four exact required exercises with recommended durations', () => {
    expect(FOUR_SAFE_EXERCISES).toHaveLength(4);

    const walking = FOUR_SAFE_EXERCISES.find((e) => e.category === 'walking')!;
    expect(walking.name).toBe('Gentle Walking');
    expect(walking.recommendedDuration).toBe('20–30 minutes');

    const yoga = FOUR_SAFE_EXERCISES.find((e) => e.category === 'yoga')!;
    expect(yoga.name).toBe('Prenatal Yoga');
    expect(yoga.recommendedDuration).toBe('15–20 minutes');

    const swimming = FOUR_SAFE_EXERCISES.find((e) => e.category === 'swimming')!;
    expect(swimming.name).toBe('Swimming');
    expect(swimming.recommendedDuration).toBe('20–30 minutes');

    const kegels = FOUR_SAFE_EXERCISES.find((e) => e.category === 'kegel')!;
    expect(kegels.name).toBe('Kegel Exercises');
    expect(kegels.recommendedDuration).toBe('5–10 minutes');
  });

  it('includes hydration, overheating, and listening-to-your-body safety tips', () => {
    expect(SAFETY_TIPS).toHaveLength(3);
    const titles = SAFETY_TIPS.map((t) => t.title.toLowerCase());
    expect(titles.some((t) => t.includes('hydration'))).toBe(true);
    expect(titles.some((t) => t.includes('overheating'))).toBe(true);
    expect(titles.some((t) => t.includes('listening'))).toBe(true);
  });

  it('generates a complete downloadable exercise guide text file', () => {
    const text = generateExerciseGuideText();
    expect(text).toContain('GENTLE WALKING');
    expect(text).toContain('PRENATAL YOGA');
    expect(text).toContain('SWIMMING');
    expect(text).toContain('KEGEL EXERCISES');
    expect(text).toContain('HYDRATION GUIDELINES');
    expect(text).toContain('OVERHEATING PREVENTION');
    expect(text).toContain('LISTENING TO YOUR BODY');
  });
});

describe('3. Voice Assistant Commands Interpretation', () => {
  it('interprets "Open safe exercises" and navigates to exercise page', () => {
    const res = processVoiceCommand('Open safe exercises.');
    expect(res.action).toBe('NAVIGATE_EXERCISES');
    expect(res.spokenResponse).toContain('Safe Exercises');
  });

  it('interprets "Show second trimester exercises" with trimester filter 2', () => {
    const res = processVoiceCommand('Show second trimester exercises.');
    expect(res.action).toBe('NAVIGATE_EXERCISES');
    expect(res.targetTrimester).toBe(2);
    expect(res.spokenResponse).toContain('second trimester');
  });

  it('interprets "Tell me the benefits of prenatal yoga" and returns benefits', () => {
    const res = processVoiceCommand('Tell me the benefits of prenatal yoga.');
    expect(res.action).toBe('EXPLAIN_BENEFITS');
    expect(res.exerciseName).toBe('Prenatal Yoga');
    expect(res.benefits).toBeDefined();
    expect(res.benefits!.length).toBeGreaterThan(0);
  });

  it('interprets "Read the safety tips" and returns hydration and overheating tips', () => {
    const res = processVoiceCommand('Read the safety tips.');
    expect(res.action).toBe('READ_SAFETY_TIPS');
    expect(res.safetyTips).toBeDefined();
    expect(res.spokenResponse).toContain('Hydration');
    expect(res.spokenResponse).toContain('Overheating');
  });

  it('interprets "Go back to the dashboard" command', () => {
    const res = processVoiceCommand('Go back to the dashboard.');
    expect(res.action).toBe('NAVIGATE_DASHBOARD');
  });

  it('interprets "Download the file" command', () => {
    const res = processVoiceCommand('Download the file');
    expect(res.action).toBe('DOWNLOAD_FILE');
    expect(res.downloadTriggered).toBe(true);
  });

  it('interprets "download the whole project code zipfile" command', () => {
    const res = processVoiceCommand('download the whole project code zipfile');
    expect(res.action).toBe('DOWNLOAD_FILE');
    expect(res.downloadTriggered).toBe(true);
    expect(res.spokenResponse).toContain('project code zip file');
  });
});

describe('4. Verified Food Composition Engine (No Hallucinated Calories)', () => {
  it('accurately computes nutrients for standard portion of Steamed Idli', () => {
    const idli = VERIFIED_FOOD_DATABASE.find((f) => f.id === 'idli_steamed')!;
    expect(idli).toBeDefined();

    const result = calculateVerifiedNutrients([{ foodId: 'idli_steamed', quantity: 1 }]);
    expect(result.calories).toBe(140);
    expect(result.protein).toBe(4.8);
    expect(result.carbs).toBe(28.5);
    expect(result.fat).toBe(0.8);
    expect(result.folate_mcg).toBe(34);
  });

  it('accurately computes cumulative nutrients for multi-item Indian meal', () => {
    const result = calculateVerifiedNutrients([
      { foodId: 'idli_steamed', quantity: 2 },
      { foodId: 'dal_tadka_yellow', quantity: 1 },
    ]);

    expect(result.calories).toBe(465);
    expect(result.protein).toBe(19.4);
    expect(result.folate_mcg).toBe(178);
  });
});

describe('5. Clinical Safety & Emergency Triage AI Rules', () => {
  it('immediately triggers emergency red-flag alert when user reports dangerous symptoms', async () => {
    const emergencyPrompt = 'I have sudden heavy bleeding and severe pain in my abdomen';
    const response = await askPregnancyAssistant(
      emergencyPrompt,
      { week: 12, trimester: 1, language: 'en' },
      {}
    );

    expect(response.isEmergencyAlert).toBe(true);
    expect(response.emergencyActions).toBeDefined();
    expect(response.emergencyActions!.length).toBeGreaterThan(0);
    expect(response.content).toContain('URGENT CLINICAL ALERT');
  });
});

describe('6. AI Food Pregnancy Safety Verdicts & Clinical Recommendations', () => {
  it('correctly classifies raw papaya as AVOID & UNSAFE due to uterine contraction risks', () => {
    const verdict = getMealSafetyVerdict([{ foodId: 'raw_unripe_papaya', quantity: 1 }]);
    expect(verdict.overallVerdict).toBe('AVOID');
    expect(verdict.itemsAnalysis.length).toBe(1);
    expect(verdict.itemsAnalysis[0].foodName).toContain('Papaya');
    expect(verdict.summaryText).toContain('clinical contraindications');
  });

  it('correctly classifies high caffeine coffee as MODERATION', () => {
    const verdict = getMealSafetyVerdict([{ foodId: 'caffeinated_coffee_high', quantity: 1 }]);
    expect(verdict.overallVerdict).toBe('MODERATION');
    expect(verdict.itemsAnalysis.length).toBe(1);
    expect(verdict.summaryText).toContain('caffeine');
  });

  it('correctly classifies standard prenatal foods like Idli and Palak Dal as SAFE TO EAT', () => {
    const verdict = getMealSafetyVerdict([
      { foodId: 'idli_steamed', quantity: 2 },
      { foodId: 'dal_tadka_yellow', quantity: 1 },
    ]);
    expect(verdict.overallVerdict).toBe('SAFE');
    expect(verdict.itemsAnalysis.length).toBe(2);
    expect(verdict.verdictLabel).toContain('Safe to Eat');
  });
});

describe('7. Voice Login, Multilingual Recognition & Voice Personas', () => {
  it('interprets voice login commands for Ananya, Priya, and Meera', () => {
    const ananyaRes = processVoiceCommand('Log in as Ananya');
    expect(ananyaRes.action).toBe('LOGIN_USER');
    expect(ananyaRes.sisterId).toBe('sister-1-ananya');

    const priyaRes = processVoiceCommand('Log in as Priya');
    expect(priyaRes.action).toBe('LOGIN_USER');
    expect(priyaRes.sisterId).toBe('sister-2-priya');

    const meeraRes = processVoiceCommand('Log in as Meera');
    expect(meeraRes.action).toBe('LOGIN_USER');
    expect(meeraRes.sisterId).toBe('sister-3-meera');
  });

  it('interprets Hindi and Telugu voice commands', () => {
    const hindiLogin = processVoiceCommand('अनन्या लॉगिन', 'hi');
    expect(hindiLogin.action).toBe('LOGIN_USER');
    expect(hindiLogin.sisterId).toBe('sister-1-ananya');

    const hindiExercise = processVoiceCommand('एक्सरसाइज खोलो', 'hi');
    expect(hindiExercise.action).toBe('NAVIGATE_EXERCISES');

    const teluguExercise = processVoiceCommand('వ్యాయామం', 'te');
    expect(teluguExercise.action).toBe('NAVIGATE_EXERCISES');
  });

  it('provides four distinct clinical & wellness voice personas', () => {
    expect(VOICE_PERSONAS.maternal).toBeDefined();
    expect(VOICE_PERSONAS.doctor).toBeDefined();
    expect(VOICE_PERSONAS.coach).toBeDefined();
    expect(VOICE_PERSONAS.calm).toBeDefined();

    expect(VOICE_PERSONAS.maternal.name).toContain('Maternal');
    expect(VOICE_PERSONAS.doctor.name).toContain('Dr. Sunita');
    expect(VOICE_PERSONAS.coach.name).toContain('Wellness Coach');
    expect(VOICE_PERSONAS.calm.name).toContain('Zen Relaxation');
  });
});

