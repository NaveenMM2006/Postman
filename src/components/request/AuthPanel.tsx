"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  useTabStore,
} from "@/store/tabStore";

export default function AuthPanel() {

  const [mounted, setMounted] =
    useState(false);

  const {
    tabs,
    activeTabId,
    updateTab,
  } = useTabStore();

  useEffect(() => {

    setMounted(true);

  }, []);

  if (!mounted) {

    return null;
  }

  const activeTab =
    tabs.find(
      (tab) =>
        tab.id === activeTabId
    );

  if (!activeTab) {

    return null;
  }

  return (
    <div className="rounded p-4 space-y-3" style={{ backgroundColor: "var(--vscode-bg-secondary)", border: `1px solid var(--vscode-border)` }}>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="font-semibold text-sm" style={{ color: "var(--vscode-text)" }}>Authorization</h2>
        <p className="text-xs" style={{ color: "var(--vscode-text-muted)" }}>Set auth headers for this request</p>
      </div>

      <select
        value={activeTab.authType}
        onChange={(e) =>
          updateTab(activeTab.id, {
            authType: e.target.value,
          })
        }
        className="px-3 py-2 rounded w-full text-sm"
        style={{
          backgroundColor: "var(--vscode-bg)",
          color: "var(--vscode-text)",
          border: `1px solid var(--vscode-border)`,
        }}
      >
        <option value="none">No Auth</option>
        <option value="bearer">Bearer Token</option>
        <option value="apikey">API Key</option>
      </select>

      {activeTab.authType === "bearer" && (
        <input
          placeholder="Enter Bearer Token"
          value={activeTab.authValue}
          onChange={(e) =>
            updateTab(activeTab.id, {
              authValue: e.target.value,
            })
          }
          className="px-3 py-2 rounded w-full text-sm"
          style={{
            backgroundColor: "var(--vscode-bg)",
            color: "var(--vscode-text)",
            border: `1px solid var(--vscode-border)`,
          }}
        />
      )}

      {activeTab.authType === "apikey" && (
        <div className="grid gap-2 sm:grid-cols-2">
          <input
            placeholder="Header Key"
            value={activeTab.authKey}
            onChange={(e) =>
              updateTab(activeTab.id, {
                authKey: e.target.value,
              })
            }
            className="px-3 py-2 rounded w-full text-sm"
            style={{
              backgroundColor: "var(--vscode-bg)",
              color: "var(--vscode-text)",
              border: `1px solid var(--vscode-border)`,
            }}
          />

          <input
            placeholder="API Key Value"
            value={activeTab.authValue}
            onChange={(e) =>
              updateTab(activeTab.id, {
                authValue: e.target.value,
              })
            }
            className="px-3 py-2 rounded w-full text-sm"
            style={{
              backgroundColor: "var(--vscode-bg)",
              color: "var(--vscode-text)",
              border: `1px solid var(--vscode-border)`,
            }}
          />
        </div>
      )}
    </div>
  );
}