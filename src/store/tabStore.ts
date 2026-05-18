import { create } from "zustand";

export interface Tab {

  id: number;

  name: string;

  method: string;

  url: string;

  headers: string;

  body: string;

  response: any;

  queryParams : {
    key : string;
    value : string;
  }[];

  authType: string;

  authKey: string;

  authValue: string;
}

interface TabStore {

  tabs: Tab[];

  activeTabId: number;

  addTab: () => void;

  removeTab: (
    id: number
  ) => void;

  setActiveTab: (
    id: number
  ) => void;

  updateTab: (
    id: number,
    data: Partial<Tab>
  ) => void;
}

export const useTabStore =
  create<TabStore>((set) => ({

    tabs: [
      {
        id: 1,

        name: "New Request",

        method: "GET",

        url: "",

        headers: "{}",

        body: "{}",

        response: null,

        queryParams:[],

        authType : "none",

        authKey : "",

        authValue : "",
      },
    ],

    activeTabId: 1,

    addTab: () =>

      set((state) => {

        const newTab = {

          id: Date.now(),

          name: "New Request",

          method: "GET",

          url: "",

          headers: "{}",

          body: "{}",

          response: null,

          queryParams : [],
          
          authType: "none",

          authKey: "",

          authValue: "",

        };

        return {

          tabs: [
            ...state.tabs,
            newTab,
          ],

          activeTabId:
            newTab.id,
        };
      }),

    removeTab: (id) =>

      set((state) => {

        const filteredTabs =
          state.tabs.filter(
            (tab) => tab.id !== id
          );

        return {

          tabs: filteredTabs,

          activeTabId:
            filteredTabs[0]?.id || 0,
        };
      }),

    setActiveTab: (id) =>

      set({
        activeTabId: id,
      }),

    updateTab: (id, data) =>

      set((state) => ({

        tabs: state.tabs.map((tab) =>

          tab.id === id
            ? {
                ...tab,
                ...data,
              }
            : tab
        ),
      })),
  }));