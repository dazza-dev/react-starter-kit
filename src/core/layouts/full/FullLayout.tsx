import type { FC } from "react";
import { styled, Box, useTheme } from "@mui/material";
import { Outlet } from "react-router";
import Header from "./header/Header";
import Sidebar from "./sidebar/Sidebar";
import ScrollToTop from "@/core/components/ScrollToTop";
import LoadingBar from "@/core/components/LoadingBar";
import { useCustomizer } from "@/core/context/CustomizerContext";
import config from "@/core/context/config";

const MainWrapper = styled("div")(() => ({
  display: "flex",
  minHeight: "100vh",
  width: "100%",
}));

const PageWrapper = styled("div")(() => ({
  display: "flex",
  flexGrow: 1,
  flexDirection: "column",
  zIndex: 1,
  backgroundColor: "transparent",
  // Without this, flex's `min-width: auto` blocks shrinking when the sidebar expands again.
  minWidth: 0,
}));

const FullLayout: FC = () => {
  const { isCollapse } = useCustomizer();
  const theme = useTheme();

  return (
    <>
      <LoadingBar />

      <MainWrapper className="mainwrapper">
        <Sidebar />

        <PageWrapper
          className="page-wrapper"
          sx={{
            ...(isCollapse === "mini-sidebar" && {
              [theme.breakpoints.up("lg")]: { ml: `${config.miniSidebarWidth}px` },
            }),
          }}
        >
          <Header />

          <Box
            sx={{
              flexGrow: 1,
              p: { xs: "20px 10px", sm: "24px" },
              minHeight: "calc(100vh - 170px)",
            }}
          >
            {/* Boxed centers the content and caps its width; off, it fills the area. */}
            <Box sx={config.boxed ? { maxWidth: config.boxedWidth, mx: "auto" } : undefined}>
              <ScrollToTop>
                <Outlet />
              </ScrollToTop>
            </Box>
          </Box>
        </PageWrapper>
      </MainWrapper>
    </>
  );
};

export default FullLayout;
