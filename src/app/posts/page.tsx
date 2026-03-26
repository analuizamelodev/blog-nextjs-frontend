"use client";

import { useEffect, useState } from "react";
import Header from "@/src/components/header";
import Publications from "@/src/components/get-all-publications";
import SearchUsers from "@/src/components/search-users";
import CreatePublication from "@/src/components/create-publication";
import { getPublications } from "@/src/services/publication-service";

type Publication = {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  author: {
    id: number;
    name: string;
  };
};

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
    <div>
      <Header />
      <SearchUsers />
      <br />
      <CreatePublication onCreate={fetchPublications} />
      <br />
      <Publications publications={publications} />
    </div>
  );
}