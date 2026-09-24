"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePlan } from "../context/PlanContext";

const links = [
  { href: "/", label: "Workouts" },
  { href: "/my-plan", label: "My Plan" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = usePlan();

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0a0a0a]/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-4 py-3 sm:px-8">
        {/* Left: logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="FitLog logo" width={28} height={28} />
          <span className="font-display hidden text-lg font-bold uppercase tracking-wide sm:inline">
            FitLog
          </span>
        </Link>

        {/* Middle: links */}
        <ul className="flex items-center gap-1 sm:gap-3">
          {links.map((l) => {
            const active = pathname === l.href;
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold transition sm:text-sm ${
                    active ? "bg-[#ccff00]/15 text-[#ccff00]" : "text-white/70 hover:text-white"
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Right: badges (both go to /my-plan) */}
        <div className="flex items-center gap-3 text-xs text-white/80">
          <Link href="/my-plan" className="flex items-center gap-1.5">
            Plan
            <span className="grid h-5 min-w-5 place-items-center rounded-full bg-[#ccff00] px-1.5 text-[11px] font-bold text-black">
              {plan.length}
            </span>
          </Link>
          <Link href="/my-plan" className="flex items-center gap-1.5">
            Saved
            <span className="grid h-5 min-w-5 place-items-center rounded-full border border-white/40 px-1.5 text-[11px] font-bold">
              {saved.length}
            </span>
          </Link>
        </div>
      </nav>
    </header>
  );
}