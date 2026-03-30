"use client";

import { useState } from "react";
import Comments from "../get-all-comments";
import type { Publication } from "@/src/app/types/type-publication";
import CreateComment from "../create-comment";

export default function Publications({
  publications,
}: {
  publications: Publication[];
}) {

  const sortedPublications = [...publications].sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
    <div className="max-w-2xl mx-auto flex flex-col gap-6 px-4">
      {sortedPublications.map((publication) => (
        <Publication key={publication.id} publication={publication} />
      ))}
    </div>
  );
}

const Publication = ({ publication }: { publication: Publication }) => {
  //sempre que abrir os comentarios da publicação, carrega os comentários mais recentes
  const [openComments, setOpenComments] = useState<number | null>(null);

  return (
    <div
      key={publication.id}
      className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-sm font-semibold text-gray-600">
            {publication.author.name.charAt(0)}
          </div>

          <span className="text-sm font-semibold text-gray-700">
            {publication.author.name}
          </span>
        </div>

        <span className="text-xs text-gray-400">
          {new Date(publication.createdAt).toLocaleDateString("en-US")}
        </span>
      </div>

      <h3 className="text-lg font-bold text-gray-900 mb-2">
        {publication.title}
      </h3>

      <p className="text-gray-700 leading-relaxed mb-4">
        {publication.content}
      </p>

      <div className="flex justify-between items-center text-xs text-gray-400">
        <button
          onClick={() =>
            setOpenComments(
              openComments === publication.id ? null : publication.id
            )
          }
          className="text-gray-500 font-medium hover:text-purple-600 transition-colors"
        >
          {openComments === publication.id
            ? "Close comments"
            : "Open Comment"}
        </button>

        <span>
          Updated on{" "}
          {new Date(publication.updatedAt).toLocaleDateString("en-US")}
        </span>
      </div>

      {openComments === publication.id && (


        <Comments publication={publication} />

      )}
    </div>
  )
}