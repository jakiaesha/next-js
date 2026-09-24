"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { API_URL, normalize, type Workout } from "../lib/workouts";

const DETAILS_PATH = "/workout"; 
const ClockIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const FlameIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2s5 4.5 5 9.5A5 5 0 0 1 12 17a5 5 0 0 1-5-5.5c0-1.6.7-3 1.5-4 .3 1.2 1 2 2 2C10.5 7 12 2 12 2Z" />
  </svg>
);
const StarIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path
      d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9L12 3Z"
      strokeLinejoin="round"
    />
  </svg>
);

function LibrarySkeleton() {
  return (
    <div role="status" aria-label="Loading workouts">
      <div className="mb-8 flex items-center justify-center gap-3 text-[#ccff00]">
        <span className="h-6 w-6 animate-spin rounded-full border-2 border-[#ccff00] border-t-transparent" />
        <span className="text-sm uppercase tracking-widest">Loading workouts...</span>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="animate-pulse overflow-hidden rounded-2xl bg-white/5">
            <div className="h-48 bg-white/10" />
            <div className="space-y-3 p-5">
              <div className="h-4 w-24 rounded bg-white/10" />
              <div className="h-5 w-3/4 rounded bg-white/10" />
              <div className="h-3 w-1/2 rounded bg-white/10" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function WorkoutCard({ w }: { w: Workout }) {
  return (
    <Link
      href={`${DETAILS_PATH}/${w.id}`}
      className="group block overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] transition hover:-translate-y-1 hover:border-[#ccff00]/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#ccff00]"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={w.image} alt={w.name} loading="lazy" className="h-48 w-full object-cover sm:h-52" />

      <div className="p-5">
        <div className="mb-3 flex flex-wrap gap-2">
          {w.categories.map((c) => (
            <span
              key={c}
              className="rounded-full bg-[#ccff00] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-black"
            >
              {c}
            </span>
          ))}
        </div>

        <h3 className="font-[Oswald,sans-serif] text-lg font-bold uppercase leading-tight text-white">
          {w.name}
        </h3>
        <p className="mt-1 text-xs text-white/50">{w.equipment}</p>

        <div className="mt-4 flex items-center gap-4 text-xs text-white/70">
          <span className="flex items-center gap-1.5">
            <ClockIcon /> {w.duration} min
          </span>
          <span className="flex items-center gap-1.5">
            <FlameIcon /> {w.calories} kcal
          </span>
          <span className="flex items-center gap-1.5">
            <StarIcon /> {w.rating}
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function Library() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      try {
        const res = await fetch(API_URL, { signal: controller.signal });
        if (!res.ok) throw new Error(`Request failed (${res.status})`);
        const json = await res.json();
        const list = Array.isArray(json)
          ? json
          : json.data ?? json.workouts ?? json.exercises ?? [];
        setWorkouts(list.map(normalize));
      } catch (e) {
        if ((e as Error).name !== "AbortError") {
          setError("Could not load workouts. Please try again.");
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    load();
    return () => controller.abort();
  }, []);

  return (
    <section id="library" className="scroll-mt-20 px-4 py-16 sm:px-8 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <h2 className="font-[Oswald,sans-serif] text-4xl font-bold uppercase text-white">
          The Library
        </h2>
        <p className="mb-10 mt-2 text-sm text-white/60">
          Twelve lifts covering every major muscle group.
        </p>

        {loading && <LibrarySkeleton />}

        {!loading && error && (
          <p className="rounded-xl border border-red-500/40 bg-red-500/10 p-6 text-center text-red-300">
            {error}
          </p>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {workouts.map((w) => (
              <WorkoutCard key={w.id} w={w} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}