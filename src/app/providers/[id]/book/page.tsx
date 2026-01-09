"use client";

import { use, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Star } from "lucide-react";
import { Header } from "@/components/navigations/Index";
import {
  Button,
  Container,
  Card,
  Input,
  Textarea,
  Select,
} from "@/components/ui/Index";
import { useAuth } from "@/contexts/AuthContext";

// Mock data - replace with actual API call
const mockProvider = {
  id: "1",
  name: "John Smith",
  avatarUrl: "",
  rating: 4.9,
  reviewCount: 127,
  services: [
    { value: "plumbing", label: "Plumbing" },
    { value: "drain-cleaning", label: "Drain Cleaning" },
    { value: "water-heater", label: "Water Heater" },
    { value: "pipe-repair", label: "Pipe Repair" },
  ],
};

const timeSlots = [
  { value: "morning", label: "Morning (8am - 12pm)" },
  { value: "afternoon", label: "Afternoon (12pm - 5pm)" },
  { value: "evening", label: "Evening (5pm - 8pm)" },
];

export default function BookingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const { user, profile, loading, signOut } = useAuth();

  const [formData, setFormData] = useState({
    service: "",
    description: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    date: "",
    timeSlot: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const provider = mockProvider;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!user) {
      router.push("/login?redirect=" + encodeURIComponent(`/providers/${id}/book`));
      return;
    }

    if (!formData.service || !formData.description || !formData.address || !formData.city || !formData.date || !formData.timeSlot) {
      setError("Please fill in all required fields.");
      return;
    }

    setSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // In real app, submit booking to API
    // For now, redirect to success or dashboard
    router.push("/dashboard?booking=success");
  };

  const isFormValid =
    formData.service &&
    formData.description &&
    formData.address &&
    formData.city &&
    formData.date &&
    formData.timeSlot;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-24 lg:pb-8">
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
        <Container size="lg">
          {/* Back Link */}
          <Link
            href={`/providers/${id}`}
            className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to profile
          </Link>

          <div className="lg:grid lg:grid-cols-3 lg:gap-8">
            {/* Form */}
            <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-8">
              <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                Request Booking
              </h1>

              {error && (
                <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-sm">
                  {error}
                </div>
              )}

              {/* Service Selection */}
              <Card>
                <h2 className="text-base font-medium text-gray-900 dark:text-gray-100 mb-4">
                  What do you need help with?
                </h2>
                <div className="space-y-2">
                  {provider.services.map((service) => (
                    <label
                      key={service.value}
                      className={[
                        "flex items-center p-4 border rounded-lg cursor-pointer transition-colors",
                        formData.service === service.value
                          ? "border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 dark:border-indigo-500"
                          : "border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-700",
                      ].join(" ")}
                    >
                      <input
                        type="radio"
                        name="service"
                        value={service.value}
                        checked={formData.service === service.value}
                        onChange={handleChange}
                        className="text-indigo-600 focus:ring-indigo-500"
                      />
                      <span className="ml-3 text-gray-900 dark:text-gray-100">
                        {service.label}
                      </span>
                    </label>
                  ))}
                </div>
              </Card>

              {/* Description */}
              <Card>
                <Textarea
                  label="Describe the issue"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Please be specific about the problem..."
                  rows={4}
                  hint="Include relevant details like age of equipment, symptoms, etc."
                />
              </Card>

              {/* Address */}
              <Card>
                <h2 className="text-base font-medium text-gray-900 dark:text-gray-100 mb-4">
                  Service Address
                </h2>
                <div className="space-y-4">
                  <Input
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Street address"
                  />
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    <Input
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="City"
                      className="col-span-2 sm:col-span-1"
                    />
                    <Input
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      placeholder="State"
                    />
                    <Input
                      name="zip"
                      value={formData.zip}
                      onChange={handleChange}
                      placeholder="ZIP"
                    />
                  </div>
                </div>
              </Card>

              {/* Date/Time */}
              <Card>
                <h2 className="text-base font-medium text-gray-900 dark:text-gray-100 mb-4">
                  Preferred Date & Time
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input
                    type="date"
                    label="Preferred Date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    min={new Date().toISOString().split("T")[0]}
                  />
                  <Select
                    label="Preferred Time"
                    name="timeSlot"
                    value={formData.timeSlot}
                    onChange={handleChange}
                    options={timeSlots}
                    placeholder="Select time slot"
                  />
                </div>
              </Card>

              {/* Desktop Submit */}
              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                loading={submitting}
                disabled={!isFormValid}
                className="hidden lg:flex"
              >
                Submit Request
              </Button>
            </form>

            {/* Sidebar */}
            <div className="hidden lg:block">
              <div className="sticky top-24 space-y-6">
                {/* Provider Card */}
                <Card className="bg-gray-100 dark:bg-gray-800 border-0">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
                      {provider.avatarUrl ? (
                        <img
                          src={provider.avatarUrl}
                          alt={provider.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-lg font-medium text-gray-400 dark:text-gray-500">
                          {provider.name.charAt(0).toUpperCase()}
                        </span>
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-gray-100">
                        {provider.name}
                      </p>
                      <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                        <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                        <span>{provider.rating}</span>
                        <span>({provider.reviewCount} reviews)</span>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Summary Card */}
                <Card>
                  <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-4">
                    Booking Summary
                  </h3>
                  <dl className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <dt className="text-gray-500 dark:text-gray-400">
                        Service
                      </dt>
                      <dd className="text-gray-900 dark:text-gray-100">
                        {formData.service
                          ? provider.services.find(
                              (s) => s.value === formData.service
                            )?.label
                          : "---"}
                      </dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-500 dark:text-gray-400">Date</dt>
                      <dd className="text-gray-900 dark:text-gray-100">
                        {formData.date
                          ? new Date(formData.date).toLocaleDateString()
                          : "---"}
                      </dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-500 dark:text-gray-400">Time</dt>
                      <dd className="text-gray-900 dark:text-gray-100">
                        {formData.timeSlot
                          ? timeSlots.find((t) => t.value === formData.timeSlot)
                              ?.label
                          : "---"}
                      </dd>
                    </div>
                  </dl>
                </Card>
              </div>
            </div>
          </div>
        </Container>
      </main>

      {/* Mobile Sticky Submit */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 lg:hidden">
        <Button
          type="submit"
          variant="primary"
          fullWidth
          size="lg"
          loading={submitting}
          disabled={!isFormValid}
          onClick={handleSubmit}
        >
          Submit Request
        </Button>
      </div>
    </div>
  );
}
