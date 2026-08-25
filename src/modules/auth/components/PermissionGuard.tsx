import type { ReactNode } from "react";
import { Navigate } from "react-router";
import { usePermission } from "@/modules/auth/hooks/usePermission";

/**
 * Wraps a route with the permission it requires, redirecting to /403 without it.
 */
export const PermissionGuard = ({
  permission,
  children,
}: {
  permission: string | string[];
  children: ReactNode;
}) => {
  const allowed = usePermission(permission);
  return allowed ? children : <Navigate to="/403" replace />;
};
