"use client";

import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAuth } from "@/context/AuthContext";
import ImageUploader from "./ImageUploader";
import { useRouter } from "next/navigation";

// Predefined tag options
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

type FormValues = {
  title: string;
  body: string;
  tags: string[]; // changed from string to array
  imageFile: File | null;
};

const validationSchema = Yup.object({
  title: Yup.string()
    .max(100, "Title must be at most 100 characters")
    .required("Title is required"),
  body: Yup.string()
    .max(1000, "Question body must be at most 1000 characters")
    .required("Question body is required"),
  tags: Yup.array()
    .of(Yup.string())
    .min(1, "Select at least one tag")
    .max(3, "You can select up to 3 tags"),
  imageFile: Yup.mixed<File>()
    .nullable()
    .notRequired()
    .test("fileSize", "Image must be < 4MB", (file) =>
      file ? file.size <= 4 * 1024 * 1024 : true
    )
    .test("fileType", "Only images are allowed", (file) =>
      file ? /^image\//.test(file.type) : true
    ),
});

// Converts File to base64 string
async function convertToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function QuestionForm() {
  const { user } = useAuth();
  console.log("From context:", user);

  const router = useRouter();

  const initialValues: FormValues = {
    title: "",
    body: "",
    tags: [],
    imageFile: null,
  };

  const onSubmit = async (
    values: FormValues,
    { resetForm }: { resetForm: () => void }
  ) => {
    try {
      let imageUrl: string | null = null;
      if (values.imageFile) {
        const base64 = await convertToBase64(values.imageFile);
        imageUrl = base64;
      }

      const response = await fetch("/api/questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: values.title,
          description: values.body,
          tags: values.tags,
          imageUrl,
          userId: user?.uid,
        }),
      });

      if (!response.ok) throw new Error("Failed to save question");

      resetForm();
      router.push("/find-question");

    } catch (err) {
      console.error(err);
      alert("Failed to submit question. Please try again.");
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ setFieldValue, values, isSubmitting }) => (
        <Form className="space-y-5">
          {/* Title */}
          <div>
            <label className="block font-medium mb-1">Title</label>
            <Field
              name="title"
              className="border border-gray-300 rounded w-full p-2"
              placeholder="Enter a short, descriptive question title"
            />
            <ErrorMessage
              name="title"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          {/* Body */}
          <div>
            <label className="block font-medium mb-1">
              Describe your problem
            </label>
            <Field
              as="textarea"
              name="body"
              className="border border-gray-300 rounded w-full p-2 h-32"
              placeholder="Explain your question in detail, including what you’ve tried"
            />
            <ErrorMessage
              name="body"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block font-medium mb-1">
              Tags (select up to 3)
            </label>
            <div className="flex flex-wrap gap-2">
              {TAG_OPTIONS.map((tag) => {
                const isSelected = values.tags.includes(tag);
                const isDisabled = !isSelected && values.tags.length >= 3;

                return (
                  <button
                    type="button"
                    key={tag}
                    className={`px-3 py-1 rounded-full border text-sm transition-colors ${
                      isSelected
                        ? "bg-teal-600 text-white border-teal-700"
                        : isDisabled
                        ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                        : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
                    }`}
                    onClick={() => {
                      if (isSelected) {
                        setFieldValue(
                          "tags",
                          values.tags.filter((t) => t !== tag)
                        );
                      } else if (!isDisabled) {
                        setFieldValue("tags", [...values.tags, tag]);
                      }
                    }}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>
            <ErrorMessage
              name="tags"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
            {values.tags.length > 0 && (
              <p className="text-xs text-gray-500 mt-1">
                Selected tags: {values.tags.join(", ")}
              </p>
            )}
          </div>

          {/* Image Upload */}
          <ImageUploader
            onFileSelect={(file) => setFieldValue("imageFile", file)}
          />
          <ErrorMessage
            name="imageFile"
            component="div"
            className="text-red-500 text-sm"
          />

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-gray-700 text-white px-6 py-2 rounded hover:bg-gray-800 disabled:opacity-60"
          >
            {isSubmitting ? "Posting..." : "Post"}
          </button>
        </Form>
      )}
    </Formik>
  );
}
