"use client";

import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

export default function HistorySidebar() {

  const [history, setHistory] =
    useState<any[]>([]);

  async function loadHistory() {

    try {

      const response =
        await axios.get(
          "/api/history"
        );

      setHistory(
        response.data
      );

    } catch (error) {

      console.error(error);
    }
  }

  useEffect(() => {

    loadHistory();

  }, []);

  return (
    <div className="
      w-80
      border-l
      h-screen
      overflow-auto
      bg-gray-500
    ">

      <div className="
        p-4
        border-b
        font-bold
        text-lg
      ">
        History
      </div>

      <div>

        {history.map((item) => (

          <div
            key={item.id}

            className="
              p-3
              border-b
              hover:bg-gray-50
              cursor-pointer
            "
          >

            <div className="
              flex
              items-center
              gap-2
              mb-1
            ">

              <span className="
                text-xs
                font-bold
                text-gray-800
              ">
                {item.method}
              </span>

              <span className="
                text-xs
                text-gray-500
              ">
                {item.status}
              </span>

            </div>

            <p className="
              text-sm
              truncate
            ">
              {item.url}
            </p>

          </div>

        ))}

      </div>

    </div>
  );
}