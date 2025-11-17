import Loadable from "@/core/components/Loadable";
import { lazy } from "react";

const Dashboard = Loadable(
  lazy(() => import("@/modules/dashboard/views/Dashboard"))
);

export const dashboardRoutes = [{ path: "/dashboard", element: <Dashboard /> }];
