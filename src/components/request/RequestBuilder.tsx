// "use client";

// import { useState } from "react";

// import axios from "axios";

// import {
//   useRequestStore,
// } from "@/store/requestStore";

// import {
//   useEnvStore,
// } from "@/store/envStore";

// import {
//   parseVariables,
// } from "@/lib/parseVariables";

// export default function RequestBuilder() {

//   const {
//     method,
//     url,
//     headers,
//     body,

//     setMethod,
//     setUrl,
//     setHeaders,
//     setBody,
//     setResponse,
//   } = useRequestStore();

//   const { variables } =
//     useEnvStore();

//   const [loading, setLoading] =
//     useState(false);

//   async function sendRequest() {

//     try {

//       setLoading(true);

//       let parsedHeaders = {};

//       let parsedBody = {};

//       try {

//         parsedHeaders = JSON.parse(
//           parseVariables(
//             headers,
//             variables
//           )
//         );

//       } catch {

//         alert("Invalid Headers JSON");

//         setLoading(false);

//         return;
//       }

//       try {

//         parsedBody = JSON.parse(
//           parseVariables(
//             body,
//             variables
//           )
//         );

//       } catch {

//         alert("Invalid Body JSON");

//         setLoading(false);

//         return;
//       }

//       const response = await axios.post(
//         "/api/proxy",
//         {
//           method,

//           url: parseVariables(
//             url,
//             variables
//           ),

//           headers: parsedHeaders,

//           requestBody: parsedBody,
//         }
//       );

//       setResponse(response.data);

//     } catch (error: any) {

//       setResponse({
//         success: false,
//         error:
//           error?.response?.data ||
//           error.message,
//       });

//     } finally {

//       setLoading(false);
//     }
//   }

//   async function saveRequest() {

//     try {

//       await axios.post(
//         "/api/requests",
//         {
//           collection_id: null,

//           name: url,

//           method,

//           url,

//           headers: JSON.parse(headers),

//           body: JSON.parse(body),
//         }
//       );

//       alert("Request Saved");

//     } catch (error) {

//       console.error(error);

//       alert("Failed to save request");
//     }
//   }

//   return (
//     <div className="p-4 space-y-4 h-screen overflow-auto">

//       <div className="flex gap-2">

//         <select
//           value={method}
//           onChange={(e) =>
//             setMethod(e.target.value)
//           }
//           className="
//             border
//             p-2
//             rounded
//             w-32
//           "
//         >
//           <option>GET</option>
//           <option>POST</option>
//           <option>PUT</option>
//           <option>PATCH</option>
//           <option>DELETE</option>
//         </select>

//         <input
//           value={url}
//           onChange={(e) =>
//             setUrl(e.target.value)
//           }
//           placeholder="Enter URL"
//           className="
//             flex-1
//             border
//             p-2
//             rounded
//           "
//         />

//         <button
//           onClick={sendRequest}
//           disabled={loading}
//           className="
//             bg-black
//             text-white
//             px-5
//             rounded
//           "
//         >
//           {loading
//             ? "Sending..."
//             : "Send"}
//         </button>

//         <button
//           onClick={saveRequest}
//           className="
//             border
//             px-5
//             rounded
//           "
//         >
//           Save
//         </button>

//       </div>

//       <div>

//         <div className="flex items-center justify-between mb-2">

//           <p className="font-medium">
//             Headers
//           </p>

//           <p className="text-xs text-gray-500">
//             JSON format
//           </p>

//         </div>

//         <textarea
//           value={headers}
//           onChange={(e) =>
//             setHeaders(e.target.value)
//           }
//           className="
//             w-full
//             h-40
//             border
//             p-3
//             rounded
//             font-mono
//             text-sm
//           "
//         />

//       </div>

//       <div>

//         <div className="flex items-center justify-between mb-2">

//           <p className="font-medium">
//             Body
//           </p>

//           <p className="text-xs text-gray-500">
//             JSON format
//           </p>

//         </div>

//         <textarea
//           value={body}
//           onChange={(e) =>
//             setBody(e.target.value)
//           }
//           className="
//             w-full
//             h-72
//             border
//             p-3
//             rounded
//             font-mono
//             text-sm
//           "
//         />

//       </div>

//     </div>
//   );
// }



"use client";

import { useState } from "react";

import axios from "axios";

import {
  useTabStore,
} from "@/store/tabStore";

import {useEnvStore} from "@/store/envStore";
import {parseVariables} from "@/lib/parseVariables";
import AuthPanel from "./AuthPanel";
import QueryParams from "./QueryParams";
import SaveRequestModal from "./SaveRequestModal";

export default function RequestBuilder() {

  const {
    tabs,
    activeTabId,
    updateTab,
  } = useTabStore();

  const { variables } =
    useEnvStore();

  const [loading, setLoading] =
    useState(false);

  const activeTab =
    tabs.find(
      (tab) =>
        tab.id === activeTabId
    );
  const [saveOpen, setSaveOpen] =
  useState(false);

  if (!activeTab) {
    return null;
  }

  const requestTab = activeTab;

  async function sendRequest() {

    try {

      setLoading(true);

      let parsedHeaders: any = {};

      let parsedBody: any = {};

      // PARSE HEADERS

      try {
        parsedHeaders = JSON.parse(
          parseVariables(
            requestTab.headers || "{}",
            variables
          )
        );
      } catch {
        alert(
          "Invalid Headers JSON"
        );
        setLoading(false);
        return;
      }

      // ADD AUTH HEADERS

      if (
        requestTab.authType ===
        "bearer"
      ) {
        parsedHeaders[
          "Authorization"
        ] = `Bearer ${requestTab.authValue}`;
      }

      if (
        requestTab.authType ===
        "apikey"
      ) {
        parsedHeaders[
          requestTab.authKey
        ] = requestTab.authValue;
      }

      // PARSE BODY

      try {
        parsedBody = JSON.parse(
          parseVariables(
            requestTab.body || "{}",
            variables
          )
        );

      } catch {

        alert(
          "Invalid Body JSON"
        );

        setLoading(false);

        return;
      }

      // SEND REQUEST

      const startTime =
        Date.now();

      const response =
        await axios.post(
          "/api/proxy",
          {
            method:
              requestTab.method,

           url: (() => {

            const baseUrl =
              parseVariables(
                requestTab.url,
                variables
              );

            const query =
              requestTab.queryParams
                .filter(
                  (p) => p.key
                )
                .map(
                  (p) =>
                    `${encodeURIComponent(
                      p.key
                    )}=${encodeURIComponent(
                      p.value
                    )}`
                )
                .join("&");

            return query
              ? `${baseUrl}?${query}`
              : baseUrl;

          })(),

            headers:
              parsedHeaders,

            requestBody:
              parsedBody,
          }
        );

      const endTime =
        Date.now();

      updateTab(
        requestTab.id,
        {
          response: {
            success: true,
            status:
              response.status,
            time:
              endTime - startTime,
            data:
              response.data,
          },
        }
      );

                await axios.post(
            "/api/history",
            {
              method:
                requestTab.method,

              url: requestTab.url,

              headers:
                parsedHeaders,

              body:
                parsedBody,

              response:
                response.data,

              status:
                response.status,
            }
);
    } catch (error: any) {

      updateTab(
        requestTab.id,
        {
          response: {
            success: false,
            error:
              error?.response?.data ||
              error.message,
          },
        }
      );

    } finally {

      setLoading(false);
    }
  }

  const METHOD_COLORS: Record<string, { bg: string; text: string }> = {
    GET: { bg: "#0e639c", text: "#ffffff" },
    POST: { bg: "#009000", text: "#ffffff" },
    PUT: { bg: "#e8ab53", text: "#1e1e1e" },
    PATCH: { bg: "#c586c0", text: "#ffffff" },
    DELETE: { bg: "#cd3131", text: "#ffffff" },
  };

  const methodColor = METHOD_COLORS[activeTab.method] || METHOD_COLORS.GET;

  return (
    <div className="p-4 space-y-4 overflow-auto min-h-full" style={{ backgroundColor: "var(--vscode-bg)" }}>
      <div className="grid gap-2 md:grid-cols-[auto_1fr_auto] items-end">
        <select
          value={activeTab.method}
          onChange={(e) =>
            updateTab(activeTab.id, {
              method: e.target.value,
            })
          }
          className="px-3 py-2 rounded w-full max-w-[140px] text-sm font-semibold transition-colors"
          style={{
            backgroundColor: methodColor.bg,
            color: methodColor.text,
            border: `1px solid ${methodColor.bg}`,
          }}
        >
          <option>GET</option>
          <option>POST</option>
          <option>PUT</option>
          <option>PATCH</option>
          <option>DELETE</option>
        </select>

        <input
          value={activeTab.url}
          onChange={(e) =>
            updateTab(activeTab.id, {
              url: e.target.value,
            })
          }
          placeholder="https://api.example.com"
          className="w-full px-3 py-2 rounded text-sm transition-colors"
          style={{
            backgroundColor: "var(--vscode-bg-tertiary)",
            color: "var(--vscode-text)",
            border: `1px solid var(--vscode-border)`,
          }}
        />

        <button
          onClick={sendRequest}
          disabled={loading}
          className="w-full md:w-auto px-4 py-2 rounded font-semibold transition disabled:opacity-50 text-sm"
          style={{
            backgroundColor: "var(--vscode-accent)",
            color: "#ffffff",
          }}
        >
          {loading ? "Sending..." : "Send"}
        </button>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() =>
            setSaveOpen(true)
          }
          className="px-3 py-1.5 rounded text-sm font-medium transition-colors"
          style={{
            backgroundColor: "var(--vscode-bg-secondary)",
            color: "var(--vscode-text)",
            border: `1px solid var(--vscode-border)`,
          }}
        >
          Save
        </button>
      </div>

      <AuthPanel />
      <QueryParams />

      <div className="rounded p-4" style={{ backgroundColor: "var(--vscode-bg-secondary)", border: `1px solid var(--vscode-border)` }}>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mb-3">
          <p className="text-sm font-semibold" style={{ color: "var(--vscode-text)" }}>Headers</p>
          <p className="text-xs" style={{ color: "var(--vscode-text-muted)" }}>JSON format</p>
        </div>
        <textarea
          value={activeTab.headers}
          onChange={(e) =>
            updateTab(activeTab.id, {
              headers: e.target.value,
            })
          }
          placeholder='{
  "Content-Type": "application/json"
}'
          className="w-full min-h-[150px] px-3 py-2 rounded text-sm font-mono"
          style={{
            backgroundColor: "var(--vscode-bg)",
            color: "var(--vscode-text)",
            border: `1px solid var(--vscode-border)`,
          }}
        />
      </div>

      <div className="rounded p-4" style={{ backgroundColor: "var(--vscode-bg-secondary)", border: `1px solid var(--vscode-border)` }}>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mb-3">
          <p className="text-sm font-semibold" style={{ color: "var(--vscode-text)" }}>Body</p>
          <p className="text-xs" style={{ color: "var(--vscode-text-muted)" }}>JSON format</p>
        </div>
        <textarea
          value={activeTab.body}
          onChange={(e) =>
            updateTab(activeTab.id, {
              body: e.target.value,
            })
          }
          placeholder='{
  "name": "John"
}'
          className="w-full min-h-[220px] px-3 py-2 rounded text-sm font-mono"
          style={{
            backgroundColor: "var(--vscode-bg)",
            color: "var(--vscode-text)",
            border: `1px solid var(--vscode-border)`,
          }}
        />
      </div>
      <SaveRequestModal
        open={saveOpen}

        onClose={() =>
          setSaveOpen(false)
        }

        requestData={activeTab}
      />
    </div>
  );
}