"use client";

import { useEffect, useState } from "react";
import { notFound, useParams } from "next/navigation";
import { API_URL, normalize, type Workout } from "../../lib/workouts";
import { usePlan } from "../../context/PlanContext";
import { Bookmark, Plus } from "../../components/Icons";

export default function WorkoutDetails() {
  const { id } = useParams<{ id: string }>();
  const { plan, planFull, addToPlan, saveForLater } = usePlan();
  const [w, setW] = useState<Workout | null>(null);
  const [status, setStatus] = useState<"loading" | "ok" | "missing" | "error">("loading");

  useEffect(() => {
    const c = new AbortController();
    
    fetch(`${API_URL}/${id}`, { signal: c.signal })
      .then(async (res) => {
        if (res.status === 404) return setStatus("missing");
        if (!res.ok) throw new Error("bad response");
        const json = await res.json();
        const item = json?.data ?? json;
        if (!item || Object.keys(item).length === 0) return setStatus("missing");
        setW(normalize({ ...item, id: item.id ?? item._id ?? id }));
        setStatus("ok");
      })
      .catch((e) => {
        if (e.name !== "AbortError") setStatus("error");
      });
    return () => c.abort();
  }, [id]);

  if (status === "missing") notFound(); // shows the 404 page

  if (status === "loading")
    return (
      <div className="grid min-h-[60vh] place-items-center" role="status">
        <span className="h-10 w-10 animate-spin rounded-full border-4 border-[#ccff00] border-t-transparent" />
      </div>
    );

  if (status === "error" || !w)
    return <p className="p-16 text-center text-red-300">Could not load this workout. Try again.</p>;

  const inPlan = plan.some((p) => p.id === w.id);
  const specs: [string, string | number][] = [
    ["Equipment", w.equipment],
    ["Difficulty", w.difficulty],
    ["Sets", w.sets],
    ["Reps", w.reps],
    ["Duration", `${w.duration} min`],
    ["Calories", `${w.calories} kcal`],
    ["Rating", w.rating],
  ];

  return (
    <section className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-8 lg:grid-cols-2">
      {/* Left: media */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={w.image} alt={w.name} className="max-h-[640px] w-full rounded-2xl object-cover" />

      {/* Right: details */}
      <div>
        <h1 className="font-display text-3xl font-bold uppercase sm:text-4xl">{w.name}</h1>
        <p className="mt-3 text-white/70">{w.description}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {w.categories.map((c) => (
            <span key={c} className="rounded-full bg-[#ccff00] px-3 py-1 text-xs font-bold text-black">
              {c}
            </span>
          ))}
        </div>

        <dl className="mt-6 divide-y divide-white/10 rounded-xl border border-white/10 bg-white/[0.04] px-5">
          {specs.map(([label, value]) => (
            <div key={label} className="flex justify-between py-3 text-sm">
              <dt className="text-xs font-bold uppercase tracking-wide text-white/50">{label}</dt>
              <dd className="font-semibold">{value}</dd>
            </div>
          ))}
        </dl>

        <h2 className="font-display mt-8 text-lg font-bold uppercase">Instructions</h2>
        <ol className="mt-3 space-y-2 text-sm text-white/80">
          {w.instructions.map((s, i) => (
            <li key={i}>
              <span className="mr-2 font-bold text-[#ccff00]">{i + 1}.</span>
              {s}
            </li>
          ))}
        </ol>

        <div className="mt-8 flex flex-wrap gap-3">
          <button
            onClick={() => addToPlan(w)}
            disabled={!inPlan && planFull}
            title={!inPlan && planFull ? "Plan is full (5 lifts)" : undefined}
            className="inline-flex items-center gap-2 rounded-full bg-[#ccff00] px-6 py-3 text-sm font-semibold text-black disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Plus /> Add to today&apos;s plan
          </button>
          <button
            onClick={() => saveForLater(w)}
            className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-semibold hover:border-[#ccff00]"
          >
            <Bookmark /> Save for later
          </button>
        </div>
      </div>
    </section>
  );
}