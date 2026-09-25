export const API_URL = "https://api.abcz.workers.dev/api/fitlog"; // confirm this

export type Workout = {
  id: string;
  name: string;
  image: string;
  description: string;
  categories: string[];
  equipment: string;
  difficulty: string;
  sets: string | number;
  reps: string | number;
  duration: number;
  calories: number;
  rating: number;
  instructions: string[];
};

const list = (v: unknown): string[] =>
  Array.isArray(v) ? v.map(String) : v ? String(v).split(",").map((s) => s.trim()) : [];
const steps = (v: unknown): string[] =>
  Array.isArray(v) ? v.map(String) : v ? String(v).split("\n").filter(Boolean) : [];
const num = (v: unknown) => parseFloat(String(v)) || 0;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const normalize = (w: any): Workout => ({
  id: String(w.id ?? w._id),
  name: w.name ?? w.title ?? "",
  image: w.image ?? w.img ?? w.thumbnail ?? w.imageUrl ?? "",
  description: w.description ?? w.subtitle ?? w.summary ?? "",
  categories: list(w.categories ?? w.category ?? w.tags ?? w.muscleGroups),
  equipment: list(w.equipment).join(", "),
  difficulty: w.difficulty ?? w.level ?? "",
  sets: w.sets ?? "",
  reps: w.reps ?? "",
  duration: num(w.duration ?? w.minutes),
  calories: Number(w.calories ?? w.kcal ?? w.calorie ?? 0),
  rating: num(w.rating),
  instructions: steps(w.instructions ?? w.steps),
});