import Image from "next/image";
import { ArrowDown } from "./HeroArrow";

export default function Hero() {
  return (
    <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 sm:px-8 md:grid-cols-2 lg:py-20">
      <div>
        <p className="mb-4 inline-block rounded bg-[#ccff00] px-3 py-1 text-xs font-bold uppercase tracking-widest text-black">
          Workout Library
        </p>
        <h1 className="font-display text-4xl font-bold uppercase leading-[1.05] sm:text-5xl lg:text-6xl">
          Train with intent. Log every set.
        </h1>
        <p className="mt-5 max-w-md text-white/70">
          FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today&apos;s plan,
          and watch the week&apos;s work add up.
        </p>
        <a
          href="#library"
          className="mt-8 inline-flex items-center gap-2 bg-[#ccff00] px-6 py-3 font-semibold uppercase text-black"
        >
          Browse Workouts <ArrowDown />
        </a>
      </div>

      <div className="relative h-80 w-full md:h-[530px]">
        <Image src="/banner.png" alt="Workout banner" fill priority className="rounded-2xl object-cover" />
      </div>
    </section>
  );
}