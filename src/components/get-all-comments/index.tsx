"use client";

import { useEffect, useState } from "react";
import { getAllComments } from "@/src/services/comment-service";
import type { Comment } from "@/src/app/types/type-comment";
import CreateComment from "../create-comment";
import { Publication } from "@/src/app/types/type-publication";

type CommentsProps = {
  publication: Publication;
};


export default function Comments({ publication }: CommentsProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  const handleRevalidateComments = async () => {
    setLoading(true);
    const response = await getAllComments();
    const filteredComments = response.filter(
      (comment: Comment) => comment.publicationId === publication.id,
    );
    setComments(filteredComments);
    setLoading(false);
  }

  useEffect(() => {
    handleRevalidateComments();
  }, []);

  if (loading) {
    return <p className="text-sm text-gray-400 mt-3">Loading comments...</p>;
  }

  return (
    <div className="mt-4 border-t border-gray-100 pt-4">
      <CreateComment
        publication={publication}
        onCreate={() => {
          handleRevalidateComments();
        }}
      />
      <div className="flex flex-col gap-3 mt-4">
        {
          comments.length === 0 && (
            <p className="text-sm text-gray-400 mt-3">No comments yet.</p>
          )
        }
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
    </div>
  );
}
