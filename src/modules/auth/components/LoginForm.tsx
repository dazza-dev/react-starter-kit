import {
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Button,
  Stack,
} from "@mui/material";
import { Link } from "react-router";
import type { loginType } from "@/modules/auth/types/auth";
import CustomCheckbox from "@/core/components/forms/CustomCheckbox";
import CustomTextField from "@/core/components/forms/CustomTextField";
import CustomFormLabel from "@/core/components/forms/CustomFormLabel";
import { useTranslation } from "react-i18next";

const LoginForm = ({ title, subtitle, subtext }: loginType) => {
  const { t } = useTranslation();

  return (
    <>
      {title ? (
        <Typography fontWeight="700" variant="h3" mb={1}>
          {title}
        </Typography>
      ) : null}

      {subtext}

      <Stack>
        <Box>
          <CustomFormLabel htmlFor="username">
            {t("auth:username")}
          </CustomFormLabel>
          <CustomTextField id="username" variant="outlined" fullWidth />
        </Box>
        <Box>
          <CustomFormLabel htmlFor="password">
            {t("auth:password")}
          </CustomFormLabel>
          <CustomTextField
            id="password"
            type="password"
            variant="outlined"
            fullWidth
          />
        </Box>
        <Stack
          justifyContent="space-between"
          direction="row"
          alignItems="center"
          my={2}
        >
          <FormGroup>
            <FormControlLabel
              control={<CustomCheckbox defaultChecked />}
              label={t("auth:rememberDevice")}
            />
          </FormGroup>
          <Typography
            component={Link}
            to="/auth/forgot-password"
            fontWeight="500"
            sx={{
              textDecoration: "none",
              color: "primary.main",
            }}
          >
            {t("auth:forgotPasswordQuestion")}
          </Typography>
        </Stack>
      </Stack>
      <Box>
        <Button
          color="primary"
          variant="contained"
          size="large"
          fullWidth
          component={Link}
          to="/"
          type="submit"
        >
          {t("auth:signIn")}
        </Button>
      </Box>
      {subtitle}
    </>
  );
};

export default LoginForm;
