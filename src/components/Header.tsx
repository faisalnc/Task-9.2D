"use client";
import { Search } from "lucide-react";
import { UserCircle } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function Header() {
  const pathname = usePathname();
  const { user } = useAuth();

  return (
    <header className="bg-white text-black px-6 py-3 border-b border-gray-300">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between">
        {/* Left: Logo */}
        <Link
          href="/"
          className="font-bold text-lg hover:text-gray-800 transition-colors"
        >
          DEV@Deakin
        </Link>

        {/* Middle: Search bar */}
        <div className="flex items-center flex-1 mx-6 max-w-lg border border-gray-300 rounded bg-white px-3 py-1.5">
          <Search className="w-4 h-4 text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full outline-none text-sm placeholder-gray-400"
          />
        </div>

        {/* Right: Auth Links */}
        <div className="flex gap-4 text-sm font-medium items-center">
          <Link
            href="/new-post"
            className={`transition-colors ${
              pathname === "/new-post"
                ? "text-cyan-700"
                : "text-gray-700 hover:text-gray-900"
            }`}
          >
            Post
          </Link>
          
          <Link
            href="/find-question"
            className={`transition-colors ${
              pathname === "/find-question"
                ? "text-cyan-700"
                : "text-gray-700 hover:text-gray-900"
            }`}
          >
            Find Questions
          </Link>

          {user ? (
            <>
              <div className="flex items-center gap-1 text-gray-700">
                <UserCircle className="w-5 h-5" />
                <span>{user.email?.split("@")[0]}</span>
              </div>

              <button
                onClick={() => signOut(auth)}
                className="text-gray-800 hover:text-gray-900 transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className={`transition-colors ${
                pathname === "/login"
                  ? "text-cyan-700"
                  : "text-gray-700 hover:text-gray-900"
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
