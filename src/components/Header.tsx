"use client";
import { Search, UserCircle, Settings as SettingsIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function Header() {
  const pathname = usePathname();
  const { user } = useAuth();

  return (
    <header className="bg-card text-card-foreground px-6 py-3 border-b border-border transition-colors duration-300">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between">
        {/* Left: Logo */}
        <Link
          href="/"
          className="font-bold text-lg hover:text-foreground transition-colors"
        >
          DEV@Deakin
        </Link>

        {/* Middle: Search bar */}
        <div className="flex items-center flex-1 mx-6 max-w-lg border border-border rounded bg-background px-3 py-1.5 transition-colors">
          <Search className="w-4 h-4 text-muted-foreground mr-2" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full bg-transparent outline-none text-sm placeholder-muted-foreground text-foreground"
          />
        </div>

        {/* Right: Auth Links */}
        <div className="flex gap-4 text-sm font-medium items-center">
          <Link
            href="/new-post"
            className={`transition-colors ${
              pathname === "/new-post"
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Post
          </Link>

          <Link
            href="/find-question"
            className={`transition-colors ${
              pathname === "/find-question"
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Find Questions
          </Link>

          {user ? (
            <>
              <div className="flex items-center gap-1 text-muted-foreground">
                <UserCircle className="w-5 h-5" />
                <span>{user.email?.split("@")[0]}</span>
              </div>

              {/* Settings link */}
              <Link
                href="/settings"
                className={`flex items-center gap-1 transition-colors ${
                  pathname === "/settings"
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <SettingsIcon className="w-5 h-5" />
                <span>Settings</span>
              </Link>

              <button
                onClick={() => signOut(auth)}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className={`transition-colors ${
                pathname === "/login"
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
