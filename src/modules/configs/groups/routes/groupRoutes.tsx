import { lazy } from "react";
import Loadable from "@/core/components/Loadable";
import { PermissionGuard } from "@/modules/auth/components/PermissionGuard";

const GroupList = Loadable(lazy(() => import("@/modules/configs/groups/views/GroupList")));

export const groupRoutes = [
  {
    path: "/configs/groups",
    element: (
      <PermissionGuard permission="read-groups">
        <GroupList />
      </PermissionGuard>
    ),
  },
];
