import { Typography } from "@mui/material";
import AuthLayout from "@/modules/auth/layouts/AuthLayout";
import { AUTH_STYLE } from "@/core/context/authConfig";
import ForgotPasswordForm from "@/modules/auth/components/ForgotPasswordForm";
import { useTranslation } from "react-i18next";

const ForgotPassword = () => {
  const { t } = useTranslation();

  return (
    <AuthLayout
      type={AUTH_STYLE}
      title={t("auth:forgotPassword")}
      description={t("auth:forgotPasswordDescription")}
    >
      <Typography
        color="textSecondary"
        textAlign="center"
        variant="subtitle2"
        fontWeight="400"
      >
        {t("auth:forgotInstruction")}
      </Typography>
      <ForgotPasswordForm />
    </AuthLayout>
  );
};

export default ForgotPassword;
