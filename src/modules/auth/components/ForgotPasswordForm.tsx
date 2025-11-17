import { Button, Stack } from "@mui/material";
import { Link } from "react-router";
import CustomTextField from "@/core/components/forms/CustomTextField";
import CustomFormLabel from "@/core/components/forms/CustomFormLabel";
import { useTranslation } from "react-i18next";
import { Typography } from "@mui/material";

const AuthForgotPassword = () => {
  const { t } = useTranslation();

  return (
    <>
      <Stack mt={4} spacing={2}>
        <CustomFormLabel htmlFor="reset-email">
          {t("auth:emailAddress")}
        </CustomFormLabel>
        <CustomTextField id="reset-email" variant="outlined" fullWidth />

        <Button
          color="primary"
          variant="contained"
          size="large"
          fullWidth
          component={Link}
          to="/"
        >
          {t("auth:forgotPasswordBtn")}
        </Button>
        <Typography
          component={Link}
          to="/auth/login"
          fontWeight="500"
          textAlign="center"
          sx={{
            textDecoration: "none",
            color: "primary.main",
          }}
        >
          {t("auth:backToLogin")}
        </Typography>
      </Stack>
    </>
  );
};

export default AuthForgotPassword;
