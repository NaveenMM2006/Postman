"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  useTabStore,
} from "@/store/tabStore";

import {
  Plus,
  X,
} from "lucide-react";

const METHOD_COLORS: Record<string, { bg: string; text: string }> = {
  GET: { bg: "#0e639c", text: "#ffffff" },
  POST: { bg: "#009000", text: "#ffffff" },
  PUT: { bg: "#e8ab53", text: "#1e1e1e" },
  PATCH: { bg: "#c586c0", text: "#ffffff" },
  DELETE: { bg: "#cd3131", text: "#ffffff" },
};

export default function RequestTabs() {

  const [mounted, setMounted] =
    useState(false);

  const {
    tabs,
    activeTabId,
    addTab,
    removeTab,
    setActiveTab,
  } = useTabStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (

    <div className="
      flex
      items-center
      overflow-x-auto
      h-full
      scrollbar-thin
      gap-1
      px-2
    " style={{ backgroundColor: "var(--vscode-bg)" }}>

      {tabs.map((tab) => {
        const methodColor = METHOD_COLORS[tab.method] || METHOD_COLORS.GET;

        return (
          <div
            key={tab.id}
            onClick={() =>
              setActiveTab(tab.id)
            }
            className="
              flex
              items-center
              gap-2
              px-3
              py-2
              rounded-t
              cursor-pointer
              min-w-fit
              transition-all
              group
              border-b-2
              flex-shrink-0
            "
            style={{
              backgroundColor: activeTabId === tab.id ? "var(--vscode-bg-secondary)" : "transparent",
              borderColor: activeTabId === tab.id ? methodColor.bg : "transparent",
              color: activeTabId === tab.id ? "var(--vscode-text)" : "var(--vscode-text-muted)",
            }}
          >

            <span
              className="
                text-xs
                font-bold
                px-1.5
                py-0.5
                rounded
                flex-shrink-0
              "
              style={{
                backgroundColor: methodColor.bg,
                color: methodColor.text,
              }}
            >
              {tab.method}
            </span>

            <span className="
              text-sm
              font-medium
              max-w-[120px]
              truncate
              flex-shrink
            ">
              {tab.name}
            </span>

            {tabs.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeTab(tab.id);
                }}
                className="
                  text-xs
                  opacity-0
                  group-hover:opacity-100
                  transition-opacity
                  flex-shrink-0
                  p-0.5
                  rounded
                  hover:bg-red-500/20
                "
                style={{ color: "var(--vscode-text-muted)" }}
              >
                <X size={14} />
              </button>
            )}

          </div>
        );
      })}

      <button
        onClick={addTab}
        className="
          px-2
          py-2
          rounded
          transition-colors
          flex-shrink-0
          hover:bg-slate-700
        "
        style={{ color: "var(--vscode-text-muted)" }}
        title="New Tab"
      >
        <Plus size={16} />
      </button>

    </div>
  );
}