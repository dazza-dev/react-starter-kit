import { Grid, Box } from "@mui/material";
import Logo from "@/core/components/Logo";
import PageContainer from "@/core/components/PageContainer";
import loginBg from "@/assets/images/backgrounds/login-bg.svg";

type Props = {
  title?: string;
  description?: string;
  children: any | any[];
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
            background: "radial-gradient(#d2f1df, #d3d7fa, #bad8f4)",
            backgroundSize: "400% 400%",
            animation: "gradient 15s ease infinite",
            position: "absolute",
            height: "100%",
            width: "100%",
            opacity: "0.3",
          },
        }}
        size={{
          xs: 12,
          sm: 12,
          lg: 8,
          xl: 9,
        }}
      >
        <Box position="relative">
          <Box px={3}>
            <Logo />
          </Box>
          <Box
            alignItems="center"
            justifyContent="center"
            height={"calc(100vh - 75px)"}
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
          lg: 4,
          xl: 3,
        }}
      >
        <Box p={4}>{children}</Box>
      </Grid>
    </Grid>
  </PageContainer>
);

export default AuthLayoutSide;
