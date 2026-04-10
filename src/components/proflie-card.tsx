"use client";

import { useAuth } from "@/src/app/context";

export default function ProfileCard() {
    const { user } = useAuth();

    return (
        <div className="bg-black text-white overflow-hidden border border-purple-900 rounded-2xl ">
            <div className="h-24 bg-zinc-800 w-full" />
            <div className="px-4 pb-6">
                <div className="flex justify-between items-end -mt-10 mb-3">
                    <div className="w-20 h-20 rounded-full border-4 border-black bg-white flex items-center justify-center text-2xl font-bold text-black">
                        {user?.name?.charAt(0) || "A"}
                    </div>
                </div>
                <div className="space-y-3">
                    <div>
                        <h2 className="text-xl font-bold leading-tight">{user?.name || "Nome do Usuário"}</h2>
                    </div>
                </div>
            </div>
        </div>
    );
}