import AppShell from "@/components/layout/AppShell";

import ClientOnly from "@/components/providers/ClientOnly";

import RequestBuilder from "@/components/request/RequestBuilder";

import ResponseViewer from "@/components/response/ResponseViewer";

import RequestTabs from "@/components/tabs/RequestTabs";

import HistorySidebar from "@/components/sidebar/HistorySidebar";

export default function WorkspacePage() {

  return (

    <ClientOnly>

      <AppShell>

        <div className="
          flex
          h-full
          overflow-hidden
        ">

          {/* LEFT PANEL */}

          <div className="
            w-[55%]
            border-r
            border-slate-800
            flex
            flex-col
            bg-[#111827]
          ">

            <RequestTabs />

            <div className="
              flex-1
              overflow-auto
            ">
              <RequestBuilder />
            </div>

          </div>

          {/* RESPONSE PANEL */}

          <div className="
            flex-1
            bg-[#0f172a]
            overflow-auto
          ">
            <ResponseViewer />
          </div>

          {/* HISTORY */}

          <HistorySidebar />

        </div>

      </AppShell>

    </ClientOnly>
  );
}