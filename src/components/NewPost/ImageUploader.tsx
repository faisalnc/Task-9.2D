//src/components/NewPost/ImageUploader.tsx
"use client";

import React, { useState } from "react";
import Image from "next/image";

interface Props {
  onFileSelect: (file: File | null) => void;
}

export default function ImageUploader({ onFileSelect }: Props) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    onFileSelect(file);

    if (file) {
      const reader = new FileReader();
      reader.onload = () => setPreviewUrl(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setPreviewUrl(null);
    }
  };

  return (
    <div>
      <label className="block font-medium mb-1">
        Optional image (PNG/JPG, &lt; 4MB)
      </label>
      <input
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded
                   file:border-0 file:text-sm file:font-semibold file:bg-gray-100
                   hover:file:bg-gray-200"
      />
      {previewUrl && (
        <div className="mt-3 relative w-full max-w-sm h-56">
          <Image
            src={previewUrl}
            alt="preview"
            fill
            className="rounded border object-contain"
          />
        </div>
      )}
    </div>
  );
}
