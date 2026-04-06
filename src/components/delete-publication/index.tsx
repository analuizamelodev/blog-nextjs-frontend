"use client";

import { useState } from "react";
import { deleteByIdPublication } from "@/src/services/publication-service";
import type { Publication } from "@/src/app/types/type-publication";

interface Props {
    publication: Publication;
    onDelete: () => void;
}

export default function DeletePublication({ publication, onDelete }: Props) {
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        setLoading(true);
        await deleteByIdPublication(publication.id);
        setLoading(false);
        onDelete();
    };

    return (
        <button
            className="text-xs text-white hover:text-purple-600 transition-colors font-medium px-2 py-1 rounded-lg"
            onClick={handleDelete}
        >
            {loading ? "Deleting..." : "Delete"}
        </button>
    );
}