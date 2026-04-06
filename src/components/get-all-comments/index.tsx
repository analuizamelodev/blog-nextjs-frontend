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
    return <p className="text-sm text-white mt-3">Loading comments...</p>;
  }

  return (
    <div className="mt-4 border-t pt-4">
      <CreateComment
        publication={publication}
        onCreate={() => {
          handleRevalidateComments();
        }}
      />
      <div className="flex flex-col gap-3 mt-4">
        {
          comments.length === 0 && (
            <p className="text-sm text-white mt-3">No comments yet.</p>
          )
        }
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="bg-black rounded-xl border p-3"
          >
            <div className="flex items-center gap-2 mb-1">
              <div className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center text-xs font-semibold text-white shrink-0">
                {comment.author.name.charAt(0)}
              </div>

              <span className="text-sm font-medium text-white">
                {comment.author.name}
              </span>
            </div>

            <p className="text-sm text-white">{comment.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
