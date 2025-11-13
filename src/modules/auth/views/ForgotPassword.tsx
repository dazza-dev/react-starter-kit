import { Typography } from "@mui/material";
import AuthLayout from "@/modules/auth/layouts/AuthLayout";
import ForgotPasswordForm from "@/modules/auth/components/ForgotPasswordForm";

const ForgotPassword = () => (
  <AuthLayout
    type="boxed"
    title="Forgot Password"
    description="this is Forgot Password page"
  >
    <Typography
      color="textSecondary"
      textAlign="center"
      variant="subtitle2"
      fontWeight="400"
    >
      Please enter the email address associated with your account and We will
      email you a link to reset your password.
    </Typography>
    <ForgotPasswordForm />
  </AuthLayout>
);

export default ForgotPassword;
