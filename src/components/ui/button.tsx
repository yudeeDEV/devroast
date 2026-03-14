import { type ButtonHTMLAttributes, forwardRef } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const buttonVariants = tv({
  base: "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-green disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  variants: {
    variant: {
      default: "bg-accent-green text-black hover:bg-accent-green-hover",
      secondary: "bg-secondary text-secondary-foreground",
      outline:
        "border border-border bg-card hover:bg-muted hover:text-foreground",
      ghost: "hover:bg-muted hover:text-foreground",
      destructive: "bg-destructive text-destructive-foreground",
      link: "text-foreground underline-offset-4 hover:underline",
    },
    size: {
      default: "h-10 px-6 py-2.5",
      sm: "h-9 px-3",
      lg: "h-11 px-8",
      icon: "h-10 w-10",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    return (
      <button
        className={buttonVariants({ variant, size, className })}
        ref={ref}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";

export { Button, buttonVariants };
