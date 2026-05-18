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
        <div className="flex h-full flex-col md:flex-row overflow-hidden">
          <div className="w-full md:w-[55%] border-b md:border-b-0 md:border-r border-slate-800 flex flex-col bg-[#111827]">
            <RequestTabs />
            <div className="flex-1 overflow-auto">
              <RequestBuilder />
            </div>
          </div>

          <div className="flex-1 bg-[#0f172a] overflow-auto min-h-[400px]">
            <ResponseViewer />
          </div>

          <div className="w-full md:w-80 border-t md:border-t-0 md:border-l border-slate-800 bg-slate-900">
            <HistorySidebar />
          </div>
        </div>
      </AppShell>
    </ClientOnly>
  );
}