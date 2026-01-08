"use client";

import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import {
  Calendar,
  User,
  Settings,
  LogOut,
  Wrench,
  Star,
  Clock,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";

export default function DashboardPage() {
  const { user, profile, loading, signOut } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <Loader2 className="w-8 h-8 text-purple-400 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return null; // Middleware will redirect
  }

  const isProvider = profile?.role === "provider";
  const isAdmin = profile?.role === "admin";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="bg-slate-900/80 backdrop-blur-lg border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="text-2xl font-bold text-white">
              Fix<span className="text-purple-400">Now</span>
            </Link>

            <div className="flex items-center gap-4">
              <span className="text-gray-300 text-sm hidden sm:block">
                {profile?.full_name || user.email}
              </span>
              <button
                onClick={signOut}
                className="flex items-center gap-2 px-4 py-2 text-gray-300 hover:text-white transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Welcome back, {profile?.full_name?.split(" ")[0] || "there"}!
          </h1>
          <p className="text-gray-400">
            {isProvider
              ? "Manage your services and bookings"
              : isAdmin
              ? "Manage the FixNow platform"
              : "Find and book trusted service providers"}
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {isProvider ? (
            <>
              <StatCard
                icon={Calendar}
                label="Pending Jobs"
                value="0"
                color="yellow"
              />
              <StatCard
                icon={CheckCircle}
                label="Completed"
                value="0"
                color="green"
              />
              <StatCard icon={Star} label="Rating" value="--" color="purple" />
              <StatCard
                icon={Clock}
                label="Response Time"
                value="--"
                color="blue"
              />
            </>
          ) : (
            <>
              <StatCard
                icon={Calendar}
                label="Active Bookings"
                value="0"
                color="purple"
              />
              <StatCard
                icon={CheckCircle}
                label="Completed"
                value="0"
                color="green"
              />
              <StatCard
                icon={Star}
                label="Reviews Given"
                value="0"
                color="yellow"
              />
              <StatCard
                icon={Clock}
                label="This Month"
                value="0"
                color="blue"
              />
            </>
          )}
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {isProvider ? (
            <>
              <ActionCard
                href="/provider/profile"
                icon={User}
                title="Complete Your Profile"
                description="Add your bio, services, and verification documents"
                color="purple"
              />
              <ActionCard
                href="/provider/bookings"
                icon={Calendar}
                title="View Bookings"
                description="See incoming job requests and manage your schedule"
                color="blue"
              />
              <ActionCard
                href="/provider/reviews"
                icon={Star}
                title="Your Reviews"
                description="See what customers are saying about your work"
                color="yellow"
              />
            </>
          ) : isAdmin ? (
            <>
              <ActionCard
                href="/admin/providers"
                icon={Wrench}
                title="Provider Applications"
                description="Review and approve new provider registrations"
                color="purple"
              />
              <ActionCard
                href="/admin/bookings"
                icon={Calendar}
                title="All Bookings"
                description="Monitor platform activity and bookings"
                color="blue"
              />
              <ActionCard
                href="/admin/reports"
                icon={AlertCircle}
                title="Reports & Flags"
                description="Handle user reports and flagged content"
                color="red"
              />
            </>
          ) : (
            <>
              <ActionCard
                href="/providers"
                icon={Wrench}
                title="Find a Professional"
                description="Browse verified service providers in your area"
                color="purple"
              />
              <ActionCard
                href="/bookings"
                icon={Calendar}
                title="My Bookings"
                description="View your booking history and manage requests"
                color="blue"
              />
              <ActionCard
                href="/profile"
                icon={Settings}
                title="Account Settings"
                description="Update your profile and preferences"
                color="gray"
              />
            </>
          )}
        </div>

        {/* Recent Activity Placeholder */}
        <div className="bg-white/5 rounded-2xl border border-white/10 p-6">
          <h2 className="text-xl font-semibold text-white mb-4">
            Recent Activity
          </h2>
          <div className="text-center py-12">
            <Calendar className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">No recent activity yet</p>
            <p className="text-gray-500 text-sm mt-1">
              {isProvider
                ? "Complete your profile to start receiving job requests"
                : "Book your first service to get started"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  color: "purple" | "green" | "yellow" | "blue" | "red" | "gray";
}) {
  const colors = {
    purple: "bg-purple-500/20 text-purple-400",
    green: "bg-green-500/20 text-green-400",
    yellow: "bg-yellow-500/20 text-yellow-400",
    blue: "bg-blue-500/20 text-blue-400",
    red: "bg-red-500/20 text-red-400",
    gray: "bg-gray-500/20 text-gray-400",
  };

  return (
    <div className="bg-white/5 rounded-xl border border-white/10 p-4">
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg ${colors[color]}`}>
          <Icon className="w-5 h-5" />
        </div>
        <div>
          <p className="text-2xl font-bold text-white">{value}</p>
          <p className="text-sm text-gray-400">{label}</p>
        </div>
      </div>
    </div>
  );
}

function ActionCard({
  href,
  icon: Icon,
  title,
  description,
  color,
}: {
  href: string;
  icon: React.ElementType;
  title: string;
  description: string;
  color: "purple" | "blue" | "yellow" | "red" | "gray";
}) {
  const colors = {
    purple: "bg-purple-500/20 text-purple-400 group-hover:bg-purple-500/30",
    blue: "bg-blue-500/20 text-blue-400 group-hover:bg-blue-500/30",
    yellow: "bg-yellow-500/20 text-yellow-400 group-hover:bg-yellow-500/30",
    red: "bg-red-500/20 text-red-400 group-hover:bg-red-500/30",
    gray: "bg-gray-500/20 text-gray-400 group-hover:bg-gray-500/30",
  };

  return (
    <Link
      href={href}
      className="group block p-6 bg-white/5 rounded-2xl border border-white/10 hover:border-purple-500/50 hover:bg-white/10 transition-all"
    >
      <div
        className={`w-12 h-12 rounded-xl ${colors[color]} flex items-center justify-center mb-4 transition-colors`}
      >
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-lg font-semibold text-white mb-1">{title}</h3>
      <p className="text-sm text-gray-400">{description}</p>
    </Link>
  );
}
