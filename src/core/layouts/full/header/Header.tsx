import { Box, AppBar, Toolbar, styled, Stack } from "@mui/material";
import { useContext } from "react";
import type { FC } from "react";
import Notifications from "@/core/layouts/full/widgets/notifications/Notification";
import Profile from "@/core/layouts/full/widgets/profile/Profile";
import Search from "@/core/layouts/full/widgets/search/Search";
import Language from "@/core/layouts/full/widgets/language/Language";
import ModeSelector from "@/core/layouts/full/widgets/mode/ModeSelector";
import SidebarToggle from "@/core/layouts/full/widgets/sidebar/SidebarToggle";
import config from "@/core/context/config";
import { CustomizerContext } from "@/core/context/CustomizerContext";

// Header TopBar Height
const TopBarHeight = config.topBarHeight;

// Header AppBar
const AppBarStyled = styled(AppBar)(({ theme }) => ({
  boxShadow: "none",
  background: theme.palette.background.paper,
  justifyContent: "center",
  backdropFilter: "blur(4px)",
  [theme.breakpoints.up("lg")]: {
    minHeight: TopBarHeight,
  },
}));

// Header Toolbar
const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
  width: "100%",
  color: theme.palette.text.secondary,
}));

const Header: FC = () => {
  const { activeMode } = useContext(CustomizerContext);

  // Border Bottom Color
  const borderBottom =
    activeMode === "dark" ? "1px solid #353e50" : "1px solid #f3f3f3";

  return (
    <AppBarStyled
      position="sticky"
      color="default"
      sx={{
        borderBottom,
      }}
    >
      <ToolbarStyled>
        {/* ------------------------------------------- */}
        {/* Toggle Button Sidebar */}
        {/* ------------------------------------------- */}
        <SidebarToggle />

        {/* ------------------------------------------- */}
        {/* Search Dropdown */}
        {/* ------------------------------------------- */}
        <Search />
        <Box flexGrow={1} />
        <Stack spacing={1} direction="row" alignItems="center">
          <ModeSelector />
          <Notifications />
          <Language />
          <Profile />
        </Stack>
      </ToolbarStyled>
    </AppBarStyled>
  );
};

export default Header;
