"use client";

import { useEffect, useState } from "react";
import EnvironmentPanel from "./EnvironmentPanel";
import axios from "axios";

import {
  useRequestStore,
} from "@/store/requestStore";

export default function CollectionSidebar() {

  const [requests, setRequests] =
    useState<any[]>([]);

  const { loadRequest } =
    useRequestStore();

  async function loadRequests() {

    const response =
      await axios.get("/api/requests");

    setRequests(response.data);
  }

  useEffect(() => {
    loadRequests();
  }, []);

  return (
    <div className="w-72 border-r h-screen p-4 overflow-auto">

      <h2 className="font-bold text-lg mb-4">
        Saved Requests
      </h2>

      <div className="space-y-2">

        {requests.map((request) => (

          <div
            key={request.id}

            onClick={() =>
              loadRequest(request)
            }

            className="
              border
              rounded
              p-2
              cursor-pointer
              hover:bg-gray-100
            "
          >
            <p className="font-medium truncate">
              {request.name}
            </p>

            <p className="text-sm text-gray-500">
              {request.method}
            </p>

          </div>

        ))}

      </div>
      <EnvironmentPanel />
    </div>
  );
}