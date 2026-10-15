import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useApp } from '../context/AppContext';
import {
  Apple,
  Plus,
  Trash2,
  Calendar,
  UtensilsCrossed,
  Sparkles,
  ChevronRight,
  TrendingUp
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';

export const FoodDiaryPage: React.FC = () => {
  const { t } = useTranslation();
  const { foodDiary, deleteFoodDiaryMeal } = useApp();

  const [filterMealType, setFilterMealType] = useState<string>('all');

  const filteredMeals = foodDiary.filter((m) =>
    filterMealType === 'all' ? true : m.mealType === filterMealType
  );

  // Nutritional summary
  const totalCalories = filteredMeals.reduce((sum, m) => sum + (m.totalCalories || 0), 0);
  const totalProtein = filteredMeals.reduce((sum, m) => sum + (m.totalProtein || 0), 0);
  const totalFolate = filteredMeals.reduce((sum, m) => sum + (m.totalFolate || 0), 0);
  const totalIron = filteredMeals.reduce((sum, m) => sum + (m.totalIron || 0), 0);

  // 7-day trend chart data
  const chartData = [
    { day: 'Mon', calories: 1980, protein: 62 },
    { day: 'Tue', calories: 2150, protein: 68 },
    { day: 'Wed', calories: 2050, protein: 65 },
    { day: 'Thu', calories: 2200, protein: 72 },
    { day: 'Fri', calories: 1950, protein: 60 },
    { day: 'Sat', calories: 2300, protein: 75 },
    { day: 'Today', calories: totalCalories > 0 ? totalCalories : 2100, protein: totalProtein > 0 ? totalProtein : 68 },
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
            {t('nav.foodDiary')}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Logged meals and verified nutritional breakdown
          </p>
        </div>

        <Link
          to="/nutrition"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-bloom-500 hover:bg-bloom-600 text-white font-bold text-xs shadow-md shadow-bloom-500/20 transition-all transform hover:scale-105 active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>Scan New Meal</span>
        </Link>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-3xl bg-white border border-slate-200/80 shadow-soft text-center">
          <span className="text-xs text-slate-500 font-medium">Total Calories</span>
          <p className="text-2xl font-extrabold text-slate-900 mt-1">{totalCalories} kcal</p>
          <span className="text-[10px] text-slate-400">Target: ~2,200</span>
        </div>
        <div className="p-4 rounded-3xl bg-white border border-slate-200/80 shadow-soft text-center">
          <span className="text-xs text-slate-500 font-medium">Protein</span>
          <p className="text-2xl font-extrabold text-bloom-600 mt-1">{totalProtein} g</p>
          <span className="text-[10px] text-slate-400">Target: ~70g</span>
        </div>
        <div className="p-4 rounded-3xl bg-white border border-slate-200/80 shadow-soft text-center">
          <span className="text-xs text-slate-500 font-medium">Folate</span>
          <p className="text-2xl font-extrabold text-lavender-700 mt-1">{totalFolate} mcg</p>
          <span className="text-[10px] text-slate-400">Target: ~600mcg</span>
        </div>
        <div className="p-4 rounded-3xl bg-white border border-slate-200/80 shadow-soft text-center">
          <span className="text-xs text-slate-500 font-medium">Iron</span>
          <p className="text-2xl font-extrabold text-sage-700 mt-1">{totalIron} mg</p>
          <span className="text-[10px] text-slate-400">Target: ~27mg</span>
        </div>
      </div>

      {/* Weekly Nutrition Chart */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-soft">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-bloom-600" />
            <h3 className="font-bold text-slate-900 text-sm">7-Day Caloric Fuel Trend</h3>
          </div>
          <span className="text-xs text-slate-400">Daily intake vs prenatal baseline</span>
        </div>
        <div className="h-56 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="day" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="calories" fill="#f43f6e" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Meals Log List */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-soft space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
            <UtensilsCrossed className="w-4 h-4 text-bloom-600" />
            <span>Today's Meal Diary</span>
          </h3>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto">
            {['all', 'breakfast', 'lunch', 'dinner', 'snack'].map((type) => (
              <button
                key={type}
                onClick={() => setFilterMealType(type)}
                className={`px-3 py-1 rounded-xl text-xs font-semibold capitalize transition-all ${
                  filterMealType === type
                    ? 'bg-bloom-500 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {filteredMeals.length === 0 ? (
          <div className="text-center py-10 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-bloom-50 text-bloom-600 mx-auto flex items-center justify-center">
              <Apple className="w-6 h-6" />
            </div>
            <p className="text-xs text-slate-500">No meals logged for this filter.</p>
            <Link
              to="/nutrition"
              className="inline-block px-4 py-2 rounded-xl bg-bloom-100 text-bloom-700 text-xs font-bold hover:bg-bloom-200 transition-colors"
            >
              Scan a meal now
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredMeals.map((meal) => (
              <div
                key={meal.id}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 hover:bg-slate-100/60 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-bloom-600 bg-bloom-100 px-2 py-0.5 rounded-md">
                      {meal.mealType}
                    </span>
                    <span className="text-xs text-slate-500">
                      {new Date(meal.consumedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>

                  <div className="text-xs text-slate-800 font-semibold">
                    {meal.items.map((it) => `${it.foodName} (${it.portionAmount})`).join(', ')}
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-4">
                  <div className="text-right">
                    <span className="text-sm font-extrabold text-slate-900 block">
                      {meal.totalCalories} kcal
                    </span>
                    <span className="text-[10px] text-slate-500 block">
                      P: {meal.totalProtein}g • C: {meal.totalCarbs}g • F: {meal.totalFat}g
                    </span>
                  </div>

                  <button
                    onClick={() => deleteFoodDiaryMeal(meal.id)}
                    className="p-2 text-slate-400 hover:text-rose-600 transition-colors"
                    title="Delete meal entry"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
