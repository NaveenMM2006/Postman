"use client";

import { useEffect, useState } from "react";

import dynamic from "next/dynamic";

import {
  useTabStore,
} from "@/store/tabStore";

const ReactJson = dynamic(
  async () => {

    const mod =
      await import(
        "@microlink/react-json-view"
      );

    return mod.default;
  },
  {
    ssr: false,
  }
);

export default function ResponseViewer() {

  const [mounted, setMounted] =
    useState(false);

const {
  tabs,
  activeTabId,
} = useTabStore();

const activeTab =
  tabs.find(
    (tab) =>
      tab.id === activeTabId
  );

const response =
  activeTab?.response;

  useEffect(() => {

    setMounted(true);

  }, []);

  if (!mounted) {

    return null;
  }

  if (!response) {

    return (
      <div className="
        h-screen
        flex
        items-center
        justify-center
        text-gray-600
      ">
        No Response Yet
      </div>
    );
  }

  const isError =
    response.success === false;

  const isJsonObject =
    typeof response.data === "object" &&
    response.data !== null;

  return (
    <div className="min-h-full overflow-auto bg-slate-100 text-slate-950">
      <div className="sticky top-0 z-10 border-b border-slate-200 bg-white/95 backdrop-blur-sm px-4 py-4 md:px-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-xl font-semibold">Response</h2>
          <div className="flex flex-wrap gap-3">
            {response.status && (
              <div className={`px-3 py-1 rounded text-sm font-medium ${
                response.status < 300 ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"
              }`}>
                {response.status}
              </div>
            )}
            {response.time && (
              <div className="px-3 py-1 rounded text-sm bg-slate-200 text-slate-700">
                {response.time} ms
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="p-4 md:p-6">
        {isError ? (
          <div className="bg-rose-50 border border-rose-200 text-rose-700 p-4 rounded-2xl whitespace-pre-wrap text-sm shadow-sm">
            {JSON.stringify(response.error, null, 2)}
          </div>
        ) : isJsonObject ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <ReactJson src={response.data} collapsed={1} displayDataTypes={false} enableClipboard={true} name={false} />
          </div>
        ) : (
          <pre className="whitespace-pre-wrap text-sm bg-white p-4 rounded-2xl border border-slate-200 overflow-auto shadow-sm">
            {String(response.data)}
          </pre>
        )}
      </div>
    </div>
  );
}