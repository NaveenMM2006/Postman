"use client";

import {
  useTabStore,
} from "@/store/tabStore";

export default function QueryParams() {

  const {
    tabs,
    activeTabId,
    updateTab,
  } = useTabStore();

  const activeTab =
    tabs.find(
      (tab) =>
        tab.id === activeTabId
    );

  if (!activeTab) {
    return null;
  }

  const queryParams = activeTab.queryParams;
  const activeTabIdValue = activeTab.id;

  function updateParam(
    index: number,
    field: "key" | "value",
    value: string
  ) {

    const updated =
      [...queryParams];

    updated[index][field] =
      value;

    updateTab(
      activeTabIdValue,
      {
        queryParams:
          updated,
      }
    );
  }

  function addParam() {
    updateTab(
      activeTabIdValue,
      {
        queryParams: [
          ...queryParams,
          {
            key: "",
            value: "",
          },
        ],
      }
    );
  }

  function removeParam(
    index: number
  ) {
    const updated =
      queryParams.filter(
        (_, i) =>
          i !== index
      );

    updateTab(
      activeTabIdValue,
      {
        queryParams:
          updated,
      }
    );
  }

  return (
    <div className="border border-slate-700 rounded-2xl p-4 space-y-4 bg-slate-800 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="font-semibold text-lg text-white">Query Params</h2>
        <button
          onClick={addParam}
          className="inline-flex items-center justify-center rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
        >
          Add
        </button>
      </div>

      <div className="space-y-3">
        {queryParams.map((param, index) => (
          <div key={index} className="grid gap-2 sm:grid-cols-[1fr_1fr_auto] items-end">
            <input
              placeholder="Key"
              value={param.key}
              onChange={(e) => updateParam(index, "key", e.target.value)}
              className="w-full border border-slate-600 bg-slate-900 text-white p-2 rounded"
            />
            <input
              placeholder="Value"
              value={param.value}
              onChange={(e) => updateParam(index, "value", e.target.value)}
              className="w-full border border-slate-600 bg-slate-900 text-white p-2 rounded"
            />
            <button
              onClick={() => removeParam(index)}
              className="h-10 rounded-full border border-red-500 text-red-400 hover:bg-red-500/10"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}