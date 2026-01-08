-- FixNow Database Schema
-- Run this in your Supabase SQL Editor

-- Enable UUID extension (should already be enabled)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- PROFILES TABLE (extends auth.users)
-- ============================================
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT,
  phone TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'client' CHECK (role IN ('client', 'provider', 'admin')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- RLS for profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Anyone can read profiles
CREATE POLICY "Public profiles are viewable by everyone" 
  ON public.profiles FOR SELECT 
  USING (true);

-- Users can update their own profile
CREATE POLICY "Users can update own profile" 
  ON public.profiles FOR UPDATE 
  USING (auth.uid() = id);

-- Users can insert their own profile
CREATE POLICY "Users can insert own profile" 
  ON public.profiles FOR INSERT 
  WITH CHECK (auth.uid() = id);

-- ============================================
-- PROVIDERS TABLE
-- ============================================
CREATE TABLE public.providers (
  id UUID REFERENCES public.profiles(id) ON DELETE CASCADE PRIMARY KEY,
  bio TEXT,
  service_area TEXT,
  hourly_rate DECIMAL(10,2),
  is_verified BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT false,
  verification_status TEXT DEFAULT 'pending' 
    CHECK (verification_status IN ('pending', 'approved', 'rejected')),
  verification_notes TEXT,
  id_document_url TEXT,
  certification_url TEXT,
  average_rating DECIMAL(3,2) DEFAULT 0,
  total_reviews INTEGER DEFAULT 0,
  total_jobs_completed INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- RLS for providers
ALTER TABLE public.providers ENABLE ROW LEVEL SECURITY;

-- Public can view active and verified providers
CREATE POLICY "Active verified providers are viewable" 
  ON public.providers FOR SELECT 
  USING (
    (is_active = true AND is_verified = true) 
    OR auth.uid() = id
    OR EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Providers can update their own record
CREATE POLICY "Providers can update own record" 
  ON public.providers FOR UPDATE 
  USING (auth.uid() = id);

-- Users can insert their own provider record
CREATE POLICY "Users can create own provider record" 
  ON public.providers FOR INSERT 
  WITH CHECK (auth.uid() = id);

-- Admins can update any provider (for verification)
CREATE POLICY "Admins can update providers" 
  ON public.providers FOR UPDATE 
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

-- ============================================
-- SERVICES TABLE
-- ============================================
CREATE TABLE public.services (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  display_name TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- RLS for services
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Services are viewable by everyone" 
  ON public.services FOR SELECT 
  USING (true);

-- Only admins can modify services
CREATE POLICY "Admins can manage services" 
  ON public.services FOR ALL 
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

-- Seed initial services
INSERT INTO public.services (name, display_name, description, icon) VALUES
  ('plumber', 'Plumber', 'Plumbing repairs and installations', 'wrench'),
  ('electrician', 'Electrician', 'Electrical repairs and installations', 'zap'),
  ('locksmith', 'Locksmith', 'Lock repairs and key services', 'key'),
  ('computer_repair', 'Computer Repair', 'Computer and tech support', 'monitor');

-- ============================================
-- PROVIDER_SERVICES JUNCTION TABLE
-- ============================================
CREATE TABLE public.provider_services (
  provider_id UUID REFERENCES public.providers(id) ON DELETE CASCADE,
  service_id UUID REFERENCES public.services(id) ON DELETE CASCADE,
  PRIMARY KEY (provider_id, service_id)
);

-- RLS for provider_services
ALTER TABLE public.provider_services ENABLE ROW LEVEL SECURITY;

-- Public can view
CREATE POLICY "Provider services are viewable" 
  ON public.provider_services FOR SELECT 
  USING (true);

-- Providers can manage their own services
CREATE POLICY "Providers can manage own services" 
  ON public.provider_services FOR ALL 
  USING (auth.uid() = provider_id);

-- ============================================
-- BOOKINGS TABLE
-- ============================================
CREATE TABLE public.bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id UUID REFERENCES public.profiles(id) NOT NULL,
  provider_id UUID REFERENCES public.providers(id) NOT NULL,
  service_id UUID REFERENCES public.services(id) NOT NULL,
  
  status TEXT DEFAULT 'pending' CHECK (status IN (
    'pending',
    'accepted',
    'in_progress',
    'completed',
    'cancelled',
    'declined'
  )),
  
  description TEXT NOT NULL,
  location_address TEXT NOT NULL,
  location_city TEXT NOT NULL,
  preferred_date DATE,
  preferred_time_slot TEXT CHECK (preferred_time_slot IN ('morning', 'afternoon', 'evening')),
  
  client_confirmed BOOLEAN DEFAULT false,
  provider_confirmed BOOLEAN DEFAULT false,
  
  cancelled_by UUID REFERENCES public.profiles(id),
  cancellation_reason TEXT,
  decline_reason TEXT,
  
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- RLS for bookings
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Clients can view their own bookings
CREATE POLICY "Clients can view own bookings" 
  ON public.bookings FOR SELECT 
  USING (auth.uid() = client_id);

-- Providers can view bookings assigned to them
CREATE POLICY "Providers can view assigned bookings" 
  ON public.bookings FOR SELECT 
  USING (auth.uid() = provider_id);

-- Admins can view all bookings
CREATE POLICY "Admins can view all bookings" 
  ON public.bookings FOR SELECT 
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

-- Clients can create bookings
CREATE POLICY "Clients can create bookings" 
  ON public.bookings FOR INSERT 
  WITH CHECK (auth.uid() = client_id);

-- Clients can update their own bookings (for cancellation)
CREATE POLICY "Clients can update own bookings" 
  ON public.bookings FOR UPDATE 
  USING (auth.uid() = client_id);

-- Providers can update assigned bookings
CREATE POLICY "Providers can update assigned bookings" 
  ON public.bookings FOR UPDATE 
  USING (auth.uid() = provider_id);

-- ============================================
-- REVIEWS TABLE
-- ============================================
CREATE TABLE public.reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  booking_id UUID REFERENCES public.bookings(id) NOT NULL UNIQUE,
  client_id UUID REFERENCES public.profiles(id) NOT NULL,
  provider_id UUID REFERENCES public.providers(id) NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  is_flagged BOOLEAN DEFAULT false,
  flag_reason TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- RLS for reviews
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Public can read reviews (core to trust)
CREATE POLICY "Reviews are viewable by everyone" 
  ON public.reviews FOR SELECT 
  USING (true);

-- Only booking client can create review (and only once per booking)
CREATE POLICY "Booking client can create review" 
  ON public.reviews FOR INSERT 
  WITH CHECK (
    auth.uid() = client_id 
    AND EXISTS (
      SELECT 1 FROM public.bookings 
      WHERE id = booking_id 
      AND client_id = auth.uid() 
      AND status = 'completed'
    )
  );

-- No update policy - reviews are write-once

-- ============================================
-- REPORTS TABLE
-- ============================================
CREATE TABLE public.reports (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  reporter_id UUID REFERENCES public.profiles(id) NOT NULL,
  reported_user_id UUID REFERENCES public.profiles(id),
  reported_review_id UUID REFERENCES public.reviews(id),
  reason TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'resolved', 'dismissed')),
  admin_notes TEXT,
  resolved_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMPTZ DEFAULT now(),
  resolved_at TIMESTAMPTZ
);

-- RLS for reports
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;

-- Users can create reports
CREATE POLICY "Users can create reports" 
  ON public.reports FOR INSERT 
  WITH CHECK (auth.uid() = reporter_id);

-- Users can view their own reports
CREATE POLICY "Users can view own reports" 
  ON public.reports FOR SELECT 
  USING (auth.uid() = reporter_id);

-- Admins can view and manage all reports
CREATE POLICY "Admins can manage reports" 
  ON public.reports FOR ALL 
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

-- ============================================
-- HELPER FUNCTIONS
-- ============================================

-- Function to update provider rating when review is added
CREATE OR REPLACE FUNCTION update_provider_rating()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.providers
  SET 
    average_rating = (
      SELECT COALESCE(AVG(rating), 0) 
      FROM public.reviews 
      WHERE provider_id = NEW.provider_id
    ),
    total_reviews = (
      SELECT COUNT(*) 
      FROM public.reviews 
      WHERE provider_id = NEW.provider_id
    )
  WHERE id = NEW.provider_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to update rating on new review
CREATE TRIGGER on_review_created
  AFTER INSERT ON public.reviews
  FOR EACH ROW
  EXECUTE FUNCTION update_provider_rating();

-- Function to update provider job count
CREATE OR REPLACE FUNCTION update_provider_job_count()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'completed' AND OLD.status != 'completed' THEN
    UPDATE public.providers
    SET total_jobs_completed = total_jobs_completed + 1
    WHERE id = NEW.provider_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to update job count on booking completion
CREATE TRIGGER on_booking_completed
  AFTER UPDATE ON public.bookings
  FOR EACH ROW
  EXECUTE FUNCTION update_provider_job_count();

-- Function to update timestamps
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_providers_updated_at
  BEFORE UPDATE ON public.providers
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_bookings_updated_at
  BEFORE UPDATE ON public.bookings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- ============================================
-- INDEXES FOR PERFORMANCE
-- ============================================
CREATE INDEX idx_providers_service_area ON public.providers(service_area);
CREATE INDEX idx_providers_is_active ON public.providers(is_active);
CREATE INDEX idx_providers_is_verified ON public.providers(is_verified);
CREATE INDEX idx_bookings_client_id ON public.bookings(client_id);
CREATE INDEX idx_bookings_provider_id ON public.bookings(provider_id);
CREATE INDEX idx_bookings_status ON public.bookings(status);
CREATE INDEX idx_reviews_provider_id ON public.reviews(provider_id);
