import "@mui/material/styles";

declare module "@mui/material/styles" {
  interface SidebarPalette {
    background: string;
    text: string;
    hoverBackground: string;
    activeBackground: string;
  }

  interface Palette {
    sidebar: SidebarPalette;
    inputBorder: string;
  }

  interface PaletteOptions {
    sidebar?: SidebarPalette;
    inputBorder?: string;
  }
}
