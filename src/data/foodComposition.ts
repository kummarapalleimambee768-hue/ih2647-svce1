export type FoodSafetyVerdict = 'SAFE' | 'MODERATION' | 'AVOID';

export interface FoodNutrientProfile {
  id: string;
  name: string;
  regionalNames?: { [key: string]: string };
  category: 'breakfast' | 'lunch' | 'dinner' | 'snack' | 'beverage';
  standardServingSize: number;
  servingUnit: string; // e.g. "pieces", "katori (150g)", "medium", "cup"
  calories: number; // kcal
  protein: number; // g
  carbs: number; // g
  fat: number; // g
  fiber: number; // g
  folate_mcg: number; // mcg
  iron_mg: number; // mg
  calcium_mg: number; // mg
  vitamin_c_mg: number; // mg
  isVegetarian: boolean;
  pregnancyBenefit: string;
  safetyCaution?: string;
  source: string;
  pregnancySafety?: FoodSafetyVerdict;
  clinicalRecommendation?: string;
  safePreparationTips?: string;
  trimesterGuidance?: string;
}

export const VERIFIED_FOOD_DATABASE: FoodNutrientProfile[] = [
  {
    id: 'idli_steamed',
    name: 'Steamed Idli (2 pieces)',
    regionalNames: { te: 'ఇడ్లీ (2 ముక్కలు)', hi: 'इडली (2 पीस)', ta: 'இட்லி (2)', kn: 'ಇಡ್ಲಿ (2)' },
    category: 'breakfast',
    standardServingSize: 2,
    servingUnit: 'pieces (100g total)',
    calories: 140,
    protein: 4.8,
    carbs: 28.5,
    fat: 0.8,
    fiber: 2.2,
    folate_mcg: 34,
    iron_mg: 1.1,
    calcium_mg: 22,
    vitamin_c_mg: 0.5,
    isVegetarian: true,
    pregnancyBenefit: 'Fermented, easily digestible, low glycemic index, gentle on morning sickness.',
    safetyCaution: 'Serve freshly steamed and piping hot.',
    source: 'ICMR-NIN Indian Food Composition Tables & USDA FDC',
  },
  {
    id: 'plain_dosa',
    name: 'Plain Crispy Dosa',
    regionalNames: { te: 'ప్లెయిన్ దోశ', hi: 'प्लेन डोसा', ta: 'தோசை', kn: 'ದೋಸೆ' },
    category: 'breakfast',
    standardServingSize: 1,
    servingUnit: 'medium piece (80g)',
    calories: 168,
    protein: 3.9,
    carbs: 29.2,
    fat: 4.1,
    fiber: 1.8,
    folate_mcg: 28,
    iron_mg: 1.4,
    calcium_mg: 19,
    vitamin_c_mg: 0.2,
    isVegetarian: true,
    pregnancyBenefit: 'Fermented carbs for sustained maternal energy.',
    safetyCaution: 'Cook with moderate healthy oil (e.g. olive or cold-pressed groundnut oil).',
    source: 'ICMR-NIN IFCT 2017',
  },
  {
    id: 'vegetable_poha',
    name: 'Vegetable Poha with Peas & Peanuts',
    regionalNames: { te: 'కూరగాయల పోహా', hi: 'वेजिटेबल पोहा', ta: 'அவல் உப்புமா', kn: 'ಅವಲಕ್ಕಿ ಒಗ್ಗರಣೆ' },
    category: 'breakfast',
    standardServingSize: 1,
    servingUnit: 'katori / cup (150g)',
    calories: 220,
    protein: 5.6,
    carbs: 38.0,
    fat: 5.8,
    fiber: 3.8,
    folate_mcg: 45,
    iron_mg: 3.4,
    calcium_mg: 35,
    vitamin_c_mg: 14.5,
    isVegetarian: true,
    pregnancyBenefit: 'High bioavailable iron naturally enriched by flattened rice; lemon squeeze adds vitamin C for maximum iron absorption.',
    source: 'ICMR-NIN IFCT & USDA FDC',
  },
  {
    id: 'methi_thepla',
    name: 'Methi Paratha / Thepla (Fenugreek flatbread)',
    regionalNames: { te: 'మెంతి చపాతీ', hi: 'मेथी पराठा', ta: 'வெந்தய சப்பாத்தி', kn: 'ಮೆಂತ್ಯ ಪರೋಟ' },
    category: 'breakfast',
    standardServingSize: 2,
    servingUnit: 'pieces (120g)',
    calories: 260,
    protein: 7.2,
    carbs: 42.0,
    fat: 7.5,
    fiber: 5.2,
    folate_mcg: 72,
    iron_mg: 2.8,
    calcium_mg: 88,
    vitamin_c_mg: 6.0,
    isVegetarian: true,
    pregnancyBenefit: 'Fenugreek leaves are rich in dietary fiber and essential minerals aiding digestion and blood sugar stability.',
    source: 'ICMR-NIN IFCT 2017',
  },
  {
    id: 'chapati_wheat',
    name: 'Whole Wheat Roti / Phulka (without oil)',
    regionalNames: { te: 'గోధుమ రొట్టె (పుల్కా)', hi: 'गेहूं की रोटी / फुल्का', ta: 'சப்பாத்தி', kn: 'ರೊಟ್ಟಿ / ಚಪಾತಿ' },
    category: 'lunch',
    standardServingSize: 2,
    servingUnit: 'pieces (70g total)',
    calories: 170,
    protein: 6.2,
    carbs: 34.8,
    fat: 0.9,
    fiber: 4.6,
    folate_mcg: 30,
    iron_mg: 2.1,
    calcium_mg: 28,
    vitamin_c_mg: 0,
    isVegetarian: true,
    pregnancyBenefit: 'Complex carbohydrates and B-complex vitamins promote slow-release energy preventing prenatal fatigue.',
    source: 'USDA FoodData Central #168943 & ICMR',
  },
  {
    id: 'dal_tadka_yellow',
    name: 'Dal Tadka (Toor / Moong Dal)',
    regionalNames: { te: 'పప్పు తాలింపు', hi: 'दाल तड़का (तूर/मूंग)', ta: 'பருப்பு கூட்டு', kn: 'ಬೇಳೆ ಸಾರು' },
    category: 'lunch',
    standardServingSize: 1,
    servingUnit: 'katori / bowl (180g)',
    calories: 185,
    protein: 9.8,
    carbs: 24.2,
    fat: 5.4,
    fiber: 5.6,
    folate_mcg: 110,
    iron_mg: 2.9,
    calcium_mg: 44,
    vitamin_c_mg: 3.2,
    isVegetarian: true,
    pregnancyBenefit: 'Superb plant-based protein and high natural folate critical for baby brain and spinal cord neural tube development.',
    source: 'ICMR-NIN IFCT 2017',
  },
  {
    id: 'palak_paneer',
    name: 'Palak Paneer (Spinach with Cottage Cheese)',
    regionalNames: { te: 'పాలక్ పన్నీర్', hi: 'पालक पनीर', ta: 'பாலக் பன்னீர்', kn: 'ಪಾಲಕ್ ಪನ್ನೀರ್' },
    category: 'dinner',
    standardServingSize: 1,
    servingUnit: 'katori / bowl (180g)',
    calories: 235,
    protein: 12.4,
    carbs: 8.5,
    fat: 17.2,
    fiber: 4.1,
    folate_mcg: 135,
    iron_mg: 3.2,
    calcium_mg: 290,
    vitamin_c_mg: 16.0,
    isVegetarian: true,
    pregnancyBenefit: 'Combines bioavailable calcium from paneer for fetal skeleton formation with high natural folate from spinach.',
    safetyCaution: 'Use pasteurized milk paneer and wash spinach thoroughly.',
    source: 'ICMR-NIN & USDA FDC',
  },
  {
    id: 'rajma_masala',
    name: 'Rajma Masala (Red Kidney Bean Curry)',
    regionalNames: { te: 'రాజ్మా మసాలా', hi: 'राजमा मसाला', ta: 'ராஜ்மா மசாலா', kn: 'ರಾಜ್ಮಾ ಮಸಾಲೆ' },
    category: 'lunch',
    standardServingSize: 1,
    servingUnit: 'katori / cup (180g)',
    calories: 215,
    protein: 11.2,
    carbs: 32.6,
    fat: 4.8,
    fiber: 8.4,
    folate_mcg: 128,
    iron_mg: 3.6,
    calcium_mg: 62,
    vitamin_c_mg: 4.5,
    isVegetarian: true,
    pregnancyBenefit: 'High dietary fiber helps prevent prenatal constipation; rich source of plant iron and potassium.',
    source: 'USDA FoodData Central #173738 & ICMR',
  },
  {
    id: 'curd_yogurt',
    name: 'Fresh Homemade Curd / Dahi',
    regionalNames: { te: 'తాజా పెరుగు', hi: 'ताज़ा दही', ta: 'தயிர்', kn: 'ಮೊಸರು' },
    category: 'lunch',
    standardServingSize: 1,
    servingUnit: 'katori / cup (150g)',
    calories: 95,
    protein: 5.4,
    carbs: 6.8,
    fat: 4.5,
    fiber: 0,
    folate_mcg: 15,
    iron_mg: 0.2,
    calcium_mg: 195,
    vitamin_c_mg: 1.0,
    isVegetarian: true,
    pregnancyBenefit: 'Natural probiotics to improve gut flora and reduce heartburn, plus essential calcium for bone density.',
    safetyCaution: 'Ensure curd is made from boiled/pasteurized milk.',
    source: 'ICMR-NIN IFCT 2017 & USDA',
  },
  {
    id: 'steamed_rice_brown',
    name: 'Steamed Brown Rice',
    regionalNames: { te: 'బ్రౌన్ రైస్', hi: 'ब्राउन राइस', ta: 'பழுப்பு அரிசி', kn: 'ಕಂದು ಅಕ್ಕಿ ಅನ್ನ' },
    category: 'lunch',
    standardServingSize: 1,
    servingUnit: 'cup cooked (150g)',
    calories: 165,
    protein: 3.8,
    carbs: 34.5,
    fat: 1.2,
    fiber: 2.8,
    folate_mcg: 18,
    iron_mg: 0.9,
    calcium_mg: 14,
    vitamin_c_mg: 0,
    isVegetarian: true,
    pregnancyBenefit: 'Low GI carbohydrates with intact bran layers to maintain steady blood glucose.',
    source: 'USDA FoodData Central #169704',
  },
  {
    id: 'steamed_rice_white',
    name: 'Steamed White Rice (Sona Masoori / Basmati)',
    regionalNames: { te: 'తెల్ల అన్నం', hi: 'सफेद चावल', ta: 'சாதம்', kn: 'ಬಿಳಿ ಅನ್ನ' },
    category: 'lunch',
    standardServingSize: 1,
    servingUnit: 'cup cooked (150g)',
    calories: 195,
    protein: 3.7,
    carbs: 43.0,
    fat: 0.4,
    fiber: 0.6,
    folate_mcg: 90,
    iron_mg: 1.8,
    calcium_mg: 16,
    vitamin_c_mg: 0,
    isVegetarian: true,
    pregnancyBenefit: 'Gentle on sensitive stomachs, easily digested during nausea episodes.',
    source: 'USDA FDC & ICMR',
  },
  {
    id: 'boiled_eggs',
    name: 'Hard Boiled Eggs (2 whole eggs)',
    regionalNames: { te: 'ఉడికించిన గుడ్లు (2)', hi: 'उबले अंडे (2)', ta: 'வேகவைத்த முட்டை (2)', kn: 'ಬೇಯಿಸಿದ ಮೊಟ್ಟೆಗಳು (2)' },
    category: 'breakfast',
    standardServingSize: 2,
    servingUnit: 'whole eggs (100g)',
    calories: 144,
    protein: 12.6,
    carbs: 1.1,
    fat: 9.6,
    fiber: 0,
    folate_mcg: 44,
    iron_mg: 1.8,
    calcium_mg: 50,
    vitamin_c_mg: 0,
    isVegetarian: false,
    pregnancyBenefit: 'Outstanding source of Choline (approx. 290mg) essential for baby cognitive and memory architecture.',
    safetyCaution: 'Always cook eggs until yolk and whites are firm. Never consume raw or runny eggs during pregnancy.',
    source: 'USDA FoodData Central #171287',
  },
  {
    id: 'tender_coconut_water',
    name: 'Fresh Tender Coconut Water',
    regionalNames: { te: 'కొబ్బరి నీళ్లు', hi: 'नारियल पानी', ta: 'இளநீர்', kn: 'ಎಳನೀರು' },
    category: 'beverage',
    standardServingSize: 1,
    servingUnit: 'glass (240ml)',
    calories: 46,
    protein: 1.7,
    carbs: 8.9,
    fat: 0.5,
    fiber: 2.6,
    folate_mcg: 7,
    iron_mg: 0.7,
    calcium_mg: 58,
    vitamin_c_mg: 5.8,
    isVegetarian: true,
    pregnancyBenefit: 'Natural isotonic electrolyte drink loaded with potassium and magnesium to prevent pregnancy leg cramps.',
    source: 'ICMR-NIN & USDA FDC',
  },
  {
    id: 'soaked_almonds_walnuts',
    name: 'Soaked Almonds & Walnuts (Maternal Brain Mix)',
    regionalNames: { te: 'నానబెట్టిన బాదం & అక్రూట్లు', hi: 'भीगे बादाम और अखरोट', ta: 'ஊறவைத்த பாதாம்', kn: 'ನೆನೆಸಿದ ಬಾದಾಮಿ ಮತ್ತು ಅಕ್ರೋಟು' },
    category: 'snack',
    standardServingSize: 1,
    servingUnit: 'handful (30g)',
    calories: 185,
    protein: 5.2,
    carbs: 4.8,
    fat: 16.5,
    fiber: 3.1,
    folate_mcg: 22,
    iron_mg: 1.1,
    calcium_mg: 68,
    vitamin_c_mg: 0.2,
    isVegetarian: true,
    pregnancyBenefit: 'Packed with Omega-3 fatty acids (ALA), Vitamin E, and zinc for fetal retinal and neurological growth.',
    safetyCaution: 'Peel almond skin after soaking for optimal enzyme activity and easier digestion.',
    source: 'USDA FDC & ICMR',
  },
  {
    id: 'fresh_pomegranate',
    name: 'Fresh Pomegranate Arils',
    regionalNames: { te: 'దానిమ్మ గింజలు', hi: 'अनार के दाने', ta: 'மாதுளை', kn: 'ದಾಳಿಂಬೆ ಕಾಳುಗಳು' },
    category: 'snack',
    standardServingSize: 1,
    servingUnit: 'cup (150g)',
    calories: 125,
    protein: 2.5,
    carbs: 28.0,
    fat: 1.8,
    fiber: 6.0,
    folate_mcg: 57,
    iron_mg: 0.5,
    calcium_mg: 15,
    vitamin_c_mg: 15.3,
    isVegetarian: true,
    pregnancyBenefit: 'Antioxidants (punicalagins) help support placenta health, healthy blood pressure, and hydration.',
    source: 'USDA FoodData Central #169134',
  },
  {
    id: 'roasted_makhana',
    name: 'Ghee Roasted Makhana (Fox Nuts)',
    regionalNames: { te: 'వేయించిన తామర గింజలు', hi: 'भुने हुए मखाने', ta: 'வறுத்த மக்கானா', kn: 'ಹುರಿದ ಮಖಾನಾ' },
    category: 'snack',
    standardServingSize: 1,
    servingUnit: 'bowl (40g)',
    calories: 145,
    protein: 3.8,
    carbs: 26.0,
    fat: 3.2,
    fiber: 4.2,
    folate_mcg: 38,
    iron_mg: 1.4,
    calcium_mg: 60,
    vitamin_c_mg: 0,
    isVegetarian: true,
    pregnancyBenefit: 'Light on the stomach, low sodium, rich in calcium and magnesium; excellent for second trimester cravings.',
    source: 'ICMR-NIN IFCT 2017',
  },
  {
    id: 'vegetable_khichdi',
    name: 'Moong Dal & Vegetable Khichdi with Ghee',
    regionalNames: { te: 'కూరగాయల కిచిడీ', hi: 'दाल वेजिटेबल खिचड़ी', ta: 'காய்கறி கிச்சடி', kn: 'ತರಕಾರಿ ಕಿಚಡಿ' },
    category: 'dinner',
    standardServingSize: 1,
    servingUnit: 'bowl (200g)',
    calories: 240,
    protein: 8.6,
    carbs: 38.0,
    fat: 6.2,
    fiber: 5.4,
    folate_mcg: 95,
    iron_mg: 2.6,
    calcium_mg: 52,
    vitamin_c_mg: 11.0,
    isVegetarian: true,
    pregnancyBenefit: 'Comforting, complete amino acid profile from dal + rice, soothing for heartburn and indigestion.',
    source: 'ICMR-NIN IFCT',
    pregnancySafety: 'SAFE',
    clinicalRecommendation: 'Excellent staple for all trimesters. Easily digestible complex carbs and plant protein.',
    safePreparationTips: 'Cook thoroughly with a pinch of hing (asafoetida) and cumin to ease digestion.',
    trimesterGuidance: 'Ideal for Trimesters 1, 2, and 3.'
  },
  {
    id: 'raw_unripe_papaya',
    name: 'Raw / Semi-Ripe Green Papaya',
    regionalNames: { te: 'పచ్చి బొప్పాయి', hi: 'कच्चा पपीता', ta: 'பச்சை பப்பாளி', kn: 'ಹಸಿ ಪಪ್ಪಾಯಿ' },
    category: 'lunch',
    standardServingSize: 1,
    servingUnit: 'cup (140g)',
    calories: 55,
    protein: 0.9,
    carbs: 13.8,
    fat: 0.2,
    fiber: 2.5,
    folate_mcg: 53,
    iron_mg: 0.4,
    calcium_mg: 28,
    vitamin_c_mg: 80.0,
    isVegetarian: true,
    pregnancyBenefit: 'Rich in vitamin C and fiber, BUT contains unsafe enzymatic compounds during pregnancy.',
    safetyCaution: 'STRICTLY AVOID during pregnancy. Contains high concentration of latex and papain.',
    source: 'ACOG & Clinical Obstetric Guidelines',
    pregnancySafety: 'AVOID',
    clinicalRecommendation: 'Unripe or semi-ripe green papaya is strictly contraindicated in all trimesters. The concentrated latex and papain enzymes act like oxytocin and prostaglandin, triggering uterine contractions and bleeding, which significantly elevates the risk of early miscarriage or premature labor. Ripe golden-yellow papaya is generally safe in moderation, but raw green papaya must be avoided entirely.',
    safePreparationTips: 'Do not consume in salads (som tam), curries, or raw chutneys.',
    trimesterGuidance: 'Strictly avoid in Trimester 1, Trimester 2, and Trimester 3.'
  },
  {
    id: 'unpasteurized_cheese',
    name: 'Unpasteurized Soft Cheese (Feta/Brie/Camembert)',
    regionalNames: { te: 'పాశ్చరైజ్ చేయని చీజ్', hi: 'कच्चा / अनपाश्चुरीकृत पनीर', ta: 'பாஸ்டுரைஸ் செய்யப்படாத சீஸ்', kn: 'ಪಾಶ್ಚರೀಕರಿಸದ ಚೀಸ್' },
    category: 'snack',
    standardServingSize: 1,
    servingUnit: 'serving (30g)',
    calories: 85,
    protein: 4.2,
    carbs: 1.2,
    fat: 7.1,
    fiber: 0,
    folate_mcg: 10,
    iron_mg: 0.2,
    calcium_mg: 150,
    vitamin_c_mg: 0,
    isVegetarian: true,
    pregnancyBenefit: 'Calcium source, but carries dangerous microbial risks if unpasteurized.',
    safetyCaution: 'HIGH LISTERIA RISK. Only eat cheese made from pasteurized milk.',
    source: 'WHO / ACOG Food Safety Guidelines',
    pregnancySafety: 'AVOID',
    clinicalRecommendation: 'Soft cheeses made with raw, unpasteurized milk carry an elevated risk of contamination with Listeria monocytogenes. Listeriosis is a severe foodborne infection that can cross the placenta, causing miscarriage, preterm labor, or severe newborn sepsis. Only consume soft cheeses that explicitly state "made with pasteurized milk" on the packaging.',
    safePreparationTips: 'Check dairy label for "Pasteurized Milk". Cook until steaming hot (above 74°C) if used in baked dishes.',
    trimesterGuidance: 'High risk in all trimesters.'
  },
  {
    id: 'caffeinated_coffee_high',
    name: 'Strong Caffeinated Filter Coffee (2 mugs)',
    regionalNames: { te: 'గాఢమైన ఫిల్టర్ కాఫీ', hi: 'तेज फ़िल्टर कॉफ़ी', ta: 'ஸ்ட்ராங் ஃபில்டர் காபி', kn: 'ಗಾಢವಾದ ಫಿಲ್ಟರ್ ಕಾಫಿ' },
    category: 'beverage',
    standardServingSize: 2,
    servingUnit: 'mugs (400ml, ~240mg caffeine)',
    calories: 60,
    protein: 2.0,
    carbs: 8.0,
    fat: 2.0,
    fiber: 0,
    folate_mcg: 2,
    iron_mg: 0.1,
    calcium_mg: 70,
    vitamin_c_mg: 0,
    isVegetarian: true,
    pregnancyBenefit: 'Increases alertness, but high caffeine crosses the placental barrier.',
    safetyCaution: 'MODERATE CAFFEINE: Limit total daily caffeine to <200mg (ACOG guideline).',
    source: 'ACOG Committee Opinion No. 462',
    pregnancySafety: 'MODERATION',
    clinicalRecommendation: 'Caffeine rapidly crosses the placenta, and the developing fetus lacks the necessary metabolic enzymes to process it efficiently. Daily intake exceeding 200 mg has been linked with fetal growth restriction and elevated fetal heart rate. Limit consumption to a maximum of 1 small cup (150 ml) per day, or switch to decaffeinated alternatives.',
    safePreparationTips: 'Dilute with pasteurized milk, or switch to herbal decaf teas or tender coconut water.',
    trimesterGuidance: 'Drink sparingly in Trimesters 1, 2, and 3.'
  }
];

export interface NutrientCalculation {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  folate_mcg: number;
  iron_mg: number;
  calcium_mg: number;
  vitamin_c_mg: number;
}

export function calculateVerifiedNutrients(
  items: { foodId: string; quantity: number }[]
): NutrientCalculation {
  return items.reduce<NutrientCalculation>(
    (acc, curr) => {
      const food = VERIFIED_FOOD_DATABASE.find((f) => f.id === curr.foodId);
      if (!food) return acc;
      const factor = curr.quantity;
      return {
        calories: Number((acc.calories + food.calories * factor).toFixed(1)),
        protein: Number((acc.protein + food.protein * factor).toFixed(1)),
        carbs: Number((acc.carbs + food.carbs * factor).toFixed(1)),
        fat: Number((acc.fat + food.fat * factor).toFixed(1)),
        fiber: Number((acc.fiber + food.fiber * factor).toFixed(1)),
        folate_mcg: Number((acc.folate_mcg + food.folate_mcg * factor).toFixed(1)),
        iron_mg: Number((acc.iron_mg + food.iron_mg * factor).toFixed(1)),
        calcium_mg: Number((acc.calcium_mg + food.calcium_mg * factor).toFixed(1)),
        vitamin_c_mg: Number((acc.vitamin_c_mg + food.vitamin_c_mg * factor).toFixed(1)),
      };
    },
    {
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
      fiber: 0,
      folate_mcg: 0,
      iron_mg: 0,
      calcium_mg: 0,
      vitamin_c_mg: 0,
    }
  );
}

export interface MealSafetyReport {
  overallVerdict: FoodSafetyVerdict;
  verdictLabel: string;
  summaryText: string;
  itemsAnalysis: {
    foodName: string;
    safety: FoodSafetyVerdict;
    benefitOrCaution: string;
    clinicalGuidance: string;
    preparationTip: string;
  }[];
  trimesterNotes: string[];
}

export interface MealItemInput {
  food?: FoodNutrientProfile;
  foodId?: string;
  quantity: number;
}

export function getMealSafetyVerdict(
  rawItems: MealItemInput[]
): MealSafetyReport {
  const items = rawItems
    .map((item) => {
      const food =
        item.food ||
        (item.foodId ? VERIFIED_FOOD_DATABASE.find((f) => f.id === item.foodId) : undefined);
      return { food: food!, quantity: item.quantity };
    })
    .filter((i) => i.food !== undefined);

  if (items.length === 0) {
    return {
      overallVerdict: 'SAFE',
      verdictLabel: 'No Items Selected',
      summaryText: 'Add an Indian dish or scan a photo to analyze safety.',
      itemsAnalysis: [],
      trimesterNotes: [],
    };
  }

  const hasAvoid = items.some((i) => i.food.pregnancySafety === 'AVOID');
  const hasModeration = items.some((i) => i.food.pregnancySafety === 'MODERATION');

  const overallVerdict: FoodSafetyVerdict = hasAvoid
    ? 'AVOID'
    : hasModeration
    ? 'MODERATION'
    : 'SAFE';

  let verdictLabel = 'Safe to Eat for Pregnancy';
  let summaryText =
    'This meal comprises nutrient-dense, evidence-based foods that supply essential maternal protein, folate, and micronutrients.';

  if (overallVerdict === 'AVOID') {
    verdictLabel = 'Unsafe / Avoid During Pregnancy';
    summaryText =
      'Warning: One or more selected ingredients carry significant clinical contraindications (e.g. uterine stimulation or bacterial infection risks) and should be avoided.';
  } else if (overallVerdict === 'MODERATION') {
    verdictLabel = 'Consume in Moderation';
    summaryText =
      'Caution: This meal contains ingredients (such as high caffeine, higher sodium, or glycemic load) that should only be consumed in limited quantities.';
  }

  const itemsAnalysis = items.map((item) => ({
    foodName: item.food.name,
    safety: item.food.pregnancySafety || 'SAFE',
    benefitOrCaution: item.food.safetyCaution || item.food.pregnancyBenefit,
    clinicalGuidance:
      item.food.clinicalRecommendation ||
      item.food.pregnancyBenefit ||
      'Rich in macro & micronutrients for maternal health.',
    preparationTip:
      item.food.safePreparationTips ||
      'Ensure cooked thoroughly and served fresh and hot.',
  }));

  const trimesterNotes = [
    'Trimester 1: Focus on easily digestible carbs and folate to ease morning nausea and support neural tube closure.',
    'Trimester 2: High protein, iron, and calcium support maternal plasma expansion and rapid fetal skeletal bone ossification.',
    'Trimester 3: Balanced smaller meals prevent gastroesophageal reflux (heartburn) and maintain steady energy.',
  ];

  return {
    overallVerdict,
    verdictLabel,
    summaryText,
    itemsAnalysis,
    trimesterNotes,
  };
}
