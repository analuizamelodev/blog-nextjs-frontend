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
    if (!query.trim()) {
      setUsers([]);
      return;
    }

    const controller = new AbortController();
    const timeout = setTimeout(async () => {
      try {
        setLoading(true);
        const response = await apiClient.get("/users", {
          params: { search: query },
          signal: controller.signal,
        });
        setUsers(response.data);
      } catch (error: any) {
        if (error.name !== "CanceledError") console.error(error);
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => {
      clearTimeout(timeout);
      controller.abort();
    };
  }, [query]);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="relative group">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search users..."
          className="w-full pl-3 pr-8 py-1.5 bg-white border border-gray-200 rounded-lg shadow-sm outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-sm text-gray-700 placeholder:text-gray-400"
        />
        <div className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400">
          {loading ? (
            <svg className="animate-spin h-3.5 w-3.5 text-blue-500" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          )}
        </div>
      </div>
      {query && (
        <div className="mt-1 bg-white border border-gray-100 rounded-lg shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
          {users.length > 0 ? (
            <div className="divide-y divide-gray-50 max-h-60 overflow-y-auto">
              {users.map((user) => (
                <div
                  key={user.id}
                  className="px-3 py-2 hover:bg-gray-50 cursor-pointer transition-colors flex flex-col"
                >
                  <span className="text-xs font-semibold text-gray-700">{user.name}</span>
                  {user.username && (
                    <span className="text-[10px] text-gray-400 leading-tight">@{user.username}</span>
                  )}
                </div>
              ))}
            </div>
          ) : !loading && (
            <div className="px-3 py-4 text-center text-xs text-gray-400">
              No results found
            </div>
          )}
        </div>
      )}
    </div>
  );
}