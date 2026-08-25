import { useEffect } from "react";
import { Box, Card, CardContent, Divider, Grid, LinearProgress, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { PageHeader } from "@/core/components/PageHeader";
import FormInput from "@/core/components/forms/FormInput";
import { CancelButton, SaveButton } from "@/core/components/buttons";
import { useAuthStore } from "@/modules/auth/store/authStore";
import { useUpdateProfile } from "@/modules/auth/hooks/useAuth";
import type { AuthUser, ProfileForm } from "@/modules/auth/types/auth.type";

const EMPTY_FORM: ProfileForm = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  username: "",
  password: "",
  passwordConfirmation: "",
};

const fromUser = (user: AuthUser): ProfileForm => ({
  firstName: user.firstName,
  lastName: user.lastName ?? "",
  email: user.email,
  phone: user.phone ?? "",
  username: user.username,
  password: "",
  passwordConfirmation: "",
});

/**
 * Authenticated user's profile: personal data and credentials.
 */
export default function ProfileView() {
  const { t } = useTranslation();
  const user = useAuthStore((state) => state.user);
  const updateProfile = useUpdateProfile();

  const schema = z
    .object({
      firstName: z.string().min(1, t("validation:required")),
      lastName: z.string(),
      email: z.email({ message: t("validation:invalid_email") }),
      phone: z.string(),
      username: z.string().min(3, t("validation:min_chars", { count: 3 })),
      // Empty means "don't change the password".
      password: z.union([
        z.literal(""),
        z.string().min(8, t("validation:min_chars", { count: 8 })),
      ]),
      passwordConfirmation: z.string(),
    })
    .refine((form) => !form.password || form.password === form.passwordConfirmation, {
      message: t("validation:passwords_not_match"),
      path: ["passwordConfirmation"],
    });

  const { control, handleSubmit, reset } = useForm<ProfileForm>({
    resolver: zodResolver(schema),
    defaultValues: EMPTY_FORM,
  });

  useEffect(() => {
    if (user) reset(fromUser(user));
  }, [user, reset]);

  // The confirmation field only shows up while typing a new password.
  const password = useWatch({ control, name: "password" });

  const onSubmit = (form: ProfileForm) => updateProfile.mutate(form);

  return (
    <Box>
      <PageHeader
        title={t("auth:profile.title")}
        subtitle={t("auth:profile.subtitle")}
        actions={
          <>
            <CancelButton
              variant="outlined"
              disabled={updateProfile.isPending}
              onClick={() => reset(user ? fromUser(user) : EMPTY_FORM)}
            />
            <SaveButton
              icon={null}
              label={t("auth:profile.save")}
              loading={updateProfile.isPending}
              onClick={handleSubmit(onSubmit)}
            />
          </>
        }
      />

      <Card>
        <CardContent>
          {!user && <LinearProgress color="primary" sx={{ mb: 3 }} />}

          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3} alignItems="flex-start">
              <Grid size={{ xs: 12, sm: 4 }}>
                <Typography variant="h6" fontWeight={600}>
                  {t("auth:profile.personalData")}
                </Typography>
                <Typography variant="body2" color="text.secondary" mt={0.5}>
                  {t("auth:profile.personalDataDesc")}
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, sm: 8 }}>
                <Grid container spacing={3}>
                  <FormInput
                    name="firstName"
                    control={control}
                    label={t("auth:profile.firstName")}
                    size={{ xs: 12, sm: 6 }}
                    dense
                    required
                  />
                  <FormInput
                    name="lastName"
                    control={control}
                    label={t("auth:profile.lastName")}
                    size={{ xs: 12, sm: 6 }}
                    dense
                  />
                  <FormInput
                    name="email"
                    control={control}
                    label={t("auth:emailAddress")}
                    type="email"
                    dense
                    required
                  />
                  <FormInput name="phone" control={control} label={t("auth:profile.phone")} dense />
                </Grid>
              </Grid>
            </Grid>

            <Divider sx={{ my: 6 }} />

            <Grid container spacing={3} alignItems="flex-start">
              <Grid size={{ xs: 12, sm: 4 }}>
                <Typography variant="h6" fontWeight={600}>
                  {t("auth:profile.credentials")}
                </Typography>
                <Typography variant="body2" color="text.secondary" mt={0.5}>
                  {t("auth:profile.credentialsDesc")}
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, sm: 8 }}>
                <Grid container spacing={3}>
                  <FormInput
                    name="username"
                    control={control}
                    label={t("auth:username")}
                    dense
                    required
                  />
                  <FormInput
                    name="password"
                    control={control}
                    label={t("auth:password")}
                    type="password"
                    dense
                  />
                  {password && (
                    <FormInput
                      name="passwordConfirmation"
                      control={control}
                      label={t("auth:confirmPassword")}
                      type="password"
                      dense
                    />
                  )}
                </Grid>
              </Grid>
            </Grid>

            <button type="submit" hidden />
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}
