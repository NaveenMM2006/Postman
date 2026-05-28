"use client";

import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

export default function SaveRequestModal({
  open,
  onClose,
  requestData,
}: any) {

  const [collections, setCollections] =
    useState<any[]>([]);

  const [collectionId, setCollectionId] =
    useState("");

  const [requestName, setRequestName] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  async function loadCollections() {

    try {

      const response =
        await axios.get(
          "/api/collections"
        );

      setCollections(
        response.data
      );

    } catch (error) {

      console.error(error);
    }
  }

  async function saveRequest() {

    if (
      !collectionId ||
      !requestName.trim()
    ) {

      alert(
        "Please fill all fields"
      );

      return;
    }

    try {

      setLoading(true);

      await axios.post(
        "/api/saved-requests",
        {
          collection_id:
            Number(collectionId),

          name:
            requestName,

          method:
            requestData.method,

          url:
            requestData.url,

          headers:
            requestData.headers,

          body:
            requestData.body,

          auth_type:
            requestData.authType,

          auth_value:
            requestData.authValue,
        }
      );

      alert(
        "Request Saved"
      );

      setRequestName("");

      setCollectionId("");

      onClose();

    } catch (error) {

      console.error(error);

      alert(
        "Failed to save request"
      );

    } finally {

      setLoading(false);
    }
  }

  useEffect(() => {

    if (open) {

      loadCollections();
    }

  }, [open]);

  if (!open) {

    return null;
  }

  return (
    <div className="
      fixed
      inset-0
      bg-black/60
      backdrop-blur-sm
      flex
      items-center
      justify-center
      z-50
      p-4
    ">

      <div className="
        w-full
        max-w-md
        bg-[#111827]
        border
        border-slate-700
        rounded-2xl
        p-5
        text-white
        space-y-4
        shadow-2xl
      ">

        <div className="
          flex
          items-center
          justify-between
        ">

          <h2 className="
            text-xl
            font-bold
          ">
            Save Request
          </h2>

          <button
            onClick={onClose}

            className="
              text-slate-400
              hover:text-white
              text-lg
            "
          >
            ×
          </button>

        </div>

        <input
          value={requestName}

          onChange={(e) =>
            setRequestName(
              e.target.value
            )
          }

          placeholder="Request Name"

          className="
            w-full
            bg-slate-900
            border
            border-slate-700
            rounded-lg
            px-3
            py-2
            outline-none
            focus:border-orange-500
          "
        />

        <select
          value={collectionId}

          onChange={(e) =>
            setCollectionId(
              e.target.value
            )
          }

          className="
            w-full
            bg-slate-900
            border
            border-slate-700
            rounded-lg
            px-3
            py-2
            outline-none
            focus:border-orange-500
          "
        >

          <option value="">
            Select Collection
          </option>

          {collections.map(
            (collection) => (

            <option
              key={collection.id}

              value={collection.id}
            >
              {collection.name}
            </option>

          ))}

        </select>

        <div className="
          flex
          justify-end
          gap-3
          pt-2
        ">

          <button
            onClick={onClose}

            className="
              px-4
              py-2
              rounded-lg
              bg-slate-700
              hover:bg-slate-600
            "
          >
            Cancel
          </button>

          <button
            onClick={saveRequest}

            disabled={loading}

            className="
              px-4
              py-2
              rounded-lg
              bg-orange-500
              hover:bg-orange-400
              text-black
              font-semibold
              disabled:opacity-50
            "
          >
            {loading
              ? "Saving..."
              : "Save"}
          </button>

        </div>

      </div>

    </div>
  );
}