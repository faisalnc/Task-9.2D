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
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/');
    } catch (err) {
      setError('Invalid email or password');
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
        <h1 className="text-2xl font-bold mb-4 text-center">Login to DEV@Deakin</h1>

        {error && (
          <div className="mb-4 p-2 text-sm text-red-600 bg-red-100 border border-red-300 rounded">
            {error}
          </div>
        )}

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

        <p className="text-sm text-center mt-4">
          Don’t have an account?{' '}
          <Link href="/register" className="text-teal-600 hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </main>
  );
}
