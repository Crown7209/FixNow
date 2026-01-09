"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Search, SlidersHorizontal } from "lucide-react";
import { Header } from "@/components/navigations/Index";
import {
  Button,
  Container,
  Select,
  ProviderCard,
} from "@/components/ui/Index";
import { useAuth } from "@/contexts/AuthContext";

const serviceOptions = [
  { value: "", label: "All Services" },
  { value: "plumber", label: "Plumber" },
  { value: "electrician", label: "Electrician" },
  { value: "locksmith", label: "Locksmith" },
  { value: "computer-repair", label: "Computer Repair" },
];

const sortOptions = [
  { value: "rating", label: "Highest Rated" },
  { value: "reviews", label: "Most Reviews" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
];

// Mock data - replace with actual API call
const mockProviders = [
  {
    id: "1",
    name: "John Smith",
    avatarUrl: "",
    services: ["Plumbing", "Drain Cleaning"],
    rating: 4.9,
    reviewCount: 127,
    serviceArea: "Downtown, Midtown",
    hourlyRate: 75,
    isVerified: true,
  },
  {
    id: "2",
    name: "Sarah Johnson",
    avatarUrl: "",
    services: ["Electrical", "Wiring"],
    rating: 4.8,
    reviewCount: 89,
    serviceArea: "Uptown, West Side",
    hourlyRate: 85,
    isVerified: true,
  },
  {
    id: "3",
    name: "Mike Davis",
    avatarUrl: "",
    services: ["Locksmith", "Security"],
    rating: 4.7,
    reviewCount: 64,
    serviceArea: "Downtown",
    hourlyRate: 65,
    isVerified: true,
  },
  {
    id: "4",
    name: "Emily Chen",
    avatarUrl: "",
    services: ["Computer Repair", "IT Support"],
    rating: 4.9,
    reviewCount: 156,
    serviceArea: "Citywide",
    hourlyRate: 70,
    isVerified: true,
  },
  {
    id: "5",
    name: "Robert Wilson",
    avatarUrl: "",
    services: ["Plumbing", "Water Heater"],
    rating: 4.6,
    reviewCount: 43,
    serviceArea: "East Side, Downtown",
    hourlyRate: 80,
    isVerified: false,
  },
  {
    id: "6",
    name: "Lisa Martinez",
    avatarUrl: "",
    services: ["Electrical", "Lighting"],
    rating: 4.8,
    reviewCount: 91,
    serviceArea: "South Side, Midtown",
    hourlyRate: 90,
    isVerified: true,
  },
];

export default function ProvidersPage() {
  const { user, profile, loading, signOut } = useAuth();
  const searchParams = useSearchParams();

  const [service, setService] = useState(searchParams.get("service") || "");
  const [location, setLocation] = useState(searchParams.get("location") || "");
  const [sort, setSort] = useState("rating");

  const filteredProviders = mockProviders.filter((provider) => {
    if (service) {
      const serviceMatch = provider.services.some((s) =>
        s.toLowerCase().includes(service.replace("-", " "))
      );
      if (!serviceMatch) return false;
    }
    if (location) {
      const locationMatch = provider.serviceArea
        .toLowerCase()
        .includes(location.toLowerCase());
      if (!locationMatch) return false;
    }
    return true;
  });

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

      {/* Filter Bar */}
      <div className="sticky top-16 z-40 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 py-4">
        <Container>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by location..."
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
              />
            </div>

            <div className="flex gap-3">
              <Select
                options={serviceOptions}
                value={service}
                onChange={(e) => setService(e.target.value)}
                className="min-w-[160px]"
              />

              <Select
                options={sortOptions}
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="min-w-[160px]"
              />
            </div>
          </div>
        </Container>
      </div>

      {/* Results */}
      <main className="py-8">
        <Container>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            {filteredProviders.length} provider
            {filteredProviders.length !== 1 ? "s" : ""} found
          </p>

          {filteredProviders.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProviders.map((provider) => (
                <ProviderCard
                  key={provider.id}
                  name={provider.name}
                  avatarUrl={provider.avatarUrl}
                  services={provider.services}
                  rating={provider.rating}
                  reviewCount={provider.reviewCount}
                  serviceArea={provider.serviceArea}
                  hourlyRate={provider.hourlyRate}
                  isVerified={provider.isVerified}
                  href={`/providers/${provider.id}`}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <SlidersHorizontal className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                No providers found
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                Try adjusting your filters or search in a different area.
              </p>
              <Button
                variant="secondary"
                onClick={() => {
                  setService("");
                  setLocation("");
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </Container>
      </main>
    </div>
  );
}
