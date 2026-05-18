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

  if (!activeTab) {

    return null;
  }

  async function sendRequest() {

    try {

      setLoading(true);

      let parsedHeaders: any = {};

      let parsedBody: any = {};

      // PARSE HEADERS

      try {

        parsedHeaders = JSON.parse(
          parseVariables(
            activeTab.headers || "{}",
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
        activeTab.authType ===
        "bearer"
      ) {

        parsedHeaders[
          "Authorization"
        ] = `Bearer ${activeTab.authValue}`;
      }

      if (
        activeTab.authType ===
        "apikey"
      ) {

        parsedHeaders[
          activeTab.authKey
        ] = activeTab.authValue;
      }

      // PARSE BODY

      try {

        parsedBody = JSON.parse(
          parseVariables(
            activeTab.body || "{}",
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
              activeTab.method,

           url: (() => {

            const baseUrl =
              parseVariables(
                activeTab.url,
                variables
              );

            const query =
              activeTab.queryParams
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
        activeTab.id,
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
                activeTab.method,

              url: activeTab.url,

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
        activeTab.id,
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

  return (
    <div className="
      p-4
      space-y-4
      overflow-auto
      h-screen
    ">

      {/* TOP BAR */}

      <div className="
        flex
        gap-2
      ">

        <select
          value={activeTab.method}

          onChange={(e) =>
            updateTab(
              activeTab.id,
              {
                method:
                  e.target.value,
              }
            )
          }

          className="
            border
            p-2
            rounded
            w-32
          "
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
            updateTab(
              activeTab.id,
              {
                url:
                  e.target.value,
              }
            )
          }

          placeholder="
            https://api.example.com
          "

          className="
            flex-1
            border
            p-2
            rounded
          "
        />

        <button
          onClick={sendRequest}

          disabled={loading}

          className="
            bg-black
            text-white
            px-5
            rounded
            disabled:opacity-50
          "
        >
          {loading
            ? "Sending..."
            : "Send"}
        </button>

      </div>

      {/* AUTH */}

      <AuthPanel />
      <QueryParams/>
      {/* HEADERS */}

      <div>

        <p className="
          mb-2
          font-medium
        ">
          Headers
        </p>

        <textarea
          value={activeTab.headers}

          onChange={(e) =>
            updateTab(
              activeTab.id,
              {
                headers:
                  e.target.value,
              }
            )
          }

          placeholder='{
  "Content-Type":
  "application/json"
}'

          className="
            w-full
            h-40
            border
            p-3
            rounded
            font-mono
            text-sm
          "
        />

      </div>

      {/* BODY */}

      <div>

        <p className="
          mb-2
          font-medium
        ">
          Body
        </p>

        <textarea
          value={activeTab.body}

          onChange={(e) =>
            updateTab(
              activeTab.id,
              {
                body:
                  e.target.value,
              }
            )
          }

          placeholder='{
  "name": "John"
}'

          className="
            w-full
            h-72
            border
            p-3
            rounded
            font-mono
            text-sm
          "
        />

      </div>

    </div>
  );
}