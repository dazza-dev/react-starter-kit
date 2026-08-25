import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import type { AxiosError } from "axios";
import axios from "@/core/utils/axios";
import type { PaginatedResponse } from "@/core/types/common.type";
import type { User, UserForm, UserTableParams } from "@/modules/users/types/user.type";

type ApiError = AxiosError<{ message?: string }>;

const KEY = ["users"];

/**
 * Paginated user list.
 */
export function useUsers(params: UserTableParams) {
  return useQuery<PaginatedResponse<User>>({
    queryKey: [...KEY, params],
    queryFn: async () => {
      const { filters, ...rest } = params;
      const { data } = await axios.get<PaginatedResponse<User>>("users", {
        params: { ...rest, ...filters },
      });
      return data;
    },
    placeholderData: (previous) => previous,
  });
}

/**
 * A single user by its uuid, disabled while the uuid is empty (creation mode).
 */
export function useUser(uuid: string) {
  return useQuery<User>({
    queryKey: [...KEY, uuid],
    queryFn: async () => {
      const { data } = await axios.get<{ data: User }>(`users/${uuid}`);
      return data.data;
    },
    enabled: uuid !== "",
  });
}

/**
 * Creates or updates depending on whether a uuid is given; an empty uuid means creation mode.
 */
export function useSaveUser() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  return useMutation<User, ApiError, { uuid: string; form: UserForm }>({
    mutationFn: async ({ uuid, form }) => {
      // An empty password when editing means "don't change it": it isn't sent.
      const payload = uuid && !form.password ? { ...form, password: undefined } : form;
      const { data } = uuid
        ? await axios.put<{ data: User }>(`users/${uuid}`, payload)
        : await axios.post<{ data: User }>("users", payload);
      return data.data;
    },
    onSuccess: (_data, { uuid }) => {
      void queryClient.invalidateQueries({ queryKey: KEY });
      toast.success(uuid ? t("common:success.updated") : t("common:success.created"));
    },
  });
}

/**
 * Deletes a user (soft delete on the backend).
 */
export function useDeleteUser() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  return useMutation<void, ApiError, string>({
    mutationFn: async (uuid) => {
      await axios.delete(`users/${uuid}`);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: KEY });
      toast.success(t("users:deleted"));
    },
  });
}

/**
 * Restores a deleted user.
 */
export function useRestoreUser() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  return useMutation<void, ApiError, string>({
    mutationFn: async (uuid) => {
      await axios.post(`users/${uuid}/restore`);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: KEY });
      toast.success(t("users:restored"));
    },
  });
}
