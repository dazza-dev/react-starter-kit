import { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router";
import Loadable from "@/core/components/Loadable";

/**
 * Routes
 */
import { authRoutes } from "@/modules/auth/routes/authRoutes";
import { dashboardRoutes } from "@/modules/dashboard/routes/dashboardRoutes";
import { userRoutes } from "@/modules/users/routes/userRoutes";

/**
 * Layouts
 */
const FullLayout = Loadable(
  lazy(() => import("@/core/layouts/full/FullLayout"))
);
const BlankLayout = Loadable(
  lazy(() => import("@/core/layouts/blank/BlankLayout"))
);
const Error = Loadable(lazy(() => import("@/core/components/Error")));

/**
 * Routes
 */
const Router = [
  {
    path: "/",
    element: <FullLayout />,
    children: [
      { path: "/", element: <Navigate to="/dashboard" /> },
      ...dashboardRoutes,
      ...userRoutes,
      { path: "404", element: <Error /> },
      { path: "*", element: <Navigate to="/404" /> },
    ],
  },
  {
    path: "/auth",
    element: <BlankLayout />,
    children: [...authRoutes],
  },
];

const router = createBrowserRouter(Router);
export default router;
