import { useState } from "react";
import type { FC, MouseEvent } from "react";
import { Avatar, IconButton, ListItemIcon, Menu, MenuItem, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { setLanguage } from "@/core/utils/i18n";
import type { SupportedLanguage } from "@/core/utils/i18n";
import flagEn from "@/assets/images/flag/icon-flag-en.svg";
import flagEs from "@/assets/images/flag/icon-flag-es.svg";
import flagPt from "@/assets/images/flag/icon-flag-pt.svg";

interface LanguageOption {
  value: SupportedLanguage;
  title: string;
  subtext: string;
  flag: string;
}

const LANGUAGES: LanguageOption[] = [
  { value: "en", title: "English", subtext: "US", flag: flagEn },
  { value: "es", title: "Español", subtext: "ES", flag: flagEs },
  { value: "pt", title: "Português", subtext: "PT", flag: flagPt },
];

/**
 * Language selector; persists the choice in `lang`, sent as Accept-Language by axios.
 */
const LanguageSelector: FC = () => {
  const { i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const current = LANGUAGES.find((lang) => lang.value === i18n.language) ?? LANGUAGES[1];

  const handleOpen = (event: MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const select = (lang: SupportedLanguage) => {
    setLanguage(lang);
    handleClose();
  };

  return (
    <>
      <IconButton color="inherit" onClick={handleOpen} aria-label={current.title}>
        <Avatar src={current.flag} alt={current.value} sx={{ width: 22, height: 22 }} />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        sx={{ "& .MuiMenu-paper": { width: "200px" } }}
      >
        {LANGUAGES.map((lang) => (
          <MenuItem
            key={lang.value}
            onClick={() => select(lang.value)}
            selected={i18n.language === lang.value}
          >
            <ListItemIcon sx={{ minWidth: "auto", mr: 1.5 }}>
              <Avatar src={lang.flag} alt={lang.value} sx={{ width: 22, height: 22 }} />
            </ListItemIcon>
            <Typography variant="subtitle1">
              {lang.title}
              <Typography component="span" variant="subtitle1" color="text.disabled" pl={1}>
                ({lang.subtext})
              </Typography>
            </Typography>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default LanguageSelector;
