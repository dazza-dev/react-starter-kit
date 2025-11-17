import { Box, Typography, Button, Stack } from "@mui/material";
import { Link } from "react-router";
import CustomTextField from "@/core/components/forms/CustomTextField";
import CustomFormLabel from "@/core/components/forms/CustomFormLabel";
import type { registerType } from "@/modules/auth/types/auth";
import { useTranslation } from "react-i18next";

const AuthRegister = ({ title, subtitle, subtext }: registerType) => {
  const { t } = useTranslation();

  return (
    <>
      {title ? (
        <Typography fontWeight="700" variant="h3" mb={1}>
          {title}
        </Typography>
      ) : null}

      {subtext}

      <Box>
        <Stack mb={3}>
          <CustomFormLabel htmlFor="name">{t("auth:name")}</CustomFormLabel>
          <CustomTextField id="name" variant="outlined" fullWidth />
          <CustomFormLabel htmlFor="email">
            {t("auth:emailAddress")}
          </CustomFormLabel>
          <CustomTextField id="email" variant="outlined" fullWidth />
          <CustomFormLabel htmlFor="password">
            {t("auth:password")}
          </CustomFormLabel>
          <CustomTextField id="password" variant="outlined" fullWidth />
        </Stack>
        <Button
          color="primary"
          variant="contained"
          size="large"
          fullWidth
          component={Link}
          to="/auth/login"
        >
          {t("auth:signUp")}
        </Button>
      </Box>
      {subtitle}
    </>
  );
};

export default AuthRegister;
