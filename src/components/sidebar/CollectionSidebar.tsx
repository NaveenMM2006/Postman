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
    <div className="w-full max-w-sm md:w-72 border-r md:border-r border-slate-800 h-screen p-4 overflow-auto bg-slate-950 text-slate-100">
      <h2 className="font-semibold text-lg mb-4">Saved Requests</h2>
      <div className="space-y-3">
        {requests.map((request) => (
          <div
            key={request.id}
            onClick={() => loadRequest(request)}
            className="border border-slate-700 rounded-2xl p-3 cursor-pointer bg-slate-900 transition hover:bg-slate-800"
          >
            <p className="font-medium truncate">{request.name}</p>
            <p className="text-sm text-slate-400">{request.method}</p>
          </div>
        ))}
      </div>
      <EnvironmentPanel />
    </div>
  );
}