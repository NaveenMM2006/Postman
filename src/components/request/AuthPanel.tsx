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
    <div className="border border-slate-700 rounded-2xl p-4 space-y-4 bg-slate-800 shadow-sm">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="font-semibold text-lg text-white">Authorization</h2>
        <p className="text-sm text-slate-400">Set auth headers for this request</p>
      </div>

      <select
        value={activeTab.authType}
        onChange={(e) =>
          updateTab(activeTab.id, {
            authType: e.target.value,
          })
        }
        className="border border-slate-600 bg-slate-900 text-white p-2 rounded w-full"
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
          className="border border-slate-600 bg-slate-900 text-white p-2 rounded w-full"
        />
      )}

      {activeTab.authType === "apikey" && (
        <div className="grid gap-3 sm:grid-cols-2">
          <input
            placeholder="Header Key"
            value={activeTab.authKey}
            onChange={(e) =>
              updateTab(activeTab.id, {
                authKey: e.target.value,
              })
            }
            className="border border-slate-600 bg-slate-900 text-white p-2 rounded w-full"
          />

          <input
            placeholder="API Key Value"
            value={activeTab.authValue}
            onChange={(e) =>
              updateTab(activeTab.id, {
                authValue: e.target.value,
              })
            }
            className="border border-slate-600 bg-slate-900 text-white p-2 rounded w-full"
          />
        </div>
      )}
    </div>
  );
}