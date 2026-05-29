"use client";

import {
  useTabStore,
} from "@/store/tabStore";

import {
  X,
  Plus,
} from "lucide-react";

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
    <div className="rounded p-4 space-y-3" style={{ backgroundColor: "var(--vscode-bg-secondary)", border: `1px solid var(--vscode-border)` }}>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="font-semibold text-sm" style={{ color: "var(--vscode-text)" }}>Query Params</h2>
        <button
          onClick={addParam}
          className="inline-flex items-center justify-center rounded px-2 py-1 text-xs font-medium transition hover:bg-opacity-80"
          style={{
            backgroundColor: "var(--vscode-accent)",
            color: "#ffffff",
          }}
        >
          <Plus size={14} />
          Add
        </button>
      </div>

      <div className="space-y-2">
        {queryParams.map((param, index) => (
          <div key={index} className="grid gap-2 sm:grid-cols-[1fr_1fr_auto] items-center">
            <input
              placeholder="Key"
              value={param.key}
              onChange={(e) => updateParam(index, "key", e.target.value)}
              className="w-full px-3 py-1.5 rounded text-sm"
              style={{
                backgroundColor: "var(--vscode-bg)",
                color: "var(--vscode-text)",
                border: `1px solid var(--vscode-border)`,
              }}
            />
            <input
              placeholder="Value"
              value={param.value}
              onChange={(e) => updateParam(index, "value", e.target.value)}
              className="w-full px-3 py-1.5 rounded text-sm"
              style={{
                backgroundColor: "var(--vscode-bg)",
                color: "var(--vscode-text)",
                border: `1px solid var(--vscode-border)`,
              }}
            />
            <button
              onClick={() => removeParam(index)}
              className="px-2 py-1.5 rounded transition hover:opacity-80"
              style={{
                backgroundColor: "rgba(205, 49, 49, 0.1)",
                color: "#cd3131",
                border: `1px solid rgba(205, 49, 49, 0.3)`,
              }}
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}