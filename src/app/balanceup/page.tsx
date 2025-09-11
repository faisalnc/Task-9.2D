// pages/balanceup-landing.tsx
"use client";
import Image from "next/image";
import { Target, Bell, TrendingUp } from "lucide-react";
import { FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa";
import BalanceUpLogo from "@/components/BalanceUpLogo";

export default function BalanceUpLanding() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-emerald-50 to-white text-gray-900">
      {/* =========================
          HEADER / HERO
      ========================== */}
      <section className="max-w-7xl mx-auto px-6 pt-14 pb-10">
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="relative h-8 w-8">
            <BalanceUpLogo className="h-8 w-8 text-emerald-600" />
          </div>
          <span className="text-sm tracking-wide text-emerald-700/90 font-semibold uppercase">
            BalanceUp
          </span>
        </div>

        <header className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-black leading-tight text-emerald-700">
            Build Consistent Wellness Habits
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-700">
            A student-first wellness app that helps you stay on track with
            <span className="font-semibold">
              {" "}
              nutrition, fitness, and mindfulness
            </span>
            —in one place.
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <a
              href="#join"
              className="inline-flex items-center justify-center rounded-xl px-6 py-3 font-semibold bg-emerald-600 text-white shadow hover:bg-emerald-700 transition"
            >
              Join the Waitlist
            </a>
            <a
              href="#features"
              className="inline-flex items-center justify-center rounded-xl px-6 py-3 font-semibold bg-white text-emerald-700 ring-1 ring-emerald-200 hover:ring-emerald-300 shadow-sm transition"
            >
              See Features
            </a>
          </div>
        </header>

        {/* =========================
    HERO CARD
========================== */}
        <div className="max-w-6xl mx-auto mt-12">
          <div
            className="bg-white rounded-2xl flex flex-col md:flex-row overflow-hidden min-h-[350px]"
            style={{ boxShadow: "0 12px 32px rgba(5, 150, 105, 0.5)" }} // emerald-600 shadow
          >
            {" "}
            {/* Left: Image (30%) */}
            <div className="relative w-full md:w-[30%] h-[350px]">
              <Image
                src="/images/hero.png"
                alt="BalanceUp Hero"
                fill
                className="object-cover"
              />
            </div>
            {/* Right: Text (70%) */}
            <div className="w-full md:w-[70%] p-10 flex items-center">
              <p className="text-xl md:text-2xl text-gray-800 leading-relaxed">
                BalanceUp brings your daily wellness into one adaptive
                flow—quick meals, short workouts, and micro-mindfulness that fit
                student life.
                <br />
                <span className="block mt-6 text-emerald-600 text-3xl font-bold italic">
                  Stay consistent. Stay balanced. Stay well.
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================
    CORE FEATURES (WITH SCREENSHOTS)
========================== */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-emerald-700 mb-12">
          Key Features
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Feature 1: Wellness Feed */}
          <article className="bg-white rounded-2xl shadow p-5 flex flex-col">
            <div
              className="relative h-[560px] rounded-xl overflow-hidden ring-1 ring-emerald-100 shadow-lg"
              style={{ boxShadow: "0 8px 24px rgba(5, 150, 105, 0.8)" }}
            >
              <Image
                src="/images/screenshot-feed.png"
                alt="Wellness Feed screenshot"
                fill
                className="object-cover object-top"
              />
            </div>
            <div className="mt-5">
              <h3 className="text-lg font-semibold text-emerald-700">
                Wellness Feed
              </h3>
              <p className="text-gray-600 mt-1">
                Bite-size tips for stretching, hydration, and focus—designed for
                quick wins between classes.
              </p>
            </div>
          </article>

          {/* Feature 2: Smart Search */}
          <article className="bg-white rounded-2xl shadow p-5 flex flex-col">
            <div
              className="relative h-[560px] rounded-xl overflow-hidden ring-1 ring-emerald-100 shadow-lg"
              style={{ boxShadow: "0 8px 24px rgba(5, 150, 105, 0.8)" }}
            >
              <Image
                src="/images/screenshot-search.png"
                alt="Search screen screenshot"
                fill
                className="object-cover object-top"
              />
            </div>
            <div className="mt-5">
              <h3 className="text-lg font-semibold text-emerald-700">
                Smart Search
              </h3>
              <p className="text-gray-600 mt-1">
                Find meals, quick workouts, and mindfulness sessions with easy
                tags and filters.
              </p>
            </div>
          </article>

          {/* Feature 3: Balance Score */}
          <article className="bg-white rounded-2xl shadow p-5 flex flex-col">
            <div
              className="relative h-[560px] rounded-xl overflow-hidden ring-1 ring-emerald-100 shadow-lg"
              style={{ boxShadow: "0 8px 24px rgba(5, 150, 105, 0.8)" }}
            >
              <Image
                src="/images/screenshot-dashboard.png"
                alt="Dashboard & Balance Score screenshot"
                fill
                className="object-cover object-top"
              />
            </div>
            <div className="mt-5">
              <h3 className="text-lg font-semibold text-emerald-700">
                Balance Score
              </h3>
              <p className="text-gray-600 mt-1">
                See progress at a glance across Nutrition, Fitness, and
                Mind—then act with one-tap suggestions.
              </p>
            </div>
          </article>
        </div>
      </section>

      {/* =========================
          HOW IT WORKS
      ========================== */}
      <section className="max-w-7xl mx-auto px-6 pb-16">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              step: "01",
              title: "Set simple goals",
              text: "Pick targets that match your week—no perfection required.",
              icon: Target,
            },
            {
              step: "02",
              title: "Get adaptive nudges",
              text: "Short prompts for meals, quick movement, or 2-minute breathing.",
              icon: Bell,
            },
            {
              step: "03",
              title: "Track & improve",
              text: "Your Balance Score adjusts as you log small wins each day.",
              icon: TrendingUp,
            },
          ].map((s) => (
            <div
              key={s.step}
              className="bg-white rounded-2xl shadow p-6 flex flex-col items-start"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-3 rounded-full bg-emerald-100 text-emerald-600">
                  <s.icon className="h-6 w-6" /> {/* ✅ This works now */}
                </div>
                <span className="text-emerald-600 font-black text-xl">
                  {s.step}
                </span>
              </div>
              <h3 className="font-semibold text-lg">{s.title}</h3>
              <p className="mt-1 text-gray-600">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* =========================
          VALUE PROPS / BENEFITS
      ========================== */}
      <section className="max-w-7xl mx-auto px-6 pb-16">
        <div className="rounded-3xl bg-emerald-50/70 ring-1 ring-emerald-100 p-8 md:p-10">
          <h2 className="text-2xl md:text-3xl font-bold text-emerald-800 text-center">
            Why students switch to BalanceUp
          </h2>
          <div className="grid md:grid-cols-4 gap-6 mt-8">
            {[
              {
                title: "All-in-one",
                text: "Nutrition, fitness, and mindfulness together—no app-hopping.",
              },
              {
                title: "Tiny time slots",
                text: "Built for 5–10 minute wins between lectures and labs.",
              },
              {
                title: "Adaptive",
                text: "Prompts that fit your week, not just generic trackers.",
              },
              {
                title: "Gentle accountability",
                text: "Streaks and reminders without guilt or overwhelm.",
              },
            ].map((b) => (
              <div key={b.title} className="bg-white rounded-2xl shadow p-5">
                <h3 className="font-semibold text-emerald-700">{b.title}</h3>
                <p className="text-gray-600 mt-1">{b.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================
          SOCIAL PROOF / TESTIMONIALS
      ========================== */}
      <section id="testimonials" className="max-w-7xl mx-auto px-6 pb-16">
        <h2 className="text-3xl font-bold text-emerald-700 text-center mb-10">
          What people are saying
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              quote:
                "BalanceUp finally helped me stay consistent between classes. I do a 5-minute stretch and feel reset.",
              name: "Farhan",
              role: "Uni Student",
            },
            {
              quote:
                "I don’t need five apps anymore—meals, quick workouts, and breathing are all here.",
              name: "Fardin",
              role: "Young Professional",
            },
            {
              quote:
                "Exactly what my clients need for realistic habit building—short, positive, and trackable.",
              name: "Nafiz",
              role: "IT Coach",
            },
          ].map((t) => (
            <blockquote
              key={t.name}
              className="bg-white rounded-2xl shadow p-6"
            >
              <p className="italic text-gray-800">“{t.quote}”</p>
              <footer className="mt-4 font-semibold text-gray-900">
                – {t.name},{" "}
                <span className="font-normal text-gray-600">{t.role}</span>
              </footer>
            </blockquote>
          ))}
        </div>
      </section>

      {/* =========================
          FAQ
      ========================== */}
      <section className="max-w-7xl mx-auto px-6 pb-16">
        <div className="bg-white rounded-3xl shadow p-8 md:p-10">
          <h2 className="text-2xl md:text-3xl font-bold text-emerald-700">
            FAQs
          </h2>
          <div className="mt-6 grid md:grid-cols-2 gap-6">
            {[
              {
                q: "Is this free?",
                a: "Early access is free during the pilot. We’ll offer student-friendly pricing later.",
              },
              {
                q: "Do I need gym equipment?",
                a: "No. Most workouts are body-weight and under 10 minutes.",
              },
              {
                q: "How is this different to calorie trackers?",
                a: "We focus on small daily actions and balance across nutrition, fitness, and mind—not just numbers.",
              },
              {
                q: "Will this work if I’m busy?",
                a: "Yes. BalanceUp is designed for short time slots and adaptive prompts that fit your schedule.",
              },
            ].map((f) => (
              <div
                key={f.q}
                className="rounded-2xl ring-1 ring-emerald-100 p-5"
              >
                <h3 className="font-semibold text-emerald-700">{f.q}</h3>
                <p className="text-gray-600 mt-1">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================
    FINAL CTA
========================== */}
      <section id="join" className="max-w-7xl mx-auto px-6 pb-24">
        <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-3xl p-8 md:p-10 shadow-lg text-white">
          <div className="md:flex md:items-center md:justify-between gap-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">
                Ready to balance your life?
              </h2>
              <p className="mt-2 text-emerald-50/90">
                Join the waitlist to get early access and help shape the
                roadmap.
              </p>
            </div>

            {/* Button + Social Icons */}
            <div className="flex items-center gap-4 mt-6 md:mt-0">
              <a
                href="https://forms.gle/your-waitlist-form"
                className="inline-flex items-center justify-center rounded-xl px-6 py-3 font-semibold bg-white text-emerald-700 shadow hover:bg-emerald-50 transition"
              >
                Join the Waitlist
              </a>

              {/* Social Icons */}
              <div className="flex gap-3">
                <a
                  href="https://www.facebook.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-white text-emerald-700 hover:bg-emerald-50 shadow transition"
                >
                  <FaFacebookF className="h-4 w-4" />
                </a>
                <a
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-white text-emerald-700 hover:bg-emerald-50 shadow transition"
                >
                  <FaInstagram className="h-4 w-4" />
                </a>
                <a
                  href="https://www.tiktok.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-white text-emerald-700 hover:bg-emerald-50 shadow transition"
                >
                  <FaTiktok className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-gray-500 mt-6">
          © {new Date().getFullYear()} BalanceUp — Designed by Faisal Nazib
          Chowdhury
        </p>
      </section>
    </main>
  );
}
