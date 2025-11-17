type Mode = "light" | "dark";
type Theme =
  | "BLUE_THEME"
  | "GREEN_THEME"
  | "AQUA_THEME"
  | "PURPLE_THEME"
  | "ORANGE_THEME";
type Layout = "full" | "boxed";
type Language = "en" | "es" | "fr" | "pt";
type SidebarBackground = "colored" | "integrated";

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
  sidebarBackground: SidebarBackground;
}

const allowedThemes: readonly Theme[] = [
  "BLUE_THEME",
  "GREEN_THEME",
  "AQUA_THEME",
  "PURPLE_THEME",
  "ORANGE_THEME",
] as const;

// Active Mode
const envActiveMode: Mode =
  ((import.meta.env.VITE_ACTIVE_MODE as string) || "light").toLowerCase() ===
  "dark"
    ? "dark"
    : "light";

// Theme
const envActiveThemeRaw = (import.meta.env.VITE_ACTIVE_THEME as string) || "";
const envActiveTheme: Theme = (allowedThemes as readonly string[]).includes(
  envActiveThemeRaw.toUpperCase()
)
  ? (envActiveThemeRaw.toUpperCase() as Theme)
  : "BLUE_THEME";

// Layout
const envLayoutRaw = (import.meta.env.VITE_LAYOUT as string) || "";
const envLayout: Layout =
  envLayoutRaw.toLowerCase() === "full" ? "full" : "boxed";

// Language
const allowedLangs: readonly Language[] = ["en", "es", "fr", "pt"] as const;
const envLanguageRaw = (import.meta.env.VITE_LANGUAGE as string) || "";
const envLanguage: Language = (allowedLangs as readonly string[]).includes(
  envLanguageRaw.toLowerCase()
)
  ? (envLanguageRaw.toLowerCase() as Language)
  : "en";

// Sidebar Background
const envSidebarBackgroundRaw =
  (import.meta.env.VITE_SIDEBAR_BACKGROUND as string) || "";
const envSidebarBackground: SidebarBackground =
  envSidebarBackgroundRaw.toLowerCase() === "integrated"
    ? "integrated"
    : "colored";

// Customizer
const config: Config = {
  activeMode: envActiveMode,
  activeTheme: envActiveTheme,
  isLayout: envLayout,
  isSidebarHover: false,
  isCollapse: "full-sidebar",
  isLanguage: envLanguage,
  isCardShadow: true,
  isMobileSidebar: false,
  sidebarWidth: 250,
  miniSidebarWidth: 90,
  topBarHeight: 50,
  sidebarBackground: envSidebarBackground,
};

export default config;
