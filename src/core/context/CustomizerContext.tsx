import React from "react";
import { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import config from "./config";

// Define the shape of the context state
interface CustomizerContextState {
  activeMode: string;
  setActiveMode: (mode: string) => void;
  activeTheme: string;
  setActiveTheme: (theme: string) => void;
  isCardShadow: boolean;
  setIsCardShadow: (shadow: boolean) => void;
  isLayout: string;
  setIsLayout: (layout: string) => void;
  isCollapse: string;
  setIsCollapse: (collapse: string) => void;
  isSidebarHover: boolean;
  setIsSidebarHover: (isHover: boolean) => void;
  isMobileSidebar: boolean; // Add this
  setIsMobileSidebar: (isMobileSidebar: boolean) => void;
}

// Create the context with an initial value
export const CustomizerContext = createContext<CustomizerContextState | any>(
  undefined
);

// Define the type for the children prop
interface CustomizerContextProps {
  children: ReactNode;
}

// Create the provider component
export const CustomizerContextProvider: React.FC<CustomizerContextProps> = ({
  children,
}) => {
  const [activeMode, setActiveMode] = useState<string>(() =>
    localStorage.getItem("activeMode") || config.activeMode
  );
  const [activeTheme, setActiveTheme] = useState<string>(() =>
    localStorage.getItem("activeTheme") || config.activeTheme
  );
  const [isCardShadow, setIsCardShadow] = useState<boolean>(
    config.isCardShadow
  );
  const [isLayout, setIsLayout] = useState<string>(() =>
    localStorage.getItem("isLayout") || config.isLayout
  );
  const [isCollapse, setIsCollapse] = useState<string>(() =>
    localStorage.getItem("isCollapse") || config.isCollapse
  );
  const [isLanguage, setIsLanguage] = useState<string>(() =>
    localStorage.getItem("isLanguage") || config.isLanguage
  );
  const [isSidebarHover, setIsSidebarHover] = useState<boolean>(false);
  const [isMobileSidebar, setIsMobileSidebar] = useState<boolean>(false);

  // Set attributes immediately
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
  }, [activeMode, activeTheme, isLayout, isCollapse, isLanguage]);

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
      }}
    >
      {children}
    </CustomizerContext.Provider>
  );
};
