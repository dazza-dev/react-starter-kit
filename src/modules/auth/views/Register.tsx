import { Typography, Stack } from "@mui/material";
import { Link } from "react-router";
import AuthLayout from "@/modules/auth/layouts/AuthLayout";
import { AUTH_STYLE } from "@/core/context/authConfig";
import RegisterForm from "@/modules/auth/components/RegisterForm";
import { useTranslation } from "react-i18next";

const Register = () => {
  const { t } = useTranslation();

  return (
    <AuthLayout
      type={AUTH_STYLE}
      title={t("auth:register")}
      description={t("auth:registerDescription")}
    >
      <Typography variant="h4" fontWeight="700" textAlign="center">
        {t("auth:register")}
      </Typography>
      <RegisterForm
        subtitle={
          <Stack direction="row" spacing={1} mt={2}>
            <Typography color="textSecondary" variant="h6" fontWeight="400">
              {t("auth:alreadyHaveAccount")}
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
              {t("auth:signIn")}
            </Typography>
          </Stack>
        }
      />
    </AuthLayout>
  );
};

export default Register;
