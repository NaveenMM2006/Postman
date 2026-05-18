"use client";

import { useState } from "react";

import {
  useEnvStore,
} from "@/store/envStore";

export default function EnvironmentPanel() {

  const {
    variables,
    setVariable,
  } = useEnvStore();

  const [key, setKey] =
    useState("");

  const [value, setValue] =
    useState("");

  function addVariable() {

    if (!key || !value) return;

    setVariable(key, value);

    setKey("");

    setValue("");
  }

  return (
    <div className="border-t border-slate-800 p-4">
      <h2 className="font-semibold text-white mb-3">Environment Variables</h2>
      <div className="grid gap-3">
        <input
          placeholder="KEY"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          className="w-full border border-slate-700 bg-slate-900 text-white p-2 rounded"
        />
        <input
          placeholder="VALUE"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full border border-slate-700 bg-slate-900 text-white p-2 rounded"
        />
        <button
          onClick={addVariable}
          className="w-full bg-emerald-500 text-slate-950 p-2 rounded font-semibold transition hover:bg-emerald-400"
        >
          Add Variable
        </button>
      </div>

      <div className="mt-5 space-y-3">
        {Object.entries(variables).map(([k, v]) => (
          <div key={k} className="border border-slate-700 rounded-2xl p-3 bg-slate-900">
            <p className="font-semibold text-white">{k}</p>
            <p className="text-sm text-slate-400 break-all">{v}</p>
          </div>
        ))}
      </div>
    </div>
  );
}