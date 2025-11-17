import { Box, Typography, Button, Stack } from "@mui/material";
import { Link } from "react-router";
import CustomTextField from "@/core/components/forms/CustomTextField";
import CustomFormLabel from "@/core/components/forms/CustomFormLabel";
import { useTranslation } from "react-i18next";

const AuthTwoSteps = () => {
  const { t } = useTranslation();

  return (
    <>
      <Box mt={4}>
        <Stack mb={3}>
          <CustomFormLabel htmlFor="code">
            {t("auth:type6Digits")}
          </CustomFormLabel>
          <Stack spacing={2} direction="row">
            <CustomTextField id="code" variant="outlined" fullWidth />
            <CustomTextField id="code" variant="outlined" fullWidth />
            <CustomTextField id="code" variant="outlined" fullWidth />
            <CustomTextField id="code" variant="outlined" fullWidth />
            <CustomTextField id="code" variant="outlined" fullWidth />
            <CustomTextField id="code" variant="outlined" fullWidth />
          </Stack>
        </Stack>
        <Button
          color="primary"
          variant="contained"
          size="large"
          fullWidth
          component={Link}
          to="/"
        >
          {t("auth:verifyAccount")}
        </Button>

        <Stack direction="row" spacing={1} mt={3}>
          <Typography color="textSecondary" variant="h6" fontWeight="400">
            {t("auth:didntGetCode")}
          </Typography>
          <Typography
            component={Link}
            to="/"
            fontWeight="500"
            sx={{
              textDecoration: "none",
              color: "primary.main",
            }}
          >
            {t("auth:resend")}
          </Typography>
        </Stack>
      </Box>
    </>
  );
};

export default AuthTwoSteps;
