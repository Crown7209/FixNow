import { type HTMLAttributes, type ReactNode } from "react";
import Link from "next/link";
import { Star, BadgeCheck } from "lucide-react";

type CardPadding = "none" | "sm" | "md" | "lg";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  padding?: CardPadding;
  hover?: boolean;
}

const paddingClasses: Record<CardPadding, string> = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

function Card({
  padding = "md",
  hover = false,
  className = "",
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={[
        "bg-white dark:bg-gray-800",
        "border border-gray-200 dark:border-gray-700",
        "rounded-xl",
        hover && "hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-sm transition-all",
        paddingClasses[padding],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
    </div>
  );
}

interface ServiceCardProps {
  icon: ReactNode;
  title: string;
  description?: string;
  href?: string;
  onClick?: () => void;
}

function ServiceCard({
  icon,
  title,
  description,
  href,
  onClick,
}: ServiceCardProps) {
  const content = (
    <>
      <div className="w-12 h-12 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center mb-4 text-indigo-600 dark:text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white dark:group-hover:bg-indigo-500 transition-colors">
        {icon}
      </div>
      <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-1">
        {title}
      </h3>
      {description && (
        <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
      )}
    </>
  );

  const sharedClassName = [
    "group block w-full text-left",
    "p-6 bg-gray-50 dark:bg-gray-800",
    "border border-gray-100 dark:border-gray-700 rounded-xl",
    "hover:bg-indigo-50 dark:hover:bg-indigo-900/20",
    "hover:border-indigo-200 dark:hover:border-indigo-800",
    "transition-all duration-150",
  ].join(" ");

  if (href) {
    return (
      <Link href={href} className={sharedClassName}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={sharedClassName}>
      {content}
    </button>
  );
}

interface ProviderCardProps {
  name: string;
  avatarUrl?: string;
  services: string[];
  rating: number;
  reviewCount: number;
  serviceArea?: string;
  hourlyRate?: number;
  isVerified?: boolean;
  href?: string;
}

function ProviderCard({
  name,
  avatarUrl,
  services,
  rating,
  reviewCount,
  serviceArea,
  hourlyRate,
  isVerified,
  href,
}: ProviderCardProps) {
  const content = (
    <>
      <div className="flex items-start gap-4">
        <div className="w-14 h-14 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center overflow-hidden flex-shrink-0">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={name}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-xl font-medium text-gray-400 dark:text-gray-500">
              {name.charAt(0).toUpperCase()}
            </span>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 truncate">
              {name}
            </h3>
            {isVerified && (
              <BadgeCheck className="w-4 h-4 text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
            )}
          </div>

          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 truncate">
            {services.join(" · ")}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-sm">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span className="font-medium text-gray-900 dark:text-gray-100">
                {rating.toFixed(1)}
              </span>
              <span className="text-gray-400 dark:text-gray-500">
                ({reviewCount})
              </span>
            </div>
            {hourlyRate && (
              <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                ${hourlyRate}/hr
              </span>
            )}
          </div>

          {serviceArea && (
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 truncate">
              Serves: {serviceArea}
            </p>
          )}
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
        <span className="block w-full text-center py-2 text-indigo-600 dark:text-indigo-400 font-medium text-sm hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors">
          View Profile
        </span>
      </div>
    </>
  );

  const sharedClassName = [
    "block p-5 bg-white dark:bg-gray-800",
    "border border-gray-200 dark:border-gray-700 rounded-xl",
    "hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-sm",
    "transition-all duration-150",
  ].join(" ");

  if (href) {
    return (
      <Link href={href} className={sharedClassName}>
        {content}
      </Link>
    );
  }

  return <div className={sharedClassName}>{content}</div>;
}

interface StatCardProps {
  icon: ReactNode;
  label: string;
  value: string | number;
}

function StatCard({ icon, label, value }: StatCardProps) {
  return (
    <div className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
          {icon}
        </div>
        <div>
          <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
            {value}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
        </div>
      </div>
    </div>
  );
}

export {
  Card,
  ServiceCard,
  ProviderCard,
  StatCard,
  type CardProps,
  type CardPadding,
  type ServiceCardProps,
  type ProviderCardProps,
  type StatCardProps,
};
