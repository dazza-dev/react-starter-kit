import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import type { AxiosError } from "axios";
import axios from "@/core/utils/axios";
import type { PaginatedResponse } from "@/core/types/common.type";
import type { Role, RoleForm, RolePermissionsResponse, RoleTableParams } from "../types/role.type";

type ApiError = AxiosError<{ message?: string }>;

const KEY = ["roles"];

/**
 * Paginated role list.
 */
export function useRoles(params: RoleTableParams) {
  return useQuery<PaginatedResponse<Role>>({
    queryKey: [...KEY, params],
    queryFn: async () => {
      const { data } = await axios.get<PaginatedResponse<Role>>("roles", { params });
      return data;
    },
    placeholderData: (previous) => previous,
  });
}

/**
 * A single role by its uuid, disabled while the uuid is empty (creation mode).
 */
export function useRole(uuid: string) {
  return useQuery<Role>({
    queryKey: [...KEY, uuid],
    queryFn: async () => {
      const { data } = await axios.get<{ data: Role }>(`roles/${uuid}`);
      return data.data;
    },
    enabled: uuid !== "",
  });
}

/**
 * Creates or updates depending on whether a uuid is given; an empty uuid means creation mode.
 */
export function useSaveRole() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  return useMutation<Role, ApiError, { uuid: string; form: RoleForm }>({
    mutationFn: async ({ uuid, form }) => {
      const { data } = uuid
        ? await axios.put<{ data: Role }>(`roles/${uuid}`, form)
        : await axios.post<{ data: Role }>("roles", form);
      return data.data;
    },
    onSuccess: (_data, { uuid }) => {
      void queryClient.invalidateQueries({ queryKey: KEY });
      void queryClient.invalidateQueries({ queryKey: ["options", "roles"] });
      toast.success(uuid ? t("common:success.updated") : t("common:success.created"));
    },
  });
}

/**
 * Deletes a role (soft delete on the backend).
 */
export function useDeleteRole() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  return useMutation<void, ApiError, string>({
    mutationFn: async (uuid) => {
      await axios.delete(`roles/${uuid}`);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: KEY });
      toast.success(t("roles:deleted"));
    },
  });
}

/**
 * Restores a deleted role.
 */
export function useRestoreRole() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  return useMutation<void, ApiError, string>({
    mutationFn: async (uuid) => {
      await axios.post(`roles/${uuid}/restore`);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: KEY });
      toast.success(t("roles:restored"));
    },
  });
}

/**
 * Permission catalog alongside the ones already assigned to the role.
 */
export function useRolePermissions(uuid: string) {
  return useQuery<RolePermissionsResponse>({
    queryKey: [...KEY, uuid, "permissions"],
    queryFn: async () => {
      const { data } = await axios.get<RolePermissionsResponse>(`roles/${uuid}/permissions`);
      return data;
    },
    enabled: uuid !== "",
  });
}

/**
 * Saves all the role's permissions in a single request, by permission uuid.
 */
export function useSaveRolePermissions(uuid: string) {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  return useMutation<void, ApiError, string[]>({
    mutationFn: async (permissions) => {
      await axios.put(`roles/${uuid}/permissions`, { permissions });
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [...KEY, uuid, "permissions"] });
      // The user's own permissions may have changed if this is their role.
      void queryClient.invalidateQueries({ queryKey: ["auth", "profile"] });
      toast.success(t("roles:permissions.saved"));
    },
  });
}
