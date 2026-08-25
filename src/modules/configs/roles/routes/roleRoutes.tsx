import { lazy } from "react";
import Loadable from "@/core/components/Loadable";
import { PermissionGuard } from "@/modules/auth/components/PermissionGuard";

const RoleList = Loadable(lazy(() => import("@/modules/configs/roles/views/RoleList")));
const RolePermissions = Loadable(
  lazy(() => import("@/modules/configs/roles/views/RolePermissions")),
);

export const roleRoutes = [
  {
    path: "/configs/roles",
    element: (
      <PermissionGuard permission="read-roles">
        <RoleList />
      </PermissionGuard>
    ),
  },
  {
    path: "/configs/roles/:uuid/permissions",
    element: (
      <PermissionGuard permission="update-roles">
        <RolePermissions />
      </PermissionGuard>
    ),
  },
];
