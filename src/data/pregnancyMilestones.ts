export interface PregnancyWeekData {
  week: number;
  trimester: 1 | 2 | 3;
  babyFruitComparison: string;
  babyFruitIcon: string;
  lengthCm: number;
  weightGrams: number;
  babyMilestones: string[];
  momBodyChanges: string[];
  nutritionFocus: string;
  exerciseTip: string;
  upcomingClinicalTests: string[];
  redFlagWarnings: string[];
}

export const PREGNANCY_WEEKS_DATA: Record<number, PregnancyWeekData> = {
  4: {
    week: 4,
    trimester: 1,
    babyFruitComparison: 'Poppy Seed',
    babyFruitIcon: '🌱',
    lengthCm: 0.1,
    weightGrams: 0.05,
    babyMilestones: [
      'Blastocyst implants into the uterine lining',
      'Placenta and amniotic sac begin developing',
      'Primitive neural plate forming the brain and spinal cord',
    ],
    momBodyChanges: [
      'Missed menstrual period',
      'Subtle mild cramping or implantation spotting',
      'Heightened sense of smell and breast tenderness',
    ],
    nutritionFocus: 'Daily 400-600 mcg Folic Acid supplementation to safeguard neural tube development.',
    exerciseTip: 'Continue light habitual walking and gentle breathing; avoid sudden abdominal impact.',
    upcomingClinicalTests: ['Urine hCG pregnancy test confirmation', 'Initial consultation with obstetrician'],
    redFlagWarnings: ['Severe one-sided pelvic pain (ectopic pregnancy risk)', 'Heavy bright red bleeding with clots'],
  },
  8: {
    week: 8,
    trimester: 1,
    babyFruitComparison: 'Raspberry',
    babyFruitIcon: '🍇',
    lengthCm: 1.6,
    weightGrams: 1.0,
    babyMilestones: [
      'Primitive heartbeat pulsing at ~150-170 bpm',
      'Tiny webbed fingers and toes emerging',
      'Facial features including retina pigment and tooth buds beginning to differentiate',
    ],
    momBodyChanges: [
      'Peak morning nausea (morning sickness)',
      'Heightened fatigue as progesterone surges',
      'Frequent urination due to expanding uterus and renal blood volume',
    ],
    nutritionFocus: 'Small, frequent carbohydrate meals (crackers, dry toast, ginger tea) to soothe morning sickness.',
    exerciseTip: '15-20 minutes of gentle morning or evening walking in cool, well-ventilated settings.',
    upcomingClinicalTests: ['Dating & Viability Ultrasound scan', 'Complete blood count, Blood group & Rh factor, Thyroid (TSH)'],
    redFlagWarnings: ['Inability to keep liquids down for 24 hours (Hyperemesis Gravidarum)', 'Severe pelvic cramping with chills or fever'],
  },
  12: {
    week: 12,
    trimester: 1,
    babyFruitComparison: 'Plum / Lemon',
    babyFruitIcon: '🍋',
    lengthCm: 5.4,
    weightGrams: 14,
    babyMilestones: [
      'All vital organs formed; baby is now medically classified as a fetus',
      'Tiny fingernails and toenails forming',
      'Reflexes active: baby curls toes and clenches tiny fists',
    ],
    momBodyChanges: [
      'Uterus rises above pelvic bone; waistline starts softening',
      'Nausea often begins easing toward the end of trimester 1',
      'Skin changes: increased blood circulation can bring a radiant pregnancy glow',
    ],
    nutritionFocus: 'Incorporate iron-rich lentils, spinach, and vitamin C (lemon, amla, oranges) for blood volume expansion.',
    exerciseTip: 'Begin daily pelvic floor (Kegel) exercises and prenatal yoga stretches under supervision.',
    upcomingClinicalTests: ['Nuchal Translucency (NT) Scan', 'First trimester dual marker serum screening'],
    redFlagWarnings: ['Unexplained vaginal fluid loss', 'Severe lower abdominal contractions'],
  },
  16: {
    week: 16,
    trimester: 2,
    babyFruitComparison: 'Avocado',
    babyFruitIcon: '🥑',
    lengthCm: 11.6,
    weightGrams: 100,
    babyMilestones: [
      'Tiny facial muscles allow frowning and squinting',
      'Baby can hear your voice and heartbeat through amniotic fluid',
      'Skeleton continues ossification, transforming flexible cartilage into solid bone',
    ],
    momBodyChanges: [
      'Second trimester energy boost ("golden trimester")',
      'Round ligament stretching causing occasional side twinges',
      'Appetite picks up noticeably',
    ],
    nutritionFocus: 'Calcium-dense foods (curd, paneer, ragi, fortified milk) to support rapid fetal bone mineralisation.',
    exerciseTip: 'Brisk 30-minute daily walks, gentle swimming, and pelvic tilts.',
    upcomingClinicalTests: ['Quadruple marker test (if indicated)', 'Routine antenatal blood pressure and urine check'],
    redFlagWarnings: ['Sudden gush of fluid', 'Persistent backache with fever'],
  },
  20: {
    week: 20,
    trimester: 2,
    babyFruitComparison: 'Banana',
    babyFruitIcon: '🍌',
    lengthCm: 25.6,
    weightGrams: 300,
    babyMilestones: [
      'Halfway milestone reached!',
      'Vernix caseosa and fine lanugo hair coat baby skin for protection',
      'Baby kicks, somersaults, and swallows amniotic fluid regularly',
    ],
    momBodyChanges: [
      '"Quickening" — first fluttery kicks clearly perceived',
      'Uterus reaches the navel line',
      'Mild back discomfort from shifting center of gravity',
    ],
    nutritionFocus: 'Dietary fiber and adequate hydration (2.5-3 liters water, tender coconut water) to prevent constipation.',
    exerciseTip: 'Avoid lying flat on your back during workouts; use side-lying postures with pillows.',
    upcomingClinicalTests: ['Detailed TIFFA (Targeted Imaging for Fetal Anomalies) Ultrasound Scan', 'Cervical length measurement'],
    redFlagWarnings: ['Severe localized pain in lower abdomen', 'Any watery leakage or spotting'],
  },
  24: {
    week: 24,
    trimester: 2,
    babyFruitComparison: 'Corn on the Cob / Papaya',
    babyFruitIcon: '🌽',
    lengthCm: 30.0,
    weightGrams: 600,
    babyMilestones: [
      'Viability threshold reached — lungs producing branches of bronchial tree',
      'Inner ear balance mechanisms mature; baby senses orientation and moves to rhythm',
      'Rapid brain neural connectivity forming sleep-wake cycles',
    ],
    momBodyChanges: [
      'Skin on belly and breasts stretches, occasionally itchy',
      'Mild physiological swelling in ankles after standing',
      'Braxton Hicks practice contractions may occasionally be felt',
    ],
    nutritionFocus: 'Omega-3 fatty acids (walnuts, chia seeds, flaxseed, pregnancy-safe fish) for brain cortex maturation.',
    exerciseTip: 'Gentle calf raises and ankle rotations to assist venous return and prevent varicose veins.',
    upcomingClinicalTests: ['Oral Glucose Tolerance Test (OGTT) for Gestational Diabetes screening', 'Hemoglobin recheck'],
    redFlagWarnings: ['Sudden swelling of face and hands accompanied by visual disturbances (Preeclampsia signs)', 'More than 4 painful regular contractions an hour'],
  },
  28: {
    week: 28,
    trimester: 3,
    babyFruitComparison: 'Eggplant',
    babyFruitIcon: '🍆',
    lengthCm: 37.6,
    weightGrams: 1000,
    babyMilestones: [
      'Welcome to the Third Trimester!',
      'Baby opens and closes eyes, reacting to bright lights outside your belly',
      'Subcutaneous fat accumulation begins smoothing out baby wrinkled skin',
    ],
    momBodyChanges: [
      'Increased shortness of breath as expanding uterus presses upward on diaphragm',
      'Heartburn / acid reflux after heavy meals',
      'Frequent nocturnal awakenings and vivid dreams',
    ],
    nutritionFocus: 'Smaller, divided meals with digestive spices (cumin, fennel, ginger) to relieve acid reflux; maintain high iron.',
    exerciseTip: 'Prenatal yoga, cat-cow stretch on all fours to relieve spinal pressure, and pelvic floor strengthening.',
    upcomingClinicalTests: ['Anti-D immunoglobulin injection (for Rh-negative mothers)', 'Third trimester growth scan'],
    redFlagWarnings: ['Significant reduction in fetal movements (less than 10 kicks in 2 hours when resting)', 'Sudden intense headache unrelieved by rest'],
  },
  32: {
    week: 32,
    trimester: 3,
    babyFruitComparison: 'Squash / Butternut',
    babyFruitIcon: '🎃',
    lengthCm: 42.4,
    weightGrams: 1700,
    babyMilestones: [
      'Practicing breathing movements by inhaling and exhaling amniotic fluid',
      'Toenails and hair clearly visible on 3D/4D ultrasound',
      'Most babies settle into a cephalic (head-down) position in preparation for birth',
    ],
    momBodyChanges: [
      'Colostrum (early milk) may occasionally leak from breasts',
      'Braxton Hicks tightenings become more pronounced',
      'Pelvic pressure increases as baby settles deeper',
    ],
    nutritionFocus: 'High quality proteins (dal, paneer, eggs, nuts) to support final trimester fetal tissue growth.',
    exerciseTip: 'Birth ball (stability ball) gentle hip circles to help open pelvic inlet and encourage optimal fetal positioning.',
    upcomingClinicalTests: ['Fortnightly antenatal visits start', 'Doppler ultrasound to verify umbilical artery blood flow'],
    redFlagWarnings: ['Constant severe abdominal tenderness with or without bleeding (Placental abruption signs)', 'Elevated blood pressure (>140/90 mmHg)'],
  },
  36: {
    week: 36,
    trimester: 3,
    babyFruitComparison: 'Papaya / Honeydew',
    babyFruitIcon: '🍈',
    lengthCm: 47.4,
    weightGrams: 2600,
    babyMilestones: [
      'Lungs are virtually fully mature, with abundant surfactant',
      'Baby liver and kidneys fully functioning to process waste products',
      'Immune system absorbs maternal antibodies through the placenta',
    ],
    momBodyChanges: [
      '"Lightening" or baby dropping into the pelvic brim eases breathing but increases bladder pressure',
      'Nesting instinct urges cleaning and organizing the nursery',
      'Frequent false contractions',
    ],
    nutritionFocus: 'Easily digestible soups, khichdi, fresh seasonal fruits, and ample water to stay energized for labor.',
    exerciseTip: 'Relaxed walking, deep diaphragmatic breathing, and pelvic opening stretches; rest whenever fatigued.',
    upcomingClinicalTests: ['Group B Streptococcus (GBS) screening', 'Weekly antenatal clinic visit and NST (Non-Stress Test) if indicated'],
    redFlagWarnings: ['Continuous trickling or sudden gush of clear/greenish amniotic fluid', 'Vaginal bleeding akin to a menstrual period'],
  },
  40: {
    week: 40,
    trimester: 3,
    babyFruitComparison: 'Watermelon / Jackfruit',
    babyFruitIcon: '🍉',
    lengthCm: 51.2,
    weightGrams: 3400,
    babyMilestones: [
      'Full Term Baby! Ready to meet the world',
      'Cranial bones remain soft and separated by fontanelles to allow smooth passage through birth canal',
      'Grasp reflex is strong; eyes can focus ~25 cm away (ideal distance to parent face)',
    ],
    momBodyChanges: [
      'Cervix begins effacing (thinning) and dilating',
      'Possible loss of the mucus plug (bloody show)',
      'Regular, intensifying labor contractions radiating from lower back to front abdomen',
    ],
    nutritionFocus: 'Light, energy-sustaining snacks (dates, coconut water, bananas) in early labor.',
    exerciseTip: 'Gentle walking, upright swaying, and rhythmic hip rocking to help baby descend into pelvis.',
    upcomingClinicalTests: ['Cervical dilation check', 'Biophysical profile (BPP) or ultrasound if approaching 41 weeks'],
    redFlagWarnings: ['Contractions occurring every 4-5 minutes lasting 60 seconds (active labor phase)', 'Green or foul-smelling amniotic fluid', 'Decreased fetal movement'],
  },
};

export function getWeekMilestone(week: number): PregnancyWeekData {
  if (PREGNANCY_WEEKS_DATA[week]) {
    return PREGNANCY_WEEKS_DATA[week];
  }
  // Find closest defined milestone
  const keys = Object.keys(PREGNANCY_WEEKS_DATA).map(Number).sort((a, b) => a - b);
  let closest = keys[0];
  for (const k of keys) {
    if (k <= week) closest = k;
  }
  return {
    ...PREGNANCY_WEEKS_DATA[closest],
    week,
    trimester: week <= 13 ? 1 : week <= 27 ? 2 : 3,
  };
}
