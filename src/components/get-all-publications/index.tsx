"use client";

import { useState } from "react";
import Comments from "../get-all-comments";
import type { Publication } from "@/src/app/types/type-publication";
import UpdatePublication from "../update-publication";

export default function Publications({
  publications,
  currentUserId,
}: {
  publications: Publication[];
  currentUserId?: number;
}) {
  const sortedPublications = [...publications].sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
    <div className="max-w-2xl mx-auto flex flex-col gap-6 px-4">
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
  const [localPublication, setLocalPublication] = useState(publication);

  const isAuthor = currentUserId === localPublication.author.id;

  const handleClose = (updatedTitle: string, updatedContent: string) => {
    setLocalPublication((prev) => ({
      ...prev,
      title: updatedTitle,
      content: updatedContent,
      updatedAt: new Date().toISOString(), // atualiza a data também
    }));
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-sm font-semibold text-gray-600">
            {localPublication.author.name.charAt(0)}
          </div>
          <span className="text-sm font-semibold text-gray-700">
            {localPublication.author.name}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {isAuthor && (
            <button
              onClick={() => setIsEditing((prev) => !prev)}
              className="text-xs text-gray-400 hover:text-blue-500 transition-colors font-medium px-2 py-1 rounded-lg hover:bg-blue-50"
            >
              {isEditing ? "Cancel" : "Edit"}
            </button>
          )}
          <span className="text-xs text-gray-400">
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
          <h3 className="text-lg font-bold text-gray-900 mb-2">
            {localPublication.title}
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            {localPublication.content}
          </p>
        </>
      )}

      <div className="flex justify-between items-center text-xs text-gray-400 mt-2">
        <button
          onClick={() =>
            setOpenComments(
              openComments === localPublication.id ? null : localPublication.id
            )
          }
          className="text-gray-500 font-medium hover:text-purple-600 transition-colors"
        >
          {openComments === localPublication.id ? "Close comments" : "Open Comment"}
        </button>
        <span>
          Updated on {new Date(localPublication.updatedAt).toLocaleDateString("en-US")}
        </span>
      </div>

      {openComments === localPublication.id && <Comments publication={localPublication} />}
    </div>
  );
};