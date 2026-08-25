import { useMediaQuery, Box, Drawer, useTheme } from "@mui/material";
import type { FC } from "react";
import type { Theme } from "@mui/material/styles";
import SidebarItems from "./SidebarItems";
import SidebarLogo from "@/core/components/logo/SidebarLogo";
import Scrollbar from "@/core/components/Scrollbar";
import config from "@/core/context/config";
import { useCustomizer } from "@/core/context/CustomizerContext";

const Sidebar: FC = () => {
  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("lg"));
  const { isCollapse, isSidebarHover, setIsSidebarHover, isMobileSidebar, setIsMobileSidebar } =
    useCustomizer();

  const theme = useTheme();
  const isMini = isCollapse === "mini-sidebar" && !isSidebarHover;
  const toggleWidth = isMini ? config.miniSidebarWidth : config.sidebarWidth;

  const paperSx = {
    backgroundColor: theme.palette.sidebar.background,
    borderRight: `1px solid ${theme.palette.divider}`,
    boxSizing: "border-box" as const,
  };

  /** The logo bar has a dark overlay over the sidebar background. */
  const logoBar = (
    <Box
      sx={{
        height: 70,
        display: "flex",
        alignItems: "center",
        px: 2,
        background: "rgba(0, 0, 0, 0.15)",
        flexShrink: 0,
      }}
    >
      <SidebarLogo />
    </Box>
  );

  if (lgUp) {
    return (
      <Box
        sx={{
          width: toggleWidth,
          flexShrink: 0,
          ...(isCollapse === "mini-sidebar" && { position: "absolute" }),
        }}
      >
        <Drawer
          anchor="left"
          open
          onMouseEnter={() => isCollapse === "mini-sidebar" && setIsSidebarHover(true)}
          onMouseLeave={() => setIsSidebarHover(false)}
          variant="permanent"
          slotProps={{
            paper: {
              sx: {
                ...paperSx,
                width: toggleWidth,
                transition: theme.transitions.create("width", {
                  duration: theme.transitions.duration.shortest,
                }),
              },
            },
          }}
        >
          <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
            {logoBar}
            <Scrollbar sx={{ flex: 1, minHeight: 0 }}>
              <SidebarItems />
            </Scrollbar>
          </Box>
        </Drawer>
      </Box>
    );
  }

  return (
    <Drawer
      anchor="left"
      open={isMobileSidebar}
      onClose={() => setIsMobileSidebar(false)}
      variant="temporary"
      slotProps={{
        paper: {
          sx: { ...paperSx, width: config.sidebarWidth, boxShadow: theme.shadows[8] },
        },
      }}
    >
      {logoBar}
      <SidebarItems />
    </Drawer>
  );
};

export default Sidebar;
