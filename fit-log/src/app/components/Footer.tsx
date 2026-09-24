import Image from "next/image";
import logo from "../../../public/logo.png"; // adjust path if needed

export default function Footer() {
  return (
    <footer className="w-full bg-black border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Left: brand logo + FITLOG */}
        <div className="flex items-center gap-2">
          <Image src={logo} alt="FitLog logo" className="w-5 h-5" />
          <span className="text-white font-bold tracking-wide text-lg">
            FITLOG
          </span>
        </div>

        {/* Right: copyright line */}
        <p className="text-white/50 text-sm italic text-center sm:text-right">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}