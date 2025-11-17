import { useState, useEffect } from "react";
import type { ReactNode, ReactElement } from "react";
import config from "./config";
import { CustomizerContext } from "./CustomizerContext";

type CustomizerContextProps = {
  children: ReactNode;
};

export const CustomizerContextProvider = ({
  children,
}: CustomizerContextProps): ReactElement => {
  const [activeMode, setActiveMode] = useState<string>(
    () => localStorage.getItem("activeMode") || config.activeMode
  );
  const [activeTheme, setActiveTheme] = useState<string>(
    () => localStorage.getItem("activeTheme") || config.activeTheme
  );
  const [isCardShadow, setIsCardShadow] = useState<boolean>(
    config.isCardShadow
  );
  const [isLayout, setIsLayout] = useState<string>(
    () => localStorage.getItem("isLayout") || config.isLayout
  );
  const [isCollapse, setIsCollapse] = useState<string>(
    () => localStorage.getItem("isCollapse") || config.isCollapse
  );
  const [isLanguage, setIsLanguage] = useState<string>(
    () => localStorage.getItem("isLanguage") || config.isLanguage
  );
  const [sidebarBackground, setSidebarBackground] = useState<string>(
    () => localStorage.getItem("sidebarBackground") || config.sidebarBackground
  );
  const [isSidebarHover, setIsSidebarHover] = useState<boolean>(false);
  const [isMobileSidebar, setIsMobileSidebar] = useState<boolean>(false);

  useEffect(() => {
    document.documentElement.setAttribute("class", activeMode);
    document.documentElement.setAttribute("data-color-theme", activeTheme);
    document.documentElement.setAttribute("data-boxed-layout", isLayout);
    document.documentElement.setAttribute("data-sidebar-type", isCollapse);
  }, [activeMode, activeTheme, isLayout, isCollapse]);

  useEffect(() => {
    localStorage.setItem("activeMode", activeMode);
    localStorage.setItem("activeTheme", activeTheme);
    localStorage.setItem("isLayout", isLayout);
    localStorage.setItem("isCollapse", isCollapse);
    localStorage.setItem("isLanguage", isLanguage);
    localStorage.setItem("sidebarBackground", sidebarBackground);
  }, [
    activeMode,
    activeTheme,
    isLayout,
    isCollapse,
    isLanguage,
    sidebarBackground,
  ]);

  return (
    <CustomizerContext.Provider
      value={{
        activeMode,
        setActiveMode,
        activeTheme,
        setActiveTheme,
        isCardShadow,
        setIsCardShadow,
        isLayout,
        setIsLayout,
        isCollapse,
        setIsCollapse,
        isLanguage,
        setIsLanguage,
        isSidebarHover,
        setIsSidebarHover,
        isMobileSidebar,
        setIsMobileSidebar,
        sidebarBackground,
        setSidebarBackground,
      }}
    >
      {children}
    </CustomizerContext.Provider>
  );
}