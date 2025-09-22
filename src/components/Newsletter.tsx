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
    <section className="bg-card px-4 py-6 flex flex-col items-center shadow-sm transition-colors">
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-2 w-full max-w-3xl"
      >
        <label className="font-bold text-foreground text-lg whitespace-nowrap">
          SIGN UP FOR OUR DAILY INSIDER
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          className="flex-grow px-3 py-2 border border-border bg-background text-foreground placeholder-muted-foreground rounded-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <button
          type="submit"
          className="bg-primary text-primary-foreground px-4 py-2 rounded-sm hover:bg-muted transition-colors"
        >
          Subscribe
        </button>
      </form>

      {status === "success" && (
        <p className="text-muted-foreground mt-2 text-sm">
          ✅ Subscribed successfully!
        </p>
      )}
      {status === "error" && (
        <p className="text-destructive mt-2 text-sm">❌ Subscription failed.</p>
      )}
    </section>
  );
}
