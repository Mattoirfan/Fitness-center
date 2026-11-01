-- ============================================================================
-- VOLT FITNESS CLUB - RELATIONAL DATABASE SCHEMA (PostgreSQL / Supabase)
-- ============================================================================

-- 1. PROFILES & ROLES
CREATE TYPE user_role AS ENUM ('member', 'trainer', 'front_desk', 'manager', 'admin');
CREATE TYPE membership_status AS ENUM ('pending', 'active', 'expired', 'cancelled', 'past_due');

CREATE TABLE profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    phone TEXT,
    role user_role DEFAULT 'member',
    avatar_url TEXT,
    fitness_goal TEXT,
    emergency_contact TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. BRANCHES & LOCATIONS
CREATE TABLE branches (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    city TEXT NOT NULL,
    address TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT NOT NULL,
    hours_weekday TEXT NOT NULL,
    hours_weekend TEXT NOT NULL,
    latitude DOUBLE PRECISION NOT NULL,
    longitude DOUBLE PRECISION NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. MEMBERSHIP PLANS
CREATE TABLE membership_plans (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    tagline TEXT,
    price_inr NUMERIC(10, 2) NOT NULL,
    price_usd NUMERIC(10, 2) NOT NULL,
    billing_period TEXT CHECK (billing_period IN ('month', 'year', 'quarter')),
    is_popular BOOLEAN DEFAULT FALSE,
    access_hours TEXT,
    included_classes_monthly INT, -- NULL for unlimited
    guest_passes_monthly INT DEFAULT 0,
    pt_sessions_included INT DEFAULT 0,
    sauna_access BOOLEAN DEFAULT FALSE,
    features JSONB NOT NULL DEFAULT '[]',
    exclusions JSONB NOT NULL DEFAULT '[]',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. USER MEMBERSHIPS
CREATE TABLE memberships (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    plan_id TEXT REFERENCES membership_plans(id),
    status membership_status DEFAULT 'pending',
    start_date DATE NOT NULL,
    expiry_date DATE NOT NULL,
    auto_renew BOOLEAN DEFAULT TRUE,
    freeze_days_used INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. TRAINERS
CREATE TABLE trainers (
    id TEXT PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    user_id UUID REFERENCES profiles(id),
    name TEXT NOT NULL,
    title TEXT NOT NULL,
    bio TEXT NOT NULL,
    philosophy TEXT NOT NULL,
    specialties TEXT[] NOT NULL DEFAULT '{}',
    certifications TEXT[] NOT NULL DEFAULT '{}',
    experience_years INT NOT NULL DEFAULT 1,
    languages TEXT[] NOT NULL DEFAULT '{}',
    rating NUMERIC(3, 2) DEFAULT 5.0,
    sessions_completed INT DEFAULT 0,
    availability TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. CLASSES & GROUP TRAINING
CREATE TABLE classes (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    duration_minutes INT NOT NULL,
    intensity TEXT NOT NULL,
    calories_burned_estimate INT,
    description TEXT NOT NULL,
    room TEXT NOT NULL,
    capacity INT NOT NULL DEFAULT 20,
    equipment_needed TEXT[] DEFAULT '{}',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. CLASS SCHEDULES
CREATE TABLE class_schedules (
    id TEXT PRIMARY KEY,
    class_id TEXT REFERENCES classes(id) ON DELETE CASCADE,
    trainer_id TEXT REFERENCES trainers(id),
    branch_id TEXT REFERENCES branches(id),
    day_of_week TEXT NOT NULL,
    time_slot TEXT NOT NULL,
    capacity INT NOT NULL,
    booked_count INT NOT NULL DEFAULT 0,
    status TEXT DEFAULT 'available',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. CLASS BOOKINGS
CREATE TABLE class_bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    schedule_id TEXT REFERENCES class_schedules(id) ON DELETE CASCADE,
    booking_date DATE NOT NULL,
    status TEXT DEFAULT 'confirmed' CHECK (status IN ('confirmed', 'cancelled', 'attended', 'no_show')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. FREE TRIAL LEADS
CREATE TABLE free_trial_leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    branch_id TEXT REFERENCES branches(id),
    preferred_date DATE NOT NULL,
    preferred_time TEXT NOT NULL,
    fitness_goal TEXT,
    trainer_preference TEXT,
    pass_code TEXT UNIQUE NOT NULL,
    status TEXT DEFAULT 'confirmed' CHECK (status IN ('pending', 'confirmed', 'attended', 'cancelled')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. ORDERS, PAYMENTS & TRANSACTIONS
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES profiles(id),
    plan_id TEXT REFERENCES membership_plans(id),
    amount NUMERIC(10, 2) NOT NULL,
    tax_amount NUMERIC(10, 2) NOT NULL,
    discount_amount NUMERIC(10, 2) DEFAULT 0,
    currency TEXT DEFAULT 'INR',
    status TEXT NOT NULL DEFAULT 'paid' CHECK (status IN ('pending', 'paid', 'failed', 'refunded')),
    payment_method TEXT NOT NULL,
    transaction_id TEXT UNIQUE NOT NULL,
    invoice_number TEXT UNIQUE NOT NULL,
    promo_code_used TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. AUDIT LOGS
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    action TEXT NOT NULL,
    performed_by TEXT NOT NULL,
    target TEXT NOT NULL,
    details TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- INDEXES FOR HIGH-THROUGHPUT QUERIES
CREATE INDEX idx_class_bookings_user ON class_bookings(user_id);
CREATE INDEX idx_class_bookings_schedule ON class_bookings(schedule_id);
CREATE INDEX idx_schedules_day_branch ON class_schedules(day_of_week, branch_id);
CREATE INDEX idx_orders_user ON orders(user_id);
CREATE INDEX idx_trial_leads_code ON free_trial_leads(pass_code);
