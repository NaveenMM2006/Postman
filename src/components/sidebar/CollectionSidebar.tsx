"use client";

import {
  useEffect,
  useState,
} from "react";

import axios from "axios";
import {
  useTabStore,
} from "@/store/tabStore";

import {
  FolderOpen,
  ChevronRight,
  Plus,
  Trash2,
} from "lucide-react";

const METHOD_COLORS: Record<string, string> = {
  GET: "#0e639c",
  POST: "#009000",
  PUT: "#e8ab53",
  PATCH: "#c586c0",
  DELETE: "#cd3131",
};

export default function CollectionsSidebar() {

  const [collections, setCollections] =
    useState<any[]>([]);

  const [requests, setRequests] =
    useState<any>({});

  const [newCollection, setNewCollection] =
    useState("");

  const [openCollection, setOpenCollection] =
    useState<number | null>(null);

  const {
    activeTabId,
    updateTab,
  } = useTabStore();

  async function loadCollections() {

    const response =
      await axios.get(
        "/api/collections"
      );

    setCollections(
      response.data
    );
  }

  async function loadRequests(
    collectionId: number
  ) {

    if (
      openCollection ===
      collectionId
    ) {

      setOpenCollection(null);

      return;
    }

    const response =
      await axios.get(
        `/api/saved-requests?collectionId=${collectionId}`
      );

    setRequests((prev: any) => ({
      ...prev,
      [collectionId]:
        response.data,
    }));

    setOpenCollection(
      collectionId
    );
  }

  async function createCollection() {

    if (!newCollection.trim()) {

      return;
    }

    await axios.post(
      "/api/collections",
      {
        name:
          newCollection,
      }
    );

    setNewCollection("");

    loadCollections();
  }

  async function deleteCollectionById(
    collectionId: number
  ) {
    const confirmed = window.confirm(
      "Delete this collection and its saved requests?"
    );

    if (!confirmed) {
      return;
    }

    await axios.delete(
      `/api/collections?id=${collectionId}`
    );

    setRequests((prev: any) => {
      const next = { ...prev };
      delete next[collectionId];
      return next;
    });

    if (openCollection === collectionId) {
      setOpenCollection(null);
    }

    loadCollections();
  }

  function loadRequestIntoTab(
    req: any
  ) {

    updateTab(
      activeTabId,
      {
        method:
          req.method,

        url:
          req.url,

        headers:
          typeof req.headers ===
          "string"
            ? req.headers
            : JSON.stringify(
                req.headers,
                null,
                2
              ),

        body:
          typeof req.body ===
          "string"
            ? req.body
            : JSON.stringify(
                req.body,
                null,
                2
              ),

        authType:
          req.auth_type ||
          "none",

        authValue:
          req.auth_value ||
          "",
      }
    );
  }

  useEffect(() => {

    loadCollections();

  }, []);

  return (
    <div className="
      h-full
      overflow-auto
      flex
      flex-col
    " style={{ backgroundColor: "var(--vscode-bg)" }}>

      <div className="
        p-4
        border-b
        flex-shrink-0
      " style={{ borderColor: "var(--vscode-border)" }}>

        <h2 className="
          text-sm
          font-bold
          mb-3
          uppercase
          tracking-wider
        " style={{ color: "var(--vscode-text-muted)" }}>
          Collections
        </h2>

        <div className="
          flex
          gap-2
        ">

          <input
            value={newCollection}

            onChange={(e) =>
              setNewCollection(
                e.target.value
              )
            }

            onKeyPress={(e) => {
              if (e.key === "Enter") {
                createCollection();
              }
            }}

            placeholder="New Collection"

            className="
              flex-1
              bg-slate-800
              border
              rounded
              px-3
              py-2
              text-xs
              transition-colors
            "
            style={{
              borderColor: "var(--vscode-border)",
              backgroundColor: "var(--vscode-bg-tertiary)",
              color: "var(--vscode-text)",
            }}
          />

          <button
            onClick={
              createCollection
            }

            className="
              px-3
              rounded
              text-xs
              font-semibold
              transition-colors
              hover:opacity-80
            "
            style={{
              backgroundColor: "var(--vscode-accent)",
              color: "#ffffff",
            }}
          >
            <Plus size={14} />
          </button>

        </div>

      </div>

      <div className="
        flex-1
        overflow-auto
      ">

        {collections.map(
          (collection) => (

          <div
            key={collection.id}

            className="
              border-b
            "
            style={{ borderColor: "var(--vscode-border)" }}
          >

            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() =>
                  loadRequests(
                    collection.id
                  )
                }

                className="
                  flex-1
                  text-left
                  px-4
                  py-2
                  hover:bg-opacity-50
                  font-medium
                  text-sm
                  transition-colors
                  flex
                  items-center
                  gap-2
                "
                style={{
                  backgroundColor: openCollection === collection.id ? "var(--vscode-hover)" : "transparent",
                  color: "var(--vscode-text)",
                }}
              >

                <ChevronRight
                  size={16}
                  style={{
                    transform: openCollection === collection.id ? "rotate(90deg)" : "rotate(0deg)",
                    transition: "transform 0.2s",
                  }}
                />

                <FolderOpen size={14} />

                <span className="truncate">
                  {collection.name}
                </span>

              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteCollectionById(collection.id);
                }}
                className="
                  p-2
                  rounded
                  text-xs
                  text-red-400
                  hover:bg-white/10
                  transition-colors
                "
                style={{
                  backgroundColor: "transparent",
                }}
              >
                <Trash2 size={14} />
              </button>
            </div>

            {openCollection ===
              collection.id && (

              <div className="
                pl-4
                pr-2
                pb-2
                space-y-1
              ">

                {requests[
                  collection.id
                ]?.map((req: any) => (

                  <div
                    key={req.id}

                    onClick={() =>
                      loadRequestIntoTab(
                        req
                      )
                    }

                    className="
                      px-3
                      py-1.5
                      text-xs
                      rounded
                      cursor-pointer
                      flex
                      items-center
                      gap-2
                      transition-colors
                      hover:bg-opacity-50
                      group
                    "
                    style={{
                      backgroundColor: "transparent",
                      color: "var(--vscode-text)",
                    }}
                  >

                    <span
                      className="
                        text-xs
                        font-bold
                        px-1
                        py-0.5
                        rounded
                        flex-shrink-0
                        w-10
                        text-center
                      "
                      style={{
                        backgroundColor: METHOD_COLORS[req.method] || METHOD_COLORS.GET,
                        color: "#ffffff",
                      }}
                    >
                      {req.method}
                    </span>

                    <span className="
                      truncate
                      flex-1
                    ">
                      {req.name}
                    </span>

                  </div>

                ))}

              </div>

            )}

          </div>

        ))}

      </div>

    </div>
  );
}