import { createContext } from "react";

export interface CustomizerContextState {
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
  isMobileSidebar: boolean;
  setIsMobileSidebar: (isMobileSidebar: boolean) => void;
  sidebarBackground: string;
  setSidebarBackground: (value: string) => void;
  isLanguage: string;
  setIsLanguage: (language: string) => void;
}

export const CustomizerContext = createContext<CustomizerContextState>(
  {} as CustomizerContextState
);
