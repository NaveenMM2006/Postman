"use client";

import { useState } from "react";

import AppShell from "@/components/layout/AppShell";

import ClientOnly from "@/components/providers/ClientOnly";

import RequestBuilder from "@/components/request/RequestBuilder";

import ResponseViewer from "@/components/response/ResponseViewer";

import RequestTabs from "@/components/tabs/RequestTabs";

import CollectionSidebar from "@/components/sidebar/CollectionSidebar";

import HistorySidebar from "@/components/sidebar/HistorySidebar";

export default function WorkspacePage() {

  const [showCollections, setShowCollections] =
    useState(true);

  const [showHistory, setShowHistory] =
    useState(true);

  return (

    <ClientOnly>

      <AppShell>

        <div
          className="
            h-screen
            flex
            overflow-hidden
            text-white
            bg-[#1e1e1e]
          "
        >

          {/* ACTIVITY BAR */}

          <div
            className="
              w-14
              bg-[#181818]
              border-r
              border-[#2d2d2d]
              flex
              flex-col
              items-center
              py-3
              gap-3
              shrink-0
            "
          >

            <button
              onClick={() =>
                setShowCollections(
                  !showCollections
                )
              }
              className={`
                w-10
                h-10
                rounded-lg
                flex
                items-center
                justify-center
                transition
                text-lg
                ${
                  showCollections
                    ? "bg-[#2a2d2e] text-white"
                    : "text-slate-400 hover:bg-[#252526]"
                }
              `}
            >
              📁
            </button>

            <button
              onClick={() =>
                setShowHistory(
                  !showHistory
                )
              }
              className={`
                w-10
                h-10
                rounded-lg
                flex
                items-center
                justify-center
                transition
                text-lg
                ${
                  showHistory
                    ? "bg-[#2a2d2e] text-white"
                    : "text-slate-400 hover:bg-[#252526]"
                }
              `}
            >
              🕘
            </button>

          </div>

          {/* COLLECTION SIDEBAR */}

          {showCollections && (

            <aside
              className="
                w-[290px]
                border-r
                border-[#2d2d2d]
                bg-[#1f1f1f]
                overflow-hidden
                shrink-0
              "
            >

              <CollectionSidebar />

            </aside>

          )}

          {/* MAIN CONTENT */}

          <main
            className="
              flex-1
              flex
              flex-col
              overflow-hidden
              bg-[#1e1e1e]
            "
          >

            {/* TOP TABS */}

            <div
              className="
                h-11
                border-b
                border-[#2d2d2d]
                bg-[#252526]
                shrink-0
              "
            >

              <RequestTabs />

            </div>

            {/* REQUEST + RESPONSE */}

            <div
              className="
                flex-1
                flex
                overflow-hidden
              "
            >

              {/* REQUEST PANEL */}

              <section
                className="
                  w-1/2
                  min-w-0
                  border-r
                  border-[#2d2d2d]
                  overflow-auto
                  bg-[#1e1e1e]
                "
              >

                <RequestBuilder />

              </section>

              {/* RESPONSE PANEL */}

              <section
                className="
                  flex-1
                  min-w-0
                  overflow-auto
                  bg-[#181818]
                "
              >

                <ResponseViewer />

              </section>

            </div>

          </main>

          {/* HISTORY PANEL */}

          {showHistory && (

            <aside
              className="
                w-[320px]
                border-l
                border-[#2d2d2d]
                bg-[#1f1f1f]
                overflow-hidden
                shrink-0
              "
            >

              <HistorySidebar />

            </aside>

          )}

        </div>

      </AppShell>

    </ClientOnly>
  );
}