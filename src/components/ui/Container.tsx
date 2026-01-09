import { type HTMLAttributes, type ReactNode } from "react";

type ContainerSize = "sm" | "md" | "lg" | "xl" | "full";

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: ContainerSize;
}

const containerSizes: Record<ContainerSize, string> = {
  sm: "max-w-2xl",
  md: "max-w-4xl",
  lg: "max-w-6xl",
  xl: "max-w-7xl",
  full: "max-w-full",
};

function Container({
  size = "xl",
  className = "",
  children,
  ...props
}: ContainerProps) {
  return (
    <div
      className={[
        "mx-auto px-4 sm:px-6 lg:px-8",
        containerSizes[size],
        className,
      ].join(" ")}
      {...props}
    >
      {children}
    </div>
  );
}

interface PageLayoutProps {
  children: ReactNode;
  className?: string;
}

function PageLayout({ children, className = "" }: PageLayoutProps) {
  return (
    <main
      className={`min-h-screen bg-white dark:bg-gray-900 ${className}`}
    >
      {children}
    </main>
  );
}

type SectionBackground = "default" | "secondary";

interface SectionProps extends HTMLAttributes<HTMLElement> {
  background?: SectionBackground;
}

function Section({
  background = "default",
  className = "",
  children,
  ...props
}: SectionProps) {
  return (
    <section
      className={[
        "py-12 sm:py-16 lg:py-20",
        background === "secondary"
          ? "bg-gray-50 dark:bg-gray-800"
          : "bg-white dark:bg-gray-900",
        className,
      ].join(" ")}
      {...props}
    >
      {children}
    </section>
  );
}

interface PageHeaderProps {
  title: string;
  description?: string;
  action?: ReactNode;
}

function PageHeader({ title, description, action }: PageHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">
          {title}
        </h1>
        {description && (
          <p className="mt-1 text-gray-600 dark:text-gray-400">{description}</p>
        )}
      </div>
      {action && <div className="flex-shrink-0">{action}</div>}
    </div>
  );
}

export {
  Container,
  PageLayout,
  Section,
  PageHeader,
  type ContainerProps,
  type ContainerSize,
  type PageLayoutProps,
  type SectionProps,
  type SectionBackground,
  type PageHeaderProps,
};
