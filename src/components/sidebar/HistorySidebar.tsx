"use client";

import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

export default function HistorySidebar() {

  const [history, setHistory] =
    useState<any[]>([]);

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

  useEffect(() => {

    loadHistory();

  }, []);

  return (
    <div className="w-full max-w-sm md:w-80 border-l border-slate-800 h-screen overflow-auto bg-slate-950 text-slate-100">
      <div className="p-4 border-b border-slate-800 font-semibold text-lg">History</div>
      <div className="space-y-2 p-4">
        {history.map((item) => (
          <div key={item.id} className="rounded-2xl border border-slate-800 bg-slate-900 p-3 transition hover:bg-slate-800 cursor-pointer">
            <div className="flex flex-wrap items-center gap-2 mb-2 text-xs text-slate-400">
              <span className="rounded-full bg-slate-700 px-2 py-1 font-semibold text-slate-100">{item.method}</span>
              <span>{item.status}</span>
            </div>
            <p className="text-sm truncate text-slate-200">{item.url}</p>
          </div>
        ))}
      </div>
    </div>
  );
}