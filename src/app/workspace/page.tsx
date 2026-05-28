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
          bg-[#0b1220]
          text-white
          flex
          overflow-hidden
        ">

          {/* LEFT SIDEBAR */}

          <aside className="
            hidden
            lg:flex
            w-[300px]
            border-r
            border-slate-800
            bg-[#0f172a]
            overflow-hidden
            flex-col
          ">
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
              border-slate-800
              bg-[#111827]
              shrink-0
            ">
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
                border-slate-800
                bg-[#0f172a]
                overflow-auto
              ">
                <RequestBuilder />
              </section>

              {/* RESPONSE PANEL */}

              <section className="
                flex-1
                min-w-0
                bg-[#111827]
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
            border-slate-800
            bg-[#0f172a]
            overflow-hidden
            flex-col
          ">
            <HistorySidebar />
          </aside>

        </div>

      </AppShell>

    </ClientOnly>
  );
}