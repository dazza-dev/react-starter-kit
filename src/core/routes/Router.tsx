import { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router";
import Loadable from "@/core/components/Loadable";
import { AuthGuard } from "@/modules/auth/components/AuthGuard";

import { authRoutes, profileRoutes } from "@/modules/auth/routes/authRoutes";
import { dashboardRoutes } from "@/modules/dashboard/routes/dashboardRoutes";
import { userRoutes } from "@/modules/users/routes/userRoutes";
import { groupRoutes } from "@/modules/configs/groups/routes/groupRoutes";
import { roleRoutes } from "@/modules/configs/roles/routes/roleRoutes";
import { settingRoutes } from "@/modules/configs/settings/routes/settingRoutes";

const FullLayout = Loadable(lazy(() => import("@/core/layouts/full/FullLayout")));
const BlankLayout = Loadable(lazy(() => import("@/core/layouts/blank/BlankLayout")));
const NotFound = Loadable(lazy(() => import("@/core/components/NotFound")));
const Forbidden = Loadable(lazy(() => import("@/core/components/Forbidden")));

const routes = [
  {
    path: "/",
    element: <Navigate to="/app/dashboard" replace />,
  },
  {
    path: "/",
    element: (
      <AuthGuard>
        <FullLayout />
      </AuthGuard>
    ),
    children: [
      ...dashboardRoutes,
      ...userRoutes,
      ...groupRoutes,
      ...roleRoutes,
      ...settingRoutes,
      ...profileRoutes,
      { path: "403", element: <Forbidden /> },
      { path: "404", element: <NotFound /> },
      { path: "*", element: <Navigate to="/404" replace /> },
    ],
  },
  {
    path: "/auth",
    element: <BlankLayout />,
    children: [...authRoutes],
  },
];

const router = createBrowserRouter(routes);
export default router;
