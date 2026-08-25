import { useMemo, useState } from "react";
import { Box, Grid, LinearProgress, MenuItem, Tab, Tabs, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { PageHeader } from "@/core/components/PageHeader";
import FormSection from "@/core/components/forms/FormSection";
import CustomTextField from "@/core/components/forms/CustomTextField";
import ImageUploader from "@/core/components/ImageUploader";
import ThemeSwatches from "@/core/components/ThemeSwatches";
import { CancelButton, SaveButton } from "@/core/components/buttons";
import { ConfirmDialog } from "@/core/components/modals";
import { CanAccess } from "@/modules/auth/components/CanAccess";
import { SUPPORTED_LANGUAGES } from "@/core/utils/i18n";
import { useSettings, useUpdateSettings, useUploadLogo } from "../hooks/useSettings";
import { SETTING_NAMES } from "../types/setting.type";
import { DEFAULT_THEME_NAME } from "@/core/theme/DefaultColors";
import { THEME_NAMES } from "@/core/types/theme.types";
import type { ThemeName } from "@/core/types/theme.types";
import type { AppSettings, SettingPayload } from "../types/setting.type";

const EMPTY: AppSettings = {
  appName: "",
  email: "",
  notificationEmail: "",
  language: "en",
  timezone: "",
  appTheme: DEFAULT_THEME_NAME,
  logo: null,
};

/**
 * App settings: general data and branding.
 */
export default function SettingsView() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data, isLoading } = useSettings();
  const updateSettings = useUpdateSettings();
  const uploadLogo = useUploadLogo();

  const [tab, setTab] = useState(0);
  const [confirmLeave, setConfirmLeave] = useState(false);
  // Only touched fields are kept; the rest comes from the server response.
  const [edited, setEdited] = useState<Partial<AppSettings>>({});

  // The backend returns null for settings without a value; inputs need a string.
  const saved = useMemo<AppSettings>(() => {
    if (!data) return EMPTY;
    const text = (key: string) => (data[key] === null ? "" : String(data[key] ?? ""));
    return {
      appName: text("appName"),
      email: text("email"),
      notificationEmail: text("notificationEmail"),
      language: text("language") || EMPTY.language,
      timezone: text("timezone"),
      appTheme: THEME_NAMES.includes(data.appTheme as ThemeName)
        ? (data.appTheme as ThemeName)
        : DEFAULT_THEME_NAME,
      logo: (data.logo as string | null) ?? null,
    };
  }, [data]);
  const form = { ...saved, ...edited };

  const setField = <K extends keyof AppSettings>(key: K, value: AppSettings[K]) =>
    setEdited((prev) => ({ ...prev, [key]: value }));

  const handleSave = () => {
    // Only sends what the user touched, using the backend's naming.
    const payload: SettingPayload[] = Object.entries(edited).map(([key, value]) => ({
      name: SETTING_NAMES[key as keyof AppSettings],
      value: value === null || value === undefined ? "" : String(value),
    }));

    if (payload.length === 0) {
      toast.info(t("common:no_changes"));
      return;
    }

    updateSettings.mutate(payload, { onSuccess: () => setEdited({}) });
  };

  // A field reverted to its original value doesn't count as a change.
  const hasChanges = Object.entries(edited).some(
    ([key, value]) => value !== saved[key as keyof AppSettings],
  );

  const leave = () => void navigate("/app/dashboard");

  const handleCancel = () => {
    if (hasChanges) setConfirmLeave(true);
    else leave();
  };

  const actions = (
    <>
      <CancelButton variant="outlined" onClick={handleCancel} />
      <CanAccess permission="update-config">
        <SaveButton icon={null} onClick={handleSave} loading={updateSettings.isPending} />
      </CanAccess>
    </>
  );

  return (
    <Box>
      <PageHeader title={t("settings:title")} subtitle={t("settings:subtitle")} actions={actions} />

      {isLoading && <LinearProgress color="primary" sx={{ mb: 3 }} />}

      <Tabs value={tab} onChange={(_, value: number) => setTab(value)} sx={{ mb: 2.5 }}>
        <Tab label={t("settings:tabs.general")} />
        <Tab label={t("settings:tabs.design")} />
      </Tabs>

      {tab === 0 && (
        <FormSection title={t("settings:generalInfo")}>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12 }}>
              <CustomTextField
                size="small"
                id="appName"
                label={t("settings:fields.appName")}
                fullWidth
                value={form.appName}
                onChange={(event) => setField("appName", event.target.value)}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <CustomTextField
                size="small"
                id="email"
                label={t("settings:fields.email")}
                type="email"
                fullWidth
                value={form.email}
                onChange={(event) => setField("email", event.target.value)}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <CustomTextField
                size="small"
                id="notificationEmail"
                label={t("settings:fields.notificationEmail")}
                type="email"
                fullWidth
                value={form.notificationEmail}
                onChange={(event) => setField("notificationEmail", event.target.value)}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <CustomTextField
                size="small"
                id="language"
                label={t("settings:fields.language")}
                select
                fullWidth
                value={form.language}
                onChange={(event) => setField("language", event.target.value)}
              >
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <MenuItem key={lang} value={lang}>
                    {t(`common:lang.${lang}`)}
                  </MenuItem>
                ))}
              </CustomTextField>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <CustomTextField
                size="small"
                id="timezone"
                label={t("settings:fields.timezone")}
                fullWidth
                value={form.timezone}
                onChange={(event) => setField("timezone", event.target.value)}
              />
            </Grid>
          </Grid>
        </FormSection>
      )}

      {tab === 1 && (
        <FormSection title={t("settings:tabs.design")}>
          <Typography variant="subtitle1" fontWeight={500} mb={1.5}>
            {t("settings:fields.appTheme")}
          </Typography>
          <Box mb={4}>
            <ThemeSwatches
              value={form.appTheme}
              onChange={(theme) => setField("appTheme", theme)}
            />
          </Box>

          <Typography variant="subtitle1" fontWeight={500} mb={1.5}>
            {t("settings:fields.logo")}
          </Typography>
          <ImageUploader
            value={form.logo}
            onChange={(url) => setField("logo", url)}
            uploadFn={(file) => uploadLogo.mutateAsync(file)}
            accept="image/png,image/jpeg"
            helpText={t("settings:logoHint")}
          />
        </FormSection>
      )}

      <ConfirmDialog
        open={confirmLeave}
        onClose={() => setConfirmLeave(false)}
        onConfirm={leave}
        title={t("settings:discard.title")}
        description={t("settings:discard.description")}
        confirmLabel={t("settings:discard.confirm")}
        cancelLabel={t("settings:discard.cancel")}
        confirmColor="error"
      />
    </Box>
  );
}
