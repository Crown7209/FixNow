"use client";

import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import {
  Wrench,
  Zap,
  Key,
  Monitor,
  CheckCircle,
  MapPin,
  ArrowRight,
} from "lucide-react";
import { Header } from "@/components/navigations/Index";
import { Button, Container, ServiceCard } from "@/components/ui/Index";
import { useState } from "react";

const services = [
  {
    name: "Plumber",
    icon: Wrench,
    description: "Pipes, fixtures & drains",
  },
  {
    name: "Electrician",
    icon: Zap,
    description: "Wiring & electrical repairs",
  },
  {
    name: "Locksmith",
    icon: Key,
    description: "Locks, keys & security",
  },
  {
    name: "Computer Repair",
    icon: Monitor,
    description: "PCs, laptops & devices",
  },
];

const trustSignals = [
  "Verified professionals",
  "Real customer reviews",
  "Fast response times",
];

export default function HomePage() {
  const { user, profile, loading, signOut } = useAuth();
  const [location, setLocation] = useState("");

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Navigation */}
      <Header
        user={
          user
            ? { name: profile?.full_name || undefined, email: user.email || "" }
            : null
        }
        loading={loading}
        onSignOut={signOut}
        rightContent={
          user && (
            <Link href="/dashboard">
              <Button variant="primary" size="sm">
                Dashboard
              </Button>
            </Link>
          )
        }
      />

      {/* Hero Section */}
      <section className="pt-24 pb-16 sm:pt-32 sm:pb-20">
        <Container size="lg">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-gray-900 dark:text-gray-100">
              Find trusted home services
            </h1>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
              Connect with verified professionals for all your home repair
              needs. Fast, reliable, and backed by real reviews.
            </p>

            {/* Search Bar */}
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
              <div className="relative flex-1">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Enter your city..."
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              <Link
                href={
                  location ? `/providers?location=${location}` : "/providers"
                }
              >
                <Button
                  variant="primary"
                  size="lg"
                  rightIcon={<ArrowRight className="w-5 h-5" />}
                  className="w-full sm:w-auto"
                >
                  Browse Providers
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Services Section */}
      <section className="py-12 sm:py-16 bg-gray-50 dark:bg-gray-800">
        <Container size="lg">
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-gray-100 text-center mb-8">
            Our Services
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-4xl mx-auto">
            {services.map((service) => (
              <ServiceCard
                key={service.name}
                icon={<service.icon className="w-6 h-6" />}
                title={service.name}
                description={service.description}
                href={`/providers?service=${service.name.toLowerCase().replace(" ", "-")}`}
              />
            ))}
          </div>
        </Container>
      </section>

      {/* Trust Signals */}
      <section className="py-12 sm:py-16">
        <Container size="lg">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12">
            {trustSignals.map((signal) => (
              <div
                key={signal}
                className="flex items-center gap-2 text-gray-600 dark:text-gray-400"
              >
                <CheckCircle className="w-5 h-5 text-emerald-500" />
                <span className="text-sm font-medium">{signal}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* How It Works */}
      <section className="py-12 sm:py-16 bg-gray-50 dark:bg-gray-800">
        <Container size="lg">
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-gray-100 text-center mb-12">
            How It Works
          </h2>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                step: 1,
                title: "Choose a Service",
                desc: "Select the type of service you need from our categories.",
              },
              {
                step: 2,
                title: "Browse Providers",
                desc: "View ratings, reviews, and pick your trusted professional.",
              },
              {
                step: 3,
                title: "Book & Done",
                desc: "Request a booking and get your problem fixed quickly.",
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center mx-auto mb-4 text-lg font-semibold text-indigo-600 dark:text-indigo-400">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16">
        <Container size="md">
          <div className="text-center bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 sm:p-12 border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
              Join thousands of satisfied customers who trust FixNow for their
              home service needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <Button variant="primary" size="lg">
                  Create Free Account
                </Button>
              </Link>
              <Link href="/register?role=provider">
                <Button variant="secondary" size="lg">
                  Join as Provider
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-gray-200 dark:border-gray-800">
        <Container>
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} FixNow. All rights reserved.
          </p>
        </Container>
      </footer>
    </div>
  );
}
