"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/navigations/Index";
import {
  Button,
  Container,
  Card,
  Textarea,
  RatingInput,
} from "@/components/ui/Index";
import { useAuth } from "@/contexts/AuthContext";

// Mock data - replace with actual API call
const mockBooking = {
  id: "b1",
  provider: {
    id: "1",
    name: "John Smith",
    avatarUrl: "",
  },
  service: "Plumbing",
  completedAt: "2024-01-05",
};

export default function ReviewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const { user, profile, loading, signOut } = useAuth();

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const booking = mockBooking;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (rating === 0) {
      setError("Please select a rating.");
      return;
    }

    setSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // In real app, submit review to API
    router.push("/dashboard?review=success");
  };

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

      <main className="py-8 px-4">
        <Container size="sm">
          <Card className="p-6 sm:p-8">
            <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
              Leave a Review
            </h1>

            {/* Provider Info */}
            <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg mb-6">
              <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
                {booking.provider.avatarUrl ? (
                  <img
                    src={booking.provider.avatarUrl}
                    alt={booking.provider.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-lg font-medium text-gray-400 dark:text-gray-500">
                    {booking.provider.name.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-gray-100">
                  {booking.provider.name}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {booking.service} -{" "}
                  {new Date(booking.completedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Star Rating */}
              <div>
                <label className="block text-base font-medium text-gray-900 dark:text-gray-100 mb-4 text-center">
                  How was your experience?
                </label>
                <RatingInput value={rating} onChange={setRating} />
              </div>

              {/* Comment */}
              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-1.5">
                  Tell us more{" "}
                  <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                <Textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="What went well? Any feedback for the provider?"
                  rows={4}
                />
              </div>

              {/* Submit */}
              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                loading={submitting}
                disabled={rating === 0}
              >
                Submit Review
              </Button>
            </form>
          </Card>
        </Container>
      </main>
    </div>
  );
}
