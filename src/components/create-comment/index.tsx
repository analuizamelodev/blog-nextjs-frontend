"use client";

import { useState } from "react";
import { createComment } from "@/src/services/comment-service";
import { useAuth } from "@/src/app/context";
import type { Publication } from "@/src/app/types/type-publication";
import type { Comment } from "@/src/app/types/type-comment";

export default function CreateComment({
  publication,
  onCreate,
}: {
  publication: Publication;
  onCreate: (comment: Comment) => void;
}) {
  const { user } = useAuth();
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!content.trim() || !user) return;

    try {
      setLoading(true);

      const newComment = await createComment(content, publication.id);

      setContent("");
      setFocused(false);
      onCreate(newComment);
    } catch (error) {
      console.error("Error creating comment:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-start gap-3 mb-4">
      <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-sm font-semibold text-gray-700">
        {user?.name?.charAt(0)?.toUpperCase() || "U"}
      </div>

      <div className="flex-1">
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onFocus={() => setFocused(true)}
          placeholder="Post your reply"
          className="w-full bg-transparent outline-none text-sm text-gray-800 placeholder-gray-400"
        />

        {focused && (
          <div className="flex justify-end mt-2">
            <button
              type="submit"
              disabled={loading || !content.trim()}
              className="bg-gray-800 text-white px-4 py-1.5 rounded-full text-sm hover:bg-black disabled:bg-gray-300"
            >
              {loading ? "Posting..." : "Reply"}
            </button>
          </div>
        )}
      </div>
    </form>
  );
}