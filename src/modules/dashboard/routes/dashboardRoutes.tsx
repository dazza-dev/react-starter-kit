import { lazy } from "react";
import Loadable from "@/core/components/Loadable";
import { PermissionGuard } from "@/modules/auth/components/PermissionGuard";

const Dashboard = Loadable(lazy(() => import("@/modules/dashboard/views/Dashboard")));

export const dashboardRoutes = [
  {
    path: "/app/dashboard",
    element: (
      <PermissionGuard permission="read-dashboard">
        <Dashboard />
      </PermissionGuard>
    ),
  },
];
