"use client";

import { useEffect, useState } from "react";
import { getAllComments } from "@/src/services/comment-service";

type CommentsProps = {
  publicationId: number;
};

type Comment = {
  id: number;
  content: string;
  createdAt: string;
  publicationId: number;
  authorId: number;
  author: {
    id: number;
    name: string;
  };
};

export default function Comments({ publicationId }: CommentsProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComments = async () => {
        setLoading(true);
        const response = await getAllComments();
        const filteredComments = response.filter(
          (comment: Comment) => comment.publicationId === publicationId,
        );

        setComments(filteredComments);

        setLoading(false);

    };

    fetchComments();
  }, [publicationId]);

  if (loading) {
    return <p className="text-sm text-gray-400 mt-3">Loading comments...</p>;
  }

  if (comments.length === 0) {
    return <p className="text-sm text-gray-400 mt-3">No comments yet.</p>;
  }

  return (
    <div className="flex flex-col gap-3 mt-4">
      {comments.map((comment) => (
        <div
          key={comment.id}
          className="bg-gray-50 rounded-xl border border-gray-200 p-3"
        >
          <div className="flex items-center gap-2 mb-1">
            <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center text-xs font-semibold text-gray-600">
              {comment.author.name.charAt(0)}
            </div>

            <span className="text-sm font-medium text-gray-700">
              {comment.author.name}
            </span>
          </div>

          <p className="text-sm text-gray-700">{comment.content}</p>
        </div>
      ))}
    </div>
  );
}
