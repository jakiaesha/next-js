import Link from "next/link";

export default function NotFound() {
  return (
    <section className="grid min-h-[70vh] place-items-center px-4 text-center">
      <div>
        <p className="font-display text-8xl font-bold text-[#ccff00] sm:text-9xl">404</p>
        <h1 className="font-display mt-2 text-2xl font-bold uppercase">Page not found</h1>
        <p className="mt-2 text-white/60">That page doesn&apos;t exist. Head back to the library.</p>
        <Link
          href="/"
          className="mt-6 inline-block rounded-full bg-[#ccff00] px-6 py-2.5 text-sm font-semibold text-black"
        >
          Go to workouts
        </Link>
      </div>
    </section>
  );
}