# FixNow MVP - Task Checklist

## Week 1: Foundation ✅

- [x] Set up Supabase project (Auth, Database)
- [x] Install Supabase dependencies
- [x] Create Supabase client utilities
- [x] Create database types (`lib/types.ts`)
- [x] Create middleware for session management
- [x] Create auth context (`contexts/AuthContext.tsx`)
- [x] Create login page
- [x] Create register page (with role selection)
- [x] Create forgot-password page
- [x] Create auth callback handler
- [x] Create home page with service categories
- [x] Create dashboard (role-based)
- [x] Create database schema with RLS (`supabase/schema.sql`)
- [x] Verify build

---

## Week 2: Provider Onboarding

- [ ] Provider profile form (bio, services, service area)
- [ ] Document upload to Supabase Storage (ID, certification)
- [ ] Provider dashboard - view own profile
- [ ] Provider dashboard - view verification status
- [ ] Seed service categories in database

---

## Week 3: Admin & Verification

- [ ] Admin dashboard (protected route)
- [ ] View pending provider applications
- [ ] Approve/reject providers with notes
- [ ] Email notification on approval/rejection
- [ ] Provider "verified" badge display

---

## Week 4: Search & Browse

- [ ] Provider search/list page
- [ ] Filter by service type
- [ ] Filter by city
- [ ] Provider profile view (public)
- [ ] Display ratings, reviews count, verification status
- [ ] Mobile responsive layouts

---

## Week 5: Booking Flow

- [ ] Booking request form
- [ ] Submit booking (creates pending record)
- [ ] Provider notified via email
- [ ] Provider view incoming requests
- [ ] Accept/Decline actions
- [ ] Client notified of acceptance

---

## Week 6: Job Completion & Reviews

- [ ] Job status updates (in progress → completed)
- [ ] Both parties confirm completion
- [ ] Review form (after completion)
- [ ] Review display on provider profile
- [ ] Average rating calculation
- [ ] Client booking history

---

## Week 7: Polish & Safety

- [ ] Report user/review functionality
- [ ] Admin moderation view
- [ ] Cancellation flow with reason
- [ ] Provider job history
- [ ] Email templates
- [ ] Error handling

---

## Week 8: Testing & Launch

- [ ] Bug fixes
- [ ] Performance optimization
- [ ] SEO basics
- [ ] Production environment setup
- [ ] Analytics setup
- [ ] Full user journey testing
