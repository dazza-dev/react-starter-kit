import Loadable from "@/core/components/Loadable";
import { lazy } from "react";

const Users = Loadable(lazy(() => import("@/modules/users/views/UserList")));

export const userRoutes = [{ path: "/users", element: <Users /> }];
