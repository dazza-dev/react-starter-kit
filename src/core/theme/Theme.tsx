import { createTheme } from "@mui/material/styles";
import type { ThemeOptions } from "@mui/material/styles";
import { enUS, esES, ptBR } from "@mui/material/locale";
import { useTranslation } from "react-i18next";
import components from "./Components";
import typography from "./Typography";
import { shadows, darkShadows } from "./Shadows";
import { DARK_THEMES, DEFAULT_THEME_NAME, LIGHT_THEMES } from "./DefaultColors";
import { useCustomizer } from "@/core/context/CustomizerContext";
import type { ThemeColors } from "@/core/types/theme.types";

const MUI_LOCALES = { es: esES, en: enUS, pt: ptBR };

/**
 * Translates a palette's tokens into the shape MUI expects.
 */
function toPaletteOptions(c: ThemeColors, mode: "light" | "dark"): ThemeOptions["palette"] {
  return {
    mode,
    primary: { main: c.primary, light: c.lightprimary, contrastText: "#ffffff" },
    secondary: { main: c.secondary, light: c.lightsecondary, contrastText: "#ffffff" },
    info: { main: c.info, light: c.lightinfo, contrastText: "#ffffff" },
    success: { main: c.success, light: c.lightsuccess, contrastText: "#ffffff" },
    warning: { main: c.warning, light: c.lightwarning, contrastText: "#ffffff" },
    error: { main: c.error, light: c.lighterror, contrastText: "#ffffff" },
    text: { primary: c.textPrimary, secondary: c.textSecondary },
    divider: c.borderColor,
    background: { default: c.background, paper: c.containerBg },
    action: { hover: c.hoverColor, hoverOpacity: 0.02 },
    grey: { 100: c.grey100, 200: c.grey200 },
    inputBorder: c.inputBorder,
    sidebar: {
      background: c.sidebarBg,
      text: "#ffffff",
      hoverBackground: "rgba(255, 255, 255, 0.12)",
      activeBackground: "rgba(0, 0, 0, 0.2)",
    },
  };
}

export const useBuildTheme = () => {
  const { activeMode, activeTheme } = useCustomizer();
  const { i18n } = useTranslation();

  const mode = activeMode === "dark" ? "dark" : "light";
  const palettes = mode === "dark" ? DARK_THEMES : LIGHT_THEMES;
  const colors = palettes[activeTheme] ?? palettes[DEFAULT_THEME_NAME];
  const muiLocale = MUI_LOCALES[i18n.language as keyof typeof MUI_LOCALES] ?? esES;

  const theme = createTheme(
    {
      palette: toPaletteOptions(colors, mode),
      shape: { borderRadius: 7 },
      shadows: mode === "dark" ? darkShadows : shadows,
      typography,
    },
    muiLocale,
  );

  theme.components = components(theme) as typeof theme.components;

  return theme;
};
