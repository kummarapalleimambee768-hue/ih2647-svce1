import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useApp } from '../context/AppContext';
import {
  VERIFIED_FOOD_DATABASE,
  FoodNutrientProfile,
  calculateVerifiedNutrients,
  NutrientCalculation,
  getMealSafetyVerdict,
  MealSafetyReport,
} from '../data/foodComposition';
import { scanFoodItems, FoodScanDetection } from '../services/aiService';
import {
  Camera,
  Search,
  Sparkles,
  Apple,
  CheckCircle2,
  Plus,
  Trash2,
  ShieldCheck,
  ShieldAlert,
  AlertTriangle,
  ArrowRight,
  Info,
  Layers,
  Utensils,
  HeartPulse,
  ThumbsUp,
  AlertOctagon
} from 'lucide-react';
import { LocalizedCopy } from '../components/LocalizedCopy';

export const NutritionScannerPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { addFoodDiaryMeal, aiApiKey, aiProvider } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scannedImagePreview, setScannedImagePreview] = useState<string | null>(null);
  const [selectedItems, setSelectedItems] = useState<{ food: FoodNutrientProfile; quantity: number }[]>([
    { food: VERIFIED_FOOD_DATABASE[0], quantity: 1 }, // Idli (default)
  ]);
  const [mealType, setMealType] = useState<'breakfast' | 'lunch' | 'dinner' | 'snack'>('breakfast');
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Calculate live verified nutrients & pregnancy safety verdict
  const computedNutrients = calculateVerifiedNutrients(
    selectedItems.map((item) => ({
      foodId: item.food.id,
      quantity: item.quantity,
    }))
  );

  const safetyReport = getMealSafetyVerdict(selectedItems);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsScanning(true);
    const reader = new FileReader();
    reader.onload = async () => {
      setScannedImagePreview(reader.result as string);
      const detections = await scanFoodItems(file.name, { apiKey: aiApiKey, provider: aiProvider });
      if (detections.length > 0) {
        setSelectedItems(
          detections.slice(0, 2).map((d) => ({
            food: d.detectedItem,
            quantity: d.suggestedPortion,
          }))
        );
      }
      setIsScanning(false);
    };
    reader.readAsDataURL(file);
  };

  const handleSearchSelect = (food: FoodNutrientProfile) => {
    setSelectedItems((prev) => {
      const exists = prev.find((p) => p.food.id === food.id);
      if (exists) {
        return prev.map((p) => (p.food.id === food.id ? { ...p, quantity: p.quantity + 1 } : p));
      }
      return [...prev, { food, quantity: 1 }];
    });
    setSearchQuery('');
  };

  const handleUpdateQuantity = (foodId: string, quantity: number) => {
    if (quantity <= 0) {
      setSelectedItems((prev) => prev.filter((p) => p.food.id !== foodId));
    } else {
      setSelectedItems((prev) =>
        prev.map((p) => (p.food.id === foodId ? { ...p, quantity } : p))
      );
    }
  };

  const handleSaveToDiary = () => {
    if (selectedItems.length === 0) return;

    addFoodDiaryMeal({
      mealType,
      consumedAt: new Date().toISOString(),
      items: selectedItems.map((s) => ({
        foodId: s.food.id,
        foodName: s.food.name,
        portionAmount: s.quantity,
        portionUnit: s.food.servingUnit,
        calories: s.food.calories * s.quantity,
        protein: s.food.protein * s.quantity,
        carbs: s.food.carbs * s.quantity,
        fat: s.food.fat * s.quantity,
        fiber: s.food.fiber * s.quantity,
        folate_mcg: s.food.folate_mcg * s.quantity,
        iron_mg: s.food.iron_mg * s.quantity,
        calcium_mg: s.food.calcium_mg * s.quantity,
      })),
      totalCalories: computedNutrients.calories,
      totalProtein: computedNutrients.protein,
      totalCarbs: computedNutrients.carbs,
      totalFat: computedNutrients.fat,
      totalFiber: computedNutrients.fiber,
      totalFolate: computedNutrients.folate_mcg,
      totalIron: computedNutrients.iron_mg,
      totalCalcium: computedNutrients.calcium_mg,
      imageUrl: scannedImagePreview || undefined,
    });

    setSaveSuccess(true);
    setTimeout(() => {
      navigate('/food-diary');
    }, 1200);
  };

  const filteredDatabase = searchQuery.trim()
    ? VERIFIED_FOOD_DATABASE.filter(
        (f) =>
          f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          Object.values(f.regionalNames || {}).some((rn) =>
            rn.toLowerCase().includes(searchQuery.toLowerCase())
          )
      )
    : [];

  return <LocalizedCopy>{((
    <div className="space-y-6 animate-fadeIn">
      {/* Title */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
          {t('scanner.title')}
        </h1>
        <p className="text-xs text-slate-500 mt-1">{t('scanner.subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 Cols): Upload / Search / Confirm Items */}
        <div className="lg:col-span-2 space-y-6">
          {/* Upload Meal Photo Card */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-soft">
            <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
              <Camera className="w-4 h-4 text-bloom-600" />
              <span>1. Scan Meal Photo or Search Dish</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Photo Input Dropzone */}
              <label className="border-2 border-dashed border-bloom-200 hover:border-bloom-400 bg-bloom-50/30 hover:bg-bloom-50/60 rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-colors relative overflow-hidden group">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                {scannedImagePreview ? (
                  <div className="relative w-full h-32">
                    <img
                      src={scannedImagePreview}
                      alt="Meal scan"
                      className="w-full h-full object-cover rounded-xl"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-xl opacity-0 group-hover:opacity-100 transition-opacity text-white text-xs font-semibold">
                      Click to change photo
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-bloom-600 mb-2">
                      <Camera className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold text-slate-800">
                      Snap or Upload Meal Photo
                    </span>
                    <span className="text-[10px] text-slate-500 mt-0.5">
                      AI identifies Indian dishes & portions
                    </span>
                  </>
                )}
                {isScanning && (
                  <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center gap-2 text-xs font-bold text-bloom-600">
                    <Sparkles className="w-4 h-4 animate-spin" />
                    <span>Analyzing food items...</span>
                  </div>
                )}
              </label>

              {/* Keyword Search Input */}
              <div className="space-y-2">
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search idli, dosa, dal, khichdi, curd..."
                    className="w-full pl-9 pr-3 py-2.5 rounded-2xl border border-slate-200 text-xs focus:ring-2 focus:ring-bloom-500/20 focus:border-bloom-500"
                  />
                </div>

                {/* Search Results Dropdown */}
                {filteredDatabase.length > 0 && (
                  <div className="max-h-48 overflow-y-auto border border-slate-200 rounded-2xl p-1 bg-white shadow-lg space-y-1">
                    {filteredDatabase.map((food) => (
                      <button
                        key={food.id}
                        type="button"
                        onClick={() => handleSearchSelect(food)}
                        className="w-full p-2 text-left text-xs hover:bg-bloom-50 rounded-xl flex items-center justify-between"
                      >
                        <div>
                          <span className="font-bold text-slate-800">{food.name}</span>
                          <span className="text-[10px] text-slate-400 block">{food.servingUnit}</span>
                        </div>
                        <Plus className="w-3.5 h-3.5 text-bloom-600" />
                      </button>
                    ))}
                  </div>
                )}

                {/* Quick Add & Safety Check Pills */}
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-bloom-500" />
                    <span>Quick Safety Checks & Staples:</span>
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {VERIFIED_FOOD_DATABASE.map((f) => (
                      <button
                        key={f.id}
                        type="button"
                        onClick={() => handleSearchSelect(f)}
                        className={`px-2.5 py-1 rounded-xl text-[11px] font-semibold transition-all border ${
                          f.pregnancySafety === 'AVOID'
                            ? 'bg-rose-50 border-rose-200 text-rose-700 hover:bg-rose-100'
                            : f.pregnancySafety === 'MODERATION'
                            ? 'bg-amber-50 border-amber-200 text-amber-800 hover:bg-amber-100'
                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-bloom-50 hover:text-bloom-700'
                        }`}
                      >
                        {f.pregnancySafety === 'AVOID' ? '❌ ' : f.pregnancySafety === 'MODERATION' ? '⚠️ ' : '+ '}
                        {f.name.split('(')[0]}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Confirmed Food Items List with Safety Badges & Clinical Guidance */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-soft">
            <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
              <Layers className="w-4 h-4 text-lavender-600" />
              <span>2. Confirmed Ingredients & Clinical Safety</span>
            </h3>

            {selectedItems.length === 0 ? (
              <p className="text-xs text-slate-500 py-4 text-center">
                No items added yet. Snap a photo or search for a dish above.
              </p>
            ) : (
              <div className="space-y-3">
                {selectedItems.map((item) => (
                  <div
                    key={item.food.id}
                    className={`p-4 rounded-2xl border transition-all ${
                      item.food.pregnancySafety === 'AVOID'
                        ? 'bg-rose-50/60 border-rose-300'
                        : item.food.pregnancySafety === 'MODERATION'
                        ? 'bg-amber-50/60 border-amber-200'
                        : 'bg-slate-50 border-slate-200/70'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-bold text-sm text-slate-900">{item.food.name}</span>
                          
                          {/* Food Safety Badge */}
                          {item.food.pregnancySafety === 'AVOID' ? (
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-600 text-white font-bold flex items-center gap-1 shadow-xs">
                              <ShieldAlert className="w-3 h-3" />
                              <span>AVOID / UNSAFE</span>
                            </span>
                          ) : item.food.pregnancySafety === 'MODERATION' ? (
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500 text-white font-bold flex items-center gap-1 shadow-xs">
                              <AlertTriangle className="w-3 h-3" />
                              <span>EAT IN MODERATION</span>
                            </span>
                          ) : (
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-600 text-white font-bold flex items-center gap-1 shadow-xs">
                              <CheckCircle2 className="w-3 h-3" />
                              <span>SAFE TO EAT</span>
                            </span>
                          )}

                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-cream-200 text-amber-900 font-semibold">
                            {item.food.isVegetarian ? 'Vegetarian' : 'Non-Veg'}
                          </span>
                        </div>

                        {/* Doctor's Recommendation */}
                        <p className="text-xs text-slate-700 font-medium mt-1.5 leading-relaxed">
                          <span className="font-bold text-slate-900">Clinical Advice: </span>
                          {item.food.clinicalRecommendation || item.food.pregnancyBenefit}
                        </p>

                        {/* Preparation Tip if present */}
                        {item.food.safePreparationTips && (
                          <p className="text-[11px] text-amber-900 bg-amber-50/90 rounded-xl p-2 mt-2 border border-amber-200 flex items-start gap-1.5">
                            <Info className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-amber-700" />
                            <span><strong>Safe Prep Tip: </strong>{item.food.safePreparationTips}</span>
                          </p>
                        )}
                      </div>

                      <div className="flex items-center gap-3 self-end sm:self-center">
                        <div className="flex items-center border border-slate-300 rounded-xl bg-white shadow-xs">
                          <button
                            type="button"
                            onClick={() => handleUpdateQuantity(item.food.id, item.quantity - 0.5)}
                            className="px-2.5 py-1 text-slate-600 hover:bg-slate-100 rounded-l-xl text-xs font-bold"
                          >
                            -
                          </button>
                          <span className="px-2.5 py-1 text-xs font-bold text-slate-800">
                            {item.quantity} {item.food.servingUnit}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleUpdateQuantity(item.food.id, item.quantity + 0.5)}
                            className="px-2.5 py-1 text-slate-600 hover:bg-slate-100 rounded-r-xl text-xs font-bold"
                          >
                            +
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleUpdateQuantity(item.food.id, 0)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Pregnancy Safety Verdict & Verified Nutrient Report */}
        <div className="space-y-6">
          {/* Pregnancy Safety Verdict: "Is This Food Safe to Eat or Not?" */}
          <div
            className={`p-6 rounded-3xl border shadow-soft transition-all ${
              safetyReport.overallVerdict === 'AVOID'
                ? 'bg-rose-50/95 border-rose-300 ring-2 ring-rose-500/20'
                : safetyReport.overallVerdict === 'MODERATION'
                ? 'bg-amber-50/95 border-amber-300 ring-2 ring-amber-500/20'
                : 'bg-emerald-50/95 border-emerald-300 ring-2 ring-emerald-500/20'
            }`}
          >
            <div className="flex items-start gap-3">
              {safetyReport.overallVerdict === 'AVOID' ? (
                <div className="w-12 h-12 rounded-2xl bg-rose-600 text-white flex items-center justify-center flex-shrink-0 shadow-md">
                  <AlertOctagon className="w-7 h-7 animate-pulse" />
                </div>
              ) : safetyReport.overallVerdict === 'MODERATION' ? (
                <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center flex-shrink-0 shadow-md">
                  <AlertTriangle className="w-7 h-7" />
                </div>
              ) : (
                <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center flex-shrink-0 shadow-md">
                  <ShieldCheck className="w-7 h-7" />
                </div>
              )}

              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 block">
                  {t('foodSafety.verdictTitle', 'Pregnancy Safety Verdict: Can I Eat This?')}
                </span>
                <h3 className="text-lg font-black text-slate-900 font-display mt-0.5">
                  {safetyReport.overallVerdict === 'AVOID'
                    ? '❌ UNSAFE / AVOID IN PREGNANCY'
                    : safetyReport.overallVerdict === 'MODERATION'
                    ? '⚠️ CONSUME IN STRICT MODERATION'
                    : '✅ SAFE & HEALTHY TO EAT'}
                </h3>
              </div>
            </div>

            <p className="text-xs text-slate-800 mt-3 leading-relaxed font-medium bg-white/70 p-3 rounded-2xl border border-slate-200/60">
              {safetyReport.summaryText}
            </p>

            {/* Trimester Suitability */}
            <div className="mt-3.5 pt-3 border-t border-slate-200/80 space-y-1.5">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                {t('foodSafety.trimesterSuitability', 'Trimester Recommendations')}:
              </span>
              {safetyReport.trimesterNotes.map((note, idx) => (
                <p key={idx} className="text-[11px] text-slate-700 flex items-start gap-1.5 leading-snug">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 flex-shrink-0" />
                  <span>{note}</span>
                </p>
              ))}
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-soft space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <Utensils className="w-4 h-4 text-bloom-600" />
                <span>Verified Nutrient Report</span>
              </h3>
              <span className="text-[10px] px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 font-bold">
                ICMR / USDA Data
              </span>
            </div>

            {/* Calories Card */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-cream-100 to-bloom-50 text-center border border-bloom-100">
              <span className="text-xs text-slate-500 font-medium">Estimated Energy</span>
              <p className="text-3xl font-extrabold text-slate-900 mt-1">
                {computedNutrients.calories}{' '}
                <span className="text-sm font-semibold text-slate-600">kcal</span>
              </p>
            </div>

            {/* Macro & Micronutrients Breakdown */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-slate-400 text-[10px]">Protein</span>
                <p className="font-bold text-slate-800 text-sm">{computedNutrients.protein} g</p>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-slate-400 text-[10px]">Carbohydrates</span>
                <p className="font-bold text-slate-800 text-sm">{computedNutrients.carbs} g</p>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-slate-400 text-[10px]">Fats</span>
                <p className="font-bold text-slate-800 text-sm">{computedNutrients.fat} g</p>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-slate-400 text-[10px]">Dietary Fiber</span>
                <p className="font-bold text-slate-800 text-sm">{computedNutrients.fiber} g</p>
              </div>
              <div className="p-2.5 rounded-xl bg-rose-50/60 border border-rose-100">
                <span className="text-rose-800 text-[10px] font-semibold">Folate</span>
                <p className="font-bold text-bloom-600 text-sm">{computedNutrients.folate_mcg} mcg</p>
              </div>
              <div className="p-2.5 rounded-xl bg-sage-50/60 border border-sage-100">
                <span className="text-sage-800 text-[10px] font-semibold">Iron</span>
                <p className="font-bold text-sage-700 text-sm">{computedNutrients.iron_mg} mg</p>
              </div>
              <div className="p-2.5 rounded-xl bg-lavender-50/60 border border-lavender-100">
                <span className="text-lavender-800 text-[10px] font-semibold">Calcium</span>
                <p className="font-bold text-lavender-700 text-sm">{computedNutrients.calcium_mg} mg</p>
              </div>
              <div className="p-2.5 rounded-xl bg-amber-50/60 border border-amber-100">
                <span className="text-amber-800 text-[10px] font-semibold">Vitamin C</span>
                <p className="font-bold text-amber-700 text-sm">{computedNutrients.vitamin_c_mg} mg</p>
              </div>
            </div>

            {/* Meal Category Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Meal Category for Diary:
              </label>
              <div className="grid grid-cols-4 gap-1">
                {(['breakfast', 'lunch', 'dinner', 'snack'] as const).map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setMealType(m)}
                    className={`py-1.5 rounded-xl text-xs font-semibold capitalize transition-all ${
                      mealType === m
                        ? 'bg-bloom-500 text-white shadow-sm'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            {/* Save Button */}
            <button
              type="button"
              onClick={handleSaveToDiary}
              disabled={selectedItems.length === 0}
              className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-bloom-500 to-bloom-600 hover:from-bloom-600 hover:to-bloom-700 text-white font-bold text-sm shadow-md shadow-bloom-500/25 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{saveSuccess ? 'Saved to Diary!' : t('scanner.saveToDiary')}</span>
            </button>

            {/* Uncertainty Notice */}
            <div className="p-3 rounded-2xl bg-cream-50 border border-cream-200">
              <p className="text-[11px] text-slate-500 leading-snug flex items-start gap-1.5">
                <Info className="w-3.5 h-3.5 text-bloom-600 flex-shrink-0 mt-0.5" />
                <span>{t('scanner.safeNotice')}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  ))}</LocalizedCopy>;
};
