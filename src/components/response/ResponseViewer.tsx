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
    <div className="
      h-screen
      overflow-auto
      bg-white
    ">

      <div className="
        p-4
        border-b
        flex
        items-center
        justify-between
        sticky
        top-0
        bg-white
        z-10
      ">

        <h2 className="
          text-xl
          font-bold
        ">
          Response
        </h2>

        <div className="flex gap-3">

          {response.status && (

            <div className={`
              px-3
              py-1
              rounded
              text-sm
              font-medium
              text-black
              ${
                response.status < 300
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }
            `}>
              {response.status}
            </div>

          )}

          {response.time && (

            <div className="
              px-3
              py-1
              rounded
              text-sm
              bg-gray-300
            ">
              {response.time} ms
            </div>

          )}

        </div>

      </div>

      <div className="p-4">

        {isError ? (

          <div className="
            bg-red-50
            border
            border-red-200
            text-red-700
            p-4
            rounded
            whitespace-pre-wrap
            text-sm
          ">
            {JSON.stringify(
              response.error,
              null,
              2
            )}
          </div>

        ) : isJsonObject ? (

          <ReactJson
            src={response.data}

            collapsed={1}

            displayDataTypes={false}

            enableClipboard={true}

            name={false}
          />

        ) : (

          <pre className="
            whitespace-pre-wrap
            text-sm
            bg-gray-50
            p-4
            rounded
            border
            overflow-auto
          ">
            {String(response.data)}
          </pre>

        )}

      </div>

    </div>
  );
}