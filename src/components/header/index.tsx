"use client";

import { useAuth } from "@/src/app/context";
import Link from "next/link";
import { use } from "react";

export default function Header() {
  const { user } = useAuth();
  return (
    <header className="bg-black text-white px-6 py-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <img src="/icon.png" alt="icon" className="w-10 h-10" />

        <nav>
          <ul className="flex gap-6">
            <li className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center text-xs font-semibold text-white shrink-0">
              {user?.name ? user.name.charAt(0) : "U"}
            </li>
            <li>
              <Link href="/perfil" className="hover:text-white transition">
                {user?.name || "Perfil"}
              </Link>
            </li>
            <li>
              <Link href="/" className="hover:text-white transition">
                log out
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
