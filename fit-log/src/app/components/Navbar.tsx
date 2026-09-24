"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import logo from "../../assets/logo.png";

const navLinks = [
  { name: "Workouts", href: "/" },
  { name: "My Plan", href: "/my-plan" },
];

export default function Navbar({ planCount = 0, savedCount = 0 }: { planCount?: number; savedCount?: number }) {
  const pathname = usePathname();

 return (
  <nav className="w-full bg-black text-white px-6 py-4">
    <div className="max-w-7xl mx-auto flex items-center justify-between">
     
      <Link href="/" className="flex items-center gap-2 font-bold text-lg tracking-wide">
        <Image src="/logo.png" alt="FitLog logo" width={24} height={24} />
        FITLOG
      </Link>

     
      <div className="flex items-center gap-8 text-sm font-medium">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={
                isActive
                  ? "text-[#ccff00]"
                  : "text-white/80 hover:text-white transition-colors"
              }
            >
              {link.name}
            </Link>
          );
        })}
      </div>

      
      <div className="flex items-center gap-3 text-xs font-semibold">
        <Link
          href="/my-plan"
          className="px-3 py-1 rounded-full bg-[#ccff00] text-black"
        >
          Plan {planCount}
        </Link>
        <Link
          href="/my-plan"
          className="px-3 py-1 rounded-full border border-white/40 text-white"
        >
          Saved {savedCount}
        </Link>
      </div>
    </div>
  </nav>
);
}