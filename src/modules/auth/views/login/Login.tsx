import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import AuthLayout from "@/modules/auth/layouts/AuthLayout";
import AppLogo from "@/core/components/logo/AppLogo";
import LoginForm from "./LoginForm";

const Login = () => {
  const { t } = useTranslation();

  return (
    <AuthLayout title={t("auth:login")} description={t("auth:loginDescription")}>
      <Box mb={3}>
        <AppLogo variant="dark" sx={{ "& svg": { height: 40, width: "auto" } }} />
      </Box>
      <Typography variant="h3" fontWeight={700} mb={1}>
        {t("auth:loginTitle")}
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" mb={3}>
        {t("auth:loginSubtitle")}
      </Typography>
      <LoginForm />
    </AuthLayout>
  );
};

export default Login;
