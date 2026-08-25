import { useId, useMemo } from "react";
import { Box, useTheme } from "@mui/material";
import type { SxProps, Theme } from "@mui/material";
import { useAppName, useConfigStore } from "@/core/store/configStore";
import logoMarkup from "@/assets/images/logo.svg?raw";

interface AppLogoProps {
  /** `light` renders the mark in white (sidebar); `dark` uses the theme's primary color. */
  variant?: "light" | "dark";
  sx?: SxProps<Theme>;
}

/**
 * App logo: uses the one uploaded in settings if present, otherwise the built-in SVG colored per variant.
 */
export default function AppLogo({ variant = "light", sx }: AppLogoProps) {
  const theme = useTheme();
  const appName = useAppName();
  const settings = useConfigStore((state) => state.settings);
  const uid = useId().replace(/:/g, "");

  const uploaded = (settings[variant === "dark" ? "logo" : "logoDark"] ?? settings.logo) as
    string | null;

  // The mask id is made unique per instance: two logos on the same page would collide.
  const markup = useMemo(() => logoMarkup.replace(/logoMarkCutout/g, `logoMark-${uid}`), [uid]);

  if (uploaded) {
    return (
      <Box
        component="img"
        src={uploaded}
        alt={appName}
        sx={{ display: "block", maxWidth: "100%", height: "auto", ...sx }}
      />
    );
  }

  return (
    <Box
      role="img"
      aria-label={appName}
      sx={{
        color: variant === "light" ? "#FFFFFF" : theme.palette.primary.main,
        "& svg": { display: "block", maxWidth: "100%", height: "auto" },
        ...sx,
      }}
      dangerouslySetInnerHTML={{ __html: markup }}
    />
  );
}
