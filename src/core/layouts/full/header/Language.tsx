import React, { useContext } from "react";
import {
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Stack,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { CustomizerContext } from "@/core/context/CustomizerContext";

// Language Flags
import FlagEn from "@/assets/images/flags/flag-en.svg";
import FlagFr from "@/assets/images/flags/flag-fr.svg";
import FlagEs from "@/assets/images/flags/flag-es.svg";
import FlagPt from "@/assets/images/flags/flag-pt.svg";

const Languages = [
  {
    flagName: "English (US)",
    icon: FlagEn,
    value: "en",
  },
  {
    flagName: "Spanish (ES)",
    icon: FlagEs,
    value: "es",
  },
  {
    flagName: "Français (FR)",
    icon: FlagFr,
    value: "fr",
  },

  {
    flagName: "Portuguese (PT)",
    icon: FlagPt,
    value: "pt",
  },
];
const Language = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);
  const { isLanguage, setIsLanguage } = useContext(CustomizerContext);

  const currentLang =
    Languages.find((_lang) => _lang.value === isLanguage) || Languages[1];
  const { i18n } = useTranslation();
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  useEffect(() => {
    i18n.changeLanguage(isLanguage);
  }, []);

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
              <Typography> {option.flagName}</Typography>
            </Stack>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default Language;
