"use client";

import { useState } from "react";
import { updateByIdPublication } from "@/src/services/publication-service";
import type { Publication } from "@/src/app/types/type-publication";

interface Props {
    publication: Publication;
    onClose?: (updatedTitle: string, updatedContent: string) => void;
}

export default function UpdatePublication({ publication, onClose }: Props) {
    const [title, setTitle] = useState(publication.title);
    const [content, setContent] = useState(publication.content);
    const [loading, setLoading] = useState(false);

    const handleUpdate = async () => {
        setLoading(true);
        await updateByIdPublication(publication.id, title, content);
        setLoading(false);
        onClose?.(title, content);
    };

    return (
        <div className="flex flex-col gap-3 mb-4">
            <div className="flex flex-col gap-1">
                <label htmlFor="title" className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Title
                </label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
            </div>
            <div className="flex flex-col gap-1">
                <label htmlFor="content" className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Content
                </label>
                <textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={4}
                    className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none"
                />
            </div>
            <div className="flex gap-2 justify-end">
                <button
                    type="button"
                    onClick={handleUpdate}
                    disabled={loading}
                    className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold px-5 py-2 rounded-full transition-all duration-200 shadow-sm hover:shadow-md"
                >
                    {loading ? "Saving..." : "Save"}
                </button>
            </div>
        </div>
    );
}