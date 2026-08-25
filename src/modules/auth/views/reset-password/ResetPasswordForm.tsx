import { Button, CircularProgress, Stack, Typography } from "@mui/material";
import { Link, useNavigate, useSearchParams } from "react-router";
import { useTranslation } from "react-i18next";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { z } from "zod";
import CustomPasswordField from "@/core/components/forms/CustomPasswordField";
import { useResetPassword } from "@/modules/auth/hooks/useAuth";
import type { ResetPasswordPayload } from "@/modules/auth/types/auth.type";

const ResetPasswordForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const resetPassword = useResetPassword();

  const schema = z
    .object({
      token: z.string().min(1, t("validation:required")),
      email: z.email({ message: t("validation:invalid_email") }),
      password: z.string().min(8, t("validation:min_chars", { count: 8 })),
      passwordConfirmation: z.string().min(8, t("validation:min_chars", { count: 8 })),
    })
    .refine((data) => data.password === data.passwordConfirmation, {
      message: t("validation:passwords_not_match"),
      path: ["passwordConfirmation"],
    });

  const { control, handleSubmit } = useForm<ResetPasswordPayload>({
    resolver: zodResolver(schema),
    defaultValues: {
      token: searchParams.get("token") ?? "",
      email: searchParams.get("email") ?? "",
      password: "",
      passwordConfirmation: "",
    },
  });

  const onSubmit = async (data: ResetPasswordPayload) => {
    const response = await resetPassword.mutateAsync(data).catch(() => null);
    if (!response) return;

    toast.success(response.message);
    void navigate("/auth/login");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack mt={2.5} spacing={3}>
        <Controller
          name="token"
          control={control}
          render={({ field }) => <input type="hidden" {...field} />}
        />

        <Controller
          name="email"
          control={control}
          render={({ field }) => <input type="hidden" {...field} />}
        />

        <Controller
          name="password"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <CustomPasswordField
              {...field}
              id="password"
              label={t("auth:newPassword")}
              variant="outlined"
              fullWidth
              autoComplete="new-password"
              error={!!error}
              helperText={error?.message}
            />
          )}
        />

        <Controller
          name="passwordConfirmation"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <CustomPasswordField
              {...field}
              id="passwordConfirmation"
              label={t("auth:confirmPassword")}
              variant="outlined"
              fullWidth
              autoComplete="new-password"
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
          disabled={resetPassword.isPending}
          startIcon={
            resetPassword.isPending ? <CircularProgress size={20} color="inherit" /> : null
          }
        >
          {t("auth:resetPasswordBtn")}
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
      </Stack>
    </form>
  );
};

export default ResetPasswordForm;
