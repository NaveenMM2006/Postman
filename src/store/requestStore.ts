import { create } from "zustand";

interface RequestState {

  method: string;

  url: string;

  headers: string;

  body: string;

  response: any;

  setMethod: (method: string) => void;

  setUrl: (url: string) => void;

  setHeaders: (headers: string) => void;

  setBody: (body: string) => void;

  setResponse: (response: any) => void;

  loadRequest: (request: any) => void;
}

export const useRequestStore =
  create<RequestState>((set) => ({

    method: "GET",

    url: "",

    headers: "{}",

    body: "{}",

    response: null,

    setMethod: (method) =>
      set({ method }),

    setUrl: (url) =>
      set({ url }),

    setHeaders: (headers) =>
      set({ headers }),

    setBody: (body) =>
      set({ body }),

    setResponse: (response) =>
      set({ response }),

    loadRequest: (request) =>
      set({

        method: request.method,

        url: request.url,

        headers:
          typeof request.headers === "string"
            ? request.headers
            : JSON.stringify(
              request.headers || {},
              null,
              2
            ),

          body:
            typeof request.body === "string"
              ? request.body
              : JSON.stringify(
                  request.body || {},
                  null,
                  2
            ),
    }),
  }));