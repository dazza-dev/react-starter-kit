import React, { useContext } from "react";
import type { FC, MouseEvent } from "react";
import {
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Stack,
} from "@mui/material";
import i18n from "@/utils/i18n";
import { useEffect } from "react";
import { CustomizerContext } from "@/core/context/CustomizerContext";
import { useTranslation } from "react-i18next";

// Language Flags
import FlagEn from "@/assets/images/flags/flag-en.svg";
import FlagFr from "@/assets/images/flags/flag-fr.svg";
import FlagEs from "@/assets/images/flags/flag-es.svg";
import FlagPt from "@/assets/images/flags/flag-pt.svg";

interface LanguageOption {
  flagName: string;
  icon: string;
  value: string;
}

const Languages: LanguageOption[] = [
  {
    flagName: "common:language.english",
    icon: FlagEn,
    value: "en",
  },
  {
    flagName: "common:language.spanish",
    icon: FlagEs,
    value: "es",
  },
  {
    flagName: "common:language.french",
    icon: FlagFr,
    value: "fr",
  },

  {
    flagName: "common:language.portuguese",
    icon: FlagPt,
    value: "pt",
  },
];

const Language: FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const open = Boolean(anchorEl);
  const { isLanguage, setIsLanguage } = useContext(CustomizerContext);
  const { t } = useTranslation();

  const currentLang =
    Languages.find((_lang) => _lang.value === isLanguage) || Languages[1];
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  useEffect(() => {
    i18n.changeLanguage(isLanguage);
  }, [isLanguage]);

  return (
    <>
      <IconButton
        aria-label="change-language"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <Avatar
          src={currentLang.icon}
          alt={currentLang.value}
          sx={{ width: 20, height: 20 }}
        />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={{
          "& .MuiMenu-paper": {
            width: "200px",
          },
        }}
      >
        {Languages.map((option, index) => (
          <MenuItem
            key={index}
            sx={{ py: 2, px: 3 }}
            onClick={() => setIsLanguage(option.value)}
          >
            <Stack direction="row" spacing={1} alignItems="center">
              <Avatar
                src={option.icon}
                alt={option.icon}
                sx={{ width: 20, height: 20 }}
              />
              <Typography> {t(option.flagName)}</Typography>
            </Stack>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default Language;
