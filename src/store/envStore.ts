import { create } from "zustand";

interface EnvState {

  variables: Record<string, string>;

  setVariable: (
    key: string,
    value: string
  ) => void;
}

export const useEnvStore =
  create<EnvState>((set) => ({

    variables: {},

    setVariable: (key, value) =>

      set((state) => ({
        variables: {
          ...state.variables,
          [key]: value,
        },
      })),
  }));