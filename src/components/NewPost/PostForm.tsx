// src/components/NewPost/PostForm.tsx
"use client";
import React, { useState } from "react";
import QuestionForm from "./QuestionForm";
import ArticleForm from "./ArticleForm";

const PostForm = () => {
  const [postType, setPostType] = useState<"question" | "article" | "">("");

  return (
    <>
      <div className="bg-gray-50 border border-gray-200 shadow-sm rounded-lg p-6 space-y-6">
        {" "}
        <div>
          <label className="block font-semibold mb-2">Select Post Type:</label>
          <div className="flex gap-6 items-center">
            <label className="flex items-center gap-1">
              <input
                type="radio"
                name="postType"
                value="question"
                checked={postType === "question"}
                onChange={() => setPostType("question")}
              />
              Question
            </label>
            <label className="flex items-center gap-1">
              <input
                type="radio"
                name="postType"
                value="article"
                checked={postType === "article"}
                onChange={() => setPostType("article")}
              />
              Article
            </label>
          </div>
        </div>
        {postType && (
          <div className="bg-gray-100 p-4 border border-gray-300 rounded text-sm text-gray-700">
            <p className="mb-0">
              Make sure your post follows our{" "}
              <span className="font-semibold text-teal-700">
                Community Guidelines
              </span>
              . Be respectful, stay on-topic, and use clear titles and tags to
              help others understand your content.
            </p>
          </div>
        )}
        {postType === "question" && <QuestionForm />}
        {postType === "article" && <ArticleForm />}
      </div>
    </>
  );
};

export default PostForm;
