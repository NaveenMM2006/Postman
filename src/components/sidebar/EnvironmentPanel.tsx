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
    <div className="border-t p-4">

      <h2 className="font-bold mb-3">
        Environment Variables
      </h2>

      <div className="space-y-2">

        <input
          placeholder="KEY"
          value={key}
          onChange={(e) =>
            setKey(e.target.value)
          }
          className="
            w-full
            border
            p-2
            rounded
          "
        />

        <input
          placeholder="VALUE"
          value={value}
          onChange={(e) =>
            setValue(e.target.value)
          }
          className="
            w-full
            border
            p-2
            rounded
          "
        />

        <button
          onClick={addVariable}
          className="
            w-full
            bg-black
            text-white
            p-2
            rounded
          "
        >
          Add Variable
        </button>

      </div>

      <div className="mt-4 space-y-2">

        {Object.entries(variables)
          .map(([k, v]) => (

            <div
              key={k}
              className="
                border
                rounded
                p-2
              "
            >
              <p className="font-medium">
                {k}
              </p>

              <p className="text-sm text-gray-500 break-all">
                {v}
              </p>

            </div>

        ))}

      </div>

    </div>
  );
}