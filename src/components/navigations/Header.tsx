"use client";

import Link from "next/link";
import { type ReactNode } from "react";
import { Button } from "@/components/ui/Button";

interface HeaderProps {
  user?: {
    name?: string;
    email: string;
  } | null;
  loading?: boolean;
  onSignOut?: () => void;
  rightContent?: ReactNode;
}

function Header({ user, loading, onSignOut, rightContent }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            href="/"
            className="text-xl font-bold text-gray-900 dark:text-gray-100 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          >
            FixNow
          </Link>

          <div className="flex items-center gap-4">
            {loading ? (
              <div className="w-20 h-8 bg-gray-100 dark:bg-gray-800 rounded animate-pulse" />
            ) : user ? (
              <>
                <span className="text-sm text-gray-600 dark:text-gray-400 hidden sm:block">
                  {user.name || user.email}
                </span>
                <Button variant="secondary" size="sm" onClick={onSignOut}>
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" size="sm">
                    Sign In
                  </Button>
                </Link>
                <Link href="/register">
                  <Button variant="primary" size="sm">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
            {rightContent}
          </div>
        </div>
      </div>
    </header>
  );
}

export { Header, type HeaderProps };
