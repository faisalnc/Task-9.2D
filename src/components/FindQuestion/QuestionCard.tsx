"use client";

import { Question } from "@/types/Question";
import React, { useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import { useAuth } from "@/context/AuthContext";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";

interface QuestionCardProps {
  question: Question;
  onDelete: (id: string) => void;
}

export default function QuestionCard({
  question,
  onDelete,
}: QuestionCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [newAnswer, setNewAnswer] = useState("");
  const [answers, setAnswers] = useState<string[]>(question.answers || []);
  const { user } = useAuth();

  const handleToggleExpand = () => setExpanded((prev) => !prev);

  const handleAnswerSubmit = async () => {
    if (!newAnswer.trim() || !user) return;

    const response = await fetch("/api/answers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        questionId: question._id,
        answer: newAnswer.trim(),
      }),
    });

    if (response.ok) {
      setAnswers([...answers, newAnswer.trim()]);
      setNewAnswer("");
    } else {
      alert("Failed to submit answer");
    }
  };

  return (
    <div className="border rounded p-4 mb-4 shadow transition-all duration-300">
      <div className="flex gap-4 items-start">
        {!expanded && question.imageUrl && (
          <Image
            src={question.imageUrl}
            alt="Question thumbnail"
            width={96}
            height={96}
            className="rounded object-cover cursor-pointer"
            onClick={handleToggleExpand}
          />
        )}

        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-semibold">{question.title}</h2>
              <p className="text-gray-600">{question.description}</p>
              <div className="text-sm text-gray-500 mt-2">
                Tags: {question.tags?.join(", ") || "—"}
                <br />
                Date: {new Date(question.createdAt).toLocaleDateString()}
                <br />
                {/*  Show code presence if not expanded */}
                {!expanded && (
                  <span className="font-medium text-gray-700">
                    {question.code && question.code.trim()
                      ? "Code attached"
                      : "No code attached"}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Buttons Row */}
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={handleToggleExpand}
              className="text-sm px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
            >
              {expanded ? "Hide Details" : "Show Details"}
            </button>

            {/* Delete Button */}
            <div className="relative group">
              <button
                onClick={() => user && onDelete(question._id)}
                disabled={!user}
                className={clsx(
                  "text-sm px-3 py-1 rounded transition-colors",
                  user
                    ? "bg-red-500 text-white hover:bg-red-600"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                )}
              >
                Delete
              </button>
              {!user && (
                <div className="absolute top-full mt-1 left-1/2 -translate-x-1/2 text-xs text-white bg-black px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition">
                  Login to delete
                </div>
              )}
            </div>
          </div>

          {/* Expand Section */}
          <div
            className={clsx(
              "transition-all duration-300 ease-in-out overflow-hidden",
              expanded ? "max-h-[1500px] mt-4" : "max-h-0"
            )}
          >
            {expanded && (
              <div className="border-t pt-3">
                {question.imageUrl && (
                  <Image
                    src={question.imageUrl}
                    alt="Full question image"
                    width={400}
                    height={400}
                    className="mb-4 rounded w-full max-w-xs object-cover"
                  />
                )}

                {/* Show code only when expanded */}
                {question.code && question.code.trim() && (
                  <div className="mb-4">
                    <strong>Code Snippet:</strong>
                    <SyntaxHighlighter
                      language="javascript"
                      style={oneLight}
                      showLineNumbers
                      wrapLines
                      customStyle={{
                        fontSize: "0.85rem", // font size
                        borderRadius: "6px",
                        padding: "12px",
                      }}
                    >
                      {question.code}
                    </SyntaxHighlighter>
                  </div>
                )}

                {/* Answer List */}
                <div>
                  <strong>Answers:</strong>
                  {answers.length > 0 ? (
                    <ul className="list-disc list-inside text-sm mt-1">
                      {answers.map((ans, idx) => (
                        <li key={idx}>{ans}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-500">No answers yet.</p>
                  )}
                </div>

                {/* Answer Input */}
                <div className="mt-3">
                  <input
                    type="text"
                    value={newAnswer}
                    onChange={(e) => setNewAnswer(e.target.value)}
                    placeholder={
                      user ? "Write your answer..." : "Login to answer"
                    }
                    disabled={!user}
                    className={clsx(
                      "border rounded px-3 py-2 w-full mb-2",
                      !user && "bg-gray-100 text-gray-400 cursor-not-allowed"
                    )}
                  />
                  <div className="relative group inline-block">
                    <button
                      onClick={handleAnswerSubmit}
                      disabled={!user}
                      className={clsx(
                        "text-sm px-4 py-2 rounded transition-colors",
                        user
                          ? "bg-teal-700 text-white hover:bg-teal-800"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      )}
                    >
                      Submit Answer
                    </button>
                    {!user && (
                      <div className="absolute top-full mt-1 left-1/2 -translate-x-1/2 text-xs text-white bg-black px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
                        Login to submit
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
