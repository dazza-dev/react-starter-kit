import type { ReactNode } from "react";
import { usePermission } from "@/modules/auth/hooks/usePermission";

interface CanAccessProps {
  permission: string | string[];
  children: ReactNode;
  fallback?: ReactNode;
}

/**
 * Renders its children only if the user has the permission (one match is enough for an array).
 *
 * @example
 * <CanAccess permission="create-users">
 *   <Button>Create user</Button>
 * </CanAccess>
 */
export function CanAccess({ permission, children, fallback = null }: CanAccessProps) {
  const hasPermission = usePermission(permission);
  return hasPermission ? <>{children}</> : <>{fallback}</>;
}
