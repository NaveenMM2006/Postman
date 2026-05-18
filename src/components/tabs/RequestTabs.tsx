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
      border-b
      overflow-x-auto
      bg-gray-500
      text-gray-900
      font-bold
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
            gap-2
            px-4
            py-3
            border-r
            cursor-pointer
            min-w-fit
            transition
            ${
              activeTabId === tab.id
                ? "bg-gray-500"
                : "hover:bg-blue-500"
            }
          `}
        >

          <span className="text-sm">
            {tab.name}
          </span>

          {tabs.length > 1 && (

            <button
              onClick={(e) => {

                e.stopPropagation();

                removeTab(tab.id);
              }}

              className="
                text-gray-600
                hover:text-red-500
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
          px-4
          py-3
          text-lg
          hover:bg-gray-800
        "
      >
        +
      </button>

    </div>
  );
}