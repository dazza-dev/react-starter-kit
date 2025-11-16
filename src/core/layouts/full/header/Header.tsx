import {
  IconButton,
  Box,
  AppBar,
  useMediaQuery,
  Toolbar,
  styled,
  Stack,
} from "@mui/material";
import { useContext } from "react";
import type { FC } from "react";
import type { Theme } from "@mui/material/styles";
import { IconMenu2, IconMoon, IconSun } from "@tabler/icons-react";
import Notifications from "./Notification";
import Profile from "./Profile";
import Search from "./Search";
import Language from "./Language";
import config from "@/core/context/config";
import { CustomizerContext } from "@/core/context/CustomizerContext";

const TopBarHeight = config.topBarHeight;

const AppBarStyled = styled(AppBar)(({ theme }) => ({
  boxShadow: "none",
  background: theme.palette.background.paper,
  justifyContent: "center",
  backdropFilter: "blur(4px)",
  [theme.breakpoints.up("lg")]: {
    minHeight: TopBarHeight,
  },
}));

const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
  width: "100%",
  color: theme.palette.text.secondary,
}));

const Header: FC = () => {
  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("lg"));

  const {
    activeMode,
    setActiveMode,
    setIsCollapse,
    isCollapse,
    isMobileSidebar,
    setIsMobileSidebar,
  } = useContext(CustomizerContext);

  return (
    <AppBarStyled position="sticky" color="default">
      <ToolbarStyled>
        {/* ------------------------------------------- */}
        {/* Toggle Button Sidebar */}
        {/* ------------------------------------------- */}
        <IconButton
          color="inherit"
          aria-label="menu"
          onClick={() => {
            // Toggle sidebar on both mobile and desktop based on screen size
            if (lgUp) {
              if (isCollapse === "full-sidebar") {
                setIsCollapse("mini-sidebar");
              } else {
                setIsCollapse("full-sidebar");
              }
            } else {
              setIsMobileSidebar(!isMobileSidebar);
            }
          }}
        >
          <IconMenu2 size="20" />
        </IconButton>

        {/* ------------------------------------------- */}
        {/* Search Dropdown */}
        {/* ------------------------------------------- */}
        <Search />
        <Box flexGrow={1} />
        <Stack spacing={1} direction="row" alignItems="center">
          <Language />

          <IconButton size="large" color="inherit">
            {activeMode === "light" ? (
              <IconMoon
                size="21"
                stroke="1.5"
                onClick={() => setActiveMode("dark")}
              />
            ) : (
              <IconSun
                size="21"
                stroke="1.5"
                onClick={() => setActiveMode("light")}
              />
            )}
          </IconButton>

          <Notifications />
          <Profile />
        </Stack>
      </ToolbarStyled>
    </AppBarStyled>
  );
};

export default Header;
