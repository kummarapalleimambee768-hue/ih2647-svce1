export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  dateOfBirth?: string;
  preferredLanguage: 'en' | 'te' | 'hi' | 'ta' | 'kn';
  bloodGroup?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  allergies: string[];
  existingConditions: string[];
  avatarUrl?: string;
  createdAt: string;
}

export interface PregnancyProfile {
  id: string;
  userId: string;
  lmpDate: string; // YYYY-MM-DD
  estimatedDueDate: string; // YYYY-MM-DD
  clinicianEddConfirmed: boolean;
  pregnancyType: 'singleton' | 'twins' | 'triplets';
  dietaryPreferences: 'vegetarian' | 'non-vegetarian' | 'vegan' | 'satvik';
  currentWeek: number;
  currentTrimester: 1 | 2 | 3;
  daysRemaining: number;
}

export interface MedicalHistoryItem {
  id: string;
  userId: string;
  category: 'condition' | 'allergy' | 'surgery' | 'family_history' | 'previous_pregnancy';
  title: string;
  details?: string;
  diagnosedDate?: string;
  clinicianNotes?: string;
  createdAt: string;
}

export interface SymptomLog {
  id: string;
  userId: string;
  pregnancyWeek: number;
  symptomName: string;
  severity: 'mild' | 'moderate' | 'severe';
  frequency?: string;
  notes?: string;
  triggers?: string;
  isRedFlagAlert: boolean;
  recordedAt: string;
}

export interface Appointment {
  id: string;
  userId: string;
  title: string;
  appointmentType: 'routine_checkup' | 'ultrasound' | 'blood_test' | 'glucose_screen' | 'specialist';
  doctorName?: string;
  clinicOrHospital?: string;
  appointmentDate: string; // ISO
  gestationalWeek?: number;
  notes?: string;
  questionsToAsk: string[];
  isCompleted: boolean;
  createdAt: string;
}

export interface MedicalDocument {
  id: string;
  userId: string;
  fileName: string;
  fileUrl: string;
  fileType: 'pdf' | 'image' | 'report';
  documentCategory: 'ultrasound' | 'lab_test' | 'prescription' | 'discharge_summary';
  notes?: string;
  aiExtractedText?: string;
  aiExtractionStatus: 'unverified' | 'verified_by_user' | 'none';
  fileSizeKb: number;
  uploadedAt: string;
}

export interface FoodDiaryMeal {
  id: string;
  userId: string;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  consumedAt: string;
  items: {
    foodId: string;
    foodName: string;
    portionAmount: number;
    portionUnit: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
    folate_mcg: number;
    iron_mg: number;
    calcium_mg: number;
  }[];
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
  totalFiber: number;
  totalFolate: number;
  totalIron: number;
  totalCalcium: number;
  imageUrl?: string;
  notes?: string;
}

export interface ExerciseLog {
  id: string;
  userId: string;
  pregnancyWeek: number;
  activityName: string;
  durationMinutes: number;
  intensity: 'gentle' | 'moderate';
  comfortRating: number; // 1 to 5
  notes?: string;
  completedAt: string;
}

export interface Reminder {
  id: string;
  userId: string;
  title: string;
  description?: string;
  reminderType: 'medication' | 'hydration' | 'appointment' | 'exercise' | 'wellness';
  reminderTime: string; // HH:mm
  isRecurring: boolean;
  daysOfWeek: number[]; // 0-6
  isActive: boolean;
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant' | 'system';
  content: string;
  isEmergencyFlagged?: boolean;
  clinicalReference?: string;
  timestamp: string;
}

export interface SharedRecordPermissions {
  id: string;
  ownerUserId: string;
  viewerUserId: string;
  sharePregnancyWeek: boolean;
  shareDueDate: boolean;
  shareAppointments: boolean;
  shareSymptoms: boolean;
  shareBabyMilestones: boolean;
  shareMedicalHistory: boolean;
  shareDocuments: boolean; // strict privacy: false by default
  updatedAt: string;
}

export interface SisterAccount {
  user: UserProfile;
  pregnancy: PregnancyProfile;
  symptomsCount: number;
  appointmentsCount: number;
  permissions: SharedRecordPermissions;
}
