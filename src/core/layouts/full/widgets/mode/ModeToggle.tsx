import type { FC } from "react";
import { IconButton, Tooltip } from "@mui/material";
import { IconMoon, IconSun } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { useCustomizer } from "@/core/context/CustomizerContext";

/**
 * Switches between the light and dark palette of the active theme.
 */
const ModeToggle: FC = () => {
  const { t } = useTranslation();
  const { activeMode, setActiveMode } = useCustomizer();
  const isDark = activeMode === "dark";

  return (
    <Tooltip title={t(isDark ? "common:mode.light" : "common:mode.dark")}>
      <IconButton
        color="inherit"
        aria-label={t(isDark ? "common:mode.light" : "common:mode.dark")}
        onClick={() => setActiveMode(isDark ? "light" : "dark")}
      >
        {isDark ? <IconSun size={20} /> : <IconMoon size={20} />}
      </IconButton>
    </Tooltip>
  );
};

export default ModeToggle;
