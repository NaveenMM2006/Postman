"use client";

import AppShell from "@/components/layout/AppShell";

import ClientOnly from "@/components/providers/ClientOnly";

import RequestBuilder from "@/components/request/RequestBuilder";

import ResponseViewer from "@/components/response/ResponseViewer";

import RequestTabs from "@/components/tabs/RequestTabs";

import CollectionSidebar from "@/components/sidebar/CollectionSidebar";

import HistorySidebar from "@/components/sidebar/HistorySidebar";

export default function WorkspacePage() {

  return (

    <ClientOnly>

      <AppShell>

        <div className="
          h-screen
          text-white
          flex
          overflow-hidden
        " style={{ backgroundColor: "var(--vscode-bg)" }}>

          {/* LEFT SIDEBAR */}

          <aside className="
            hidden
            lg:flex
            w-[300px]
            border-r
            overflow-hidden
            flex-col
          " style={{ borderColor: "var(--vscode-border)" }}>
            <CollectionSidebar />
          </aside>

          {/* MAIN */}

          <main className="
            flex-1
            flex
            flex-col
            overflow-hidden
          ">

            {/* TABS */}

            <div className="
              border-b
              shrink-0
              h-11
            " style={{ borderColor: "var(--vscode-border)" }}>
              <RequestTabs />
            </div>

            {/* BODY */}

            <div className="
              flex-1
              flex
              overflow-hidden
            ">

              {/* REQUEST PANEL */}

              <section className="
                w-[50%]
                min-w-0
                border-r
                overflow-auto
              " style={{ borderColor: "var(--vscode-border)" }}>
                <RequestBuilder />
              </section>

              {/* RESPONSE PANEL */}

              <section className="
                flex-1
                min-w-0
                overflow-auto
              ">
                <ResponseViewer />
              </section>

            </div>

          </main>

          {/* RIGHT SIDEBAR */}

          <aside className="
            hidden
            xl:flex
            w-[320px]
            border-l
            overflow-hidden
            flex-col
          " style={{ borderColor: "var(--vscode-border)" }}>
            <HistorySidebar />
          </aside>

        </div>

      </AppShell>

    </ClientOnly>
  );
}