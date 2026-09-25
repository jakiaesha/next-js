"use client";

import { Suspense, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { usePlan } from "../context/PlanContext";
import { Check, Chevron, Clock, Flame, Star, X } from "../components/Icons";

type Tab = "plan" | "saved";
type Sort = "duration" | "calories" | "rating";

function MyPlanContent() {
  const { plan, saved, doneIds, hydrated, remove, markDone } = usePlan();
  const router = useRouter();
  const params = useSearchParams();
  const [sortBy, setSortBy] = useState<Sort>("duration");

  // The tab now comes from the URL: /my-plan or /my-plan?tab=saved
  const tab: Tab = params.get("tab") === "saved" ? "saved" : "plan";

  const list = tab === "plan" ? plan : saved;

  // duration/calories: low -> high, rating: high -> low
  const sorted = useMemo(
    () =>
      [...list].sort((a, b) =>
        sortBy === "rating" ? b.rating - a.rating : a[sortBy] - b[sortBy]
      ),
    [list, sortBy]
  );

  const minutes = plan.reduce((s, w) => s + w.duration, 0);
  const calories = plan.reduce((s, w) => s + w.calories, 0);

  const stats = [
    { label: "Exercises", value: plan.length },
    { label: "Minutes", value: minutes },
    { label: "Calories", value: calories },
  ];

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-8">
      <h1 className="font-display text-4xl font-bold uppercase">My Plan</h1>
      <p className="mt-2 text-sm text-white/60">
        Cap of five lifts for today. Finish them, then load more.
      </p>

      {/* Metrics */}
      <div className="mt-8 grid grid-cols-3 gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-5 sm:gap-6">
        {stats.map((s) => (
          <div key={s.label}>
            <p className="text-xs text-white/50">{s.label}</p>
            <p className="font-display mt-1 text-3xl font-bold text-[#ccff00] sm:text-4xl">
              {s.value}
            </p>
          </div>
        ))}
      </div>

      {/* Tabs + sort */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-1 rounded-full bg-white/5 p-1">
          {(["plan", "saved"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() =>
                router.push(t === "plan" ? "/my-plan" : "/my-plan?tab=saved", {
                  scroll: false,
                })
              }
              className={`rounded-full px-4 py-1.5 text-xs font-semibold ${
                tab === t ? "bg-[#ccff00] text-black" : "text-white/70"
              }`}
            >
              {t === "plan" ? "Today's Plan" : "Saved"}
            </button>
          ))}
        </div>

        <label className="flex items-center gap-2 text-xs text-white/60">
          Sort By
          <span className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as Sort)}
              className="appearance-none rounded-full border border-white/20 bg-[#0a0a0a] py-1.5 pl-4 pr-9 text-xs font-semibold text-white"
            >
              <option value="duration">Duration</option>
              <option value="calories">Calories</option>
              <option value="rating">Rating</option>
            </select>
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
              <Chevron />
            </span>
          </span>
        </label>
      </div>

      {/* List */}
      <div className="mt-6">
        {!hydrated ? (
          <p className="py-20 text-center text-white/60" role="status">
            Loading workouts...
          </p>
        ) : sorted.length === 0 ? (
          <div className="rounded-2xl border border-white/10 py-20 text-center">
            <h2 className="font-display text-2xl font-bold uppercase">
              Nothing here yet
            </h2>
            <p className="mt-2 text-sm text-white/60">
              Browse the library and add a lift to get today moving.
            </p>
            <Link
              href="/"
              className="mt-6 inline-block rounded-full bg-[#ccff00] px-6 py-2.5 text-sm font-semibold text-black"
            >
              Go to workouts
            </Link>
          </div>
        ) : (
          <ul className="space-y-3">
            {sorted.map((w) => {
              const done = doneIds.includes(w.id);
              return (
                <li
                  key={w.id}
                  className={`flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-3 sm:flex-row sm:items-center ${
                    done ? "opacity-60" : ""
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={w.image}
                    alt={w.name}
                    className="h-28 w-full rounded-xl object-cover sm:h-20 sm:w-32"
                  />

                  <div className="flex-1">
                    <h3 className="font-display text-base font-bold uppercase">
                      {w.name}
                    </h3>
                    <p className="text-xs text-white/50">{w.equipment}</p>
                    <div className="mt-2 flex gap-4 text-xs text-white/70">
                      <span className="flex items-center gap-1.5">
                        <Clock /> {w.duration} min
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Flame /> {w.calories} kcal
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Star /> {w.rating}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      href={`/workout/${w.id}`}
                      className="rounded-full border border-white/20 px-4 py-2 text-xs font-semibold hover:border-[#ccff00]"
                    >
                      View Details
                    </Link>

                    {tab === "plan" && (
                      <button
                        onClick={() => markDone(w.id)}
                        disabled={done}
                        className="inline-flex items-center gap-1.5 rounded-full bg-[#ccff00] px-4 py-2 text-xs font-semibold text-black disabled:opacity-50"
                      >
                        <Check /> {done ? "Done" : "Mark as Done"}
                      </button>
                    )}

                    <button
                      onClick={() => remove(tab, w.id)}
                      aria-label={`Remove ${w.name}`}
                      className="grid h-8 w-8 place-items-center rounded-full text-white/60 hover:bg-white/10 hover:text-white"
                    >
                      <X />
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}

// useSearchParams must be wrapped in Suspense for Next.js production builds
export default function MyPlanPage() {
  return (
    <Suspense fallback={null}>
      <MyPlanContent />
    </Suspense>
  );
}