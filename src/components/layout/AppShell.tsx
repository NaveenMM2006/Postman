"use client";

import { ReactNode } from "react";

export default function AppShell({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="
      h-screen
      bg-[#0f172a]
      text-white
      overflow-hidden
      flex
      flex-col
    ">

      {/* TOPBAR */}

      <div className="
        h-14
        border-b
        border-slate-700
        flex
        items-center
        px-5
        justify-between
        bg-[#111827]
      ">

        <div className="flex items-center gap-3">

          <div className="
            w-8
            h-8
            rounded-lg
            bg-orange-500
            flex
            items-center
            justify-center
            font-bold
          ">
            P
          </div>

          <div>
            <h1 className="font-bold text-lg">
              API Client
            </h1>
          </div>

        </div>

        <div className="text-sm text-slate-400">
          Next.js + MySQL
        </div>

      </div>

      <div className="flex-1 overflow-hidden">
        {children}
      </div>

    </div>
  );
}