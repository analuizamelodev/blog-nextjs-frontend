"use client";

import { useAuth } from "@/src/app/context";
import Link from "next/link";
import { use } from "react";

export default function Header() {
  const { user } = useAuth();
  return (
    <header className="bg-black text-white px-6 py-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <h1 className="text-2xl font-bold">My Next.js App</h1>

        <nav>
          <ul className="flex gap-6">
            <li className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center text-xs font-semibold text-gray-600">
              {user?.name ? user.name.charAt(0) : "U"}
            </li>
            <li>
              <Link href="/perfil" className="hover:text-gray-400 transition">
                {user?.name || "Perfil"}
              </Link>
            </li>
            <li>
              <Link href="/" className="hover:text-gray-400 transition">
                log out
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
