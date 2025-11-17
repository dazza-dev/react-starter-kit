import { Typography } from "@mui/material";
import AuthLayout from "@/modules/auth/layouts/AuthLayout";
import { AUTH_STYLE } from "@/core/context/authConfig";
import TwoStepsForm from "@/modules/auth/components/TwoStepsForm";
import { useTranslation } from "react-i18next";

const TwoSteps = () => {
  const { t } = useTranslation();

  return (
    <AuthLayout
      type={AUTH_STYLE}
      title={t("auth:twoSteps")}
      description={t("auth:twoStepsDescription")}
    >
      <Typography
        variant="subtitle1"
        textAlign="center"
        color="textSecondary"
        mb={1}
      >
        {t("auth:twoStepsInstruction")}
      </Typography>
      <Typography
        variant="subtitle1"
        textAlign="center"
        fontWeight="700"
        mb={1}
      >
        ******1234
      </Typography>
      <TwoStepsForm />
    </AuthLayout>
  );
};

export default TwoSteps;
