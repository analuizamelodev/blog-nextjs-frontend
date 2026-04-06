"use client";

import { useEffect, useState } from "react";
import Header from "@/src/components/header";
import Publications from "@/src/components/get-all-publications";
import SearchUsers from "@/src/components/search-users";
import CreatePublication from "@/src/components/create-publication";
import { getPublications } from "@/src/services/publication-service";
import type { Publication } from "@/src/app/types/type-publication";
import type { Comment } from "../types/type-comment";
import CreateComment from "@/src/components/create-comment";
import { getAllComments } from "@/src/services/comment-service";

export default function PostsPage() {
  const [publications, setPublications] = useState<Publication[]>([]);

  const fetchPublications = async () => {
    const response = await getPublications();
    setPublications(response);
  };

  useEffect(() => {
    fetchPublications();
  }, []);

  return (
    <div className="flex flex-col ">
      <Header />
      <div className="flex flex-col space-y-4 mt-4 container mx-auto px-4 max-w-6/12">

        <SearchUsers />
        <CreatePublication onCreate={fetchPublications} />
        <Publications publications={publications} />
      </div>

    </div>
  );
}