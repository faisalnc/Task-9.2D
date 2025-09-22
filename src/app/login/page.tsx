'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import Link from 'next/link';
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [step, setStep] = useState<'login' | '2fa'>('login');
  const [error, setError] = useState('');
  const [uid, setUid] = useState<string | null>(null);

// Step 1: normal login
const handleLogin = async () => {
  try {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    setUid(cred.user.uid);

    // ✅ Check if 2FA is enabled in Mongo
    const res = await fetch(`/api/2fa/status?uid=${cred.user.uid}`);
    const data = await res.json();

    if (data.twoFactorEnabled) {
      // ✅ Ask backend to generate & email code
      const genRes = await fetch('/api/2fa/code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          uid: cred.user.uid,
          email,
          code: Math.floor(100000 + Math.random() * 900000).toString(), // 6-digit
        }),
      });

      const genData = await genRes.json();  // 👈 capture backend error

      if (!genRes.ok) {
        throw new Error(genData.error || "Failed to send 2FA code");
      }

      setStep("2fa");
    } else {
      // No 2FA → straight home
      router.push("/");
    }
  } catch (err) {
    console.error("Login failed:", err);
    setError(err instanceof Error ? err.message : "Invalid email or password");
  }
};

  // Step 2: verify the code
  const handleVerify = async () => {
    try {
      const res = await fetch('/api/2fa/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uid, code }),
      });

      const data = await res.json();

      if (data.success) {
        router.push('/');
      } else {
        setError('Invalid or expired code');
      }
    } catch (err) {
      console.error('2FA verify failed:', err);
      setError('Verification failed');
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 bg-gray-50">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-center mb-1">
          <Image
            src="/images/deakinlogo.jpg"
            alt="Deakin Logo"
            width={100}
            height={100}
            className="object-contain"
          />
        </div>
        <h1 className="text-2xl font-bold mb-4 text-center">
          {step === 'login' ? 'Login to DEV@Deakin' : 'Enter 2FA Code'}
        </h1>

        {error && (
          <div className="mb-4 p-2 text-sm text-red-600 bg-red-100 border border-red-300 rounded">
            {error}
          </div>
        )}

        {step === 'login' ? (
          <div className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 border rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 border rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              onClick={handleLogin}
              className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 px-4 rounded transition"
            >
              Log In
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-gray-600 text-center">
              We’ve sent a 6-digit code to <span className="font-semibold">{email}</span>.
            </p>
            <input
              type="text"
              placeholder="Enter code"
              className="w-full px-4 py-2 border rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            <button
              onClick={handleVerify}
              className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 px-4 rounded transition"
            >
              Verify Code
            </button>
          </div>
        )}

        {step === 'login' && (
          <p className="text-sm text-center mt-4">
            Don’t have an account?{' '}
            <Link href="/register" className="text-teal-600 hover:underline">
              Register here
            </Link>
          </p>
        )}
      </div>
    </main>
  );
}
