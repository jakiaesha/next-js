"use client";

import { createContext, ReactNode, useContext, useEffect, useRef, useState } from "react";
import type { Workout } from "../lib/workouts";

export const MAX_PLAN = 5;
type ListName = "plan" | "saved";

type PlanCtx = {
  plan: Workout[];
  saved: Workout[];
  doneIds: string[];
  hydrated: boolean;
  planFull: boolean;
  addToPlan: (w: Workout) => void;
  saveForLater: (w: Workout) => void;
  remove: (list: ListName, id: string) => void;
  markDone: (id: string) => void;
};

const Ctx = createContext<PlanCtx | null>(null);

export const usePlan = () => {
  const c = useContext(Ctx);
  if (!c) throw new Error("usePlan must be used inside <PlanProvider>");
  return c;
};

const read = <T,>(key: string): T[] => {
  try {
    return JSON.parse(localStorage.getItem(key) ?? "[]");
  } catch {
    return [];
  }
};

export function PlanProvider({ children }: { children: ReactNode }) {
  const [plan, setPlan] = useState<Workout[]>([]);
  const [saved, setSaved] = useState<Workout[]>([]);
  const [doneIds, setDoneIds] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
// load saved data after mount (avoids hydration errors)
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    setPlan(read<Workout>("fitlog-plan"));
    setSaved(read<Workout>("fitlog-saved"));
    setDoneIds(read<string>("fitlog-done"));
    setHydrated(true);
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */
 
  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem("fitlog-plan", JSON.stringify(plan));
    localStorage.setItem("fitlog-saved", JSON.stringify(saved));
    localStorage.setItem("fitlog-done", JSON.stringify(doneIds));
  }, [plan, saved, doneIds, hydrated]);

  const showToast = (msg: string) => {
    setToast(msg);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setToast(null), 2500);
  };

  const addToPlan = (w: Workout) => {
    if (plan.some((p) => p.id === w.id)) return showToast("Already in today's plan");
    if (plan.length >= MAX_PLAN) return showToast("Plan is full: 5 lifts max");
    setPlan([...plan, w]);
    showToast("Added to today's plan");
  };

  const saveForLater = (w: Workout) => {
    if (saved.some((s) => s.id === w.id)) return showToast("Already saved");
    setSaved([...saved, w]);
    showToast("Saved for later");
  };

  const remove = (list: ListName, id: string) => {
    if (list === "plan") {
      setPlan(plan.filter((w) => w.id !== id));
      setDoneIds(doneIds.filter((d) => d !== id));
      showToast("Removed from today's plan");
    } else {
      setSaved(saved.filter((w) => w.id !== id));
      showToast("Removed from saved");
    }
  };

  const markDone = (id: string) => {
    if (doneIds.includes(id)) return;
    setDoneIds([...doneIds, id]);
    showToast("Marked as done. Nice work!");
  };

  return (
    <Ctx.Provider
      value={{ plan, saved, doneIds, hydrated, planFull: plan.length >= MAX_PLAN, addToPlan, saveForLater, remove, markDone }}
    >
      {children}
      {toast && (
        <div
          role="status"
          className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full bg-[#ccff00] px-5 py-3 text-sm font-semibold text-black shadow-lg"
        >
          {toast}
        </div>
      )}
    </Ctx.Provider>
  );
}