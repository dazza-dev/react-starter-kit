import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import type { AxiosError } from "axios";
import axios from "@/core/utils/axios";
import { useAuthStore } from "@/modules/auth/store/authStore";
import type {
  AuthUser,
  ForgotPasswordPayload,
  LoginPayload,
  ProfileForm,
  ResetPasswordPayload,
} from "@/modules/auth/types/auth.type";

type ApiError = AxiosError<{ message?: string }>;

/**
 * Checks the session against the backend and syncs the store; the cookie is the only source of truth after a reload, and the response already includes permissions.
 */
export function useSession() {
  const setUser = useAuthStore((state) => state.setUser);
  const logout = useAuthStore((state) => state.logout);

  const query = useQuery<AuthUser, ApiError>({
    queryKey: ["auth", "profile"],
    queryFn: async () => {
      const { data } = await axios.post<{ data: AuthUser }>("auth/profile");
      return data.data;
    },
    retry: false,
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    if (query.isSuccess) setUser(query.data);
    else if (query.isError) logout();
  }, [query.isSuccess, query.isError, query.data, setUser, logout]);

  return query;
}

/**
 * Logs in with username and password and enters the dashboard.
 */
export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);

  return useMutation<AuthUser, ApiError, LoginPayload>({
    mutationFn: async (payload) => {
      const { data } = await axios.post<{ data: AuthUser }>("auth/login", payload);
      return data.data;
    },
    onSuccess: (user) => {
      setUser(user);
      queryClient.setQueryData(["auth", "profile"], user);
      void navigate("/app/dashboard");
    },
  });
}

/**
 * Logs out, clearing the local session regardless of what happens on the server.
 */
export function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);

  return useMutation<void, ApiError, void>({
    mutationFn: async () => {
      await axios.post("auth/logout");
    },
    onSettled: () => {
      logout();
      queryClient.clear();
      void navigate("/auth/login");
    },
  });
}

/**
 * Requests the password recovery link.
 */
export function useForgotPassword() {
  return useMutation<{ message: string }, ApiError, ForgotPasswordPayload>({
    mutationFn: async (payload) => {
      const { data } = await axios.post<{ message: string }>("auth/forgot-password", payload);
      return data;
    },
  });
}

/**
 * Changes the password using the token received by email.
 */
export function useResetPassword() {
  return useMutation<{ message: string }, ApiError, ResetPasswordPayload>({
    mutationFn: async (payload) => {
      const { data } = await axios.post<{ message: string }>("auth/reset-password", payload);
      return data;
    },
  });
}

/**
 * Updates the authenticated user's profile.
 */
export function useUpdateProfile() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const setUser = useAuthStore((state) => state.setUser);

  return useMutation<AuthUser, ApiError, ProfileForm>({
    mutationFn: async (form) => {
      // An empty password means "don't change it": neither it nor its confirmation are sent.
      const { password, passwordConfirmation, ...rest } = form;
      const payload = password ? { ...rest, password, passwordConfirmation } : rest;
      const { data } = await axios.put<{ data: AuthUser }>("auth/profile", payload);
      return data.data;
    },
    onSuccess: (user) => {
      setUser(user);
      queryClient.setQueryData(["auth", "profile"], user);
      toast.success(t("auth:profile.updated"));
    },
  });
}
