import { type HTMLAttributes, type ReactNode } from "react";

type BadgeVariant = "default" | "success" | "warning" | "error" | "accent";
type BadgeSize = "sm" | "md";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  icon?: ReactNode;
}

const variantClasses: Record<BadgeVariant, string> = {
  default:
    "bg-gray-100 text-gray-600 border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700",
  success:
    "bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800",
  warning:
    "bg-amber-50 text-amber-600 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800",
  error:
    "bg-red-50 text-red-600 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800",
  accent:
    "bg-indigo-50 text-indigo-600 border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-400 dark:border-indigo-800",
};

const sizeClasses: Record<BadgeSize, string> = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-2.5 py-1 text-sm",
};

function Badge({
  variant = "default",
  size = "sm",
  icon,
  children,
  className = "",
  ...props
}: BadgeProps) {
  return (
    <span
      className={[
        "inline-flex items-center gap-1",
        "font-medium border rounded-full",
        variantClasses[variant],
        sizeClasses[size],
        className,
      ].join(" ")}
      {...props}
    >
      {icon}
      {children}
    </span>
  );
}

type VerificationStatus = "pending" | "approved" | "rejected";

interface VerificationBadgeProps {
  status: VerificationStatus;
}

function VerificationBadge({ status }: VerificationBadgeProps) {
  const config: Record<
    VerificationStatus,
    { variant: BadgeVariant; label: string }
  > = {
    pending: { variant: "warning", label: "Pending" },
    approved: { variant: "success", label: "Verified" },
    rejected: { variant: "error", label: "Rejected" },
  };

  return <Badge variant={config[status].variant}>{config[status].label}</Badge>;
}

interface ServiceBadgeProps {
  service: string;
}

function ServiceBadge({ service }: ServiceBadgeProps) {
  return (
    <span className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm rounded-full">
      {service}
    </span>
  );
}

export {
  Badge,
  VerificationBadge,
  ServiceBadge,
  type BadgeProps,
  type BadgeVariant,
  type BadgeSize,
  type VerificationBadgeProps,
  type ServiceBadgeProps,
};
