import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import type { AxiosError } from "axios";
import axios from "@/core/utils/axios";
import type { PaginatedResponse } from "@/core/types/common.type";
import type { Group, GroupForm, GroupTableParams } from "../types/group.type";

type ApiError = AxiosError<{ message?: string }>;

const KEY = ["groups"];

/**
 * Paginated group list.
 */
export function useGroups(params: GroupTableParams) {
  return useQuery<PaginatedResponse<Group>>({
    queryKey: [...KEY, params],
    queryFn: async () => {
      const { data } = await axios.get<PaginatedResponse<Group>>("groups", { params });
      return data;
    },
    placeholderData: (previous) => previous,
  });
}

/**
 * A single group by its uuid, disabled while the uuid is empty (creation mode).
 */
export function useGroup(uuid: string) {
  return useQuery<Group>({
    queryKey: [...KEY, uuid],
    queryFn: async () => {
      const { data } = await axios.get<{ data: Group }>(`groups/${uuid}`);
      return data.data;
    },
    enabled: uuid !== "",
  });
}

/**
 * Creates or updates depending on whether a uuid is given; an empty uuid means creation mode.
 */
export function useSaveGroup() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  return useMutation<Group, ApiError, { uuid: string; form: GroupForm }>({
    mutationFn: async ({ uuid, form }) => {
      const { data } = uuid
        ? await axios.put<{ data: Group }>(`groups/${uuid}`, form)
        : await axios.post<{ data: Group }>("groups", form);
      return data.data;
    },
    onSuccess: (_data, { uuid }) => {
      void queryClient.invalidateQueries({ queryKey: KEY });
      void queryClient.invalidateQueries({ queryKey: ["options", "groups"] });
      toast.success(uuid ? t("common:success.updated") : t("common:success.created"));
    },
  });
}

/**
 * Deletes a group (soft delete on the backend).
 */
export function useDeleteGroup() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  return useMutation<void, ApiError, string>({
    mutationFn: async (uuid) => {
      await axios.delete(`groups/${uuid}`);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: KEY });
      toast.success(t("groups:deleted"));
    },
  });
}

/**
 * Restores a deleted group.
 */
export function useRestoreGroup() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  return useMutation<void, ApiError, string>({
    mutationFn: async (uuid) => {
      await axios.post(`groups/${uuid}/restore`);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: KEY });
      toast.success(t("groups:restored"));
    },
  });
}
