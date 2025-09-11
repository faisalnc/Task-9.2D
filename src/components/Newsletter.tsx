//src/components/Newsletter.tsx
"use client"; 

import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <section className="bg-gray-200 px-4 py-6 flex flex-col items-center">
  <form
    onSubmit={handleSubmit}
    className="flex items-center gap-2 w-full max-w-3xl"
  >
    <label className="font-bold text-black text-lg whitespace-nowrap">
      SIGN UP FOR OUR DAILY INSIDER
    </label>
    <input
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      placeholder="Enter your email"
      required
      className="flex-grow px-3 py-2 border border-black text-black placeholder-black rounded-sm"
    />
    <button
      type="submit"
      className="bg-teal-700 text-white px-4 py-2 rounded-sm hover:bg-teal-800"
    >
      Subscribe
    </button>
  </form>

  {status === "success" && (
    <p className="text-gray-700 mt-2 text-sm">Subscribed successfully!</p>
  )}
  {status === "error" && (
    <p className="text-red-700 mt-2 text-sm">❌ Subscription failed.</p>
  )}
</section>

  );
}
