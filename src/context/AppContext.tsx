import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserProfile,
  PregnancyProfile,
  MedicalHistoryItem,
  SymptomLog,
  Appointment,
  MedicalDocument,
  FoodDiaryMeal,
  ExerciseLog,
  Reminder,
  SharedRecordPermissions,
} from '../types';
import { INITIAL_DEMO_SISTERS, SisterFullState } from '../data/mockSisterData';
import { calculateFromLMP, calculateFromEDD } from '../utils/pregnancyCalculations';
import { changeAppLanguage } from '../i18n';

interface AppContextType {
  currentUser: UserProfile | null;
  currentPregnancy: PregnancyProfile | null;
  activeSisterKey: string;
  allSistersData: Record<string, SisterFullState>;
  switchSisterAccount: (key: string) => void;
  loginAsDemoSister: (key: string) => void;
  login: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  signup: (fullName: string, email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  saveOnboarding: (data: {
    fullName: string;
    lmpDate?: string;
    eddDate?: string;
    pregnancyType: 'singleton' | 'twins' | 'triplets';
    dietaryPreferences: 'vegetarian' | 'non-vegetarian' | 'vegan' | 'satvik';
    bloodGroup?: string;
    allergies: string[];
    existingConditions: string[];
    preferredLanguage: 'en' | 'te' | 'hi' | 'ta' | 'kn';
    emergencyName?: string;
    emergencyPhone?: string;
  }) => void;
  // Collections
  medicalHistory: MedicalHistoryItem[];
  addMedicalHistory: (item: Omit<MedicalHistoryItem, 'id' | 'userId' | 'createdAt'>) => void;
  deleteMedicalHistory: (id: string) => void;
  symptoms: SymptomLog[];
  addSymptom: (item: Omit<SymptomLog, 'id' | 'userId' | 'recordedAt'>) => void;
  deleteSymptom: (id: string) => void;
  appointments: Appointment[];
  addAppointment: (item: Omit<Appointment, 'id' | 'userId' | 'createdAt'>) => void;
  toggleAppointmentComplete: (id: string) => void;
  deleteAppointment: (id: string) => void;
  documents: MedicalDocument[];
  uploadDocument: (doc: Omit<MedicalDocument, 'id' | 'userId' | 'uploadedAt'>) => void;
  deleteDocument: (id: string) => void;
  foodDiary: FoodDiaryMeal[];
  addFoodDiaryMeal: (meal: Omit<FoodDiaryMeal, 'id' | 'userId'>) => void;
  deleteFoodDiaryMeal: (id: string) => void;
  exerciseLogs: ExerciseLog[];
  addExerciseLog: (log: Omit<ExerciseLog, 'id' | 'userId' | 'completedAt'>) => void;
  reminders: Reminder[];
  addReminder: (rem: Omit<Reminder, 'id' | 'userId' | 'createdAt'>) => void;
  toggleReminder: (id: string) => void;
  deleteReminder: (id: string) => void;
  permissions: SharedRecordPermissions;
  updatePermissions: (perms: Partial<SharedRecordPermissions>) => void;
  aiApiKey: string;
  setAiApiKey: (key: string) => void;
  aiProvider: 'gemini' | 'openai';
  setAiProvider: (provider: 'gemini' | 'openai') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load state from local storage or initialize with demonstration sisters
  const [sistersState, setSistersState] = useState<Record<string, SisterFullState>>(() => {
    const saved = localStorage.getItem('mom_journey_sisters_data');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error parsing stored sisters data', e);
      }
    }
    return INITIAL_DEMO_SISTERS;
  });

  const [activeSisterKey, setActiveSisterKey] = useState<string>(() => {
    return localStorage.getItem('mom_journey_active_user_key') || 'sister-1-ananya';
  });

  const [aiApiKey, setAiApiKey] = useState<string>(() => {
    return localStorage.getItem('mom_journey_ai_key') || '';
  });

  const [aiProvider, setAiProvider] = useState<'gemini' | 'openai'>(() => {
    return (localStorage.getItem('mom_journey_ai_provider') as 'gemini' | 'openai') || 'gemini';
  });

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem('mom_journey_sisters_data', JSON.stringify(sistersState));
  }, [sistersState]);

  useEffect(() => {
    localStorage.setItem('mom_journey_active_user_key', activeSisterKey);
  }, [activeSisterKey]);

  useEffect(() => {
    localStorage.setItem('mom_journey_ai_key', aiApiKey);
  }, [aiApiKey]);

  useEffect(() => {
    localStorage.setItem('mom_journey_ai_provider', aiProvider);
  }, [aiProvider]);

  const activeState = sistersState[activeSisterKey] || sistersState['sister-1-ananya'] || INITIAL_DEMO_SISTERS['sister-1-ananya'];

  const switchSisterAccount = (key: string) => {
    if (sistersState[key]) {
      setActiveSisterKey(key);
      const targetLang = sistersState[key].profile.preferredLanguage || 'en';
      changeAppLanguage(targetLang);
    }
  };

  const loginAsDemoSister = (key: string) => {
    switchSisterAccount(key);
  };

  const login = async (email: string, _pass: string) => {
    // Find sister by email
    const matchKey = Object.keys(sistersState).find(
      (k) => sistersState[k].profile.email.toLowerCase() === email.toLowerCase().trim()
    );
    if (matchKey) {
      switchSisterAccount(matchKey);
      return { success: true };
    }
    return { success: false, error: 'User with this email not found in records.' };
  };

  const signup = async (fullName: string, email: string, _pass: string) => {
    const newId = `user-${Date.now()}`;
    const defaultState: SisterFullState = {
      profile: {
        id: newId,
        email: email.trim(),
        fullName: fullName.trim(),
        preferredLanguage: 'en',
        allergies: [],
        existingConditions: [],
        createdAt: new Date().toISOString(),
      },
      pregnancy: {
        id: `preg-${newId}`,
        userId: newId,
        lmpDate: new Date(Date.now() - 70 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        estimatedDueDate: new Date(Date.now() + 210 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        clinicianEddConfirmed: false,
        pregnancyType: 'singleton',
        dietaryPreferences: 'vegetarian',
        currentWeek: 10,
        currentTrimester: 1,
        daysRemaining: 210,
      },
      medicalHistory: [],
      symptoms: [],
      appointments: [],
      documents: [],
      foodDiary: [],
      exerciseLogs: [],
      reminders: [],
      permissions: {
        id: `perm-${newId}`,
        ownerUserId: newId,
        viewerUserId: 'sister-circle',
        sharePregnancyWeek: true,
        shareDueDate: true,
        shareAppointments: false,
        shareSymptoms: false,
        shareBabyMilestones: true,
        shareMedicalHistory: false,
        shareDocuments: false,
        updatedAt: new Date().toISOString(),
      },
    };

    setSistersState((prev) => ({
      ...prev,
      [newId]: defaultState,
    }));
    setActiveSisterKey(newId);
    return { success: true };
  };

  const logout = () => {
    // Return to landing / sign-in state
    localStorage.removeItem('mom_journey_active_user_key');
    // keep state intact, switch to default demo sister when next accessed
    setActiveSisterKey('sister-1-ananya');
  };

  const saveOnboarding = (data: {
    fullName: string;
    lmpDate?: string;
    eddDate?: string;
    pregnancyType: 'singleton' | 'twins' | 'triplets';
    dietaryPreferences: 'vegetarian' | 'non-vegetarian' | 'vegan' | 'satvik';
    bloodGroup?: string;
    allergies: string[];
    existingConditions: string[];
    preferredLanguage: 'en' | 'te' | 'hi' | 'ta' | 'kn';
    emergencyName?: string;
    emergencyPhone?: string;
  }) => {
    let calc = data.lmpDate ? calculateFromLMP(data.lmpDate) : undefined;
    if (!calc && data.eddDate) {
      calc = calculateFromEDD(data.eddDate);
    }
    if (!calc) {
      calc = calculateFromLMP(new Date().toISOString().split('T')[0]);
    }

    setSistersState((prev) => {
      const current = prev[activeSisterKey] || INITIAL_DEMO_SISTERS['sister-1-ananya'];
      const updatedProfile: UserProfile = {
        ...current.profile,
        fullName: data.fullName || current.profile.fullName,
        bloodGroup: data.bloodGroup || current.profile.bloodGroup,
        allergies: data.allergies || current.profile.allergies,
        existingConditions: data.existingConditions || current.profile.existingConditions,
        preferredLanguage: data.preferredLanguage,
        emergencyContactName: data.emergencyName,
        emergencyContactPhone: data.emergencyPhone,
      };

      const updatedPregnancy: PregnancyProfile = {
        ...current.pregnancy,
        lmpDate: data.lmpDate || current.pregnancy.lmpDate,
        estimatedDueDate: calc.estimatedDueDate,
        currentWeek: calc.currentWeek,
        currentTrimester: calc.currentTrimester,
        daysRemaining: calc.daysRemaining,
        pregnancyType: data.pregnancyType,
        dietaryPreferences: data.dietaryPreferences,
      };

      return {
        ...prev,
        [activeSisterKey]: {
          ...current,
          profile: updatedProfile,
          pregnancy: updatedPregnancy,
        },
      };
    });

    changeAppLanguage(data.preferredLanguage);
  };

  // Helper updater for current active sister
  const updateCurrentSister = (updater: (prev: SisterFullState) => SisterFullState) => {
    setSistersState((prev) => {
      const cur = prev[activeSisterKey];
      if (!cur) return prev;
      return {
        ...prev,
        [activeSisterKey]: updater(cur),
      };
    });
  };

  // Medical History
  const addMedicalHistory = (item: Omit<MedicalHistoryItem, 'id' | 'userId' | 'createdAt'>) => {
    const newItem: MedicalHistoryItem = {
      ...item,
      id: `mh-${Date.now()}`,
      userId: activeState.profile.id,
      createdAt: new Date().toISOString(),
    };
    updateCurrentSister((prev) => ({
      ...prev,
      medicalHistory: [newItem, ...prev.medicalHistory],
    }));
  };

  const deleteMedicalHistory = (id: string) => {
    updateCurrentSister((prev) => ({
      ...prev,
      medicalHistory: prev.medicalHistory.filter((m) => m.id !== id),
    }));
  };

  // Symptoms
  const addSymptom = (item: Omit<SymptomLog, 'id' | 'userId' | 'recordedAt'>) => {
    const newItem: SymptomLog = {
      ...item,
      id: `sym-${Date.now()}`,
      userId: activeState.profile.id,
      recordedAt: new Date().toISOString(),
    };
    updateCurrentSister((prev) => ({
      ...prev,
      symptoms: [newItem, ...prev.symptoms],
    }));
  };

  const deleteSymptom = (id: string) => {
    updateCurrentSister((prev) => ({
      ...prev,
      symptoms: prev.symptoms.filter((s) => s.id !== id),
    }));
  };

  // Appointments
  const addAppointment = (item: Omit<Appointment, 'id' | 'userId' | 'createdAt'>) => {
    const newItem: Appointment = {
      ...item,
      id: `apt-${Date.now()}`,
      userId: activeState.profile.id,
      createdAt: new Date().toISOString(),
    };
    updateCurrentSister((prev) => ({
      ...prev,
      appointments: [newItem, ...prev.appointments],
    }));
  };

  const toggleAppointmentComplete = (id: string) => {
    updateCurrentSister((prev) => ({
      ...prev,
      appointments: prev.appointments.map((a) =>
        a.id === id ? { ...a, isCompleted: !a.isCompleted } : a
      ),
    }));
  };

  const deleteAppointment = (id: string) => {
    updateCurrentSister((prev) => ({
      ...prev,
      appointments: prev.appointments.filter((a) => a.id !== id),
    }));
  };

  // Documents
  const uploadDocument = (doc: Omit<MedicalDocument, 'id' | 'userId' | 'uploadedAt'>) => {
    const newDoc: MedicalDocument = {
      ...doc,
      id: `doc-${Date.now()}`,
      userId: activeState.profile.id,
      uploadedAt: new Date().toISOString(),
    };
    updateCurrentSister((prev) => ({
      ...prev,
      documents: [newDoc, ...prev.documents],
    }));
  };

  const deleteDocument = (id: string) => {
    updateCurrentSister((prev) => ({
      ...prev,
      documents: prev.documents.filter((d) => d.id !== id),
    }));
  };

  // Food Diary
  const addFoodDiaryMeal = (meal: Omit<FoodDiaryMeal, 'id' | 'userId'>) => {
    const newMeal: FoodDiaryMeal = {
      ...meal,
      id: `meal-${Date.now()}`,
      userId: activeState.profile.id,
    };
    updateCurrentSister((prev) => ({
      ...prev,
      foodDiary: [newMeal, ...prev.foodDiary],
    }));
  };

  const deleteFoodDiaryMeal = (id: string) => {
    updateCurrentSister((prev) => ({
      ...prev,
      foodDiary: prev.foodDiary.filter((f) => f.id !== id),
    }));
  };

  // Exercise
  const addExerciseLog = (log: Omit<ExerciseLog, 'id' | 'userId' | 'completedAt'>) => {
    const newLog: ExerciseLog = {
      ...log,
      id: `ex-${Date.now()}`,
      userId: activeState.profile.id,
      completedAt: new Date().toISOString(),
    };
    updateCurrentSister((prev) => ({
      ...prev,
      exerciseLogs: [newLog, ...prev.exerciseLogs],
    }));
  };

  // Reminders
  const addReminder = (rem: Omit<Reminder, 'id' | 'userId' | 'createdAt'>) => {
    const newRem: Reminder = {
      ...rem,
      id: `rem-${Date.now()}`,
      userId: activeState.profile.id,
      createdAt: new Date().toISOString(),
    };
    updateCurrentSister((prev) => ({
      ...prev,
      reminders: [newRem, ...prev.reminders],
    }));
  };

  const toggleReminder = (id: string) => {
    updateCurrentSister((prev) => ({
      ...prev,
      reminders: prev.reminders.map((r) =>
        r.id === id ? { ...r, isActive: !r.isActive } : r
      ),
    }));
  };

  const deleteReminder = (id: string) => {
    updateCurrentSister((prev) => ({
      ...prev,
      reminders: prev.reminders.filter((r) => r.id !== id),
    }));
  };

  // Permissions
  const updatePermissions = (perms: Partial<SharedRecordPermissions>) => {
    updateCurrentSister((prev) => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        ...perms,
        updatedAt: new Date().toISOString(),
      },
    }));
  };

  return (
    <AppContext.Provider
      value={{
        currentUser: activeState.profile,
        currentPregnancy: activeState.pregnancy,
        activeSisterKey,
        allSistersData: sistersState,
        switchSisterAccount,
        loginAsDemoSister,
        login,
        signup,
        logout,
        saveOnboarding,
        medicalHistory: activeState.medicalHistory,
        addMedicalHistory,
        deleteMedicalHistory,
        symptoms: activeState.symptoms,
        addSymptom,
        deleteSymptom,
        appointments: activeState.appointments,
        addAppointment,
        toggleAppointmentComplete,
        deleteAppointment,
        documents: activeState.documents,
        uploadDocument,
        deleteDocument,
        foodDiary: activeState.foodDiary,
        addFoodDiaryMeal,
        deleteFoodDiaryMeal,
        exerciseLogs: activeState.exerciseLogs,
        addExerciseLog,
        reminders: activeState.reminders,
        addReminder,
        toggleReminder,
        deleteReminder,
        permissions: activeState.permissions,
        updatePermissions,
        aiApiKey,
        setAiApiKey,
        aiProvider,
        setAiProvider,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
