'use client';
import React, { useEffect } from 'react';
import Header from '@/components/Header';
import PostForm from '@/components/NewPost/PostForm';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function NewPostPage() {
  const { user } = useAuth(); // 🔐 Get the user from context
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.replace('/login'); // 🔐 Redirect if not logged in
    }
  }, [user]);

  if (!user) return <p className="text-center mt-10">Redirecting to login...</p>;

  return (
    <>
      <Header />
      <main className="max-w-3xl mx-auto p-4 flex-grow">
        {/* Header row: Back button + Title */}
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-semibold">Create a New Post</h1>
          <Link
            href="/"
            className="inline-flex items-center gap-1 border border-gray-300 rounded px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>

        <PostForm />
      </main>
    </>
  );
}
