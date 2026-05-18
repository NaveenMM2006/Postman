"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  useTabStore,
} from "@/store/tabStore";

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
    <div className="flex items-center border-b border-slate-700 overflow-x-auto bg-slate-900 text-slate-100 font-semibold">
      {tabs.map((tab) => (
        <div
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`flex items-center gap-2 px-4 py-3 border-r border-slate-700 cursor-pointer transition ${
            activeTabId === tab.id ? "bg-slate-800 text-white" : "hover:bg-slate-700"
          }`}
        >
          <span className="text-sm truncate max-w-[120px]">{tab.name}</span>
          {tabs.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                removeTab(tab.id);
              }}
              className="text-slate-400 hover:text-red-400"
            >
              ×
            </button>
          )}
        </div>
      ))}
      <button
        onClick={addTab}
        className="px-4 py-3 text-lg hover:bg-slate-800"
      >
        +
      </button>
    </div>
  );
}