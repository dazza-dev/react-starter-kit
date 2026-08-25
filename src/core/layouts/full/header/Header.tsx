import { Box, AppBar, Toolbar, styled, Stack } from "@mui/material";
import type { FC } from "react";
import Profile from "@/core/layouts/full/widgets/profile/Profile";
import ModulesMenu from "@/core/layouts/full/widgets/modules/ModulesMenu";
import NotificationsMenu from "@/core/layouts/full/widgets/notifications/NotificationsMenu";
import LanguageSelector from "@/core/layouts/full/widgets/language/LanguageSelector";
import ModeToggle from "@/core/layouts/full/widgets/mode/ModeToggle";
import SidebarToggle from "@/core/layouts/full/widgets/sidebar/SidebarToggle";
import config from "@/core/context/config";

const AppBarStyled = styled(AppBar)(({ theme }) => ({
  background: theme.palette.background.paper,
  justifyContent: "center",
  minHeight: config.topBarHeight,
  boxShadow: theme.shadows[9],
}));

const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
  width: "100%",
  minHeight: `${config.topBarHeight}px !important`,
  padding: "0 24px !important",
  color: theme.palette.text.secondary,
}));

const Header: FC = () => (
  <AppBarStyled position="sticky" color="default" elevation={0}>
    <ToolbarStyled>
      <SidebarToggle />
      <ModulesMenu />

      <Box flexGrow={1} />
      <Stack spacing={1} direction="row" alignItems="center">
        <ModeToggle />
        <NotificationsMenu />
        <LanguageSelector />
        <Profile />
      </Stack>
    </ToolbarStyled>
  </AppBarStyled>
);

export default Header;
