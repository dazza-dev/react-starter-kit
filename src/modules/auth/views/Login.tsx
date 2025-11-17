import { Link } from "react-router";
import { Stack, Typography } from "@mui/material";
import AuthLayout from "@/modules/auth/layouts/AuthLayout";
import { AUTH_STYLE } from "@/core/context/authConfig";
import LoginForm from "@/modules/auth/components/LoginForm";
import { useTranslation } from "react-i18next";

const Login = () => {
  const { t } = useTranslation();

  return (
    <AuthLayout
      type={AUTH_STYLE}
      title={t("auth:login")}
      description={t("auth:loginDescription")}
    >
      <Typography variant="h4" fontWeight="700" textAlign="center">
        {t("auth:login")}
      </Typography>
      <LoginForm
        subtitle={
          <Stack direction="row" spacing={1} justifyContent="center" mt={3}>
            <Typography
              component={Link}
              to="/auth/register"
              fontWeight="500"
              sx={{
                textDecoration: "none",
                color: "primary.main",
              }}
            >
              {t("auth:createAccount")}
            </Typography>
          </Stack>
        }
      />
    </AuthLayout>
  );
};

export default Login;
