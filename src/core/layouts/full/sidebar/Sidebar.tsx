import { useMediaQuery, Box, Drawer, useTheme } from "@mui/material";
import type { FC } from "react";
import type { Theme } from "@mui/material/styles";
import SidebarItems from "./SidebarItems";
import Logo from "@/core/components/logo/Logo";
import Scrollbar from "@/core/components/Scrollbar";
import config from "@/core/context/config";
import { CustomizerContext } from "@/core/context/CustomizerContext";
import { useContext } from "react";

const Sidebar: FC = () => {
  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("lg"));
  const {
    isCollapse,
    isSidebarHover,
    setIsSidebarHover,
    isMobileSidebar,
    setIsMobileSidebar,
    sidebarBackground,
    activeMode,
  } = useContext(CustomizerContext);

  // Sidebar width
  const MiniSidebarWidth = config.miniSidebarWidth;
  const SidebarWidth = config.sidebarWidth;

  const theme = useTheme();
  const toggleWidth =
    isCollapse == "mini-sidebar" && !isSidebarHover
      ? MiniSidebarWidth
      : SidebarWidth;

  const onHoverEnter = () => {
    if (isCollapse == "mini-sidebar") {
      setIsSidebarHover(true);
    }
  };

  const onHoverLeave = () => {
    setIsSidebarHover(false);
  };

  // Set sidebar background color
  const sidebarBgColor =
    sidebarBackground === "integrated"
      ? theme.palette.background.paper
      : activeMode === "light"
      ? "#000000"
      : (
          theme.palette.background as unknown as {
            sidebar?: string;
            paper: string;
          }
        ).sidebar || theme.palette.background.paper;

  // Sidebar Border
  const sidebarBorder =
    sidebarBackground === "integrated"
      ? activeMode === "dark"
        ? "1px solid #353e50"
        : "1px solid #f3f3f3"
      : "none";

  // Sidebar for desktop
  if (lgUp) {
    return (
      <Box
        sx={{
          width: toggleWidth,
          flexShrink: 0,
          ...(isCollapse == "mini-sidebar" && {
            position: "absolute",
          }),
        }}
      >
        {/* ------------------------------------------- */}
        {/* Sidebar for desktop */}
        {/* ------------------------------------------- */}
        <Drawer
          anchor="left"
          open
          onMouseEnter={onHoverEnter}
          onMouseLeave={onHoverLeave}
          variant="permanent"
          slotProps={{
            paper: {
              sx: {
                transition: theme.transitions.create("width", {
                  duration: theme.transitions.duration.shortest,
                }),
                width: toggleWidth,
                boxSizing: "border-box",
                borderRight: sidebarBorder,
                backgroundColor: sidebarBgColor,
              },
            },
          }}
        >
          {/* ------------------------------------------- */}
          {/* Sidebar Box */}
          {/* ------------------------------------------- */}
          <Box
            sx={{
              height: "100%",
            }}
          >
            {/* ------------------------------------------- */}
            {/* Logo */}
            {/* ------------------------------------------- */}
            <Box px={3}>
              <Logo />
            </Box>
            <Scrollbar sx={{ height: "calc(100% - 190px)" }}>
              {/* ------------------------------------------- */}
              {/* Sidebar Items */}
              {/* ------------------------------------------- */}
              <SidebarItems />
            </Scrollbar>
          </Box>
        </Drawer>
      </Box>
    );
  }

  // Sidebar for mobile
  return (
    <Drawer
      anchor="left"
      open={isMobileSidebar}
      onClose={() => setIsMobileSidebar(false)}
      variant="temporary"
      slotProps={{
        paper: {
          sx: {
            width: SidebarWidth,
            border: "0 !important",
            boxShadow: (theme) => theme.shadows[8],
            backgroundColor: sidebarBgColor,
          },
        },
      }}
    >
      {/* ------------------------------------------- */}
      {/* Logo */}
      {/* ------------------------------------------- */}
      <Box px={2}>
        <Logo />
      </Box>
      {/* ------------------------------------------- */}
      {/* Sidebar For Mobile */}
      {/* ------------------------------------------- */}
      <SidebarItems />
    </Drawer>
  );
};

export default Sidebar;
