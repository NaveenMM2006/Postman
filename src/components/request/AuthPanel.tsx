"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  useTabStore,
} from "@/store/tabStore";

export default function AuthPanel() {

  const [mounted, setMounted] =
    useState(false);

  const {
    tabs,
    activeTabId,
    updateTab,
  } = useTabStore();

  useEffect(() => {

    setMounted(true);

  }, []);

  if (!mounted) {

    return null;
  }

  const activeTab =
    tabs.find(
      (tab) =>
        tab.id === activeTabId
    );

  if (!activeTab) {

    return null;
  }

  return (
    <div className="
      border
      rounded
      p-4
      space-y-4
      bg-gray-600
    ">

      <h2 className="
        font-bold
        text-lg
      ">
        Authorization
      </h2>

      <select
        value={activeTab.authType}

        onChange={(e) =>
          updateTab(
            activeTab.id,
            {
              authType:
                e.target.value,
            }
          )
        }

        className="
          border
          p-2
          rounded
          w-full
        "
      >
        <option value="none">
          No Auth
        </option>

        <option value="bearer">
          Bearer Token
        </option>

        <option value="apikey">
          API Key
        </option>

      </select>

      {activeTab.authType ===
        "bearer" && (

        <input
          placeholder="
            Enter Bearer Token
          "

          value={activeTab.authValue}

          onChange={(e) =>
            updateTab(
              activeTab.id,
              {
                authValue:
                  e.target.value,
              }
            )
          }

          className="
            border
            p-2
            rounded
            w-full
          "
        />

      )}

      {activeTab.authType ===
        "apikey" && (

        <div className="
          space-y-2
        ">

          <input
            placeholder="
              Header Key
            "

            value={activeTab.authKey}

            onChange={(e) =>
              updateTab(
                activeTab.id,
                {
                  authKey:
                    e.target.value,
                }
              )
            }

            className="
              border
              p-2
              rounded
              w-full
            "
          />

          <input
            placeholder="
              API Key Value
            "

            value={activeTab.authValue}

            onChange={(e) =>
              updateTab(
                activeTab.id,
                {
                  authValue:
                    e.target.value,
                }
              )
            }

            className="
              border
              p-2
              rounded
              w-full
            "
          />

        </div>

      )}

    </div>
  );
}