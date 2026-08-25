import type { FC } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

interface SpinnerProps {
  /** Height of the centered area. Defaults to the full screen. */
  minHeight?: string;
}

/**
 * Centered loading indicator, using the active palette's color.
 */
const Spinner: FC<SpinnerProps> = ({ minHeight = "100vh" }) => {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
        width: "100%",
        minHeight,
      }}
    >
      <CircularProgress color="primary" size={64} thickness={4} />
      <Typography variant="subtitle1" color="text.secondary">
        {t("common:loading")}
      </Typography>
    </Box>
  );
};

export default Spinner;
