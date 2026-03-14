"use client";

import * as React from "react";

// RoastButton Context para compartilhar estado entre sub-componentes
interface RoastButtonContextType {
  isButtonEnabled: boolean;
  isRoasting: boolean;
  handleRoast: () => void;
}

const RoastButtonContext = React.createContext<
  RoastButtonContextType | undefined
>(undefined);

// Hook para usar o contexto
function useRoastButton() {
  const context = React.useContext(RoastButtonContext);
  if (!context) {
    throw new Error("useRoastButton must be used within RoastButton");
  }
  return context;
}

// Root Component
interface RoastButtonRootProps {
  children: React.ReactNode;
  isButtonEnabled: boolean;
  isRoasting: boolean;
  handleRoast: () => void;
}

const RoastButtonRoot = React.forwardRef<
  HTMLButtonElement,
  RoastButtonRootProps
>(({ children, isButtonEnabled, isRoasting, handleRoast }, ref) => {
  return (
    <RoastButtonContext.Provider
      value={{ isButtonEnabled, isRoasting, handleRoast }}
    >
      <button
        ref={ref}
        type="button"
        onClick={handleRoast}
        disabled={!isButtonEnabled}
        className={`${
          isButtonEnabled
            ? "bg-accent-green text-[#0A0A0A] hover:bg-accent-green/90 cursor-pointer"
            : "bg-accent-green/30 text-text-tertiary cursor-not-allowed"
        } font-mono text-[13px] font-medium px-6 py-2.5 inline-flex items-center justify-center gap-2 transition-opacity`}
      >
        {children}
      </button>
    </RoastButtonContext.Provider>
  );
});
RoastButtonRoot.displayName = "RoastButtonRoot";

// Text Component
const RoastButtonText = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => {
  const { isRoasting } = useRoastButton();

  return (
    <span ref={ref} className={className} {...props}>
      {isRoasting ? "Roasting..." : "$ roast_my_code"}
    </span>
  );
});
RoastButtonText.displayName = "RoastButtonText";

export { RoastButtonRoot, RoastButtonText, useRoastButton };
