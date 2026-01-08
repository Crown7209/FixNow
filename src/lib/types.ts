export type UserRole = "client" | "provider" | "admin";

export type VerificationStatus = "pending" | "approved" | "rejected";

export type BookingStatus =
  | "pending"
  | "accepted"
  | "in_progress"
  | "completed"
  | "cancelled"
  | "declined";

export type ReportStatus = "pending" | "resolved" | "dismissed";

export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  phone: string | null;
  avatar_url: string | null;
  role: UserRole;
  created_at: string;
  updated_at: string;
}

export interface Provider {
  id: string;
  bio: string | null;
  service_area: string | null;
  hourly_rate: number | null;
  is_verified: boolean;
  is_active: boolean;
  verification_status: VerificationStatus;
  verification_notes: string | null;
  id_document_url: string | null;
  certification_url: string | null;
  average_rating: number;
  total_reviews: number;
  total_jobs_completed: number;
  created_at: string;
  updated_at: string;
}

export interface Service {
  id: string;
  name: string;
  display_name: string;
  description: string | null;
  icon: string | null;
  is_active: boolean;
  created_at: string;
}

export interface ProviderService {
  provider_id: string;
  service_id: string;
}

export interface Booking {
  id: string;
  client_id: string;
  provider_id: string;
  service_id: string;
  status: BookingStatus;
  description: string;
  location_address: string;
  location_city: string;
  preferred_date: string | null;
  preferred_time_slot: string | null;
  client_confirmed: boolean;
  provider_confirmed: boolean;
  cancelled_by: string | null;
  cancellation_reason: string | null;
  decline_reason: string | null;
  completed_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface Review {
  id: string;
  booking_id: string;
  client_id: string;
  provider_id: string;
  rating: number;
  comment: string | null;
  is_flagged: boolean;
  flag_reason: string | null;
  created_at: string;
}

export interface Report {
  id: string;
  reporter_id: string;
  reported_user_id: string | null;
  reported_review_id: string | null;
  reason: string;
  status: ReportStatus;
  admin_notes: string | null;
  resolved_by: string | null;
  created_at: string;
  resolved_at: string | null;
}

// Extended types for UI
export interface ProviderWithProfile extends Provider {
  profile: Profile;
  services: Service[];
}

export interface BookingWithDetails extends Booking {
  client: Profile;
  provider: ProviderWithProfile;
  service: Service;
  review?: Review;
}

export interface ReviewWithClient extends Review {
  client: Profile;
}
