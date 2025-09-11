// src/components/NewPost/ArticleForm.tsx
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const ArticleForm = () => {
  const initialValues = {
    title: "",
    abstract: "",
    content: "",
    tags: "",
  };

  const validationSchema = Yup.object({
    title: Yup.string()
      .max(100, "Title must be at most 100 characters")
      .required("Title is required"),

    abstract: Yup.string()
      .max(300, "Abstract must be at most 300 characters")
      .required("Abstract is required"),

    content: Yup.string()
      .max(2000, "Article content must be at most 2000 characters")
      .required("Article content is required"),

    tags: Yup.string()
      .max(100, "Tags must be at most 100 characters")
      .required("Tags are required"),
  });

  const onSubmit = (values: typeof initialValues) => {
    console.log("Article Submitted:", values);
    alert("Article submitted successfully!");
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Form className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Title</label>
          <Field
            name="title"
            className="border border-gray-300 rounded w-full p-2"
            placeholder="Enter a descriptive title"
          />
          <ErrorMessage
            name="title"
            component="div"
            className="text-red-500 text-sm"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Abstract</label>
          <Field
            name="abstract"
            className="border border-gray-300 rounded w-full p-2"
            placeholder="Enter a one paragraph abstract"
          />
          <ErrorMessage
            name="abstract"
            component="div"
            className="text-red-500 text-sm"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Article Text</label>
          <Field
            as="textarea"
            name="content"
            className="border border-gray-300 rounded w-full p-2 h-32"
            placeholder="Enter an article"
          />
          <ErrorMessage
            name="content"
            component="div"
            className="text-red-500 text-sm"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Tags</label>
          <Field
            name="tags"
            className="border border-gray-300 rounded w-full p-2"
            placeholder="Please add up to 3 tags to describe what your article is about e.g., Java"
          />
          <ErrorMessage
            name="tags"
            component="div"
            className="text-red-500 text-sm"
          />
        </div>

        <button
          type="submit"
          className="bg-gray-700 text-white px-6 py-2 rounded hover:bg-gray-800"
        >
          Post
        </button>
      </Form>
    </Formik>
  );
};

export default ArticleForm;
