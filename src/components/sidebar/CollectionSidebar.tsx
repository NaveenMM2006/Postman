"use client";

import {
  useEffect,
  useState,
} from "react";

import axios from "axios";
import {
  useTabStore,
} from "@/store/tabStore";

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

    setRequests((prev) => ({
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
      bg-[#0f172a]
      text-white
      overflow-auto
    ">

      <div className="
        p-4
        border-b
        border-slate-800
      ">

        <h2 className="
          text-lg
          font-bold
          mb-3
        ">
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

            placeholder="New Collection"

            className="
              flex-1
              bg-slate-900
              border
              border-slate-700
              rounded-lg
              px-3
              py-2
              text-sm
            "
          />

          <button
            onClick={
              createCollection
            }

            className="
              bg-orange-500
              px-4
              rounded-lg
              text-sm
            "
          >
            Add
          </button>

        </div>

      </div>

      <div>

        {collections.map(
          (collection) => (

          <div
            key={collection.id}

            className="
              border-b
              border-slate-800
            "
          >

            <button
              onClick={() =>
                loadRequests(
                  collection.id
                )
              }

              className="
                w-full
                text-left
                px-4
                py-3
                hover:bg-slate-900
                font-medium
              "
            >
              {collection.name}
            </button>

            {openCollection ===
              collection.id && (

              <div className="
                pl-3
                pr-2
                pb-3
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
                      py-2
                      text-sm
                      text-slate-300
                      hover:bg-slate-900
                      rounded-lg
                      cursor-pointer
                      flex
                      items-center
                      gap-2
                    "
                  >

                    <span className="
                      text-orange-400
                      text-xs
                      font-bold
                    ">
                      {req.method}
                    </span>

                    <span>
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