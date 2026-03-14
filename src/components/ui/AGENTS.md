# Padrões de Componentes UI

Baseado no componente Button existente em `button.tsx`.

## Estrutura de Arquivos

```
src/components/ui/
├── button.tsx
├── index.ts
└── AGENTS.md
```

## Padrão de Componente

### 1. Imports

```tsx
import { type ButtonHTMLAttributes, forwardRef } from "react";
import { tv, type VariantProps } from "tailwind-variants";
```

### 2. Definição de Variantes (tv)

```tsx
const buttonVariants = tv({
  base: "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  variants: {
    variant: {
      default: "bg-emerald-500 text-zinc-950 hover:bg-emerald-600",
      secondary: "bg-zinc-100 text-zinc-900 hover:bg-zinc-200",
      outline: "border border-zinc-200 bg-white hover:bg-zinc-100 hover:text-zinc-900",
      ghost: "hover:bg-zinc-100 hover:text-zinc-900",
      destructive: "bg-red-500 text-zinc-50 hover:bg-red-600",
      link: "text-zinc-900 underline-offset-4 hover:underline",
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
```

### 3. Props Interface

```tsx
export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}
```

### 4. Componente com forwardRef

```tsx
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
```

### 5. Exports no index.ts

```tsx
export type { ButtonProps } from "./button";
export { Button, buttonVariants } from "./button";
```

## Convenções

- Usar **camelCase** para variáveis e funções
- Nome do arquivo em **kebab-case** (ex: `input.tsx`, `card.tsx`)
- Componente em **PascalCase**
- Variantes em **camelCase** com sufixo `Variants`
- Sempre usar `clsx` + `tailwind-merge` se precisar de utilitários extras
