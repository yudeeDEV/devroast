import { forwardRef } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const inputVariants = tv({
  base: "flex h-10 w-full rounded-md border bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  variants: {
    variant: {
      default: "border-input text-foreground hover:border-border-focus",
      error: "border-destructive text-foreground",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={inputVariants({ variant, className })}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input, inputVariants };
