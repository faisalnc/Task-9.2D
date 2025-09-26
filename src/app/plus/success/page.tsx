//src/app/plus/success/page.tsx
"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams?.get("session_id") ?? null; 
  const { user } = useAuth();
  const router = useRouter();

  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");

  useEffect(() => {
    const confirmSubscription = async () => {
      if (!sessionId || !user) {
        setStatus("error");
        return;
      }

      try {
        // Verify session with backend
        const res = await fetch(`/api/plus/confirm?session_id=${sessionId}`);
        if (!res.ok) throw new Error("Session verification failed");

        // Activate Plus in MongoDB
        const activate = await fetch("/api/plus/activate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: user.uid }),
        });

        if (!activate.ok) throw new Error("Failed to activate Plus");

        setStatus("success");

        // Small delay, then redirect home
        setTimeout(() => {
          router.push("/");
        }, 2000);
      } catch (err) {
        console.error("❌ Activation error", err);
        setStatus("error");
      }
    };

    confirmSubscription();
  }, [sessionId, user, router]);

  return (
    <main className="max-w-screen-md mx-auto px-6 py-10 text-center">
      {status === "loading" && (
        <h1 className="text-xl font-semibold">Confirming your subscription...</h1>
      )}

      {status === "success" && (
        <h1 className="text-2xl font-bold text-teal-600">
          🎉 Welcome to DEV@Deakin Plus!
        </h1>
      )}

      {status === "error" && (
        <h1 className="text-xl font-semibold text-red-600">
          Please Wait...
        </h1>
      )}
    </main>
  );
}
