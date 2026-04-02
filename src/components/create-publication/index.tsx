"use client";

import { useAuth } from "@/src/app/context";
import { useState } from "react";
import { createPublication } from "@/src/services/publication-service";

export default function CreatePublication({
  onCreate,
}: {
  onCreate: () => void;
}) {
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || !title.trim()) return;
    setLoading(true);
    const response = await createPublication(title, content);
    setTitle("");
    setContent("");
    onCreate();
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white border border-gray-200 px-4 py-3 gap-6 flex flex-col rounded-2xl shadow-sm font-sans">
      <div className="flex gap-4">
        <div>
          <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center text-xs font-semibold text-gray-600">
            {user?.name ? user.name.charAt(0) : "U"}
          </div>
        </div>
        <form onSubmit={handleSubmit} className="flex-1">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="w-full bg-transparent text-xl font-semibold outline-none mb-1 placeholder-gray-400"
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What are you thinking?"
            className="w-full bg-transparent text-base outline-none resize-none placeholder-gray-400 min-h-80px"
          />
          <div className="flex items-center justify-between">
            <div className="flex gap-4 text-gray-500 text-sm">
            </div>
            <button
              type="submit"
              disabled={loading || !content.trim() || !title.trim()}
              className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold px-5 py-2 rounded-full transition-all duration-200 shadow-sm hover:shadow-md"
            >
              {loading ? "Posting..." : "Post"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}