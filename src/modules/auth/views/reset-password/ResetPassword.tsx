import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import AuthLayout from "@/modules/auth/layouts/AuthLayout";
import AppLogo from "@/core/components/logo/AppLogo";
import ResetPasswordForm from "./ResetPasswordForm";

const ResetPassword = () => {
  const { t } = useTranslation();

  return (
    <AuthLayout title={t("auth:resetPassword")} description={t("auth:resetPasswordDescription")}>
      <Box mb={3}>
        <AppLogo variant="dark" sx={{ "& svg": { height: 40, width: "auto" } }} />
      </Box>
      <Typography variant="h3" fontWeight={700} mb={1}>
        {t("auth:resetTitle")}
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" mb={3}>
        {t("auth:resetSubtitle")}
      </Typography>
      <ResetPasswordForm />
    </AuthLayout>
  );
};

export default ResetPassword;
