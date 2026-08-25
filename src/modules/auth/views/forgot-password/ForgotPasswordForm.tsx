import { useState } from "react";
import { Alert, Button, CircularProgress, Stack, Typography } from "@mui/material";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import CustomTextField from "@/core/components/forms/CustomTextField";
import { useForgotPassword } from "@/modules/auth/hooks/useAuth";
import type { ForgotPasswordPayload } from "@/modules/auth/types/auth.type";

const ForgotPasswordForm = () => {
  const { t } = useTranslation();
  const forgotPassword = useForgotPassword();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const schema = z.object({
    email: z.email({ message: t("validation:invalid_email") }),
  });

  const { control, handleSubmit } = useForm<ForgotPasswordPayload>({
    resolver: zodResolver(schema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (data: ForgotPasswordPayload) => {
    const response = await forgotPassword.mutateAsync(data).catch(() => null);
    if (response) setSuccessMessage(response.message);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack mt={2.5} spacing={3}>
        <Controller
          name="email"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <CustomTextField
              {...field}
              id="reset-email"
              label={t("auth:emailAddress")}
              variant="outlined"
              fullWidth
              autoComplete="email"
              error={!!error}
              helperText={error?.message}
            />
          )}
        />

        <Button
          color="primary"
          variant="contained"
          size="large"
          fullWidth
          type="submit"
          disabled={forgotPassword.isPending}
          startIcon={
            forgotPassword.isPending ? <CircularProgress size={20} color="inherit" /> : null
          }
        >
          {t("auth:forgotPasswordBtn")}
        </Button>
        <Typography
          component={Link}
          to="/auth/login"
          fontWeight="500"
          textAlign="center"
          sx={{ textDecoration: "none", color: "primary.main" }}
        >
          {t("auth:backToLogin")}
        </Typography>

        {successMessage && <Alert severity="success">{successMessage}</Alert>}
      </Stack>
    </form>
  );
};

export default ForgotPasswordForm;
