"use client";

import {
  useTabStore,
} from "@/store/tabStore";

export default function QueryParams() {

  const {
    tabs,
    activeTabId,
    updateTab,
  } = useTabStore();

  const activeTab =
    tabs.find(
      (tab) =>
        tab.id === activeTabId
    );

  if (!activeTab) {

    return null;
  }

  function updateParam(
    index: number,
    field: "key" | "value",
    value: string
  ) {

    const updated =
      [...activeTab.queryParams];

    updated[index][field] =
      value;

    updateTab(
      activeTab.id,
      {
        queryParams:
          updated,
      }
    );
  }

  function addParam() {

    updateTab(
      activeTab.id,
      {
        queryParams: [
          ...activeTab.queryParams,

          {
            key: "",
            value: "",
          },
        ],
      }
    );
  }

  function removeParam(
    index: number
  ) {

    const updated =
      activeTab.queryParams.filter(
        (_, i) =>
          i !== index
      );

    updateTab(
      activeTab.id,
      {
        queryParams:
          updated,
      }
    );
  }

  return (
    <div className="
      border
      rounded
      p-4
      space-y-4
      bg-gray-600
    ">

      <div className="
        flex
        items-center
        justify-between
      ">

        <h2 className="
          font-bold
          text-lg
        ">
          Query Params
        </h2>

        <button
          onClick={addParam}

          className="
            px-3
            py-1
            bg-black
            text-white
            rounded
            text-sm
          "
        >
          Add
        </button>

      </div>

      <div className="
        space-y-3
      ">

        {activeTab.queryParams.map(
          (param, index) => (

            <div
              key={index}

              className="
                flex
                gap-2
              "
            >

              <input
                placeholder="Key"

                value={param.key}

                onChange={(e) =>
                  updateParam(
                    index,
                    "key",
                    e.target.value
                  )
                }

                className="
                  flex-1
                  border
                  p-2
                  rounded
                "
              />

              <input
                placeholder="Value"

                value={param.value}

                onChange={(e) =>
                  updateParam(
                    index,
                    "value",
                    e.target.value
                  )
                }

                className="
                  flex-1
                  border
                  p-2
                  rounded
                "
              />

              <button
                onClick={() =>
                  removeParam(
                    index
                  )
                }

                className="
                  px-3
                  text-red-500
                "
              >
                ×
              </button>

            </div>

          )
        )}

      </div>

    </div>
  );
}