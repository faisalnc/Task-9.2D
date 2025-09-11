// src/app/find-question/page.tsx
"use client";

import React from "react";
import Link from "next/link";
import Header from "@/components/Header";
import QuestionList from "@/components/FindQuestion/QuestionList";
import { ArrowLeft } from 'lucide-react';

export default function FindQuestionPage() {
  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Find Questions</h1>
          <Link
            href="/"
            className="inline-flex items-center gap-1 border border-gray-300 rounded px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
        <QuestionList />
      </main>
    </>
  );
}
