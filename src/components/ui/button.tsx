import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline";
  size?: "default" | "sm";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background",
          {
            "bg-primary text-primary-foreground hover:bg-primary/90 h-10 py-2 px-4":
              variant === "default" && size === "default",
            "bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-3":
              variant === "default" && size === "sm",
            "border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 py-2 px-4":
              variant === "outline" && size === "default",
            "border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3":
              variant === "outline" && size === "sm",
          },
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
