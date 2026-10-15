import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from './components/AppLayout';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { OnboardingPage } from './pages/OnboardingPage';
import { DashboardPage } from './pages/DashboardPage';
import { ExercisePage } from './pages/ExercisePage';
import { NutritionScannerPage } from './pages/NutritionScannerPage';
import { FoodDiaryPage } from './pages/FoodDiaryPage';
import { SymptomTrackerPage } from './pages/SymptomTrackerPage';
import { AppointmentsPage } from './pages/AppointmentsPage';
import { MedicalHistoryPage } from './pages/MedicalHistoryPage';
import { DocumentsPage } from './pages/DocumentsPage';
import { AssistantPage } from './pages/AssistantPage';
import { RemindersPage } from './pages/RemindersPage';
import { SettingsPage } from './pages/SettingsPage';

export const App: React.FC = () => {
  return (
    <Routes>
      {/* Public Pages */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/onboarding" element={<OnboardingPage />} />

      {/* Main Application with Modern AppLayout */}
      <Route element={<AppLayout />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/exercise" element={<ExercisePage />} />
        <Route path="/exercises" element={<Navigate to="/exercise" replace />} />
        <Route path="/nutrition" element={<NutritionScannerPage />} />
        <Route path="/food-diary" element={<FoodDiaryPage />} />
        <Route path="/symptoms" element={<SymptomTrackerPage />} />
        <Route path="/appointments" element={<AppointmentsPage />} />
        <Route path="/reminders" element={<RemindersPage />} />
        <Route path="/assistant" element={<AssistantPage />} />
        <Route path="/medical-history" element={<MedicalHistoryPage />} />
        <Route path="/medical-history/documents" element={<DocumentsPage />} />
        <Route path="/settings" element={<SettingsPage />} />

        {/* Redirect removed sections */}
        <Route path="/pregnancy" element={<Navigate to="/dashboard" replace />} />
        <Route path="/family" element={<Navigate to="/dashboard" replace />} />
      </Route>

      {/* Catch-all Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
