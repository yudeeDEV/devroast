"use client";

import * as React from "react";

// Leaderboard Context para compartilhar estado entre sub-componentes
interface LeaderboardContextType {
  showViewAllLink?: boolean;
}

const LeaderboardContext = React.createContext<
  LeaderboardContextType | undefined
>(undefined);

// Hook para usar o contexto
function useLeaderboard() {
  const context = React.useContext(LeaderboardContext);
  if (!context) {
    throw new Error("useLeaderboard must be used within Leaderboard");
  }
  return context;
}

// Root Component
interface LeaderboardRootProps {
  children: React.ReactNode;
  showViewAllLink?: boolean;
}

const LeaderboardRoot = React.forwardRef<HTMLDivElement, LeaderboardRootProps>(
  ({ children, showViewAllLink = true }, ref) => {
    return (
      <LeaderboardContext.Provider value={{ showViewAllLink }}>
        <div ref={ref} className="w-[960px] mt-16">
          {children}
        </div>
      </LeaderboardContext.Provider>
    );
  },
);
LeaderboardRoot.displayName = "LeaderboardRoot";

// Title Row Component
const LeaderboardTitleRow = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={`flex justify-between items-center mb-6 ${className}`}
    {...props}
  />
));
LeaderboardTitleRow.displayName = "LeaderboardTitleRow";

// Title Component
const LeaderboardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={`flex items-center gap-2 ${className}`}
    {...props}
  />
));
LeaderboardTitle.displayName = "LeaderboardTitle";

// Title Slash Component
const LeaderboardTitleSlash = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    className={`text-accent-green font-bold text-sm font-mono ${className}`}
    {...props}
  >
    {"//"}
  </span>
));
LeaderboardTitleSlash.displayName = "LeaderboardTitleSlash";

// Title Text Component
const LeaderboardTitleText = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    className={`text-text-primary font-bold text-sm font-mono ${className}`}
    {...props}
  />
));
LeaderboardTitleText.displayName = "LeaderboardTitleText";

// View All Link Component
const LeaderboardViewAllLink = React.forwardRef<
  HTMLAnchorElement,
  React.AnchorHTMLAttributes<HTMLAnchorElement>
>(({ className, ...props }, ref) => {
  const { showViewAllLink } = useLeaderboard();

  if (!showViewAllLink) return null;

  return (
    <a
      ref={ref}
      href="#leaderboard"
      className={`flex items-center gap-1 px-3 py-1.5 border border-border-primary hover:bg-bg-elevated cursor-pointer text-white ${className}`}
      {...props}
    >
      $ view_all {">>"}
    </a>
  );
});
LeaderboardViewAllLink.displayName = "LeaderboardViewAllLink";

// Subtitle Component
const LeaderboardSubtitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={`text-text-tertiary font-secondary text-sm mb-4 ${className}`}
    {...props}
  />
));
LeaderboardSubtitle.displayName = "LeaderboardSubtitle";

// Table Component
const LeaderboardTable = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={`border border-border-primary ${className}`}
    {...props}
  />
));
LeaderboardTable.displayName = "LeaderboardTable";

// Table Header Component
const LeaderboardTableHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={`flex items-center h-10 bg-bg-surface border-b border-border-primary px-5 ${className}`}
    {...props}
  />
));
LeaderboardTableHeader.displayName = "LeaderboardTableHeader";

// Table Header Cell Component
const LeaderboardTableHeaderCell = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { width?: string }
>(({ className, width, ...props }, ref) => {
  const widthClass = width ? `${width} ` : "flex-1 ";
  return (
    <div
      ref={ref}
      className={`${widthClass}text-text-tertiary font-mono text-xs font-medium ${className}`}
      {...props}
    />
  );
});
LeaderboardTableHeaderCell.displayName = "LeaderboardTableHeaderCell";

// Table Row Component
const LeaderboardTableRow = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={`border-b border-border-primary px-5 py-4 ${className}`}
    {...props}
  />
));
LeaderboardTableRow.displayName = "LeaderboardTableRow";

// Table Row Last Component (no bottom border)
const LeaderboardTableRowLast = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={`px-5 py-4 ${className}`} {...props} />
));
LeaderboardTableRowLast.displayName = "LeaderboardTableRowLast";

// Table Cell Component
const LeaderboardTableCell = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { width?: string }
>(({ className, width, ...props }, ref) => (
  <div ref={ref} className={`${width || "flex-1"} ${className}`} {...props} />
));
LeaderboardTableCell.displayName = "LeaderboardTableCell";

// Table Rank Cell Component
const LeaderboardRankCell = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={`w-12 ${className}`} {...props} />
));
LeaderboardRankCell.displayName = "LeaderboardRankCell";

// Table Score Cell Component
const LeaderboardScoreCell = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={`w-16 ${className}`} {...props} />
));
LeaderboardScoreCell.displayName = "LeaderboardScoreCell";

// Table Code Cell Component
const LeaderboardCodeCell = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={`flex-1 flex flex-col gap-1 ${className}`}
    {...props}
  />
));
LeaderboardCodeCell.displayName = "LeaderboardCodeCell";

// Table Lang Cell Component
const LeaderboardLangCell = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={`w-24 ${className}`} {...props} />
));
LeaderboardLangCell.displayName = "LeaderboardLangCell";

// Code Line Component
const LeaderboardCodeLine = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    className={`text-text-primary font-mono text-xs ${className}`}
    {...props}
  />
));
LeaderboardCodeLine.displayName = "LeaderboardCodeLine";

// Comment Line Component
const LeaderboardCommentLine = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    className={`text-[#8B8B8B] font-mono text-xs ${className}`}
    {...props}
  />
));
LeaderboardCommentLine.displayName = "LeaderboardCommentLine";

// Footer Component
const LeaderboardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={`flex justify-center items-center h-12 mt-2 ${className}`}
    {...props}
  />
));
LeaderboardFooter.displayName = "LeaderboardFooter";

// Footer Text Component
const LeaderboardFooterText = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={`text-text-tertiary font-secondary text-xs ${className}`}
    {...props}
  />
));
LeaderboardFooterText.displayName = "LeaderboardFooterText";

// Footer Link Component
const LeaderboardFooterLink = React.forwardRef<
  HTMLAnchorElement,
  React.AnchorHTMLAttributes<HTMLAnchorElement>
>(({ className, ...props }, ref) => (
  <a
    ref={ref}
    href="#leaderboard"
    className={`text-text-secondary font-mono text-xs hover:text-accent-green cursor-pointer ${className}`}
    {...props}
  />
));
LeaderboardFooterLink.displayName = "LeaderboardFooterLink";

export {
  LeaderboardRoot,
  LeaderboardTitleRow,
  LeaderboardTitle,
  LeaderboardTitleSlash,
  LeaderboardTitleText,
  LeaderboardViewAllLink,
  LeaderboardSubtitle,
  LeaderboardTable,
  LeaderboardTableHeader,
  LeaderboardTableHeaderCell,
  LeaderboardTableRow,
  LeaderboardTableRowLast,
  LeaderboardTableCell,
  LeaderboardRankCell,
  LeaderboardScoreCell,
  LeaderboardCodeCell,
  LeaderboardLangCell,
  LeaderboardCodeLine,
  LeaderboardCommentLine,
  LeaderboardFooter,
  LeaderboardFooterText,
  LeaderboardFooterLink,
  useLeaderboard,
};
