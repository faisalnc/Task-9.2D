// src/app/settings/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { signOut, deleteUser } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function SettingsPage() {
  const { user } = useAuth();
  const router = useRouter();
  const { darkMode, toggleDarkMode } = useTheme();

  const [deleteStep, setDeleteStep] = useState(0);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [loading2FA, setLoading2FA] = useState(true);

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      router.replace("/login");
    }
  }, [user, router]);

  // Fetch user 2FA status from Mongo
  useEffect(() => {
    const fetch2FA = async () => {
      if (!user) return;
      try {
        const res = await fetch(`/api/2fa/status?uid=${user.uid}`);
        const data = await res.json();
        setTwoFactorEnabled(data.twoFactorEnabled || false);
      } catch (err) {
        console.error("Error fetching 2FA:", err);
      } finally {
        setLoading2FA(false);
      }
    };
    fetch2FA();
  }, [user]);

  if (!user)
    return <p className="text-center mt-10">Redirecting to login...</p>;

  // Logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.replace("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  // Delete Account
  const handleDeleteAccount = async () => {
    if (deleteStep < 2) {
      setDeleteStep(deleteStep + 1);
    } else {
      try {
        await deleteUser(user!);
        router.replace("/register");
      } catch (err) {
        console.error("Delete failed:", err);
      }
    }
  };

  // Toggle 2FA using /api/2fa/setup
  const handleToggle2FA = async () => {
    if (!user) return;
    const newValue = !twoFactorEnabled;
    setTwoFactorEnabled(newValue);

    try {
      await fetch("/api/2fa/setup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          uid: user.uid,
          email: user.email,
          twoFactorEnabled: newValue,
        }),
      });
    } catch (err) {
      console.error("Failed to update 2FA:", err);
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-background text-foreground transition-colors">
        <main className="max-w-3xl mx-auto p-4 flex-grow shadow-lg">
          {/* Header row */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-semibold">Settings</h1>
            <Link
              href="/"
              className="inline-flex items-center gap-1 border border-border rounded px-3 py-1.5 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </div>

          {/* User details */}
          <section className="mb-6 p-4 rounded-lg bg-card text-card-foreground shadow">
            <p className="text-lg font-semibold">
              {user?.displayName || "Logged in as:"}
            </p>
            <p className="text-sm text-muted-foreground">
              {user?.email || "No email"}
            </p>
          </section>

          {/* Dark mode toggle */}
          <section className="mb-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={darkMode}
                onChange={toggleDarkMode}
                className="h-5 w-5 accent-primary"
              />
              <span className="font-medium">Enable Dark Mode</span>
            </label>
          </section>

          {/* 2FA toggle */}
          <section className="mb-8">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={twoFactorEnabled}
                disabled={loading2FA}
                onChange={handleToggle2FA}
                className="h-5 w-5 accent-primary"
              />
              <span className="font-medium">Enable 2FA (Email Code)</span>
            </label>
            <p className="text-xs text-muted-foreground mt-1">
              When enabled, you’ll need a code sent to your email at login.
            </p>
          </section>

          {/* Actions */}
          <section className="flex gap-x-4">
            <button
              onClick={handleLogout}
              className="flex-1 py-2 px-4 bg-yellow-800 hover:bg-yellow-600 text-white rounded-lg font-semibold transition"
            >
              Log Out
            </button>

            <button
              onClick={handleDeleteAccount}
              className="flex-1 py-2 px-4 bg-red-900 hover:opacity-90 text-white rounded-lg font-semibold transition"
            >
              {deleteStep === 0 && "Delete Account"}
              {deleteStep === 1 && "Are you sure? Click again"}
              {deleteStep === 2 && "Final confirmation – delete permanently"}
            </button>
          </section>
        </main>
      </div>
    </>
  );
}
