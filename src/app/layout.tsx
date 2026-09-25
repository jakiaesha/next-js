import type { Metadata } from "next";
import { Oswald } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import { PlanProvider } from "./context/PlanContext";

const oswald = Oswald({ subsets: ["latin"], variable: "--font-oswald" });

export const metadata: Metadata = {
  title: "FitLog: Workout Library",
  description: "Pick a lift, lock it into today's plan, and log every set.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${oswald.variable} bg-[#0a0a0a] text-white antialiased`}>
        <PlanProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          {/* <Footer /> goes here */}
        </PlanProvider>
      </body>
    </html>
  );
}
