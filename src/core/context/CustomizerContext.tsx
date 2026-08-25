import { createContext, useContext } from "react";
import type { ActiveMode, SidebarType } from "@/core/types";
import type { ThemeName } from "@/core/types/theme.types";

export interface CustomizerContextState {
  activeMode: ActiveMode;
  setActiveMode: (mode: ActiveMode) => void;
  activeTheme: ThemeName;
  setActiveTheme: (theme: ThemeName) => void;
  isCollapse: SidebarType;
  setIsCollapse: (collapse: SidebarType) => void;
  isSidebarHover: boolean;
  setIsSidebarHover: (isHover: boolean) => void;
  isMobileSidebar: boolean;
  setIsMobileSidebar: (isMobileSidebar: boolean) => void;
}

export const CustomizerContext = createContext<CustomizerContextState | null>(null);

export function useCustomizer(): CustomizerContextState {
  const context = useContext(CustomizerContext);
  if (!context) {
    throw new Error("useCustomizer must be used within a CustomizerContextProvider");
  }
  return context;
}
