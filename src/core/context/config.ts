import type { ActiveMode, SidebarType } from "@/core/types";
import { DEFAULT_THEME_NAME } from "@/core/theme/DefaultColors";
import type { ThemeName } from "@/core/types/theme.types";

interface Config {
  activeMode: ActiveMode;
  activeTheme: ThemeName;
  isSidebarHover: boolean;
  isCollapse: SidebarType;
  isMobileSidebar: boolean;
  sidebarWidth: number;
  miniSidebarWidth: number;
  topBarHeight: number;
  /** Outlines cards with a border instead of a shadow. */
  borderCard: boolean;
  /** Centers the content and caps it at `boxedWidth`. */
  boxed: boolean;
  /** Maximum content width when `boxed` is on. */
  boxedWidth: number;
}

const config: Config = {
  activeMode: "light",
  activeTheme: DEFAULT_THEME_NAME,
  isSidebarHover: false,
  isCollapse: "full-sidebar",
  isMobileSidebar: false,
  sidebarWidth: 270,
  miniSidebarWidth: 75,
  topBarHeight: 70,
  borderCard: true,
  boxed: false,
  boxedWidth: 1200,
};

export default config;
