type Mode = "light" | "dark";
type Theme = "BLUE_THEME" | "GREEN_THEME" | "AQUA_THEME" | "PURPLE_THEME" | "ORANGE_THEME";
type Layout = "full" | "boxed";
type Language = "en" | "es" | "fr" | "pt";

interface Config {
  activeMode: Mode;
  activeTheme: Theme;
  isLayout: Layout;
  isSidebarHover: boolean;
  isCollapse: string;
  isLanguage: Language;
  isCardShadow: boolean;
  isMobileSidebar: boolean;
  sidebarWidth: number;
  miniSidebarWidth: number;
  topBarHeight: number;
}

const allowedThemes: readonly Theme[] = [
  "BLUE_THEME",
  "GREEN_THEME",
  "AQUA_THEME",
  "PURPLE_THEME",
  "ORANGE_THEME",
] as const;

const envActiveMode: Mode = ((import.meta.env.VITE_ACTIVE_MODE as string) || "light").toLowerCase() === "dark" ? "dark" : "light";
const envActiveThemeRaw = (import.meta.env.VITE_ACTIVE_THEME as string) || "";
const envActiveTheme: Theme = (allowedThemes as readonly string[]).includes(envActiveThemeRaw.toUpperCase())
  ? (envActiveThemeRaw.toUpperCase() as Theme)
  : "BLUE_THEME";
const envLayoutRaw = (import.meta.env.VITE_LAYOUT as string) || "";
const envLayout: Layout = envLayoutRaw.toLowerCase() === "full" ? "full" : "boxed";
const allowedLangs: readonly Language[] = ["en", "es", "fr", "pt"] as const;
const envLanguageRaw = (import.meta.env.VITE_LANGUAGE as string) || "";
const envLanguage: Language = (allowedLangs as readonly string[]).includes(envLanguageRaw.toLowerCase())
  ? (envLanguageRaw.toLowerCase() as Language)
  : "en";

const config: Config = {
  activeMode: envActiveMode, // This can be light or dark
  activeTheme: envActiveTheme, // BLUE_THEME, GREEN_THEME, AQUA_THEME, PURPLE_THEME, ORANGE_THEME
  isLayout: envLayout, // This can be full or boxed
  isSidebarHover: false,
  isCollapse: "full-sidebar",
  isLanguage: envLanguage,
  isCardShadow: true,
  isMobileSidebar: false,
  sidebarWidth: 270,
  miniSidebarWidth: 87,
  topBarHeight: 70,
};

export default config;
