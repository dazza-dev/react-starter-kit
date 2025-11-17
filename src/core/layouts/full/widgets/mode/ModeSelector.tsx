import { useContext, useEffect, useMemo, useState } from "react";
import type { FC, MouseEvent } from "react";
import { IconButton, Menu, MenuItem, Stack, Typography } from "@mui/material";
import { IconSun, IconMoon, IconDeviceDesktop } from "@tabler/icons-react";
import { CustomizerContext } from "@/core/context/CustomizerContext";
import { useTranslation } from "react-i18next";

type Source = "manual" | "system";

const ModeSelector: FC = () => {
  const { activeMode, setActiveMode } = useContext(CustomizerContext);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);
  const [source, setSource] = useState<Source>("manual");
  const { t } = useTranslation();

  const mql = useMemo(() => {
    return window.matchMedia("(prefers-color-scheme: dark)");
  }, []);

  useEffect(() => {
    const handler = (e: MediaQueryListEvent) => {
      if (source === "system") {
        setActiveMode(e.matches ? "dark" : "light");
      }
    };
    mql.addEventListener("change", handler);
    return () => {
      mql.removeEventListener("change", handler);
    };
  }, [mql, setActiveMode, source]);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => setAnchorEl(null);

  const selectLight = () => {
    setSource("manual");
    setActiveMode("light");
    handleClose();
  };
  const selectDark = () => {
    setSource("manual");
    setActiveMode("dark");
    handleClose();
  };
  const selectSystem = () => {
    setSource("system");
    setActiveMode(mql.matches ? "dark" : "light");
    handleClose();
  };

  return (
    <>
      <IconButton
        size="large"
        color="inherit"
        onClick={handleClick}
        aria-label={
          activeMode === "light" ? t("customizer:light") : t("customizer:dark")
        }
      >
        {activeMode === "light" ? (
          <IconMoon size="21" stroke="1.5" />
        ) : (
          <IconSun size="21" stroke="1.5" />
        )}
      </IconButton>
      <Menu
        id="mode-selector"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={{
          "& .MuiMenu-paper": {
            width: "220px",
          },
        }}
      >
        <MenuItem onClick={selectLight} sx={{ py: 2, px: 3 }}>
          <Stack direction="row" spacing={2} alignItems="center">
            <IconSun size={18} />
            <Typography>{t("customizer:light")}</Typography>
          </Stack>
        </MenuItem>
        <MenuItem onClick={selectDark} sx={{ py: 2, px: 3 }}>
          <Stack direction="row" spacing={2} alignItems="center">
            <IconMoon size={18} />
            <Typography>{t("customizer:dark")}</Typography>
          </Stack>
        </MenuItem>
        <MenuItem onClick={selectSystem} sx={{ py: 2, px: 3 }}>
          <Stack direction="row" spacing={2} alignItems="center">
            <IconDeviceDesktop size={18} />
            <Typography>{t("customizer:system")}</Typography>
          </Stack>
        </MenuItem>
      </Menu>
    </>
  );
};

export default ModeSelector;
