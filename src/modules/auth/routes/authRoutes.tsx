import { lazy } from "react";
import Loadable from "@/core/components/Loadable";

const Login = Loadable(lazy(() => import("@/modules/auth/views/login/Login")));
const ForgotPassword = Loadable(
  lazy(() => import("@/modules/auth/views/forgot-password/ForgotPassword")),
);
const ResetPassword = Loadable(
  lazy(() => import("@/modules/auth/views/reset-password/ResetPassword")),
);

export const authRoutes = [
  { path: "/auth/login", element: <Login /> },
  { path: "/auth/forgot-password", element: <ForgotPassword /> },
  { path: "/auth/reset-password", element: <ResetPassword /> },
];

const ProfileView = Loadable(lazy(() => import("@/modules/auth/profile/views/ProfileView")));

export const profileRoutes = [{ path: "/profile", element: <ProfileView /> }];
