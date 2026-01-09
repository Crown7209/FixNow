"use client";

import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { label, error, hint, leftIcon, rightIcon, id, className = "", ...props },
    ref
  ) => {
    const inputId = id || props.name;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-1.5"
          >
            {label}
          </label>
        )}

        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 pointer-events-none">
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            className={[
              "w-full px-3 py-2.5",
              "bg-white dark:bg-gray-800",
              "border rounded-lg",
              "text-gray-900 dark:text-gray-100 text-sm",
              "placeholder:text-gray-400 dark:placeholder:text-gray-500",
              "focus:outline-none focus:ring-2 focus:border-transparent",
              "disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 dark:disabled:bg-gray-900",
              "transition-colors duration-150",
              error
                ? "border-red-500 focus:ring-red-500 dark:border-red-400 dark:focus:ring-red-400"
                : "border-gray-300 dark:border-gray-600 focus:ring-indigo-500 dark:focus:ring-indigo-400",
              leftIcon ? "pl-10" : "",
              rightIcon ? "pr-10" : "",
              className,
            ]
              .filter(Boolean)
              .join(" ")}
            {...props}
          />

          {rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
              {rightIcon}
            </div>
          )}
        </div>

        {(error || hint) && (
          <p
            className={[
              "mt-1.5 text-sm",
              error
                ? "text-red-600 dark:text-red-400"
                : "text-gray-500 dark:text-gray-400",
            ].join(" ")}
          >
            {error || hint}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, hint, id, className = "", ...props }, ref) => {
    const textareaId = id || props.name;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-1.5"
          >
            {label}
          </label>
        )}

        <textarea
          ref={ref}
          id={textareaId}
          className={[
            "w-full px-3 py-2.5",
            "bg-white dark:bg-gray-800",
            "border rounded-lg",
            "text-gray-900 dark:text-gray-100 text-sm",
            "placeholder:text-gray-400 dark:placeholder:text-gray-500",
            "focus:outline-none focus:ring-2 focus:border-transparent",
            "disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 dark:disabled:bg-gray-900",
            "transition-colors duration-150",
            "resize-none",
            error
              ? "border-red-500 focus:ring-red-500 dark:border-red-400 dark:focus:ring-red-400"
              : "border-gray-300 dark:border-gray-600 focus:ring-indigo-500 dark:focus:ring-indigo-400",
            className,
          ]
            .filter(Boolean)
            .join(" ")}
          {...props}
        />

        {(error || hint) && (
          <p
            className={[
              "mt-1.5 text-sm",
              error
                ? "text-red-600 dark:text-red-400"
                : "text-gray-500 dark:text-gray-400",
            ].join(" ")}
          >
            {error || hint}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  hint?: string;
  options: { value: string; label: string }[];
  placeholder?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    { label, error, hint, options, placeholder, id, className = "", ...props },
    ref
  ) => {
    const selectId = id || props.name;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={selectId}
            className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-1.5"
          >
            {label}
          </label>
        )}

        <select
          ref={ref}
          id={selectId}
          className={[
            "w-full px-3 py-2.5",
            "bg-white dark:bg-gray-800",
            "border rounded-lg",
            "text-gray-900 dark:text-gray-100 text-sm",
            "focus:outline-none focus:ring-2 focus:border-transparent",
            "disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 dark:disabled:bg-gray-900",
            "transition-colors duration-150",
            error
              ? "border-red-500 focus:ring-red-500 dark:border-red-400 dark:focus:ring-red-400"
              : "border-gray-300 dark:border-gray-600 focus:ring-indigo-500 dark:focus:ring-indigo-400",
            className,
          ]
            .filter(Boolean)
            .join(" ")}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {(error || hint) && (
          <p
            className={[
              "mt-1.5 text-sm",
              error
                ? "text-red-600 dark:text-red-400"
                : "text-gray-500 dark:text-gray-400",
            ].join(" ")}
          >
            {error || hint}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";

export { Input, Textarea, Select, type InputProps, type TextareaProps, type SelectProps };
