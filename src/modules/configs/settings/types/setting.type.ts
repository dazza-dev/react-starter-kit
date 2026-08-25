import type { ThemeName } from "@/core/types/theme.types";

/** Editable settings, already in camelCase as returned by `GET settings`. */
export interface AppSettings {
  appName: string;
  email: string;
  notificationEmail: string;
  language: string;
  timezone: string;
  appTheme: ThemeName;
  logo: string | null;
}

/**
 * Name the backend stores each setting under; it's sent as a payload value, so it's written in snake_case by hand.
 */
export const SETTING_NAMES: Record<keyof AppSettings, string> = {
  appName: "app_name",
  email: "email",
  notificationEmail: "notification_email",
  language: "language",
  timezone: "timezone",
  appTheme: "app_theme",
  logo: "logo",
};

/** Each setting travels as a name/value pair; the backend saves them in bulk. */
export interface SettingPayload {
  name: string;
  value: string;
}
