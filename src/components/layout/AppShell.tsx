"use client";

import { ReactNode } from "react";

export default function AppShell({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen w-full bg-slate-950 text-white overflow-hidden flex flex-col">
      <div className="h-16 border-b border-slate-800 flex items-center justify-between px-4 sm:px-6 bg-slate-900 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center font-bold text-slate-950 shadow-sm">
            P
          </div>
          <div>
            <h1 className="font-semibold text-lg sm:text-xl">API Client</h1>
            <p className="text-xs text-slate-400 sm:text-sm">Build and test APIs faster</p>
          </div>
        </div>
        <div className="text-xs sm:text-sm text-slate-400 hidden sm:block">Next.js + MySQL</div>
      </div>

      <div className="flex-1 overflow-hidden">
        {children}
      </div>
    </div>
  );
}