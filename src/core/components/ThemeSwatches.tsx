import { Box, Stack, Tooltip } from "@mui/material";
import { useTranslation } from "react-i18next";
import type { ThemeName } from "@/core/types/theme.types";

interface Swatch {
  value: ThemeName;
  key: string;
  primary: string;
  secondary: string;
}

/** Swatches for the palette picker. */
const SWATCHES: Swatch[] = [
  { value: "EMERALD_THEME", key: "emerald", primary: "#00c853", secondary: "#12161C" },
  { value: "DEFAULT_THEME", key: "default", primary: "#562ff4", secondary: "#49BEFF" },
  { value: "BLUE_THEME", key: "blue", primary: "#5D87FF", secondary: "#49BEFF" },
  { value: "AQUA_THEME", key: "aqua", primary: "#0074BA", secondary: "#47D7BC" },
  { value: "PURPLE_THEME", key: "purple", primary: "#763EBD", secondary: "#95CFD5" },
  { value: "GREEN_THEME", key: "green", primary: "#0A7EA4", secondary: "#CCDA4E" },
  { value: "CYAN_THEME", key: "cyan", primary: "#01C0C8", secondary: "#FB9678" },
  { value: "ORANGE_THEME", key: "orange", primary: "#FA896B", secondary: "#0074BA" },
];

interface ThemeSwatchesProps {
  value: ThemeName;
  onChange: (theme: ThemeName) => void;
}

export default function ThemeSwatches({ value, onChange }: ThemeSwatchesProps) {
  const { t } = useTranslation();

  return (
    <Stack direction="row" flexWrap="wrap" gap={1.5}>
      {SWATCHES.map((swatch) => {
        const selected = value === swatch.value;

        return (
          <Tooltip key={swatch.value} title={t(`settings:themes.${swatch.key}`)}>
            <Box
              onClick={() => onChange(swatch.value)}
              sx={{
                width: 44,
                height: 44,
                borderRadius: "10px",
                overflow: "hidden",
                cursor: "pointer",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                border: "2px solid",
                borderColor: selected ? "#333" : "transparent",
                boxShadow: selected ? "0 0 0 2px white inset" : "none",
                transition: "border-color 0.15s, box-shadow 0.15s",
                "&:hover": { filter: "brightness(0.92)" },
              }}
            >
              <Box sx={{ background: swatch.primary }} />
              <Box sx={{ background: swatch.secondary }} />
            </Box>
          </Tooltip>
        );
      })}
    </Stack>
  );
}
