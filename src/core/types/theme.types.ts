/** Available palettes. The active one is set by the backend's `app_theme` setting. */
export const THEME_NAMES = [
  "BLUE_THEME",
  "AQUA_THEME",
  "PURPLE_THEME",
  "GREEN_THEME",
  "CYAN_THEME",
  "ORANGE_THEME",
  "EMERALD_THEME",
  "DEFAULT_THEME",
] as const;

export type ThemeName = (typeof THEME_NAMES)[number];

/** Color tokens of a palette, before translating them to MUI's shape. */
export interface ThemeColors {
  primary: string;
  secondary: string;
  lightprimary: string;
  lightsecondary: string;
  sidebarBg: string;
  info: string;
  success: string;
  warning: string;
  error: string;
  lightinfo: string;
  lightsuccess: string;
  lightwarning: string;
  lighterror: string;
  textPrimary: string;
  textSecondary: string;
  borderColor: string;
  inputBorder: string;
  containerBg: string;
  background: string;
  hoverColor: string;
  grey100: string;
  grey200: string;
}
