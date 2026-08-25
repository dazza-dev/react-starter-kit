import { create } from "zustand";
import axios from "@/core/utils/axios";

export type SettingValue = string | number | boolean | null;
export type Settings = Record<string, SettingValue>;

interface ConfigState {
  settings: Settings;
  loaded: boolean;
  fetchSettings: () => Promise<void>;
  setSettings: (settings: Settings) => void;
}

/**
 * Public app settings (logo, name, theme) loaded once on entry; failures don't block navigation.
 */
export const useConfigStore = create<ConfigState>((set, get) => ({
  settings: {},
  loaded: false,

  fetchSettings: async () => {
    if (get().loaded) return;
    try {
      const { data } = await axios.get<{ data: Settings }>("settings");
      set({ settings: data.data, loaded: true });
    } catch {
      // Settings are decorative: the app keeps working without them.
      set({ loaded: true });
    }
  },

  setSettings: (settings) => set({ settings }),
}));

/**
 * App's display name: the backend setting wins, falling back to .env.
 */
export function useAppName(): string {
  const appName = useConfigStore((state) => state.settings.appName);
  return (appName as string) || import.meta.env.VITE_APP_NAME || "React Starter";
}
