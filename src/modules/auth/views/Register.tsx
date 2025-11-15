import { Typography, Stack } from "@mui/material";
import { Link } from "react-router";
import AuthLayout from "@/modules/auth/layouts/AuthLayout";
import { AUTH_STYLE } from "@/core/context/authConfig";
import RegisterForm from "@/modules/auth/components/RegisterForm";

const Register = () => (
  <AuthLayout
    type={AUTH_STYLE}
    title="Register"
    description="this is Register page"
  >
    <RegisterForm
      subtext={
        <Typography
          variant="subtitle1"
          textAlign="center"
          color="textSecondary"
          mb={1}
        >
          Your Social Campaigns
        </Typography>
      }
      subtitle={
        <Stack direction="row" spacing={1} mt={3}>
          <Typography color="textSecondary" variant="h6" fontWeight="400">
            Already have an Account?
          </Typography>
          <Typography
            component={Link}
            to="/auth/login"
            fontWeight="500"
            sx={{
              textDecoration: "none",
              color: "primary.main",
            }}
          >
            Sign In
          </Typography>
        </Stack>
      }
    />
  </AuthLayout>
);

export default Register;
