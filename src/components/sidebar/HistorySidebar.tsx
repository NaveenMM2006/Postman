"use client";

import {
  useEffect,
  useState,
} from "react";

import axios from "axios";
import { Clock, Trash2, Check } from "lucide-react";

const METHOD_COLORS: Record<string, string> = {
  GET: "#0e639c",
  POST: "#009000",
  PUT: "#e8ab53",
  PATCH: "#c586c0",
  DELETE: "#cd3131",
};

export default function HistorySidebar() {

  const [history, setHistory] =
    useState<any[]>([]);

  const [selectedItems, setSelectedItems] =
    useState<Set<number>>(new Set());

  async function loadHistory() {

    try {

      const response =
        await axios.get(
          "/api/history"
        );

      setHistory(
        response.data
      );

    } catch (error) {

      console.error(error);
    }
  }

  function toggleSelectItem(id: number) {
    const newSelected = new Set(selectedItems);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedItems(newSelected);
  }

  function toggleSelectAll() {
    if (selectedItems.size === history.length) {
      setSelectedItems(new Set());
    } else {
      setSelectedItems(
        new Set(history.map((item) => item.id))
      );
    }
  }

  async function deleteHistoryItem(
    id: number
  ) {
    const confirmed = window.confirm(
      "Delete this history entry?"
    );

    if (!confirmed) {
      return;
    }

    await axios.delete(
      `/api/history?id=${id}`
    );

    loadHistory();
  }

  async function deleteSelectedItems() {
    if (selectedItems.size === 0) {
      return;
    }

    const confirmed = window.confirm(
      `Delete ${selectedItems.size} history ${
        selectedItems.size === 1 ? "entry" : "entries"
      }?`
    );

    if (!confirmed) {
      return;
    }

    try {
      await Promise.all(
        Array.from(selectedItems).map((id) =>
          axios.delete(`/api/history?id=${id}`)
        )
      );
      setSelectedItems(new Set());
      loadHistory();
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {

    loadHistory();

  }, []);

  return (
    <div className="
      w-full
      max-w-sm
      md:w-80
      h-screen
      overflow-auto
      flex
      flex-col
      border-l
    " style={{ backgroundColor: "var(--vscode-bg)", borderColor: "var(--vscode-border)" }}>
      <div className="
        p-4
        border-b
        font-semibold
        text-sm
        flex
        items-center
        gap-2
        flex-shrink-0
        justify-between
      " style={{ backgroundColor: "var(--vscode-bg-secondary)", borderColor: "var(--vscode-border)", color: "var(--vscode-text)" }}>
        <div className="flex items-center gap-2">
          <Clock size={14} />
          History
        </div>
        {selectedItems.size > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-xs">
              {selectedItems.size} selected
            </span>
            <button
              type="button"
              onClick={deleteSelectedItems}
              className="
                p-1
                rounded
                text-red-400
                hover:bg-white/10
                transition-colors
              "
              title="Delete selected items"
            >
              <Trash2 size={14} />
            </button>
          </div>
        )}
      </div>
      <div className="
        space-y-2
        p-4
        flex-1
        overflow-auto
      ">
        {history.map((item) => (
          <div
            key={item.id}
            className="
              rounded
              border
              p-3
              transition-colors
              hover:bg-opacity-50
              cursor-pointer
            "
            style={{
              backgroundColor: selectedItems.has(item.id)
                ? "rgba(33, 150, 243, 0.2)"
                : "var(--vscode-bg-secondary)",
              borderColor: selectedItems.has(item.id)
                ? "rgb(33, 150, 243)"
                : "var(--vscode-border)",
              color: "var(--vscode-text)",
            }}
          >
            <div className="
              flex
              flex-wrap
              items-center
              gap-2
              mb-2
              text-xs
              justify-between
            ">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => toggleSelectItem(item.id)}
                  className="
                    p-1
                    rounded
                    transition-colors
                    flex-shrink-0
                  "
                  style={{
                    color: selectedItems.has(item.id)
                      ? "rgb(33, 150, 243)"
                      : "var(--vscode-text-muted)",
                  }}
                >
                  <Check
                    size={16}
                    fill={
                      selectedItems.has(item.id)
                        ? "currentColor"
                        : "none"
                    }
                  />
                </button>
                <span
                  className="
                    rounded
                    px-2
                    py-1
                    font-semibold
                    text-white
                  "
                  style={{
                    backgroundColor: METHOD_COLORS[item.method] || METHOD_COLORS.GET,
                  }}
                >
                  {item.method}
                </span>
                <span
                  style={{ color: "var(--vscode-text-muted)" }}
                >
                  {item.status}
                </span>
              </div>
              <button
                type="button"
                onClick={() => deleteHistoryItem(item.id)}
                className="
                  p-1
                  rounded
                  text-red-400
                  hover:bg-white/10
                  transition-colors
                "
                style={{
                  backgroundColor: "transparent",
                }}
              >
                <Trash2 size={14} />
              </button>
            </div>
            <p className="
              text-xs
              truncate
            " style={{ color: "var(--vscode-text-muted)" }}>
              {item.url}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}