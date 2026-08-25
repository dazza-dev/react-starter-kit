import axios from "axios";
import applyCaseMiddleware from "axios-case-converter";
import type { AxiosError, AxiosInstance } from "axios";
import { toast } from "react-toastify";
import i18n from "@/core/utils/i18n";

/**
 * Returns the API base URL without a trailing slash.
 */
export function getBaseUrl(): string {
  return (import.meta.env.VITE_API_URL || "http://localhost:8001").replace(/\/$/, "");
}

/**
 * Axios instance with cookie-based session and the camelCase ↔ snake_case conversion the backend expects.
 */
const axiosInstance: AxiosInstance = applyCaseMiddleware(
  axios.create({
    baseURL: `${getBaseUrl()}/api/v1`,
    withCredentials: true,
    withXSRFToken: true,
    timeout: 30_000,
  }),
);

axiosInstance.interceptors.request.use((config) => {
  config.headers["Accept-Language"] = localStorage.getItem("lang") || i18n.language;
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ message?: string }>) => {
    if (axios.isCancel(error)) {
      return Promise.reject(error);
    }

    // No response from the server: network down or timeout.
    if (!error.response) {
      const key = error.code === "ECONNABORTED" ? "errors.timeout" : "errors.network";
      toast.error(i18n.t(`common:${key}`));
      return Promise.reject(error);
    }

    const { status, config } = { status: error.response.status, config: error.config };
    const message = error.response.data?.message;

    if (status === 401) {
      // The startup session check is an expected 401: the guard handles it.
      const isSessionCheck = (config?.url ?? "").includes("auth/profile");
      const isAuthRoute = location.pathname.startsWith("/auth");

      if (!isSessionCheck && !isAuthRoute) {
        toast.error(i18n.t("common:errors.sessionExpired"));
        window.location.href = "/auth/login";
      } else if (isAuthRoute && message) {
        toast.error(message);
      }
    } else if (status === 422) {
      // Validation errors are rendered by the form, field by field.
      if (message) toast.error(message);
    } else if (status >= 400) {
      toast.error(message || i18n.t("common:errors.generic"));
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
