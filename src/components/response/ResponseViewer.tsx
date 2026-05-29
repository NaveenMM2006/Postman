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
      " style={{ backgroundColor: "var(--vscode-bg)", color: "var(--vscode-text-muted)" }}>

        <div className="text-center">

          <div className="
            text-6xl
            mb-4
          ">
            ⚡
          </div>

          <h2 className="
            text-lg
            font-semibold
          " style={{ color: "var(--vscode-text)" }}>
            No Response Yet
          </h2>

          <p className="
            text-xs
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
    " style={{ backgroundColor: "var(--vscode-bg)" }}>

      {/* HEADER */}

      <div className="
        sticky
        top-0
        z-10
        px-4
        py-3
        border-b
      " style={{ backgroundColor: "var(--vscode-bg-secondary)", borderColor: "var(--vscode-border)" }}>

        <div className="
          flex
          items-center
          justify-between
        ">

          <h2 className="
            text-sm
            font-semibold
          " style={{ color: "var(--vscode-text)" }}>
            Response
          </h2>

          <div className="
            flex
            items-center
            gap-2
          ">

            {response.status && (

              <div className="
                px-3
                py-1
                rounded
                text-xs
                font-medium
              " style={{
                backgroundColor: response.status < 300 ? "rgba(0, 144, 0, 0.2)" : "rgba(205, 49, 49, 0.2)",
                color: response.status < 300 ? "#00c000" : "#ff6b6b"
              }}>
                {response.status}
              </div>

            )}

            {response.time && (

              <div className="
                px-3
                py-1
                rounded
                text-xs
              " style={{
                backgroundColor: "var(--vscode-bg)",
                color: "var(--vscode-text-muted)",
                border: `1px solid var(--vscode-border)`
              }}>
                {response.time}ms
              </div>

            )}

          </div>

        </div>

      </div>

      {/* BODY */}

      <div className="
        flex-1
        overflow-auto
        p-4
      ">

        {isError ? (

          <div className="
            p-4
            rounded
            text-xs
            whitespace-pre-wrap
            font-mono
          " style={{
            backgroundColor: "rgba(205, 49, 49, 0.1)",
            color: "#ff6b6b",
            border: `1px solid rgba(205, 49, 49, 0.3)`
          }}>
            {JSON.stringify(
              response.error,
              null,
              2
            )}
          </div>

        ) : isJsonObject ? (

          <div className="
            rounded
            overflow-hidden
            border
          " style={{
            borderColor: "var(--vscode-border)"
          }}>

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
            text-xs
            whitespace-pre-wrap
            p-4
            rounded
            overflow-auto
            font-mono
          " style={{
            backgroundColor: "var(--vscode-bg-secondary)",
            color: "var(--vscode-text)",
            border: `1px solid var(--vscode-border)`
          }}>
            {String(response.data)}
          </pre>

        )}

      </div>

    </div>
  );
}