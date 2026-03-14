import Link from "next/link";

export function Navbar() {
  return (
    <nav className="h-14 bg-[#0A0A0A] border-b border-[#2A2A2A] px-10 flex items-center justify-between">
      <Link href="/" className="flex items-center gap-2">
        <span className="text-[#10B981] font-bold text-xl">$</span>
        <span className="text-[#E5E5E5] font-medium">devroast</span>
      </Link>
      <div className="flex items-center gap-6">
        <span className="text-[#A3A3A3] text-sm">leaderboard</span>
      </div>
    </nav>
  );
}
