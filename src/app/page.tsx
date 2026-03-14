"use client";

import { useEffect, useRef, useState } from "react";
import {
  CodeInputContent,
  CodeInputDots,
  CodeInputHeader,
  CodeInputLineNumbers,
  CodeInputRoot,
  CodeInputTextarea,
  LeaderboardCodeCell,
  LeaderboardCodeLine,
  LeaderboardCommentLine,
  LeaderboardFooter,
  LeaderboardFooterLink,
  LeaderboardFooterText,
  LeaderboardLangCell,
  LeaderboardRankCell,
  LeaderboardRoot,
  LeaderboardScoreCell,
  LeaderboardSubtitle,
  LeaderboardTable,
  LeaderboardTableHeader,
  LeaderboardTableHeaderCell,
  LeaderboardTableRow,
  LeaderboardTableRowLast,
  LeaderboardTitle,
  LeaderboardTitleRow,
  LeaderboardTitleSlash,
  LeaderboardTitleText,
  LeaderboardViewAllLink,
  RoastButtonRoot,
  RoastButtonText,
  Toggle,
} from "@/components/ui";

export default function HomePage() {
  const [code, setCode] = useState(`function calculateTotal(items) {
  var total = 0;
  for (var i = 0; i < items.length; i++) {
    total = total + items[i].price;
  }
  if (total > 100) {
    total = total * 0.9;
  }
  // TODO: handle tax calculation
  // TODO: handle currency conversion
  return total;
}`);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [lineCount, setLineCount] = useState(16);
  const [roastResult, setRoastResult] = useState<string | null>(null);
  const [isRoasting, setIsRoasting] = useState(false);

  // Update line count based on code
  useEffect(() => {
    const lines = code.split("\n").length;
    setLineCount(Math.max(lines, 16));
  }, [code]);

  // Handle roast submission
  const handleRoast = async () => {
    if (!code.trim()) return;

    setIsRoasting(true);
    setRoastResult(null);

    try {
      // Simulate API call for roast
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Generate a simple roast based on code analysis
      const lines = code.split("\n").length;
      const hasComments = code.includes("//") || code.includes("/*");
      const hasTODO = code.includes("TODO");
      const hasEval = code.includes("eval(");
      const hasSQL = code.includes("SELECT") || code.includes("INSERT");

      let roast = "🔥 ";

      if (hasEval) {
        roast +=
          "Whoa there! Using eval() is like inviting a stranger into your house and hoping they don't bring malware. Brave, but reckless!";
      } else if (hasSQL && !code.includes("parameterized")) {
        roast +=
          "SQL injection vulnerability detected! Your database is crying tears of SQL.";
      } else if (hasTODO) {
        roast +=
          "TODOs in code are like promises we make to ourselves on New Year's Eve - they never get done!";
      } else if (lines < 3) {
        roast +=
          "This code is shorter than my attention span. Add some substance!";
      } else if (!hasComments) {
        roast +=
          "Code without comments is like a book without a title. Good luck figuring out what it does in 6 months!";
      } else {
        roast +=
          "Not bad, but could be more interesting. Try adding some spaghetti code for extra flavor! 🍝";
      }

      setRoastResult(roast);
    } catch {
      setRoastResult("Error generating roast. Please try again.");
    } finally {
      setIsRoasting(false);
    }
  };

  const defaultCode = `function calculateTotal(items) {
  var total = 0;
  for (var i = 0; i < items.length; i++) {
    total = total + items[i].price;
  }
  if (total > 100) {
    total = total * 0.9;
  }
  // TODO: handle tax calculation
  // TODO: handle currency conversion
  return total;
}`;

  const isDefaultCode = code === defaultCode;
  const isButtonEnabled = Boolean(code.trim() && !isDefaultCode && !isRoasting);

  return (
    <div className="min-h-screen bg-bg-page overflow-x-hidden">
      {/* Navbar */}
      <nav className="h-14 w-full bg-bg-page border-b border-border-primary px-10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-accent-green font-bold text-lg font-mono">
            {">"}
          </span>
          <span className="text-text-primary font-medium text-base font-mono">
            devroast
          </span>
        </div>
        <div className="flex items-center gap-6">
          <a
            href="#leaderboard"
            className="text-text-secondary text-sm font-mono font-normal"
          >
            leaderboard
          </a>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex flex-col items-center px-10 py-20 gap-8">
        {/* Hero Section */}
        <div className="flex flex-col items-center gap-3">
          <div className="flex items-center justify-center gap-3">
            <span className="text-accent-green font-bold text-[36px] font-mono">
              $
            </span>
            <h1 className="text-text-primary font-bold text-[36px] font-mono">
              paste your code. get roasted.
            </h1>
          </div>
          <p className="text-text-secondary font-secondary text-sm text-center">
            {
              "// drop your code below and we'll rate it — brutally honest or full roast mode"
            }
          </p>
        </div>

        {/* Code Input Area - Using Compound Component Pattern */}
        <CodeInputRoot
          code={code}
          setCode={setCode}
          lineCount={lineCount}
          isDefaultCode={isDefaultCode}
          isRoasting={isRoasting}
        >
          <CodeInputHeader>
            <CodeInputDots />
          </CodeInputHeader>
          <CodeInputContent>
            <CodeInputLineNumbers />
            <CodeInputTextarea
              ref={textareaRef}
              placeholder="// paste your code here..."
            />
          </CodeInputContent>
        </CodeInputRoot>

        {/* Action Area */}
        <div className="flex justify-between items-center w-[780px]">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Toggle />
              <span className="text-accent-green font-mono text-sm">
                roast mode
              </span>
            </div>
            <span className="text-text-tertiary font-secondary text-xs">
              {"// maximum sarcasm enabled"}
            </span>
          </div>
          <RoastButtonRoot
            isButtonEnabled={isButtonEnabled}
            isRoasting={isRoasting}
            handleRoast={handleRoast}
          >
            <RoastButtonText />
          </RoastButtonRoot>
        </div>

        {/* Roast Result */}
        {roastResult && (
          <div className="w-[780px] mt-6 p-4 bg-bg-elevated border border-border-primary rounded-md">
            <p className="text-text-primary font-mono text-sm">{roastResult}</p>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-center gap-6 w-full mt-16 pt-8 border-t border-border-primary">
          <p className="text-text-tertiary font-secondary text-xs">
            2,847 codes roasted
          </p>
          <span className="text-text-tertiary font-mono text-xs">·</span>
          <p className="text-text-tertiary font-secondary text-xs">
            avg score: 4.2/10
          </p>
        </div>

        {/* Leaderboard Preview Section - Using Compound Component Pattern */}
        <LeaderboardRoot showViewAllLink>
          <LeaderboardTitleRow>
            <LeaderboardTitle>
              <LeaderboardTitleSlash />
              <LeaderboardTitleText>shame_leaderboard</LeaderboardTitleText>
            </LeaderboardTitle>
            <LeaderboardViewAllLink />
          </LeaderboardTitleRow>

          <LeaderboardSubtitle>
            {"// the worst code on the internet, ranked by shame"}
          </LeaderboardSubtitle>

          <LeaderboardTable>
            <LeaderboardTableHeader>
              <LeaderboardTableHeaderCell width="w-12">
                #
              </LeaderboardTableHeaderCell>
              <LeaderboardTableHeaderCell width="w-16">
                score
              </LeaderboardTableHeaderCell>
              <LeaderboardTableHeaderCell>code</LeaderboardTableHeaderCell>
              <LeaderboardTableHeaderCell width="w-24">
                lang
              </LeaderboardTableHeaderCell>
            </LeaderboardTableHeader>

            <LeaderboardTableRow>
              <LeaderboardRankCell>
                <div className="text-accent-amber font-mono text-xs">1</div>
              </LeaderboardRankCell>
              <LeaderboardScoreCell>
                <div className="text-accent-red font-mono text-xs font-bold">
                  1.2
                </div>
              </LeaderboardScoreCell>
              <LeaderboardCodeCell>
                <LeaderboardCodeLine>
                  eval(prompt("enter code"))
                </LeaderboardCodeLine>
                <LeaderboardCodeLine>
                  document.write(response)
                </LeaderboardCodeLine>
                <LeaderboardCommentLine>
                  {"// trust the user lol"}
                </LeaderboardCommentLine>
              </LeaderboardCodeCell>
              <LeaderboardLangCell>
                <div className="text-text-secondary font-mono text-xs">
                  javascript
                </div>
              </LeaderboardLangCell>
            </LeaderboardTableRow>

            <LeaderboardTableRow>
              <LeaderboardRankCell>
                <div className="text-text-secondary font-mono text-xs">2</div>
              </LeaderboardRankCell>
              <LeaderboardScoreCell>
                <div className="text-accent-red font-mono text-xs font-bold">
                  1.8
                </div>
              </LeaderboardScoreCell>
              <LeaderboardCodeCell>
                <LeaderboardCodeLine>
                  if (x == true) {"{"} return true; {"}"}
                </LeaderboardCodeLine>
                <LeaderboardCodeLine>
                  else if (x == false) {"{"} return false; {"}"}
                </LeaderboardCodeLine>
                <LeaderboardCodeLine>
                  else {"{"} return !false; {"}"}
                </LeaderboardCodeLine>
              </LeaderboardCodeCell>
              <LeaderboardLangCell>
                <div className="text-text-secondary font-mono text-xs">
                  typescript
                </div>
              </LeaderboardLangCell>
            </LeaderboardTableRow>

            <LeaderboardTableRowLast>
              <LeaderboardRankCell>
                <div className="text-text-secondary font-mono text-xs">3</div>
              </LeaderboardRankCell>
              <LeaderboardScoreCell>
                <div className="text-accent-red font-mono text-xs font-bold">
                  2.1
                </div>
              </LeaderboardScoreCell>
              <LeaderboardCodeCell>
                <LeaderboardCodeLine>
                  SELECT * FROM users WHERE 1=1
                </LeaderboardCodeLine>
                <LeaderboardCommentLine>
                  {"-- TODO: add authentication"}
                </LeaderboardCommentLine>
              </LeaderboardCodeCell>
              <LeaderboardLangCell>
                <div className="text-text-secondary font-mono text-xs">sql</div>
              </LeaderboardLangCell>
            </LeaderboardTableRowLast>
          </LeaderboardTable>

          <LeaderboardFooter>
            <LeaderboardFooterText>
              showing top 3 of 2,847 ·{" "}
              <LeaderboardFooterLink>
                view full leaderboard {">>"}
              </LeaderboardFooterLink>
            </LeaderboardFooterText>
          </LeaderboardFooter>
        </LeaderboardRoot>
      </main>
    </div>
  );
}
