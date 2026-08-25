import type { ThemeColors, ThemeName } from "@/core/types/theme.types";

const LIGHT_BASE = {
  info: "#539BFF",
  success: "#13DEB9",
  warning: "#FFAE1F",
  error: "#FA896B",
  lightinfo: "#EBF3FE",
  lightsuccess: "#E6FFFA",
  lightwarning: "#FEF5E5",
  lighterror: "#FDEDE8",
  textPrimary: "#2A3547",
  textSecondary: "rgba(42, 53, 71, 0.6)",
  borderColor: "#e5eaef",
  inputBorder: "#DFE5EF",
  containerBg: "#ffffff",
  background: "#f6f8fa",
  hoverColor: "#f6f9fc",
  grey100: "#F2F6FA",
  grey200: "#EAEFF4",
} as const;

const DARK_BASE = {
  info: "#539BFF",
  success: "#13DEB9",
  warning: "#FFAE1F",
  error: "#FA896B",
  lightinfo: "#223662",
  lightsuccess: "#1B3C48",
  lightwarning: "#4D3A2A",
  lighterror: "#4B313D",
  textPrimary: "#EAEFF4",
  textSecondary: "#7C8FAC",
  borderColor: "#333F55",
  inputBorder: "#465670",
  containerBg: "#171c23",
  background: "#171c23",
  hoverColor: "#333f55",
  grey100: "#333F55",
  grey200: "#465670",
} as const;

function light(
  primary: string,
  secondary: string,
  lightprimary: string,
  lightsecondary: string,
  overrides: Partial<ThemeColors> = {},
): ThemeColors {
  // The sidebar follows the primary color unless the palette overrides it.
  return {
    ...LIGHT_BASE,
    primary,
    secondary,
    lightprimary,
    lightsecondary,
    sidebarBg: primary,
    ...overrides,
  };
}

function dark(
  primary: string,
  secondary: string,
  lightprimary: string,
  lightsecondary: string,
  overrides: Partial<ThemeColors> = {},
): ThemeColors {
  return {
    ...DARK_BASE,
    primary,
    secondary,
    lightprimary,
    lightsecondary,
    sidebarBg: primary,
    ...overrides,
  };
}

export const LIGHT_THEMES: Record<ThemeName, ThemeColors> = {
  BLUE_THEME: light("#5D87FF", "#49BEFF", "#ECF2FF", "#E8F7FF"),
  AQUA_THEME: light("#0074BA", "#47D7BC", "#EFF9FF", "#EDFBF7"),
  PURPLE_THEME: light("#763EBD", "#95CFD5", "#F2ECF9", "#EDF8FA"),
  GREEN_THEME: light("#0A7EA4", "#CCDA4E", "#F4F9FB", "#FAFBEF"),
  CYAN_THEME: light("#01C0C8", "#FB9678", "#EBF9FA", "#FFF5F2", { success: "#00e676" }),
  ORANGE_THEME: light("#FA896B", "#0074BA", "#FBF2EF", "#EFF9FF", {
    success: "#00e676",
    warning: "#ffe57f",
  }),
  // Black sidebar with green accents.
  EMERALD_THEME: light("#00c853", "#00e676", "#E6F9ED", "#E9FBF1", {
    sidebarBg: "#12161C",
    success: "#00e676",
  }),
  DEFAULT_THEME: light("#562ff4", "#49BEFF", "#EDE8FE", "#E8F7FF"),
};

export const DARK_THEMES: Record<ThemeName, ThemeColors> = {
  BLUE_THEME: dark("#5D87FF", "#49BEFF", "#253662", "#1C455D", {
    containerBg: "#2a3447",
    background: "#2a3447",
  }),
  AQUA_THEME: dark("#0074BA", "#47D7BC", "#103247", "#0C4339"),
  PURPLE_THEME: dark("#763EBD", "#95CFD5", "#26153C", "#09454B"),
  GREEN_THEME: dark("#0A7EA4", "#CCDA4E", "#05313F", "#282917"),
  CYAN_THEME: dark("#01C0C8", "#FB9678", "#003638", "#40241C"),
  ORANGE_THEME: dark("#FA896B", "#0074BA", "#402E32", "#082E45"),
  EMERALD_THEME: dark("#00c853", "#00e676", "#0C4339", "#003638", {
    sidebarBg: "#0B0E12",
    success: "#00e676",
  }),
  DEFAULT_THEME: dark("#562ff4", "#49BEFF", "#1C1060", "#1C455D"),
};

/** Palette the app starts with if the backend doesn't say otherwise. */
export const DEFAULT_THEME_NAME: ThemeName = "EMERALD_THEME";
