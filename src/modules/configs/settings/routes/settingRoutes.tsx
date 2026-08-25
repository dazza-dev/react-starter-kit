import { lazy } from "react";
import Loadable from "@/core/components/Loadable";
import { PermissionGuard } from "@/modules/auth/components/PermissionGuard";

const SettingsView = Loadable(lazy(() => import("@/modules/configs/settings/views/SettingsView")));

export const settingRoutes = [
  {
    path: "/configs/settings",
    element: (
      <PermissionGuard permission="read-config">
        <SettingsView />
      </PermissionGuard>
    ),
  },
];
