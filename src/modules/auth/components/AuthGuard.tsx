import type { ReactNode } from "react";
import { Navigate } from "react-router";
import Spinner from "@/core/components/Spinner";
import { useAuthStore } from "@/modules/auth/store/authStore";
import { useSession } from "@/modules/auth/hooks/useAuth";

/** Blocks access until the session is confirmed. */
export const AuthGuard = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuthStore();

  useSession();

  if (isLoading) {
    return <Spinner />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  return children;
};
