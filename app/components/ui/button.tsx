import * as React from "react";
// Simple cn utility for merging class names
function cn(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(" ");
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none px-4 py-2",
          variant === "default"
            ? "bg-black text-white hover:bg-gray-900"
            : "border border-black bg-white text-black hover:bg-gray-100",
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
