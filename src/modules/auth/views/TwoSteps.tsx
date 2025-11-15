import { Typography } from "@mui/material";
import AuthLayout from "@/modules/auth/layouts/AuthLayout";
import { AUTH_STYLE } from "@/core/context/authConfig";
import TwoStepsForm from "@/modules/auth/components/TwoStepsForm";

const TwoSteps = () => (
  <AuthLayout
    type={AUTH_STYLE}
    title="Two Steps"
    description="this is Two Steps page"
  >
    <Typography
      variant="subtitle1"
      textAlign="center"
      color="textSecondary"
      mb={1}
    >
      We sent a verification code to your mobile. Enter the code from the mobile
      in the field below.
    </Typography>
    <Typography variant="subtitle1" textAlign="center" fontWeight="700" mb={1}>
      ******1234
    </Typography>
    <TwoStepsForm />
  </AuthLayout>
);

export default TwoSteps;
