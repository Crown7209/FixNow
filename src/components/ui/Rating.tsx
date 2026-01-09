"use client";

import { Star } from "lucide-react";

type RatingSize = "sm" | "md" | "lg";

interface RatingDisplayProps {
  value: number;
  max?: number;
  size?: RatingSize;
  showValue?: boolean;
  reviewCount?: number;
}

const sizeClasses: Record<RatingSize, string> = {
  sm: "w-3.5 h-3.5",
  md: "w-4 h-4",
  lg: "w-5 h-5",
};

const textSizeClasses: Record<RatingSize, string> = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
};

function RatingDisplay({
  value,
  max = 5,
  size = "md",
  showValue = false,
  reviewCount,
}: RatingDisplayProps) {
  const stars = Array.from({ length: max }, (_, i) => {
    const filled = i < Math.floor(value);
    const partial = !filled && i < value;

    return (
      <Star
        key={i}
        className={[
          sizeClasses[size],
          filled || partial
            ? "text-amber-400 fill-amber-400"
            : "text-gray-200 dark:text-gray-600",
        ].join(" ")}
      />
    );
  });

  return (
    <div className="inline-flex items-center gap-1">
      <div className="flex items-center gap-0.5">{stars}</div>
      {showValue && (
        <span
          className={`font-medium text-gray-900 dark:text-gray-100 ${textSizeClasses[size]}`}
        >
          {value.toFixed(1)}
        </span>
      )}
      {reviewCount !== undefined && (
        <span
          className={`text-gray-400 dark:text-gray-500 ${textSizeClasses[size]}`}
        >
          ({reviewCount})
        </span>
      )}
    </div>
  );
}

interface RatingInputProps {
  value: number;
  onChange: (value: number) => void;
  max?: number;
  size?: RatingSize;
  disabled?: boolean;
}

const inputSizeClasses: Record<RatingSize, string> = {
  sm: "w-6 h-6",
  md: "w-8 h-8",
  lg: "w-10 h-10",
};

function RatingInput({
  value,
  onChange,
  max = 5,
  size = "lg",
  disabled = false,
}: RatingInputProps) {
  const ratingLabels = ["", "Poor", "Fair", "Good", "Very Good", "Excellent"];

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex items-center gap-1">
        {Array.from({ length: max }, (_, i) => {
          const starValue = i + 1;
          const filled = starValue <= value;

          return (
            <button
              key={i}
              type="button"
              onClick={() => onChange(starValue)}
              disabled={disabled}
              className={[
                "p-1 rounded transition-colors",
                "focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2",
                "dark:focus:ring-offset-gray-900",
                disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer",
              ].join(" ")}
            >
              <Star
                className={[
                  inputSizeClasses[size],
                  "transition-colors",
                  filled
                    ? "text-amber-400 fill-amber-400"
                    : "text-gray-200 dark:text-gray-600 hover:text-amber-200 dark:hover:text-amber-700",
                ].join(" ")}
              />
            </button>
          );
        })}
      </div>
      {value > 0 && (
        <p className="text-gray-600 dark:text-gray-400 font-medium">
          {ratingLabels[value]}
        </p>
      )}
    </div>
  );
}

export {
  RatingDisplay,
  RatingInput,
  type RatingDisplayProps,
  type RatingInputProps,
  type RatingSize,
};
