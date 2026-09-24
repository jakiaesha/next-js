import Image from "next/image";

export default function Hero() {
  return (
    <section className="w-full bg-black text-white px-6 py-16 md:py-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Left: text content */}
        <div>
          <p className="text-[#ccff00] text-sm font-semibold tracking-widest mb-4">
            WORKOUT LIBRARY
          </p>

          <h1 className="font-oswald uppercase font-bold text-4xl md:text-5xl lg:text-6xl leading-tight mb-6">
            Train With Intent.
            <br />
            Log Every Set.
          </h1>

          <p className="text-white/70 text-base md:text-lg mb-8 max-w-md">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today&apos;s plan, and watch the week&apos;s work add up.
          </p>

          <a
            href="#library"
            className="inline-flex items-center gap-2 bg-[#ccff00] text-black font-semibold px-6 py-3 rounded-full hover:bg-[#b8e600] transition-colors"
          >
            Browse Workouts
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>

        {/* Right: banner image */}
        <div className="relative w-full h-80 md:h-[420px]">
          <Image
            src="/banner.png"
            alt="Workout banner"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>
    </section>
  );
}