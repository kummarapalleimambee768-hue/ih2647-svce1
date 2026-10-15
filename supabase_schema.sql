-- ==============================================================================
-- Mom Journey AI — Supabase Database Schema & Row Level Security (RLS)
-- Complete Healthcare Companion Architecture with Granular Multi-Sister Sharing
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    date_of_birth DATE,
    preferred_language TEXT DEFAULT 'en',
    emergency_contact_name TEXT,
    emergency_contact_phone TEXT,
    blood_group TEXT,
    allergies TEXT[] DEFAULT ARRAY[]::TEXT[],
    existing_conditions TEXT[] DEFAULT ARRAY[]::TEXT[],
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. PREGNANCY PROFILES
CREATE TABLE IF NOT EXISTS public.pregnancy_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    lmp_date DATE NOT NULL,
    estimated_due_date DATE NOT NULL,
    clinician_edd_confirmed BOOLEAN DEFAULT FALSE,
    pregnancy_type TEXT DEFAULT 'singleton', -- singleton, twins, triplets
    dietary_preferences TEXT DEFAULT 'vegetarian', -- vegetarian, non-vegetarian, vegan, satvik
    current_week INT NOT NULL DEFAULT 4,
    current_trimester INT NOT NULL DEFAULT 1,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. MEDICAL HISTORY
CREATE TABLE IF NOT EXISTS public.medical_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    category TEXT NOT NULL, -- condition, allergy, surgery, family_history, previous_pregnancy
    title TEXT NOT NULL,
    details TEXT,
    diagnosed_date DATE,
    clinician_notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. SYMPTOMS
CREATE TABLE IF NOT EXISTS public.symptoms (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    pregnancy_week INT NOT NULL,
    symptom_name TEXT NOT NULL,
    severity TEXT NOT NULL CHECK (severity IN ('mild', 'moderate', 'severe')),
    frequency TEXT,
    notes TEXT,
    triggers TEXT,
    is_red_flag_alert BOOLEAN DEFAULT FALSE,
    recorded_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. APPOINTMENTS
CREATE TABLE IF NOT EXISTS public.appointments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    appointment_type TEXT NOT NULL, -- routine_checkup, ultrasound, blood_test, glucose_screen
    doctor_name TEXT,
    clinic_or_hospital TEXT,
    appointment_date TIMESTAMPTZ NOT NULL,
    gestational_week INT,
    notes TEXT,
    questions_to_ask TEXT[] DEFAULT ARRAY[]::TEXT[],
    is_completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. MEDICAL DOCUMENTS
CREATE TABLE IF NOT EXISTS public.medical_documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    file_name TEXT NOT NULL,
    file_url TEXT NOT NULL,
    file_type TEXT NOT NULL, -- pdf, image_jpeg, image_png
    document_category TEXT NOT NULL, -- ultrasound, lab_test, prescription, discharge_summary
    notes TEXT,
    ai_extracted_text TEXT,
    ai_extraction_status TEXT DEFAULT 'unverified', -- unverified, verified_by_user, none
    uploaded_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. MEDICATION RECORDS
CREATE TABLE IF NOT EXISTS public.medication_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    medication_name TEXT NOT NULL,
    dosage TEXT NOT NULL,
    frequency TEXT NOT NULL, -- once_daily, twice_daily, as_needed
    prescribed_by TEXT,
    instructions TEXT,
    start_date DATE NOT NULL,
    end_date DATE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. PREGNANCY TESTS
CREATE TABLE IF NOT EXISTS public.pregnancy_tests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    test_name TEXT NOT NULL, -- NIPT, NT Scan, Glucose Tolerance, Quad Screen, TIFFA
    test_date DATE NOT NULL,
    pregnancy_week INT NOT NULL,
    result_summary TEXT,
    is_normal BOOLEAN DEFAULT TRUE,
    clinician_comments TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. FOOD DIARY
CREATE TABLE IF NOT EXISTS public.food_diary (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    meal_type TEXT NOT NULL CHECK (meal_type IN ('breakfast', 'lunch', 'dinner', 'snack')),
    consumed_at TIMESTAMPTZ DEFAULT NOW(),
    total_calories NUMERIC(7, 2) DEFAULT 0,
    total_protein NUMERIC(6, 2) DEFAULT 0,
    total_carbs NUMERIC(6, 2) DEFAULT 0,
    total_fat NUMERIC(6, 2) DEFAULT 0,
    total_fiber NUMERIC(6, 2) DEFAULT 0,
    total_folate NUMERIC(6, 2) DEFAULT 0,
    total_iron NUMERIC(6, 2) DEFAULT 0,
    total_calcium NUMERIC(6, 2) DEFAULT 0,
    image_url TEXT,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. FOOD ITEMS (Verified items inside diary meals)
CREATE TABLE IF NOT EXISTS public.food_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    diary_id UUID NOT NULL REFERENCES public.food_diary(id) ON DELETE CASCADE,
    item_name TEXT NOT NULL,
    portion_amount NUMERIC(6, 2) NOT NULL,
    portion_unit TEXT NOT NULL DEFAULT 'serving', -- grams, katori, pieces, cups
    calories NUMERIC(7, 2) NOT NULL,
    protein NUMERIC(6, 2) NOT NULL,
    carbs NUMERIC(6, 2) NOT NULL,
    fat NUMERIC(6, 2) NOT NULL,
    fiber NUMERIC(6, 2) DEFAULT 0,
    folate_mcg NUMERIC(6, 2) DEFAULT 0,
    iron_mg NUMERIC(6, 2) DEFAULT 0,
    calcium_mg NUMERIC(6, 2) DEFAULT 0,
    source TEXT DEFAULT 'verified_indian_db' -- verified_indian_db, usda_fdc
);

-- 11. NUTRITION ANALYSIS CACHE / LOGS
CREATE TABLE IF NOT EXISTS public.nutrition_analysis (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    scanned_image_url TEXT,
    detected_items JSONB NOT NULL,
    confirmed_items JSONB,
    calculation_summary JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 12. EXERCISE LOGS
CREATE TABLE IF NOT EXISTS public.exercise_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    pregnancy_week INT NOT NULL,
    activity_name TEXT NOT NULL, -- gentle_walking, pelvic_floor, prenatal_yoga, stretching
    duration_minutes INT NOT NULL,
    intensity TEXT DEFAULT 'gentle', -- gentle, moderate
    comfort_rating INT CHECK (comfort_rating BETWEEN 1 AND 5),
    notes TEXT,
    completed_at TIMESTAMPTZ DEFAULT NOW()
);

-- 13. REMINDERS
CREATE TABLE IF NOT EXISTS public.reminders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    reminder_type TEXT NOT NULL, -- medication, hydration, appointment, exercise, wellness
    reminder_time TIME NOT NULL,
    is_recurring BOOLEAN DEFAULT TRUE,
    days_of_week INT[] DEFAULT ARRAY[0,1,2,3,4,5,6],
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 14. CHAT CONVERSATIONS & MESSAGES
CREATE TABLE IF NOT EXISTS public.chat_conversations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    title TEXT DEFAULT 'Pregnancy Wellness Inquiry',
    language TEXT DEFAULT 'en',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.chat_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    conversation_id UUID NOT NULL REFERENCES public.chat_conversations(id) ON DELETE CASCADE,
    sender TEXT NOT NULL CHECK (sender IN ('user', 'assistant', 'system')),
    content TEXT NOT NULL,
    is_emergency_flagged BOOLEAN DEFAULT FALSE,
    clinical_reference TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 15. FAMILY INVITATIONS (For the 3 Sisters Multi-Profile Sharing)
CREATE TABLE IF NOT EXISTS public.family_invitations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    inviter_user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    invitee_email TEXT NOT NULL,
    relationship TEXT DEFAULT 'sister', -- sister, family, partner
    invitation_status TEXT DEFAULT 'pending' CHECK (invitation_status IN ('pending', 'accepted', 'rejected', 'revoked')),
    invite_code TEXT UNIQUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    expires_at TIMESTAMPTZ DEFAULT NOW() + INTERVAL '7 days'
);

-- 16. SHARED RECORD PERMISSIONS (Granular Consent Controls)
CREATE TABLE IF NOT EXISTS public.shared_record_permissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    owner_user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    viewer_user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    share_pregnancy_week BOOLEAN DEFAULT TRUE,
    share_due_date BOOLEAN DEFAULT TRUE,
    share_appointments BOOLEAN DEFAULT FALSE,
    share_symptoms BOOLEAN DEFAULT FALSE,
    share_baby_milestones BOOLEAN DEFAULT TRUE,
    share_medical_history BOOLEAN DEFAULT FALSE,
    share_documents BOOLEAN DEFAULT FALSE, -- Documents default to FALSE (Strict Privacy)
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(owner_user_id, viewer_user_id)
);

-- 17. APPROVED CLINICAL KNOWLEDGE SOURCES
CREATE TABLE IF NOT EXISTS public.approved_knowledge_sources (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    source_name TEXT NOT NULL, -- WHO, ACOG, FOGSI, NHS
    title TEXT NOT NULL,
    trimester INT,
    topic TEXT NOT NULL,
    guidance_content TEXT NOT NULL,
    is_active BOOLEAN DEFAULT TRUE
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pregnancy_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.medical_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.symptoms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.medical_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.medication_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pregnancy_tests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.food_diary ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.food_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.nutrition_analysis ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exercise_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reminders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.family_invitations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shared_record_permissions ENABLE ROW LEVEL SECURITY;

-- Default Owner Access Policies: Only the record owner can access their own data
CREATE POLICY "Users can manage their own profile"
    ON public.profiles FOR ALL USING (auth.uid() = id);

CREATE POLICY "Users can manage their own pregnancy profiles"
    ON public.pregnancy_profiles FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own medical history"
    ON public.medical_history FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own symptoms"
    ON public.symptoms FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own appointments"
    ON public.appointments FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own documents"
    ON public.medical_documents FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own medications"
    ON public.medication_records FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own pregnancy tests"
    ON public.pregnancy_tests FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own food diary"
    ON public.food_diary FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own food items"
    ON public.food_items FOR ALL USING (
        EXISTS (SELECT 1 FROM public.food_diary WHERE public.food_diary.id = food_items.diary_id AND public.food_diary.user_id = auth.uid())
    );

CREATE POLICY "Users can manage their own nutrition analysis"
    ON public.nutrition_analysis FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own exercise logs"
    ON public.exercise_logs FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own reminders"
    ON public.reminders FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own conversations"
    ON public.chat_conversations FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own messages"
    ON public.chat_messages FOR ALL USING (
        EXISTS (SELECT 1 FROM public.chat_conversations WHERE public.chat_conversations.id = chat_messages.conversation_id AND public.chat_conversations.user_id = auth.uid())
    );

CREATE POLICY "Users can manage their family invitations"
    ON public.family_invitations FOR ALL USING (auth.uid() = inviter_user_id);

CREATE POLICY "Users can manage their shared permissions"
    ON public.shared_record_permissions FOR ALL USING (auth.uid() = owner_user_id OR auth.uid() = viewer_user_id);

-- Family Shared Views (Read-only for sisters with explicit consent)
CREATE POLICY "Sisters can view consented pregnancy profile milestones"
    ON public.pregnancy_profiles FOR SELECT USING (
        auth.uid() = user_id OR
        EXISTS (
            SELECT 1 FROM public.shared_record_permissions
            WHERE shared_record_permissions.owner_user_id = pregnancy_profiles.user_id
              AND shared_record_permissions.viewer_user_id = auth.uid()
              AND shared_record_permissions.share_pregnancy_week = TRUE
        )
    );
