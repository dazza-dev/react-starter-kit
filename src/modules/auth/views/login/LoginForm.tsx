import { useMemo, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  Stack,
  Typography,
} from "@mui/material";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import CustomTextField from "@/core/components/forms/CustomTextField";
import CustomPasswordField from "@/core/components/forms/CustomPasswordField";
import { useLogin } from "@/modules/auth/hooks/useAuth";
import type { LoginPayload } from "@/modules/auth/types/auth.type";

const createSchema = (t: (key: string) => string) =>
  z.object({
    username: z.string().min(1, { message: t("validation:required") }),
    password: z.string().min(1, { message: t("validation:required") }),
  });

const LoginForm = () => {
  const { t } = useTranslation();
  const schema = useMemo(() => createSchema(t), [t]);
  const loginMutation = useLogin();
  const [remember, setRemember] = useState(false);

  const { control, handleSubmit } = useForm<LoginPayload>({
    resolver: zodResolver(schema),
    defaultValues: { username: "", password: "" },
  });

  // The button only enables once both fields are filled.
  const [username, password] = useWatch({ control, name: ["username", "password"] });
  const disabled = loginMutation.isPending || !username || !password;

  return (
    <form onSubmit={handleSubmit((data) => loginMutation.mutate(data))}>
      <Stack spacing={3} mt={2.5}>
        <Controller
          name="username"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <CustomTextField
              {...field}
              label={t("auth:username")}
              fullWidth
              autoComplete="username"
              error={!!error}
              helperText={error?.message}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <CustomPasswordField
              {...field}
              label={t("auth:password")}
              fullWidth
              autoComplete="current-password"
              error={!!error}
              helperText={error?.message}
            />
          )}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" my={1.5}>
        <FormControlLabel
          control={
            <Checkbox
              color="primary"
              checked={remember}
              onChange={(event) => setRemember(event.target.checked)}
            />
          }
          label={t("auth:remember")}
        />
        <Typography
          component={Link}
          to="/auth/forgot-password"
          fontWeight="500"
          sx={{ textDecoration: "none", color: "primary.main" }}
        >
          {t("auth:forgotPasswordQuestion")}
        </Typography>
      </Stack>

      <Button
        color="primary"
        variant="contained"
        size="large"
        fullWidth
        disableElevation
        type="submit"
        disabled={disabled}
        startIcon={loginMutation.isPending ? <CircularProgress size={20} color="inherit" /> : null}
      >
        {t("auth:signIn")}
      </Button>

      {loginMutation.isError && (
        <Box mt={1}>
          <Alert severity="error">{t("auth:signInError")}</Alert>
        </Box>
      )}
    </form>
  );
};

export default LoginForm;
