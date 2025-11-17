import Loadable from "@/core/components/Loadable";
import { lazy } from "react";

const Login = Loadable(lazy(() => import("@/modules/auth/views/Login")));
const ForgotPassword = Loadable(
  lazy(() => import("@/modules/auth/views/ForgotPassword"))
);
const Register = Loadable(lazy(() => import("@/modules/auth/views/Register")));
const TwoSteps = Loadable(lazy(() => import("@/modules/auth/views/TwoSteps")));

export const authRoutes = [
  { path: "/auth/login", element: <Login /> },
  { path: "/auth/forgot-password", element: <ForgotPassword /> },
  { path: "/auth/register", element: <Register /> },
  { path: "/auth/two-steps", element: <TwoSteps /> },
];
