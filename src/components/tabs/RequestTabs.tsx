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

    <div className="
      flex
      items-center
      overflow-x-auto
      scrollbar-thin
      bg-[#111827]
    ">

      {tabs.map((tab) => (

        <div
          key={tab.id}
          onClick={() =>
            setActiveTab(tab.id)
          }
          className={`
            flex
            items-center
            gap-3
            px-5
            py-3
            border-r
            border-slate-800
            cursor-pointer
            min-w-fit
            transition-all
            ${
              activeTabId === tab.id
                ? "bg-[#1e293b] text-white"
                : "text-slate-400 hover:bg-slate-800"
            }
          `}
        >

          <div className="
            w-2
            h-2
            rounded-full
            bg-orange-500
          " />

          <span className="
            text-sm
            font-medium
            max-w-[140px]
            truncate
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
                text-slate-500
                hover:text-red-400
                text-lg
              "
            >
              ×
            </button>

          )}

        </div>

      ))}

      <button
        onClick={addTab}
        className="
          px-5
          py-3
          text-slate-400
          hover:bg-slate-800
          hover:text-white
          text-xl
          transition
        "
      >
        +
      </button>

    </div>
  );
}