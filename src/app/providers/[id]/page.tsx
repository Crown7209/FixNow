"use client";

import { use } from "react";
import Link from "next/link";
import { ArrowLeft, BadgeCheck, MapPin, Clock, Star } from "lucide-react";
import { Header } from "@/components/navigations/Index";
import {
  Button,
  Container,
  Card,
  ServiceBadge,
  RatingDisplay,
} from "@/components/ui/Index";
import { useAuth } from "@/contexts/AuthContext";

// Mock data - replace with actual API call
const mockProvider = {
  id: "1",
  name: "John Smith",
  avatarUrl: "",
  bio: "Professional plumber with over 15 years of experience. I specialize in residential plumbing, including pipe repairs, fixture installations, drain cleaning, and water heater services. Licensed and insured. I take pride in providing quality work and excellent customer service.",
  services: ["Plumbing", "Drain Cleaning", "Water Heater", "Pipe Repair"],
  rating: 4.9,
  reviewCount: 127,
  serviceArea: "Downtown, Midtown, Uptown",
  hourlyRate: 75,
  isVerified: true,
  responseTime: "Usually responds in under 2 hours",
  reviews: [
    {
      id: "r1",
      clientName: "Alice Johnson",
      clientAvatar: "",
      rating: 5,
      comment:
        "John was fantastic! He arrived on time, quickly diagnosed the issue, and fixed our leaky pipe in no time. Very professional and clean work.",
      date: "2024-01-05",
    },
    {
      id: "r2",
      clientName: "Bob Williams",
      clientAvatar: "",
      rating: 5,
      comment:
        "Excellent service. John installed our new water heater efficiently and explained everything clearly. Highly recommend!",
      date: "2024-01-02",
    },
    {
      id: "r3",
      clientName: "Carol Davis",
      clientAvatar: "",
      rating: 4,
      comment:
        "Good work on the drain cleaning. Arrived a bit later than expected but did a thorough job. Would use again.",
      date: "2023-12-28",
    },
    {
      id: "r4",
      clientName: "David Miller",
      clientAvatar: "",
      rating: 5,
      comment:
        "John is our go-to plumber now. Third time using his services and always impressed with his work quality.",
      date: "2023-12-20",
    },
  ],
};

export default function ProviderProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { user, profile, loading, signOut } = useAuth();

  // In real app, fetch provider data based on id
  const provider = mockProvider;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header
        user={
          user
            ? { name: profile?.full_name || undefined, email: user.email || "" }
            : null
        }
        loading={loading}
        onSignOut={signOut}
      />

      <main className="py-8">
        <Container>
          {/* Back Link */}
          <Link
            href="/providers"
            className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to providers
          </Link>

          <div className="lg:grid lg:grid-cols-3 lg:gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Header */}
              <div className="flex items-start gap-5">
                <div className="w-20 h-20 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden flex-shrink-0">
                  {provider.avatarUrl ? (
                    <img
                      src={provider.avatarUrl}
                      alt={provider.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-2xl font-medium text-gray-400 dark:text-gray-500">
                      {provider.name.charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                      {provider.name}
                    </h1>
                    {provider.isVerified && (
                      <BadgeCheck className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <RatingDisplay
                      value={provider.rating}
                      showValue
                      reviewCount={provider.reviewCount}
                    />
                  </div>
                  <div className="flex items-center gap-1 mt-2 text-gray-500 dark:text-gray-400 text-sm">
                    <MapPin className="w-4 h-4" />
                    <span>Serves: {provider.serviceArea}</span>
                  </div>
                </div>
              </div>

              {/* About Section */}
              <Card>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-3">
                  About
                </h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {provider.bio}
                </p>
              </Card>

              {/* Services Section */}
              <Card>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
                  Services
                </h2>
                <div className="flex flex-wrap gap-2">
                  {provider.services.map((service) => (
                    <ServiceBadge key={service} service={service} />
                  ))}
                </div>
              </Card>

              {/* Reviews Section */}
              <div>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
                  Reviews ({provider.reviewCount})
                </h2>
                <div className="space-y-6">
                  {provider.reviews.map((review) => (
                    <div
                      key={review.id}
                      className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-0"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
                          {review.clientAvatar ? (
                            <img
                              src={review.clientAvatar}
                              alt={review.clientName}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span className="text-sm font-medium text-gray-400 dark:text-gray-500">
                              {review.clientName.charAt(0).toUpperCase()}
                            </span>
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-gray-100">
                            {review.clientName}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {new Date(review.date).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </p>
                        </div>
                      </div>
                      <div className="mb-2">
                        <RatingDisplay value={review.rating} size="sm" />
                      </div>
                      <p className="text-gray-600 dark:text-gray-400">
                        {review.comment}
                      </p>
                    </div>
                  ))}
                </div>

                {provider.reviewCount > provider.reviews.length && (
                  <Button variant="secondary" className="mt-6">
                    Load More Reviews
                  </Button>
                )}
              </div>
            </div>

            {/* Sidebar - Booking Card */}
            <div className="hidden lg:block">
              <div className="sticky top-24">
                <Card className="shadow-sm">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
                    Request Booking
                  </h3>

                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-2">
                    <Clock className="w-4 h-4" />
                    <span>{provider.responseTime}</span>
                  </div>

                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                    Typical rate: ${provider.hourlyRate}/hr
                  </p>

                  <Link href={`/providers/${id}/book`}>
                    <Button variant="primary" fullWidth size="lg">
                      Request Booking
                    </Button>
                  </Link>
                </Card>
              </div>
            </div>
          </div>
        </Container>
      </main>

      {/* Mobile Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 lg:hidden">
        <Link href={`/providers/${id}/book`}>
          <Button variant="primary" fullWidth size="lg">
            Request Booking
          </Button>
        </Link>
      </div>
    </div>
  );
}
