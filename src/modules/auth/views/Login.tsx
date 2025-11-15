import { Link } from "react-router";
import { Stack, Typography } from "@mui/material";
import AuthLayout from "@/modules/auth/layouts/AuthLayout";
import { AUTH_STYLE } from "@/core/context/authConfig";
import LoginForm from "@/modules/auth/components/LoginForm";

const Login = () => (
  <AuthLayout type={AUTH_STYLE} title="Login" description="this is Login page">
    <Typography variant="h4">Login</Typography>
    <LoginForm
      subtitle={
        <Stack direction="row" spacing={1} justifyContent="center" mt={3}>
          <Typography color="textSecondary" variant="h6" fontWeight="500">
            New to Modernize?
          </Typography>
          <Typography
            component={Link}
            to="/auth/register"
            fontWeight="500"
            sx={{
              textDecoration: "none",
              color: "primary.main",
            }}
          >
            Create an account
          </Typography>
        </Stack>
      }
    />
  </AuthLayout>
);

export default Login;
