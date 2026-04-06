"use client";

import { useEffect, useState } from "react";
import { apiClient } from "@/src/libs/api";

type User = {
  id: number;
  name: string;
  username?: string;
};

export default function SearchUsers() {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) return setUsers([]);

    const controller = new AbortController();
    const timeout = setTimeout(async () => {
      try {
        setLoading(true);
        const { data } = await apiClient.get("/users", {
          params: { search: query },
          signal: controller.signal,
        });
        setUsers(data);
      } catch (error: any) {
        if (error.name !== "CanceledError") console.error(error);
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => { clearTimeout(timeout); controller.abort(); };
  }, [query]);

  return (
    <div className="w-full">
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
          </svg>
        </div>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search people..."
          className="w-full pl-10 pr-4 py-3 bg-black border border-purple-900 rounded-full text-sm text-white placeholder:text-neutral-600 outline-none focus:border-neutral-700 transition-all"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-600 hover:text-white transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {query && (
        <div className="mt-1 bg-black border border-neutral-800 rounded-2xl overflow-hidden">
          {loading && (
            <div className="px-4 py-4 text-center">
              <svg className="animate-spin h-4 w-4 text-neutral-500 mx-auto" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            </div>
          )}
          {!loading && users.length === 0 && (
            <p className="px-4 py-4 text-sm text-neutral-500 text-center">No results for "{query}"</p>
          )}
          {!loading && users.length > 0 && (
            <div className="divide-y divide-neutral-900 max-h-72 overflow-y-auto">
              {users.map((user) => (
                <div key={user.id} className="px-4 py-3 hover:bg-neutral-900 cursor-pointer transition-colors flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center text-xs font-semibold text-white shrink-0">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-sm font-semibold text-white truncate">{user.name}</span>
                    {user.username && <span className="text-xs text-neutral-500">@{user.username}</span>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}