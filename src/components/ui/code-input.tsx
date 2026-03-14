"use client";

import * as React from "react";
import { Card, CardContent } from "./card";

// CodeInput Context para compartilhar estado entre sub-componentes
interface CodeInputContextType {
  code: string;
  setCode: (code: string) => void;
  lineCount: number;
  isDefaultCode: boolean;
  isRoasting: boolean;
}

const CodeInputContext = React.createContext<CodeInputContextType | undefined>(
  undefined,
);

// Hook para usar o contexto
function useCodeInput() {
  const context = React.useContext(CodeInputContext);
  if (!context) {
    throw new Error("useCodeInput must be used within CodeInput");
  }
  return context;
}

// Root Component
interface CodeInputRootProps {
  children: React.ReactNode;
  code: string;
  setCode: (code: string) => void;
  lineCount: number;
  isDefaultCode: boolean;
  isRoasting: boolean;
}

const CodeInputRoot = React.forwardRef<HTMLDivElement, CodeInputRootProps>(
  ({ children, code, setCode, lineCount, isDefaultCode, isRoasting }, ref) => {
    const contextValue = React.useMemo(
      () => ({ code, setCode, lineCount, isDefaultCode, isRoasting }),
      [code, setCode, lineCount, isDefaultCode, isRoasting],
    );

    return (
      <CodeInputContext.Provider value={contextValue}>
        <Card
          ref={ref}
          className="bg-bg-input border-border-primary w-[780px] h-[360px] overflow-hidden"
        >
          <CardContent className="p-0 h-full flex flex-col">
            {children}
          </CardContent>
        </Card>
      </CodeInputContext.Provider>
    );
  },
);
CodeInputRoot.displayName = "CodeInputRoot";

// Window Header Component
const CodeInputHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={`h-10 border-b border-border-primary px-4 flex items-center gap-2 ${className}`}
    {...props}
  />
));
CodeInputHeader.displayName = "CodeInputHeader";

// Window Dots Component
const CodeInputDots = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={`flex gap-2 ${className}`} {...props}>
    <span className="w-3 h-3 rounded-full bg-[#EF4444]"></span>
    <span className="w-3 h-3 rounded-full bg-[#F59E0B]"></span>
    <span className="w-3 h-3 rounded-full bg-[#10B981]"></span>
  </div>
));
CodeInputDots.displayName = "CodeInputDots";

// Line Numbers Component
const CodeInputLineNumbers = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { lineCount } = useCodeInput();

  return (
    <div
      ref={ref}
      className={`line-numbers w-12 bg-bg-surface text-text-tertiary text-right px-3 py-4 select-none border-r border-border-primary overflow-hidden ${className}`}
      {...props}
    >
      {Array.from({ length: lineCount }, (_, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: stable index for static list
        <div key={i} className="h-5 leading-5">
          {i + 1}
        </div>
      ))}
    </div>
  );
});
CodeInputLineNumbers.displayName = "CodeInputLineNumbers";

// Textarea Component
const CodeInputTextarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => {
  const { code, setCode } = useCodeInput();

  // Sync textarea scroll with line numbers
  const handleScroll = (e: React.UIEvent<HTMLTextAreaElement>) => {
    const lineNumbersDiv = document.querySelector(".line-numbers");
    if (lineNumbersDiv) {
      (lineNumbersDiv as HTMLElement).scrollTop = e.currentTarget.scrollTop;
    }
  };

  return (
    <textarea
      ref={ref}
      className={`flex-1 bg-transparent text-text-primary p-4 resize-none focus:outline-none font-mono text-sm ${className}`}
      value={code}
      onChange={(e) => setCode(e.target.value)}
      onScroll={handleScroll}
      spellCheck={false}
      {...props}
    />
  );
});
CodeInputTextarea.displayName = "CodeInputTextarea";

// Content Component (combines line numbers and textarea)
const CodeInputContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={`flex flex-1 font-mono text-sm overflow-hidden ${className}`}
    {...props}
  />
));
CodeInputContent.displayName = "CodeInputContent";

export {
  CodeInputRoot,
  CodeInputHeader,
  CodeInputDots,
  CodeInputLineNumbers,
  CodeInputTextarea,
  CodeInputContent,
  useCodeInput,
};
