import { lazy } from "react";
import Loadable from "@/core/components/Loadable";
import { PermissionGuard } from "@/modules/auth/components/PermissionGuard";

const UserList = Loadable(lazy(() => import("@/modules/users/views/UserList")));

export const userRoutes = [
  {
    path: "/app/users",
    element: (
      <PermissionGuard permission="read-users">
        <UserList />
      </PermissionGuard>
    ),
  },
];
