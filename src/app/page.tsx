"use client";

import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import {
  Wrench,
  Zap,
  Key,
  Monitor,
  Star,
  Shield,
  Clock,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

const services = [
  { name: "Plumber", icon: Wrench, color: "from-blue-500 to-cyan-500" },
  { name: "Electrician", icon: Zap, color: "from-yellow-500 to-orange-500" },
  { name: "Locksmith", icon: Key, color: "from-purple-500 to-pink-500" },
  {
    name: "Computer Repair",
    icon: Monitor,
    color: "from-green-500 to-emerald-500",
  },
];

const features = [
  {
    title: "Verified Professionals",
    description: "All providers are manually verified",
    icon: Shield,
  },
  {
    title: "Quick Response",
    description: "Get connected within minutes",
    icon: Clock,
  },
  {
    title: "Trusted Reviews",
    description: "Real reviews from real customers",
    icon: Star,
  },
];

export default function HomePage() {
  const { user, profile, loading } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="text-2xl font-bold text-white">
              Fix<span className="text-purple-400">Now</span>
            </Link>

            <div className="flex items-center gap-4">
              {loading ? (
                <div className="w-20 h-8 bg-white/10 rounded animate-pulse" />
              ) : user ? (
                <>
                  <span className="text-gray-300 text-sm hidden sm:block">
                    Hi, {profile?.full_name || "there"}!
                  </span>
                  <Link
                    href="/dashboard"
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
                  >
                    Dashboard
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/register"
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Home repairs,{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              fixed now
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10">
            Connect with trusted, verified professionals for all your home
            service needs. Fast, reliable, and backed by real reviews.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/providers"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg shadow-purple-500/25"
            >
              Find a Professional
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/register?role=provider"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/20 transition-all border border-white/20"
            >
              Join as Provider
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Our Services
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {services.map((service) => (
              <Link
                key={service.name}
                href={`/providers?service=${service.name.toLowerCase()}`}
                className="group p-6 bg-white/5 rounded-2xl border border-white/10 hover:border-purple-500/50 hover:bg-white/10 transition-all"
              >
                <div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-r ${service.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                >
                  <service.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white">
                  {service.name}
                </h3>
                <p className="text-sm text-gray-400 mt-1">
                  Find verified pros →
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-4">
            Why Choose FixNow?
          </h2>
          <p className="text-gray-400 text-center max-w-2xl mx-auto mb-12">
            We connect you with trusted professionals who have been verified and
            reviewed by real customers.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="p-8 bg-white/5 rounded-2xl border border-white/10"
              >
                <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            How It Works
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: 1,
                title: "Choose a Service",
                desc: "Select the type of service you need",
              },
              {
                step: 2,
                title: "Browse Providers",
                desc: "View ratings, reviews, and pick your pro",
              },
              {
                step: 3,
                title: "Book & Done",
                desc: "Request a booking and get your problem fixed",
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-white">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-3xl p-12 border border-purple-500/30">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-gray-300 mb-8">
            Join thousands of satisfied customers who trust FixNow for their
            home service needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-purple-900 font-semibold rounded-xl hover:bg-gray-100 transition-all"
            >
              <CheckCircle className="w-5 h-5" />
              Create Free Account
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-500">© 2024 FixNow. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
