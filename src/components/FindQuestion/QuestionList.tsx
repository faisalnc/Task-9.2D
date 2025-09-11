"use client";

import React, { useEffect, useState } from "react";
import QuestionCard from "./QuestionCard";
import type { Question } from "@/types/Question";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";

const TAG_OPTIONS = [
  "frontend",
  "backend",
  "devops",
  "uiux",
  "mobile",
  "database",
  "security",
  "testing",
  "general",
];

export default function QuestionList() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [orderedQuestions, setOrderedQuestions] = useState<Question[]>([]);
  const [search, setSearch] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<"name" | "date" | "custom">("date");

  const loadQuestions = async () => {
    const res = await fetch("/api/questions");
    const data: Question[] = await res.json();
    setQuestions(data);
    setOrderedQuestions(data);
  };

  useEffect(() => {
    loadQuestions();
  }, []);

  const handleDelete = async (id: string) => {
    await fetch(`/api/questions?id=${id}`, { method: "DELETE" });
    loadQuestions(); // refresh list
  };

  const handleTagClick = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else if (selectedTags.length < 3) {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleClearFilters = () => {
    setSearch("");
    setSelectedTags([]);
    setSortBy("date");
  };

  const filtered = [...questions].filter((q) => {
    const matchesTitle = q.title.toLowerCase().includes(search.toLowerCase());
    const matchesTags =
      selectedTags.length === 0 ||
      selectedTags.some((tag) => q.tags.includes(tag));
    return matchesTitle && matchesTags;
  });

  let displayed = [...filtered];

  if (sortBy === "name") {
    displayed.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortBy === "date") {
    displayed.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  } else if (sortBy === "custom") {
    displayed = orderedQuestions.filter((q) =>
      filtered.some((f) => f._id === q._id)
    );
  }

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const reordered = Array.from(orderedQuestions);
    const [movedItem] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, movedItem);

    setOrderedQuestions(reordered);
    setSortBy("custom");
  };

  return (
    <div>
      {/* Search, Sort, Clear All */}
      <div className="flex flex-col md:flex-row gap-4 mb-4 items-center">
        <input
          type="text"
          placeholder="Search by title..."
          className="border rounded px-3 py-1.5 text-sm w-full md:w-auto text-left placeholder:text-left"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={sortBy === "custom" ? "custom" : sortBy}
          onChange={(e) => setSortBy(e.target.value as "name" | "date")}
          className="border rounded px-3 py-1.5 text-sm w-full md:w-auto"
        >
          <option value="date">Sort by: Date Created</option>
          <option value="name">Sort by: Name</option>
          <option value="custom" disabled>
            Sort by: Custom (dragged)
          </option>
        </select>

        <button
          onClick={handleClearFilters}
          className="bg-gray-300 text-sm rounded px-4 py-1.5 hover:bg-gray-400 transition-colors"
        >
          Clear All
        </button>
      </div>

      {/* Tag Pills */}
      <div className="flex flex-wrap gap-2 mb-6">
        {TAG_OPTIONS.map((tag) => {
          const isSelected = selectedTags.includes(tag);
          const isDisabled = !isSelected && selectedTags.length >= 3;

          return (
            <button
              key={tag}
              type="button"
              onClick={() => handleTagClick(tag)}
              className={`px-3 py-1 rounded-full text-sm transition-colors border ${
                isSelected
                  ? "bg-teal-600 text-white border-teal-700"
                  : isDisabled
                  ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                  : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
              }`}
            >
              {tag}
            </button>
          );
        })}
      </div>

      {/* Question List with Drag-and-Drop */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="questions">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {displayed.length ? (
                displayed.map((q, index) => (
                  <Draggable key={q._id} draggableId={q._id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <QuestionCard question={q} onDelete={handleDelete} />
                      </div>
                    )}
                  </Draggable>
                ))
              ) : (
                <p>No matching questions found.</p>
              )}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
