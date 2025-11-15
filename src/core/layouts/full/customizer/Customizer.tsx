import { useState, useContext } from "react";
import type { FC } from "react";
import {
  Fab,
  Drawer,
  Grid,
  Divider,
  styled,
  IconButton,
  Typography,
  Tooltip,
  Stack,
} from "@mui/material";

import Box from "@mui/material/Box";
import type { BoxProps } from "@mui/material/Box";
import { IconX, IconSettings, IconCheck } from "@tabler/icons-react";
import Scrollbar from "@/core/components/Scrollbar";
import WbSunnyTwoToneIcon from "@mui/icons-material/WbSunnyTwoTone";
import DarkModeTwoToneIcon from "@mui/icons-material/DarkModeTwoTone";
import AspectRatioTwoToneIcon from "@mui/icons-material/AspectRatioTwoTone";
import CallToActionTwoToneIcon from "@mui/icons-material/CallToActionTwoTone";
import { BorderOuter } from "@mui/icons-material";
import InvertColorsTwoToneIcon from "@mui/icons-material/InvertColorsTwoTone";
import LayersTwoToneIcon from "@mui/icons-material/LayersTwoTone";
import { CustomizerContext } from "@/core/context/CustomizerContext";

const SidebarWidth = "320px";
interface colors {
  id: number;
  bgColor: string;
  disp?: string;
}

const Customizer: FC = () => {
  const [showDrawer, setShowDrawer] = useState(false);
  const {
    activeMode,
    setActiveMode,
    activeTheme,
    isLayout,
    isCardShadow,
    setIsCardShadow,
    setIsLayout,
    setActiveTheme,
    sidebarBackground,
    setSidebarBackground,
  } = useContext(CustomizerContext);

  const StyledBox = styled(Box)<BoxProps>(({ theme }) => ({
    boxShadow: theme.shadows[8],
    padding: "20px",
    cursor: "pointer",
    justifyContent: "center",
    display: "flex",
    transition: "0.1s ease-in",
    border: "1px solid rgba(145, 158, 171, 0.12)",
    "&:hover": {
      transform: "scale(1.05)",
    },
  }));

  const addAttributeToBody = (cvalue: any) => {
    document.body.setAttribute("data-color-theme", cvalue);
  };

  const thColors: colors[] = [
    {
      id: 1,
      bgColor: "#5D87FF",
      disp: "BLUE_THEME",
    },
    {
      id: 2,
      bgColor: "#0074BA",
      disp: "AQUA_THEME",
    },
    {
      id: 3,
      bgColor: "#763EBD",
      disp: "PURPLE_THEME",
    },
    {
      id: 4,
      bgColor: "#0A7EA4",
      disp: "GREEN_THEME",
    },
    {
      id: 5,
      bgColor: "#01C0C8",
      disp: "CYAN_THEME",
    },
    {
      id: 6,
      bgColor: "#FA896B",
      disp: "ORANGE_THEME",
    },
  ];

  return (
    <div>
      {/* ------------------------------------------- */}
      {/* --Floating Button to open customizer ------ */}
      {/* ------------------------------------------- */}
      <Tooltip title="Settings">
        <Fab
          color="primary"
          aria-label="settings"
          sx={{ position: "fixed", right: "25px", bottom: "15px" }}
          onClick={() => setShowDrawer(true)}
        >
          <IconSettings stroke={1.5} />
        </Fab>
      </Tooltip>
      <Drawer
        anchor="right"
        open={showDrawer}
        onClose={() => setShowDrawer(false)}
        slotProps={{
          paper: {
            sx: {
              width: SidebarWidth,
            },
          },
        }}
      >
        {/* ------------------------------------------- */}
        {/* ------------ Customizer Sidebar ------------- */}
        {/* ------------------------------------------- */}
        <Scrollbar sx={{ height: "calc(100vh - 5px)" }}>
          <Box
            p={2}
            display="flex"
            justifyContent={"space-between"}
            alignItems="center"
          >
            <Typography variant="h4">Settings</Typography>

            <IconButton color="inherit" onClick={() => setShowDrawer(false)}>
              <IconX size="1rem" />
            </IconButton>
          </Box>
          <Divider />
          <Box p={3}>
            {/* ------------------------------------------- */}
            {/* ------------ Dark light theme setting ------------- */}
            {/* ------------------------------------------- */}
            <Typography variant="h6" gutterBottom>
              Theme Option
            </Typography>
            <Stack direction={"row"} gap={2} my={2}>
              <StyledBox
                onClick={() => setActiveMode("light")}
                display="flex"
                gap={1}
              >
                <WbSunnyTwoToneIcon
                  color={activeMode === "light" ? "primary" : "inherit"}
                />
                Light
              </StyledBox>
              <StyledBox
                onClick={() => setActiveMode("dark")}
                display="flex"
                gap={1}
              >
                <DarkModeTwoToneIcon
                  color={activeMode === "dark" ? "primary" : "inherit"}
                />
                Dark
              </StyledBox>
            </Stack>

            <Box pt={3} />
            {/* ------------------------------------------- */}
            {/* ------------ Theme Color setting ------------- */}
            {/* ------------------------------------------- */}
            <Typography variant="h6" gutterBottom>
              Theme Colors
            </Typography>
            <Grid container spacing={2}>
              {thColors.map((thcolor) => (
                <Grid key={thcolor.id} size={4}>
                  <StyledBox onClick={() => addAttributeToBody(thcolor.disp)}>
                    <Tooltip title={`${thcolor.disp}`} placement="top">
                      <Box
                        sx={{
                          backgroundColor: thcolor.bgColor,
                          width: "25px",
                          height: "25px",
                          borderRadius: "60px",
                          alignItems: "center",
                          justifyContent: "center",
                          display: "flex",
                          color: "white",
                        }}
                        aria-label={`${thcolor.bgColor}`}
                        onClick={() => setActiveTheme(thcolor.disp)}
                      >
                        {activeTheme === thcolor.disp ? (
                          <IconCheck width={13} />
                        ) : (
                          ""
                        )}
                      </Box>
                    </Tooltip>
                  </StyledBox>
                </Grid>
              ))}
            </Grid>
            <Box pt={4} />
            <Typography variant="h6" gutterBottom>
              Sidebar Background
            </Typography>
            <Stack direction={"row"} gap={2} my={2}>
              <StyledBox
                onClick={() => setSidebarBackground("colored")}
                display="flex"
                gap={1}
              >
                <InvertColorsTwoToneIcon
                  color={
                    sidebarBackground === "colored" ? "primary" : "inherit"
                  }
                />
                Colored
              </StyledBox>
              <StyledBox
                onClick={() => setSidebarBackground("integrated")}
                display="flex"
                gap={1}
              >
                <LayersTwoToneIcon
                  color={
                    sidebarBackground === "integrated" ? "primary" : "inherit"
                  }
                />
                Integrated
              </StyledBox>
            </Stack>
            <Box pt={4} />
            {/* ------------------------------------------- */}
            {/* ------------ Layout Boxed / Full ------------- */}
            {/* ------------------------------------------- */}
            <Typography variant="h6" gutterBottom>
              Container Option
            </Typography>
            <Stack direction={"row"} gap={2} my={2}>
              <StyledBox
                onClick={() => setIsLayout("boxed")}
                display="flex"
                gap={1}
              >
                <CallToActionTwoToneIcon
                  color={isLayout === "boxed" ? "primary" : "inherit"}
                />
                Boxed
              </StyledBox>
              <StyledBox
                onClick={() => setIsLayout("full")}
                display="flex"
                gap={1}
              >
                <AspectRatioTwoToneIcon
                  color={isLayout === "full" ? "primary" : "inherit"}
                />
                Full
              </StyledBox>
            </Stack>
            <Box pt={4} />
            {/* ------------------------------------------- */}
            {/* ------------ Sidebar Color setting ------------- */}
            {/* ------------------------------------------- */}
            <Typography variant="h6" gutterBottom>
              Card With
            </Typography>
            <Stack direction={"row"} gap={2} my={2}>
              <StyledBox
                onClick={() => setIsCardShadow(false)}
                display="flex"
                gap={1}
              >
                <BorderOuter color={!isCardShadow ? "primary" : "inherit"} />
                Border
              </StyledBox>
              <StyledBox
                onClick={() => setIsCardShadow(true)}
                display="flex"
                gap={1}
              >
                <CallToActionTwoToneIcon
                  color={isCardShadow ? "primary" : "inherit"}
                />
                Shadow
              </StyledBox>
            </Stack>
          </Box>
        </Scrollbar>
      </Drawer>
    </div>
  );
};

export default Customizer;
