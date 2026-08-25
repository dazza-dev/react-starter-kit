import { Divider as MuiDivider, useTheme } from "@mui/material";
import type { DividerProps } from "@mui/material";

export default function Divider({ sx, ...props }: DividerProps) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <MuiDivider
      sx={{
        borderColor: isDark ? "rgba(255, 255, 255, 0.23)" : theme.palette.grey[200],
        ...sx,
      }}
      {...props}
    />
  );
}
