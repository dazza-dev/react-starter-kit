import _ from "lodash";
import { createTheme } from "@mui/material/styles";
import type { ThemeOptions } from "@mui/material/styles";
import { useContext } from "react";
import components from "./Components";
import typography from "./Typography";
import { shadows, darkShadows } from "./Shadows";
import { DarkThemeColors } from "./DarkThemeColors";
import { LightThemeColors } from "./LightThemeColors";
import { baseDarkTheme, baseLightTheme } from "./DefaultColors";
import * as locales from "@mui/material/locale";
import { CustomizerContext } from "../context/CustomizerContext";

export const BuildTheme = (config: { theme?: string } = {}) => {
  const themeOptions = LightThemeColors.find(
    (theme) => theme.name === config.theme
  );
  const darkThemeOptions = DarkThemeColors.find(
    (theme) => theme.name === config.theme
  );

  const { activeMode } = useContext(CustomizerContext);

  // Set default theme
  const defaultTheme = activeMode === "dark" ? baseDarkTheme : baseLightTheme;
  const defaultShadow = activeMode === "dark" ? darkShadows : shadows;
  const themeSelect = activeMode === "dark" ? darkThemeOptions : themeOptions;
  const paletteMode: "light" | "dark" = activeMode === "dark" ? "dark" : "light";
  const baseMode: ThemeOptions = {
    palette: {
      mode: paletteMode,
    },
    shape: {
      borderRadius: 7,
    },
    shadows: defaultShadow,
    typography: typography,
  };
  const theme = createTheme(
    _.merge({}, baseMode, defaultTheme, locales, themeSelect)
  );
  theme.components = components(theme) as unknown as typeof theme.components;

  return theme;
};

/**
 * ThemeSettings
 *
 * This component provides the theme settings for the application.
 * It uses the CustomizerContext to determine the active theme and
 * builds the theme using the BuildTheme function.
 *
 * @returns {Theme} The theme object for the application.
 */
const ThemeSettings = () => {
  const { activeTheme } = useContext(CustomizerContext);

  const theme = BuildTheme({
    theme: activeTheme,
  });

  return theme;
};

export { ThemeSettings };
