"use client";
import { CheckCircle, ArrowLeft } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { usePlusStatus } from "@/hooks/usePlusStatus";
import Link from "next/link";

export default function PlusPage() {
  const { user } = useAuth();
  const hasPlus = usePlusStatus(user?.uid);
  const [loading, setLoading] = useState(false);

  const features = [
    "Custom themes & layout options",
    "Analytics dashboard for your posts",
    "Priority support",
    "Early access to new features",
  ];

  // ✅ Checkout flow
  const handleCheckout = async () => {
    if (!user) {
      alert("You must be logged in to subscribe to Plus.");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/plus/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.uid }),
      });

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Failed to start checkout. Please try again.");
      }
    } catch (err) {
      console.error("❌ Checkout error", err);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Cancel subscription flow
  const handleCancel = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const res = await fetch("/api/plus/cancel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.uid }),
      });

      if (!res.ok) throw new Error("Cancel failed");

      alert("Your Plus subscription has been cancelled.");
      window.location.reload();
    } catch (err) {
      console.error("❌ Cancel error", err);
      alert("Something went wrong while cancelling.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-background px-6 py-10">
     {/* Gradient card */}
<div className="w-full max-w-lg rounded-2xl shadow-xl p-8 text-white bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500">
  <h1 className="text-3xl font-bold mb-4">DEV@Deakin Plus 🚀</h1>

  {hasPlus ? (
    <>
      <p className="font-medium mb-6">
        You are currently a <strong>DEV@Deakin Plus</strong> member.
        You’re enjoying all of these premium features:
      </p>

      <ul className="space-y-3 mb-8">
        {/* 🔥 Highlighted Plus features */}
        <li className="flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-green-200" />
          <span>AI Chat Assistant (exclusive to Plus)</span>
        </li>
        <li className="flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-green-200" />
          <span>Post code snippets in questions</span>
        </li>

        {/* Existing features */}
        {features.map((feature, i) => (
          <li key={i} className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-200" />
            <span>{feature}</span>
          </li>
        ))}
        <li className="italic text-sm text-gray-200">
          ✨ More features coming soon…
        </li>
      </ul>

      <button
        onClick={handleCancel}
        disabled={loading}
        className="w-full bg-red-800 hover:bg-black/40 text-white px-6 py-3 rounded-md font-semibold transition disabled:opacity-50"
      >
        {loading ? "Cancelling..." : "Cancel Plus"}
      </button>
    </>
  ) : (
    <>
      <p className="mb-6">
        Unlock extra features and support the platform. With DEV@Deakin
        Plus you’ll get:
      </p>

      <ul className="space-y-3 mb-8">
  {/* 🔥 Highlighted Plus features */}
  <li className="flex items-center gap-2">
    <CheckCircle className="w-5 h-5 text-green-200" />
    <span className="font-bold">Advanced AI Chat Assistant</span>
  </li>
  <li className="flex items-center gap-2">
    <CheckCircle className="w-5 h-5 text-green-200" />
    <span className="font-bold">Post code snippets in questions</span>
  </li>

  {/* Existing features */}
  {features.map((feature, i) => (
    <li key={i} className="flex items-center gap-2">
      <CheckCircle className="w-5 h-5 text-green-200" />
      <span>{feature}</span>
    </li>
  ))}
  <li className="italic text-sm text-gray-200">
    ✨ More features coming soon…
  </li>
</ul>


      <button
        onClick={handleCheckout}
        disabled={loading}
        className="w-full bg-black/30 hover:bg-black/40 text-white px-6 py-3 rounded-md font-semibold transition disabled:opacity-50"
      >
        {loading ? "Redirecting..." : "Get Plus"}
      </button>
    </>
  )}
</div>


      {/* Back to home button under card */}
      <Link
        href="/"
        className="mt-6 flex items-center gap-2 bg-white shadow-md px-5 py-2 rounded-full text-gray-700 hover:bg-gray-100 transition"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Home
      </Link>
    </main>
  );
}
