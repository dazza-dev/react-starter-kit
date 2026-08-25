import { useAuthStore } from "@/modules/auth/store/authStore";

/**
 * Checks whether the user has a permission (one match is enough for an array), same as the route guard and CanAccess.
 *
 * @example
 * const canCreate = usePermission("create-users");
 * const canManage = usePermission(["read-roles", "update-roles"]);
 */
export function usePermission(permission: string | string[]): boolean {
  return useAuthStore((state) => state.can(permission));
}
