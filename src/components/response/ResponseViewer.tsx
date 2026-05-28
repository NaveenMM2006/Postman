"use client";

import {
  useEffect,
  useState,
} from "react";

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
        h-full
        flex
        items-center
        justify-center
        text-slate-500
      ">

        <div className="text-center">

          <div className="
            text-6xl
            mb-4
          ">
            ⚡
          </div>

          <h2 className="
            text-xl
            font-semibold
            text-slate-300
          ">
            No Response Yet
          </h2>

          <p className="
            text-sm
            mt-2
          ">
            Send a request to see response
          </p>

        </div>

      </div>

    );
  }

  const isError =
    response.success === false;

  const isJsonObject =
    typeof response.data === "object" &&
    response.data !== null;

  return (

    <div className="
      h-full
      flex
      flex-col
      bg-[#111827]
    ">

      {/* HEADER */}

      <div className="
        sticky
        top-0
        z-10
        px-6
        py-4
        border-b
        border-slate-800
        bg-[#111827]/95
        backdrop-blur
      ">

        <div className="
          flex
          items-center
          justify-between
        ">

          <h2 className="
            text-lg
            font-semibold
          ">
            Response
          </h2>

          <div className="
            flex
            items-center
            gap-3
          ">

            {response.status && (

              <div className={`
                px-3
                py-1
                rounded-full
                text-sm
                font-medium
                ${
                  response.status < 300
                    ? "bg-emerald-500/20 text-emerald-400"
                    : "bg-red-500/20 text-red-400"
                }
              `}>
                {response.status}
              </div>

            )}

            {response.time && (

              <div className="
                px-3
                py-1
                rounded-full
                text-sm
                bg-slate-800
                text-slate-300
              ">
                {response.time} ms
              </div>

            )}

          </div>

        </div>

      </div>

      {/* BODY */}

      <div className="
        flex-1
        overflow-auto
        p-6
      ">

        {isError ? (

          <div className="
            bg-red-500/10
            border
            border-red-500/20
            text-red-300
            p-5
            rounded-2xl
            text-sm
            whitespace-pre-wrap
          ">
            {JSON.stringify(
              response.error,
              null,
              2
            )}
          </div>

        ) : isJsonObject ? (

          <div className="
            rounded-2xl
            overflow-hidden
            border
            border-slate-700
          ">

            <ReactJson
              src={response.data}
              collapsed={1}
              displayDataTypes={false}
              enableClipboard={true}
              name={false}
              theme="monokai"
            />

          </div>

        ) : (

          <pre className="
            text-sm
            whitespace-pre-wrap
            bg-slate-900
            border
            border-slate-700
            p-5
            rounded-2xl
            overflow-auto
          ">
            {String(response.data)}
          </pre>

        )}

      </div>

    </div>
  );
}