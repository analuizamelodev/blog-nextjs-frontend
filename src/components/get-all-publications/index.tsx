"use client";

import { useState } from "react";
import Comments from "../get-all-comments";
import type { Publication } from "@/src/app/types/type-publication";
import UpdatePublication from "../update-publication";
import DeletePublication from "../delete-publication";

export default function Publications({
  publications,
  currentUserId,
}: {
  publications: Publication[];
  currentUserId?: number;
}) {
  const sortedPublications = [...publications].sort((a, b) =>
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div className=" mx-auto flex flex-col gap-4 w-full">
      {sortedPublications.map((publication) => (
        <Publication
          key={publication.id}
          publication={publication}
          currentUserId={currentUserId}
        />
      ))}
    </div>
  );
}

const Publication = ({
  publication,
  currentUserId,
}: {
  publication: Publication;
  currentUserId?: number;
}) => {
  const [openComments, setOpenComments] = useState<number | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [localPublication, setLocalPublication] = useState(publication);

  const isAuthor = currentUserId === localPublication.author.id;

  const handleClose = (updatedTitle: string, updatedContent: string) => {
    setLocalPublication((prev) => ({
      ...prev,
      title: updatedTitle,
      content: updatedContent,
      updatedAt: new Date().toISOString(),
    }));
    setIsEditing(false);
  };

  if (isDeleted) return null;

  return (
    <div className="bg-black rounded-2xl border border-purple-900 p-5 shadow-sm hover:shadow-md transition">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center text-xs font-semibold text-white shrink-0">
            {localPublication.author.name.charAt(0)}
          </div>
          <span className="text-sm font-semibold text-white">
            {localPublication.author.name}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {isAuthor && (
            <>
              <button
                onClick={() => setIsEditing((prev) => !prev)}
                className="text-xs text-white hover:text-purple-600 transition-colors font-medium px-2 py-1 rounded-lg"
              >
                {isEditing ? "Cancel" : "Edit"}
              </button>
              <DeletePublication
                publication={localPublication}
                onDelete={() => setIsDeleted(true)}
              />
            </>
          )}
          <span className="text-xs text-white">
            {new Date(localPublication.createdAt).toLocaleDateString("en-US")}
          </span>
        </div>
      </div>

      {isEditing ? (
        <UpdatePublication
          publication={localPublication}
          onClose={handleClose}
        />
      ) : (
        <>
          <h3 className="text-lg font-bold text-white mb-2">
            {localPublication.title}
          </h3>
          <p className="text-white leading-relaxed mb-4">
            {localPublication.content}
          </p>
        </>
      )}

      <div className="flex justify-between items-center text-xs text-white mt-2">
        <button
          onClick={() =>
            setOpenComments(
              openComments === localPublication.id ? null : localPublication.id
            )
          }
          className="text-white font-medium hover:text-purple-600 transition-colors"
        >
          {openComments === localPublication.id ? "Close comments" : "Open Comment"}
        </button>
        <span>
          Updated on {new Date(localPublication.updatedAt).toLocaleDateString("en-US")}
        </span>
      </div>

      {openComments === localPublication.id && (
        <Comments publication={localPublication} />
      )}
    </div>
  );
};