import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import type { AxiosError } from "axios";
import axios from "@/core/utils/axios";
import { useConfigStore } from "@/core/store/configStore";
import type { Settings } from "@/core/store/configStore";
import type { SettingPayload } from "../types/setting.type";

type ApiError = AxiosError<{ message?: string }>;

const KEY = ["settings"];

/**
 * App settings, from a public endpoint also consumed by the login screen.
 */
export function useSettings() {
  return useQuery<Settings>({
    queryKey: KEY,
    queryFn: async () => {
      const { data } = await axios.get<{ data: Settings }>("settings");
      return data.data;
    },
  });
}

/**
 * Saves all modified settings in a single request and refreshes the global store.
 */
export function useUpdateSettings() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const setSettings = useConfigStore((state) => state.setSettings);

  return useMutation<Settings, ApiError, SettingPayload[]>({
    mutationFn: async (settings) => {
      await axios.put("settings", { settings });
      const { data } = await axios.get<{ data: Settings }>("settings");
      return data.data;
    },
    onSuccess: (settings) => {
      setSettings(settings);
      void queryClient.invalidateQueries({ queryKey: KEY });
      toast.success(t("settings:saved"));
    },
  });
}

/**
 * Uploads the logo and returns its public URL.
 */
export function useUploadLogo() {
  return useMutation<string, ApiError, File>({
    mutationFn: async (file) => {
      const formData = new FormData();
      formData.append("file", file);
      const { data } = await axios.post<{ url: string }>("settings/upload-logo", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return data.url;
    },
  });
}
