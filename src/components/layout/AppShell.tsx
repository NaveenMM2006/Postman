"use client";

import { ReactNode } from "react";
import { Send } from "lucide-react";

export default function AppShell({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen w-full overflow-hidden flex flex-col" style={{ backgroundColor: "var(--vscode-bg)" }}>
      <header className="h-14 border-b flex items-center justify-between px-4 sm:px-6" style={{ borderColor: "var(--vscode-border)", backgroundColor: "var(--vscode-bg-secondary)" }}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-white" style={{ backgroundColor: "var(--vscode-accent)" }}>
            <Send size={18} strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="font-semibold text-base sm:text-lg" style={{ color: "var(--vscode-text)" }}>API Client</h1>
          </div>
        </div>
        <div className="text-xs sm:text-sm hidden sm:block" style={{ color: "var(--vscode-text-muted)" }}>REST API Testing Suite</div>
      </header>

      <div className="flex-1 overflow-hidden">
        {children}
      </div>
    </div>
  );
}