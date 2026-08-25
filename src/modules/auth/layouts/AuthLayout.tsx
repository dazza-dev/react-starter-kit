import { Box } from "@mui/material";
import PageContainer from "@/core/components/PageContainer";
import type { AuthLayoutBaseProps } from "@/modules/auth/types/auth-layout.types";

/**
 * Auth screen split in two: a primary-colored panel hidden below `lg`, and the
 * form centered on the right.
 */
const AuthLayout = ({ title, description, children }: AuthLayoutBaseProps) => (
  <PageContainer title={title} description={description}>
    <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <Box
        sx={{
          display: { xs: "none", lg: "block" },
          width: "50%",
          height: "100vh",
          backgroundColor: "primary.main",
        }}
      />

      <Box
        sx={{
          width: { xs: "100%", lg: "50%" },
          height: "100vh",
          overflowY: "auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box sx={{ width: "min(90%, 680px)", py: 3, mx: "auto" }}>{children}</Box>
      </Box>
    </Box>
  </PageContainer>
);

export default AuthLayout;
