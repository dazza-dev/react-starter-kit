import { Grid, Box } from "@mui/material";
import LogoAuth from "@/core/components/logo/LogoAuth";
import PageContainer from "@/core/components/PageContainer";
import loginBg from "@/assets/images/backgrounds/login-bg.svg";
import type { ReactNode } from "react";

type Props = {
  title?: string;
  description?: string;
  children: ReactNode;
};

const AuthLayoutSide = ({ title, description, children }: Props) => (
  <PageContainer title={title} description={description}>
    <Grid
      container
      justifyContent="center"
      spacing={0}
      sx={{ overflowX: "hidden" }}
    >
      <Grid
        sx={{
          position: "relative",
          "&:before": {
            content: '""',
            background: (theme) => theme.palette.primary.main,
            backgroundSize: "400% 400%",
            position: "absolute",
            height: "100%",
            width: "100%",
          },
        }}
        size={{
          xs: 12,
          sm: 12,
          lg: 6,
          xl: 6,
        }}
      >
        <Box position="relative">
          <Box
            alignItems="center"
            justifyContent="center"
            height={"100vh"}
            sx={{
              display: {
                xs: "none",
                lg: "flex",
              },
            }}
          >
            <img
              src={loginBg}
              alt="bg"
              style={{
                width: "100%",
                maxWidth: "500px",
              }}
            />
          </Box>
        </Box>
      </Grid>
      <Grid
        display="flex"
        justifyContent="center"
        alignItems="center"
        size={{
          xs: 12,
          sm: 12,
          lg: 6,
          xl: 6,
        }}
      >
        <Box p={4}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            sx={{ marginBottom: 4 }}
          >
            <LogoAuth />
          </Box>
          {children}
        </Box>
      </Grid>
    </Grid>
  </PageContainer>
);

export default AuthLayoutSide;
