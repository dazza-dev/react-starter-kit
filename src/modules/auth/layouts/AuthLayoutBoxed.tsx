import { Grid, Box, Card } from "@mui/material";
import LogoAuth from "@/core/components/logo/LogoAuth";
import PageContainer from "@/core/components/PageContainer";
import type { ReactNode } from "react";

type Props = {
  title?: string;
  description?: string;
  children: ReactNode;
};

const AuthLayoutBoxed = ({ title, description, children }: Props) => (
  <PageContainer title={title} description={description}>
    <Box
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
    >
      <Grid
        container
        spacing={0}
        justifyContent="center"
        sx={{ height: "100vh" }}
      >
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
          <Card
            elevation={9}
            sx={{ p: 4, zIndex: 1, width: "100%", maxWidth: "500px" }}
          >
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              sx={{ marginBottom: 4 }}
            >
              <LogoAuth />
            </Box>
            {children}
          </Card>
        </Grid>
      </Grid>
    </Box>
  </PageContainer>
);

export default AuthLayoutBoxed;
