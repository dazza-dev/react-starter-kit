import { useState, useEffect, useMemo } from "react";
import type { ReactNode, ReactElement } from "react";
import config from "./config";
import { CustomizerContext } from "./CustomizerContext";
import type { ActiveMode, SidebarType } from "@/core/types";
import { THEME_NAMES } from "@/core/types/theme.types";
import type { ThemeName } from "@/core/types/theme.types";

type CustomizerContextProps = {
  children: ReactNode;
};

function storedTheme(): ThemeName {
  const saved = localStorage.getItem("activeTheme") as ThemeName | null;
  return saved && THEME_NAMES.includes(saved) ? saved : config.activeTheme;
}

export const CustomizerContextProvider = ({ children }: CustomizerContextProps): ReactElement => {
  const [activeMode, setActiveMode] = useState<ActiveMode>(
    () => (localStorage.getItem("activeMode") as ActiveMode) || config.activeMode,
  );
  const [activeTheme, setActiveTheme] = useState<ThemeName>(storedTheme);
  const [isCollapse, setIsCollapse] = useState<SidebarType>(
    () => (localStorage.getItem("isCollapse") as SidebarType) || config.isCollapse,
  );
  const [isSidebarHover, setIsSidebarHover] = useState<boolean>(false);
  const [isMobileSidebar, setIsMobileSidebar] = useState<boolean>(false);

  useEffect(() => {
    document.documentElement.setAttribute("class", activeMode);
    document.documentElement.setAttribute("data-color-theme", activeTheme);
    document.documentElement.setAttribute("data-sidebar-type", isCollapse);
    localStorage.setItem("activeMode", activeMode);
    localStorage.setItem("activeTheme", activeTheme);
    localStorage.setItem("isCollapse", isCollapse);
  }, [activeMode, activeTheme, isCollapse]);

  const contextValue = useMemo(
    () => ({
      activeMode,
      setActiveMode,
      activeTheme,
      setActiveTheme,
      isCollapse,
      setIsCollapse,
      isSidebarHover,
      setIsSidebarHover,
      isMobileSidebar,
      setIsMobileSidebar,
    }),
    [activeMode, activeTheme, isCollapse, isSidebarHover, isMobileSidebar],
  );

  return <CustomizerContext.Provider value={contextValue}>{children}</CustomizerContext.Provider>;
};
