"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export const dynamic = "force-dynamic"; // stop prerender

export default function SuccessPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect after a short delay
    const timer = setTimeout(() => {
      router.push("/");
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <main className="max-w-screen-md mx-auto px-6 py-10 text-center">
      <h1 className="text-xl font-semibold text-teal-600">
        Payment successful!
      </h1>
      <p className="mt-2 text-gray-600">Redirecting you to home…</p>
    </main>
  );
}
